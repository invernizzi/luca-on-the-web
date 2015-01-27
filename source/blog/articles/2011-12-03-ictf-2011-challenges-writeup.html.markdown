---
title: iCTF 2011 - challenges writeup
date: 2011-12-03 00:01 UTC
tags:
---

Hello people!
The International Capture The Flag hacking competition iCTF 2011, the biggest CTF so far, is over, and it's time for writeups!
Here's the solutions of the challenges I wrote. Hope you enjoyed them



## I Read It Encoded: Challenge, 50 dirty $


I read it encoded. Can you?

The attachment is a base64-encoded QR code in ascii art. Print it with a really tiny monospace font, decode it and you'll have the solution.

#### Solution: Xis4n00bs

#### Teams that solved it: 31/89



## Where Is My Cut?: Challenge, 125 dirty $

        Hey dude,
        I just found Alexey "Donkey" Dragunov passed out in the server room, stinkin' drunk.
        Damn him... He probably freaked out for tomorrow, thinking we will never make it.
        But *we* will.
        We always do.
        I still need to "do the deed" with Monaco's tranche.
        I know the site to use for it is legitimatebiz.ictf2011.info, but I have no freakkin' clue on
        what to do there.
        You're good at this stuff. Can you help me?
        The only thing I found is the sheet of paper attached. It was sticking on the servers, sucked it
        by the fans.
        As always, you will *not* fail me.



Fun challenge. Loading http://legitimatebiz.ictf2011.info, teams first found a simple Rails websites about duck trading. It was a red herring :)
Later in the competition, I replaced it with the standard "It Works!" page of an Apache fresh install, to which I've added a single line "To add content, ssh into this machine".
Turns out people don't read the content of the "It Works!" page anymore (even if it's 3 lines): lots of hackers complained that the website was down, and were told to learn how to read :)

Following the ssh route, teams  were faced with this message:




    $ ssh donkey@legitimatebiz.ictf2011.info
    Host key fingerprint is 97:c5:4a:f4:7a:c1:0c:6c:3c:78:52:73:55:ce:3a:70
    +--[ECDSA  256]---+
    |         == .....|
    |        o.*O   o |
    |         +..O E o|
    |         . = + . |
    |        S = . o  |
    |         . .   . |
    |                 |
    |                 |
    |                 |
    +-----------------+


    Verification code: █


This is the prompt of the Google Authenticator PAM module for two-factor authentication.

If you didn't know that, a big hint is given by the content of the qrcode in the picture (otpauth://totp/donkey@ip-172-19-1-77?secret=JUSH3O2LQ3WSJKSC).
Using the Google Authenticator app for Android/Iphone with the QR code, and the password in the picture (GimmieMyCut), you can log in to the server.
The server's answer contains the solution.

    Welcome to Ubuntu 11.10 (GNU/Linux 3.0.0-12-virtual x86_64)
    [..]
    ComeOnTooEasyConnection to legitimatebiz.ictf2011.info closed.

#### Solution: ComeOnTooEasy
#### Teams that solved it: 22/89

## Inferno: Challenge, 250 dirty $

When I was playing around with the backdoor I deployed on Zeus' laptop,
I found that he was very interested in this page.
Discover why, and if it's worth something, you'll get a good cut.
Attached: inferno.html
A lot of people told me they loved this one :).

The attachment looked like a geological conference website, featuring pieces of the worst html I've ever written.

