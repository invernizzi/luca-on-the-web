---
title: Codility Sulphur 2014 programming challenge - BreakTheRope
date: 2014-11-19 19:57 UTC
tags: coding_training
---

Hi there!

I’m brushing up my coding skills for future interviews, and I though to make it more engaging by sharing some of it, so that maybe I leave behind something useful to you, and Future Me. &#12483; So, let’s begin!

[Codility](https://codility.com) is a site that every so often proposes interesting challenges. It’s very well done, as it offers a clean interface and does a through testing of your code submissions both in correctness and complexity. Plus, you get the benefit of seeing how you how you stack up against your peers, without having to compete at specific times like other popular sites in the same area: if you are looking for a challenge, I highly recommend it!

The currently newest challenge on Codility is about detecting efficiently when a tree of weighted ropes of limited strength will collapse. Click the link for a full description of the [problem](https://codility.com/cert/view/certK8XR5J-92HED49UEGWTB7MV/details) (it’s copyright-protected, so I won’t post details here).

### Solution
 the ``trivial’’ solution is to keep an additional O(N) array with the available capacity of each rope (that is, how much more weight can this rope bear?). Then, iterate through the ropes, and update the capacity of all ropes that your current rope is dangling from.

 The cool solution can  keep the complexity down to O(N&middot;log(N)). To do that, you need to avoid updating all the capacities of your ``rope chain’’ (i.e., the chain of ropes that eventually connects your current rope to the hook) each time. The trick is to keep another O(N) array: here, you will keep the weakest link of the current rope chain (that is, the rope closest to its breaking point). Then, you can proceed just like in the trivial case, but instead of traversing the whole rope chain, you can just traverse (and update) the weakest links in the rope chain.

This last solution passes all the tests, and gives you the prized [Golden award](https://codility.com/cert/view/certK8XR5J-92HED49UEGWTB7MV).

Here’s the commented code, which should clarify things better &#12483;

```python

def solution(A, B, C):
    ropes_count = len(A)

    # Here we store how much more weight each rope can cope with
    available_capacity = [None] * ropes_count

    # Here we store the parent "weak link" of the rope tree.
    # We define a weak link as the link with the least available capacity.
    # In the case that multiple links with minimal capacity are present, we
    # choose the one closes to the root (i.e., the one with the lowest id)
    next_weak_link = [-1] * ropes_count

    for rope in xrange(ropes_count):
        rope_capacity, rope_weight, parent = A[rope], B[rope], C[rope]
        available_capacity[rope] = rope_capacity
        next_weak_link[rope] = parent

        # Now, we go up through the chain of weak links, trying to find the
        # one that breaks. All other links don't matter, as they have excess
        # capacity w.r.t. the weakest link
        min_capacity = rope_capacity
        j = rope
        while j != -1:
            # Consider the additional weight on this link
            available_capacity[j] -= rope_weight
            min_capacity = min([min_capacity, available_capacity[j]])
            # Check if it is a weak link
            if j != rope and available_capacity[j] == min_capacity:
                # This is a weak link, update the weak link tree
                next_weak_link[rope] = j
            # Check if the rope breaks
            if available_capacity[j] < 0:
                # if the rope breaks, then we have the solution
                return rope
            # Move up through the weak link list
            j = next_weak_link[j]
    # We can accommodate all ropes
    return ropes_count

# Test that the solution works:
if __name__ == '__main__':
    print 'Running tests...'
    assert solution([5, 3, 6, 3, 3], [2, 3, 1, 1, 2], [-1, 0, -1, 0, 3]) == 3
    assert solution([4, 3, 1], [2, 2, 1], [-1, 0, 1]) == 2
    assert solution([], [], []) == 0
    assert solution([1], [1], [-1]) == 1
    assert solution([1, 2], [1, 2], [-1, 0]) == 1
    assert solution([1, 2], [1, 2], [-1, -1]) == 2
    print 'Ok!'

```
