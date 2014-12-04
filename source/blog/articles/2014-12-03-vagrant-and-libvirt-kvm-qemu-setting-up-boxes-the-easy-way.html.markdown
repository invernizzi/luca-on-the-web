---
title: Vagrant and libVirt(KVM/Qemu) - Setting up boxes the easy way
date: 2014-12-03 20:07 UTC
tags:
published: false
---




## Install Vagrant
Note that the version of Vagrant in the Ubuntu 14.04 repositories is too old for us.

```bash
    sudo apt-get install vagrant  # Nope, not this one, too old.
```
**Won’t do on Ubuntu 14.04**. You need to install the [latest official Vagrant](https://www.vagrantup.com/downloads.html) from their website (it’s nicely packaged).
So, execute:

```bash
    wget https://dl.bintray.com/mitchellh/vagrant/vagrant_1.6.5_x86_64.deb -O vagrant.deb
    sudo dpkg -i vagrant.deb
```

### Install Vagrant Plugins
Vagrant has a nice plugin framework, to whom people have contributed lots of very helpful plugins. Here’s the ones we need.

#### Vagrant-libvirt

Vagrant doesn’t know how to talk to libvirt, so we have to teach that to it.

```bash
vagrant plugin install vagrant-libvirt
```

#### Vagrant-mutate

In a few moments, we will download an official Vagrant guest box to run. These boxes are not made for KVM, so we need to convert them to a KVM-friendly format.

```bash
vagrant plugin install vagrant-mutate
```
#### Vagrant-rekey

The official Vagrant boxes come with preset passwords and a built-in “insecure” SSH key. This plugin clears all of those, and generates a new SSH key to use instead of the insecure one.

```bash
vagrant plugin install vagrant-rekey-ssh
```


## Download your first box
Let’s get the official Vagrant box for Ubuntu 14.04, and make it KVM-friendly. There are plenty other boxes ready to use on Vagrant’s [site](https://vagrantcloud.com/discover/featured).

```bash
vagrant box add trusty64 https://vagrantcloud.com/ubuntu/boxes/trusty64/versions/14.04/providers/virtualbox.box
vagrant mutate trusty64  libvirt
```
Now, Vagrant by default comes with pre-baked keys. We want to change those, with the help for the rekey plugin. We will start the VM in virtualbox, 

```bash
vagrant up  # Will start up the VM, and rekey it.
vagrant package  # Will package the VM as a box
vagrant box add trusty64 package.box  --force  # Rewrite the trusty64 box
```


## Configure your guest VM


## Start &amp; provision your guest VM

Start it up:

``` bash
vagrant up --provider=libvirt
```

SSH to it:

``` bash
vagrant ssh
```

Burn it to the ground:

``` bash
vagrant destroy
```

Oh, and by the way, do you want to start the VM locally in VirtualBox?
```bash
vagrant up
```
Pretty great :)

Vagrant.configure("2") do |config|

  # Tell Vagrant where would you like to start your VMs (you can also have a
  # specific per-VM configuration. Do not put this section in case you want to
  # start your VMs on the same host)
  config.vm.provider :libvirt do |libvirt|
    libvirt.host = 'veni'
    libvirt.username = 'root'
    libvirt.connect_via_ssh = true
  end

  # Here's our VM confguration
  config.vm.define :my_fancy_vm do |machine|

    # It should be an Ubuntu 14.04 box
    machine.vm.box = "trusty64"

    # With a public IP (it's optional)
    machine.vm.network :public_network, ip: '192.168.48.193', :dev => "br0", :mode => 'bridge'
    # With so much RAM and CPUs
    machine.vm.provider :libvirt do |domain|
      domain.memory = 2048
      domain.cpus = 2
    end

    # Finally, let's provision it by running a script. You can also run
    # puppet, chef, ansible, and others. Check the Vagrant website for
    # details.
    machine.vm.provision :shell, path: "bootstrap.sh", args: "puppetbrowser.pp", keep_color: true

  end
end
