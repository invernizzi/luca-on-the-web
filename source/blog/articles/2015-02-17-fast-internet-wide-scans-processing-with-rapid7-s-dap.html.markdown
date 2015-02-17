---
title: Fast, Internet-wide scans processing with Rapid7's DAP
date: 2015-02-17 04:42 UTC
tags:
---

One day of last week I came up with an idea that I had to test against the HTTP headers of millions of servers.
To do this quickly, writing practically no code, I’ve used Rapid7’s [DAP](https://github.com/rapid7/dap.git). It is
 a nifty little utility that has been the ultimate time-saver for me, and it certainly deserves much more spotlight than it currently has. Plus, [hdmoore](https://en.wikipedia.org/wiki/H._D._Moore) [digs it](https://news.ycombinator.com/item?id=8738020).

 Since the docs are scarce at the moment, I though to contribute with a complete example.

# Get all the webservers with a particular header

###Get the dataset

First, get the data. [Scans.io](https://scans.io/study/sonar.http) does the heavy lifting for us, providing a dataset of GET requests to all IPv4 hosts (so, no vhosts, unfortunately, so we won’t see domains co-located on the same host).
Get it:

```bash
wget https://scans.io/data/rapid7/sonar.http/20150203-http.gz -O the_Internet.gz  # Get the latest one from the site.
```

### Install

Of course, we need to install stuff. Here’s the instructions for Debian/Ubuntu:

```bash
sudo aptitude install libgeoip-dev parallel pigz ruby-bundler pv
git clone https://github.com/rapid7/dap.git
cd dap
gem install bundler
bundle install
```

### Fire!

Now we are ready to go. It’s a long pipeline, that works like this:

```bash
pigz -dc the_Internet.gz | \
         pv -t -r -a -l | \
         head -n 300000 | \
         parallel --gnu  --nice 10 --pipe \
         "cd dap; bundle exec bin/dap json  + transform data=base64decode + decode_http_reply data + include data.http_server='Apache' + include data.fancy_header='42' + select ip data data.http_code data.http_raw_headers data.http_server + json"
```

* `pigz` will decompress our dataset quickly (using multiple cores)
* `pv` will just let us see what’s going on (printing the progress on the screen)
* `head` is nice for getting the pipeline right quickly (processing only the first k sites, for a faster turnaround during debugging)
* `parallel` lets us use DAP (a single-core program) on multiple cores (or even multiple hosts!), by splitting the input across a set of workers.
* `dap` has is own pipeline to interpret the data, described by its arguments. In particular:
    * Input processing
        * `json` specifies the input is in JSON, and it needs to be decoded
        * `transform data=base64decode` specifies that the “data” field in the JSON is BASE64 encoded, and needs decoding
        * `decode_http_reply data` specifies that the “data” field contains an HTTP reply, which DAP knows how to process to give easier access to its fields.
    * Filtering
        * `include data.http_server=’Apache’` will filter out all servers that do not self-report as “Apache” in theirs HTTP headers.
        * `include data.fancy_header=’42’` will further filter all the servers without this header
    * Output generation
        * `select ip data data.http_code data.http_raw_headers data.http_server` specifies we only want these fields in our output, discarding all the rest
        * `json` tells DAP we want our output as a JSON file.


So, there you go. On my workstation, I can process about 10k sites per second. Pretty sweet, for a few lines of bash.






