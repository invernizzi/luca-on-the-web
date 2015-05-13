---
title: Vagrant-scp - copy files to vagrant VMs easily
date: 2015-01-26 23:10 UTC
tags:
---

I faced quite a few times the problem of copying files to virtual machines started via [Vagrant](https://www.vagrantup.com/).
Since [many](http://minimul.com/ssh-and-scp-into-a-vagrant-box.html) [people](https://stackoverflow.com/questions/24941237/unable-to-scp-files-from-local-machine-into-vagrant) were facing the same issue, I've written a quick  Vagrant plugin to solve this problem.

 Install it via:

```bash
vagrant plugin install vagrant-scp
```

Use it like so:

```bash
vagrant scp <some_local_file_or_dir> <somewhere_on_the_vm> [vm_name]
```

Enjoy!
