---
title: Mitigate Android's Stagefright by disabling MMSes
date: 2015-07-27 22:29 UTC
tags:
---


[Stagefright](http://blog.zimperium.com/experts-found-a-unicorn-in-the-heart-of-android/) is a novel attack that allows remote code execution on the vast majority of devices running Android.
Whereas the details of the vulnerability will be publicly released on August 5th, the general idea behind the attack (which was released just two hours ago) is to compromize the multimidia library that parses and displays MMS media.

Since the attack looks terribly effective, it is a good idea to mitigate it by disabling MMSes, until a fix is released (provided, of couse, that you don't use MMSes).

To do that, open the "Settings" menu (here, on Android 5.1, the look of your menu might be different)
![settings](/img/blog/stagefright-mms-1.png)

Select "Cellular Networks"
![settings](/img/blog/stagefright-mms-2.png)

Select "Access Point Names"
![settings](/img/blog/stagefright-mms-3.png)

Select your access point. It should look something like this.
![settings](/img/blog/stagefright-mms-4.png)

Now remove "mms" from "APN Type".
![settings](/img/blog/stagefright-mms-5.png)

I've also cleared out "MMSC" for good measure (optional)
![settings](/img/blog/stagefright-mms-6.png)

Your new settings will take effect after you reboot the phone, or put it in airplane mode for a few seconds.