In the middle of that mess, an odd-looking javascript comment could be spotted:

    +++++++++++++++++++++++++[>++>+++>++++>+++++<<<<-]+++++++++++++++++++++++++>>>-----------.>--------------.<<<------.<+++++++.>>---------.>>----------.+++++++++.<<<.<.>>>>------.---.+++++++++++++.<++++++++++++.<<-----.>>>+.<<<<.>>>>++++++.<++++++++++.>----.<+++.<<<.>>>---------------.>.-.<<<<.>>>+++.>-----.+++.<<<<.>>>>++.<++.---.<<<.>>>-----------.>-----------.++++..--------.+++++++++++++.-----.<+++++++.>+..<<<<.>>>>----.+++++.<+.<<<.>>>>------.+++++.<<<<.>>+++++++++++++++.>>+++++++.<-.>-------.++++++.<++++++++.------.>-----.<<<+++++++.<..>>--------.<<.>>>>----.+++.+.++++++++.<<<<.>>>>--------.-.--.+++++++++++++.<<<<.>>>>.----------.++++++.<<<<----------------------.>>>.--.>-------.<<<--------------.>>+++.+.--.>+.<+.+.<<.>>>--.<.>++++++..<----.++++++.--.>.<<<.>>>.<.>-----.++++++.<<<.>>+.>--.---.--.<<<.>>>+++++++.<++.---.<<.>>--.++++++.>--.<------.>------.<++.>+++++++.<<<.>>>----.<+.<<.>>++.---.>---..<<<++++++++++++.------------.>>>+++++++.----.<<<.>>-.>.-.<<<+++++++.>>>++++++.<<<-------.>>>.--.+++++++.<<<.>>>-----.-----.<<<.>>-.>.--.+++.----.<--.>---.+++++.<<<<.>>>.++++++.------.>-----.+++++.<<<.>>>++++++.<+++++++.-------.>.<<<.>>>+++++.----------.++++++.<<<.>>>-------.<++++.>++++++++.<.>----.<<<.>>++.>---.+++++.<<<.>>>.<+.---.<<.>>>-------.++.-.<.>+++++++++++.<<<++++++++++++++.<.>>--.>++++++++++.-----------.>------.---.<+..-.<<--.<.>------------....>--.>>--.<+++++.--.>-.<------.<<<...>++++++++.>--.-.-------.-.-.>----.>+++++++++++++++++.-.<<----.>----.>---.<<---.>---.>---.<<---.>---.>---.<--.>--.<<<++.-.>>----.<+++++++++++.<+++.-.-.-.-.-.-.-.-.-.-.-.>>>++++++++++++.-.-.-.-.-.-.<<--.-.--.>>----.<<<+.>---.>>++++++++++.--------------.<<--.>>--.-.<<----.-.>>---.-------.+++++.<<----.>>--------.<<--.<<.

Yep, it's BrainFuck. Its execution printed this

    Yo, Ben, here's your cut for the Zimmermann job in Quantico.  I know only you
    can decode messages sent from the circles of hell, so don't try to complain
    again that you never got the money.
    Godspeed,
        Enigma
    (CB;:9]~}5Yz2Vw/StQr*)M:,+*)('&%$#"!~}|{zyx875t"2~p0nm,+jch'`%
    The message alludes to cryptography (Zimmerman, Enigma), and to hell.
    What's the programming language that comes straight from the eight circle of hell, and that encrypts its instruction pointer? A quick search on wikipedia's page of esoteric programming languages leads to Malbolge (read the description, it's quite fun).

Executing the code in the Malbolge interpreter leads to the solution.

#### Solution: EvIl!
#### Teams that solved it: 22/89


## Domain Hunter: Challenge, 350 dirty $

    Here at iCTF HQ, we have a little ADD problem.
    Seeing how cheap domain were when we registered ictf2011.info, we decided to buy another domain.
    There was a bulk discount!
    Cool, ha?
    Except, we forgot what the domain was.
    Can you find it?
    SQUIRREL!

This one wasn't difficult. One of the ways it could be solved is by looking up WHOIS information for ICTF2011.INFO, and googling for a subset of those.

    "Billing Name:Yan Shoshitaishvili Billing Organization: Billing Street1:2541 W. Firebrook Rd Billing Street2: Billing Street3: Billing City:Tucson Billing State/Province:Arizona " returns exactly two results:

    ICTF2011.INFO
    0x69637466.INFO


Score! You think. Except, http://0x69637466.info/ points to a GoDaddy parking page. The solution, instead, was placed at http://www.0x69637466.info/ . Turns out, this little trick confused several people, that later contacted me on IRC to /facepalm.

#### Solution: I@mD@Sh3rl0k0fth31nt3rn3tz.
#### Teams that solved it: 39/89

