---
title: Vagrant and libVirt(KVM/Qemu) - Setting up boxes the easy way
date: 2014-12-03 20:07 UTC
tags:
---

In my [research lab](http://seclab.cs.ucsb.edu) at UCSB, we routinely run large-scale experiments that, essentially, need lots of computation and memory. These are pretty cool to run, but setting them up can be quite cumbersome. To make this task easier on us, we have been running an OpenStack shop for quite a while, and we were running Eucalyptus before that.

Unfortunately, maintaining an OpenStack installation with ever-shifting requirements can become a chore too, as there are lots of moving parts that need to be monitored and occasionally fixed and updated. Since we don’t really need all the features of OpenStack, we have been looking for a while for alternative solutions.

Our requirements boil down to:

* Easy to maintain: adding and removing host servers should be easily automated. Debugging faulty servers should be immediate.
* Easy to use: newcomers should not need to learn any API, and they could not be familiar with virtualization.
* Efficient: we have >20 fat servers running this little cloud. The more VMs we can pack into them, the better. In other words: the overhead servers (puppet muster, JuJu etc) should be kept at minimum, or eliminated.

 The current lightweight solution: simply running independent KVM/libvirt servers, and manage them via [Vagrant](https://www.vagrantup.com). Here, KVM servers provide the “easy to administrate” part, and Vagrant provides a nice wrapper that makes it easy to deploy and manage VMs, since it provides a clear separation between base boxes (for which there is an extensive repository, a la Amazon AWS) and provisioning. Plus, Vagrant provides an abstraction over KVM: running the same VM on OpenStack, libVirt/KVM, or VirtualBox is just a matter of a command line switch.

 This solution fits well to our needs. The only outstanding issues are:

 * Managing a pool of IPs, which could maybe be solved by having a little Redis server that keeps the list of free IPs
 * Load balancing
 

 I’ve noticed that there isn’t a good guide on the Internet on how to accomplish something like this, so here’s a quick tutorial.


## Install Vagrant
Note that the version of Vagrant in the Ubuntu 14.04 repositories is too old, and it is incompatible with the libvirt plugin. So,

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
## [OPTIONAL] Modify the box

If you want to modify the VM, I suggest you install VirtualBox and run the VM there.

```bash
vagrant up  # This will start the VM in VirtualBox
vagrant ssh  # Do your modifications
vagrant package  # Will package the VM as a box
vagrant box add trusty64 package.box  --force  # Rewrite the trusty64 box
vagrant mutate trusty64  libvirt  # Remember to convert the box to the KVM format 
```


## Configure your guest VM

All the configuration Vagrant needs is in a single file, which is nice. So,
create a file called `Vagrantfile`.

```ruby
Vagrant.configure("2") do |config|

  # Tell Vagrant where would you like to start your VMs (you can also have a
  # specific per-VM configuration. Do not put this section in case you want to
  # start your VMs on the same host)
  config.vm.provider :libvirt do |libvirt|
    libvirt.host = 'myawesomehostname or IP'
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
    machine.vm.provision :shell, path: "bootstrap.sh", args: "42", keep_color: true

  end
end
```


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


## [OPTIONAL] Setting libvirt as default provider

You might grow bored of passing `--provider=libvirt` in the command line. If
that’s the case, just add

```ruby
ENV['VAGRANT_DEFAULT_PROVIDER'] = 'libvirt'
```

at the top of your `Vagrantfile`. Good coders are lazy, after all.


