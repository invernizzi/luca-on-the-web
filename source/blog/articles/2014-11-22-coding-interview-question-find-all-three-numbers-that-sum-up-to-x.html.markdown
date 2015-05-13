---
title: Coding interview question - Find all three numbers that sum up to X
date: 2014-11-22 03:16 UTC
tags: coding-challenge
---

Today’s challenge: given an array, find all combinations of three numbers that sum up to X. Target complexity: O(N<sup>2</sup>)
##Example
Input: array = `[2, 3, 1, -2, -1, 0, 2, -3, 0]`, X = `0`

Expected output: `[(-3, 0, 3)] * 3 + [(-3, 1, 2)] * 2 + [(-2, -1, 3)] + [(-2, 0, 2)] * 6 + [(-1, 0, 1)] * 3`

## Explanation

Let’s think of a simplified problem first: how can we find all pairs of numbers that sum up to some X? This is quite easy:

* we sort the array
* we place a cursor at the start and the end of the array, and we move them
* we compare X with the sum of the values pointed by the two cursors. If it is the same, we found a pair, if our sum is too high, we decrease the high cursor, otherwise we increase the low one.

Now that we can do this, we can use it to solve our original problem. We walk the array, and for every value, we find all combinations of two values in the remainder of the array that sum up to X minus the current value.

Here’s the code:


```python
def compute_sorted_frequency_distribution_of_array(A):
    ''''
    Returns a sorted array of the unique values in A, with the number
    of times they appear in A. This is really just equivalent to:
        import collections
        return sorted(collections.Counter(A).values())

    Complexity: O(N)
    '''
    A.sort()
    freq = []
    last_a = None
    how_many = 0
    for a in A:
        if last_a == a:
            how_many += 1
        else:
            if last_a is not None:
                freq.append((last_a, how_many))
            how_many = 1
            last_a = a
    if how_many > 0:
        freq.append((last_a, how_many))
    return freq


def find_two_number_summing_up_to(freq, target_value):
    '''
    Given a sorted array with unique values and frequencies 'freq',
    and a target value, this function finds all pairs of values in
    the array that sum up to the value.

    Complexity: O(N)
    '''
    s, e = 0, len(freq) - 1
    while s != e and e >= 0 and s <= len(freq):
        delta = freq[s][0] + freq[e][0] - target_value
        if delta == 0:
            yield freq[s][0], freq[e][0], freq[s][1] * freq[e][1]
            e -= 1
        elif delta > 0:
            # we need a smaller sum for the 2nd and 3rd number!
            e -= 1
        else:
            # we need a bigger sum for the 2nd and 3rd number!
            s += 1


def solution(A, X):
    '''
    Finds all c  find all combination of three numbers that sum to X.

    Complexity: O(N^2)
    '''
    freq = compute_sorted_frequency_distribution_of_array(A)
    combinations = []
    for i, (value_1, how_many) in enumerate(freq):
        for value_2, value_3, how_many_pair in find_two_number_summing_up_to(freq[i + 1:], X - value_1):
            combinations += [(value_1, value_2, value_3)] * (how_many * how_many_pair)
    return combinations


if __name__ == '__main__':
    print 'Starting tests..'
    assert solution([], 0) == []
    assert solution([1], 0) == []
    assert solution([1, 2], 0) == []
    assert solution([1, 2, 3], 0) == []
    assert solution([1, 2, -3], 0) == [(-3, 1, 2)]
    assert solution([1, 2, -3], 0) == [(-3, 1, 2)]
    assert solution([3, -3, 1, 0, 0], 0) == [(-3, 0, 3), (-3, 0, 3)]
    expected = [(-3, 0, 3)] * 3 + [(-3, 1, 2)] * 2 + [(-2, -1, 3)] + \
        [(-2, 0, 2)] * 6 + [(-1, 0, 1)] * 3
    assert solution([2, 3, 1, -2, -1, 0, 2, 0, -3, 0], 0) == expected
    assert solution([2, 3, 1], 5) == []
    assert solution([2, 3, 1], 6) == [(1, 2, 3)]
    print 'Ok!'

```

