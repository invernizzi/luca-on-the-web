---
title: Hiplogging - broadcast Python logs to Hipchat
date: 2015-01-28 05:58 UTC
tags:
---

Lately, in my research job, I’ve dealt quite a bit with long-running
distributed experiments, handlings lots of non-structured data. The code
running these experiments is usually best described as a “almost-working
prototype” and, especially during the first few iterations of the experiment,
is likely to crash in spectacular, unexpected ways.

To minimize downtimes, I’d like to be notified of any progress (or crash) in
the experiment as soon as possible. I’ve looked into finding a (free, possibly) solution
that can let me monitor my experiments wherever I am, and I’ve found Hipchat to
be a nice, well-integrated solution.

To simplify integrating HipChat in my code, I’ve wrote a little
library, [hiplogging](https://github.com/invernizzi/hiplogging), that I think
is useful enough to be shared with the world :)

You just need to add a little preamble to your code, to configure your HipChat
account,

```python
import os
import logging
import hiplogging

# Set up a standard logger
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger()

# Add the hipchat handler
# Get an admin token from: https://<YOUR_HIPCHAT_NAME>.hipchat.com/admin/api
handler = hiplogging.HipChatHandler(os.environ['HIPCHAT_ADMIN_TOKEN'],
                                   os.environ['HIPCHAT_ROOM'])
handler.setLevel(logging.DEBUG)
logger.addHandler(handler)
```

and you can keep using the standard Python
[logging](https://docs.python.org/2/library/logging.html) module,

```python
logger.debug('debug - we are approaching the anomaly')
logger.info('info - shields up, red alert!')
logger.warn('warn - shield down to 15%')
logger.fatal('fatal - what shields?')
```

 and check
your logs on HipChat web interface, or your mobile device.

![hiplogging](https://github.com/invernizzi/hiplogging/raw/master/example.png)

Try it out!


