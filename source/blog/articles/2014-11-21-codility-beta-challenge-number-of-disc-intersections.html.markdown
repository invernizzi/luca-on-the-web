---
title: Codility Beta Challenge - Number Of Disc Intersections
date: 2014-11-21 07:16 UTC
tags: coding-challenge
---

This [challenge](https://codility.com/programmers/challenges/beta2010) on [Codility](https://codility.com) is an interesting one: given a number of disks of various radiuses distributed over a line, can you count the total number of intersections in O(N&middot;log(N))?

Here’s an example:

![disk intersection example](/img/blog/disk-intersections.png )

To have a clear idea of how to solve this, I’ve found it effective to visualize this in slighlty different terms: if you give every disk a one inch thickness, then the number of intersections in a particular point will be equal to how thick the set of disks is (minus one). To avoid counting the same intersection twice, we only consider the thikness of disks of lower order (given any total ordering).

Here’s the example from above, in ``thickness’’ terms. The higher the disk, the higher its order.

![disk intersection example: thinkess](/img/blog/disk-intersections-thick.png )

Ah, now it’s much easier to count the intersections. Also, it is easy to code.

Here’s the [solution](https://codility.com/demo/results/demoR7AE23-S6Z/), which passes all tests for correctess and complexity:

* First, we create an array of "events", where an event is a disk start point or end point. We tag each event with +1 (for the beginning of a disk), or -1 (for its end).
* Then, we sort the array of events, making sure that the start of a disk in a particular point P comes before the end of any disk at P. This is because we have to consider that two disk intersect if they are barely tangent, per the problem statement.
* From now on, the specific coordinates of each event don't matter anymore, only the array of +1, -1 does. We now walk this array, keeping track of how thick the set of disk is at each event (below, the variable is called `active_circles`). Furthermore, we increase the number of intersection by `active_circles` if a new disk starts. You can also do it when a disk ends, it doesn't matter.

In python:


```python

def solution(A):
    events = []
    for i, a in enumerate(A):
        events += [(i-a, +1), (i+a, -1)]
    events.sort(key=lambda x: (x[0], -x[1]))
    intersections, active_circles = 0, 0
    for _, circle_count_delta in events:
        intersections += active_circles * (circle_count_delta > 0)
        active_circles += circle_count_delta
        if intersections > 10E6:
            return -1
    return intersections


if __name__ == '__main__':
    print 'Start tests..'
    assert solution([1, 5, 2, 1, 4, 0]) == 11
    assert solution([]) == 0
    assert solution([0,1]) == 1
    assert solution([0, 0]) == 0
    assert solution([1,0,0,3]) == 4
    print 'Ok!'

```

