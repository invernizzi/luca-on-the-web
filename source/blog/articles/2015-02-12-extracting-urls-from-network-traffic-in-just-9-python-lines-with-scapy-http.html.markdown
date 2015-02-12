---
title: Extracting URLs from network traffic in just 9 Python lines with Scapy-HTTP
date: 2015-02-12 04:58 UTC
tags:
---

Today at work my [scapy-http](https://github.com/invernizzi/scapy-http) library became again very useful,
so I thought to showcase it a little here.

This example assumes that you have both scapy and scapy-http installed. If you don’t, you can fix this unexcusable mistake by (on a Debian/Ubuntu host):

```bash
sudo apt-get install python-scapy python-pip
sudo pip install scapy_http
```

## Extract URLs from network traffic

Just for fun, sometimes I sniff my laptop’s network traffic to check what it does in the background.
Here’s the code to see all your HTTP requests:

```python
from scapy.all import IP, sniff
from scapy.layers import http


def process_tcp_packet(packet):
    '''
    Processes a TCP packet, and if it contains an HTTP request, it prints it.
    '''
    if not packet.haslayer(http.HTTPRequest):
        # This packet doesn't contain an HTTP request so we skip it
        return
    http_layer = packet.getlayer(http.HTTPRequest)
    ip_layer = packet.getlayer(IP)
    print '\n{0[src]} just requested a {1[Method]} {1[Host]}{1[Path]}'.format(ip_layer.fields, http_layer.fields)

# Start sniffing the network.
sniff(filter='tcp', prn=process_tcp_packet)
```

Here’s a sample output:

```
192.168.1.70 just requested a GET 192.168.1.68:8060/dial/dd.xml
```

That’s an odd request, actually. After the first thought _“My mama always said not to play with malware, that’s what you get for doing it anyway”_, it turns out, it’s my Roku advertising over the network.


A few obligatory caveats:

 * You may need to be root (or have the proper capability) to run this code
 * Depending on your network, you may not have a complete view of the traffic (there are methods to get it, but they are out of scope here)
 * You’ll just get HTTP requests. Everything else won’t be displayed.



