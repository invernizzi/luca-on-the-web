---
title: Debugging a leaky Python
date: 2011-04-03 00:06 UTC
tags:
---

Python 2.6, the one that's probably sitting in your hard disk, has a reference counting garbage collector.
That means that objects are removed from memory right away if  there is no object that is referencing them any more.

![python logo](/img/blog/python.svg )

To avoid leaks, you should be aware of a couple of things when coding.


Cyclic references and destructors do not play well together
Cyclic reference are also detected, but the objects are deleted only if there is no __del__ statement (Python's destructor) in any of the objects of the [cycle](http://docs.python.org/library/gc.html#module-gc).

So, take special care if you ever use __del__ somewhere in your code.

Example:

```python
import gc
 
class ClassyClass(object):
 
    def __init__(self):
        print "I live!"
 
    def __del__(self):
        print "I have been garbage collected"
 
    def make_a_self_reference(self):
        self.self = self
        print "I point to myself"
 
def no_self_reference():
    ClassyClass()
 
def self_reference():
    ClassyClass().make_a_self_reference()
 
 
if __name__ == "__main__":
    gc.set_debug(gc.DEBUG_LEAK)
    print "\n== Without self reference =="
    no_self_reference()
    print "Uncollectable garbage", gc.garbage
    print "\n== With self reference =="
    self_reference()
    print "Uncollectable garbage", gc.garbage
    print "= Forcing full collection ="
    gc.collect()
    print "Uncollectable garbage", gc.garbage
```

Outputs:

    == Without self reference ==
    I live!
    I have been garbage collected
    Uncollectable garbage []
     
    == With self reference ==
    I live!
    I point to myself
    Uncollectable garbage []
    = Forcing full collection =
    gc: uncollectable <classyclass 0x7f1b477f1f90="">
    gc: uncollectable <dict 0x1e1d2d0="">
    Uncollectable garbage [<__main__.ClassyClass object at 0x7f1b477f1f90>, {'self': <__main__.ClassyClass object at 0x7f1b477f1f90>}]

There is no guarantee that destructors will be called at the end of the program:
You have to delete objects yourself, if you want to make sure your destructors are [called](http://docs.python.org/reference/datamodel.html#object.__del__).

## Discovering leaks
So, what to do if your code is leaky?
I have found Python's gc module to be extremely handy for that. 

```python
import gc
gc.set_debug(gc.DEBUG_LEAK)
#prints out leaky references as they are discovered
#In the previous example:
#gc: uncollectable <classyclass 0x7f1b477f1f90="">
```

or:

```python
import gc
 
gc.set_debug(gc.DEBUG_LEAK|gc.DEBUG_STATS)
#more detailed stats about each collection
#In the previous example:
#gc: collecting generation 2... -- is a full collection
#gc: objects in each generation: 2 0 4109
#gc: uncollectable <classyclass 0x7f5ee2599f90="">
#gc: uncollectable <dict 0x1cdf2d0="">
#gc: done, 2 unreachable, 2 uncollectable, 0.0012s elapsed.
```

