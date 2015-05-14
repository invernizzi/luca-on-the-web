---
title: Repetita Iuvant - Sorting
date: 2014-11-24 07:56 UTC
tags:
published: false
---

Having job interviews coming up, I reserve a couple of hours every day to refresh the most common topic. Today’s topic: sorting arrays, from the basics to the cool ones.

#### Glossary

* Internal sort: in-memory sorting.
* Exernal sort: can sort data bigger than the available memory.
* Adaptive: efficient for quasi-sorted arrays
* Stable: the order of equal values is unchanged
* In-place: \\(O\left(1\right)\\) additional memory
* Online: streaming sorting.
* Comparison sort: sort based on comparisons exclusively (i.e., no cool radix-sort-style tricks). \\(\Omega\left(n\cdot\log(N)\right)\\) lower bound.
* Integer sort: sort based on fixed-size integers. Is \\(\Omega(n)\\)



## Algorithms

Let’s start!


### Bubble sort

Walk the array N times. Each time, compare each element with its neighbor,
/and switch them if necessary. Graphically, it looks like the elements are
slowly progressing to their final position, like bubbles in carbonized drinks
(this is especially apparent in reversed arrays).

* Type: internal, comparison, stable, in-place.
* Complexity:
    * Time
        * Best case: \\(O(N)\\)
        * Average case: \\(O\left(N^2\right)\\)
        * Worst case: \\(O\left(N^2\right)\\)
    * Space: None required, except for input arguments.
* Other names: sinking sort
* Variant: Cocktail sort, where the comparison-and-swap pair goes back and forth, instead of a linear scan always in the same direction (it removes ‘turtles’ from bubble sort, but that’s about it).


``` python

def bubble_sort(A):
    if len(A) <= 1:
        return A
    for _ in xrange(len(A)):
        for i in xrange(len(A) - 1):
            if A[i] > A[i + 1]:
                A[i], A[i + 1] = A[i + 1], A[i]
    return A


if __name__ == '__main__':
    import random
    to_sort = [
        [],
        [1],
        [1, 2],
        [2, 1],
        [random.randint(0,100) for _ in xrange(100)]
    ]
    print "testing..."
    for A in to_sort:
        assert bubble_sort(A[:]) == sorted(A)
    print "Ok!"

```

### Selection sort
Grow a sorted array, always adding to it the smallest element of the rest of the array.

* Type: internal, comparison, stable, in-place.
* Complexity:
    * Time
        * Best case: \\(O\left(N^2\right)\\)
        * Average case: \\(O\left(N^2\right)\\)
        * Worst case: \\(O\left(N^2\right)\\)
    * Space: None required, except for input arguments.
* Variant: Cocktail sort, where you keep track of the min and the max element at each pass.


``` python

def selection_sort(A):
    # Grow a sorted array
    for sorted_up_to in xrange(len(A)):
        smallest_element_index = sorted_up_to
        for i in xrange(sorted_up_to, len(A)):
            if A[i] < A[smallest_element_index]:
                smallest_element_index = i
        A[sorted_up_to], A[smallest_element_index] = A[smallest_element_index], A[sorted_up_to]
    return A

if __name__ == '__main__':
    import random
    to_sort = [
        [],
        [1],
        [1, 2],
        [2, 1],
        [random.randint(0,100) for _ in xrange(100)]
    ]
    print "testing..."
    for A in to_sort:
        assert selection_sort(A[:]) == sorted(A)
    print "Ok!"

```

### Insertion sort
Grow a sorted array, one element at a time. Typically, the sorted array is walked in reverse order (this makes it \\(O(N)\\) in the best case).

* Type: internal, comparison, adaptive, stable, online, in-place.
* Complexity:
    * Time
        * Best case: \\(O\left(N\right)\\)
        * Average case: \\(O\left(N^2\right)\\)
        * Worst case: \\(O\left(N^2\right)\\)
    * Space: \\(O(1)\\). Input arguments plus one additional element.
* Variant: Gnome sort


``` python

def insertion_sort(A):
    if A == []:
        return A
    # Grow a sorted array, one element at a time
    for sorted_up_to in xrange(1, len(A)):
        # Make sure the expanded sorted array remains sorted
        for i in xrange(sorted_up_to, 0, -1):
            if A[i] < A[i - 1]:
                A[i], A[i - 1] = A[i - 1], A[i]
            else:
                # Rest of the array is sorted, terminate early
                break
    return A

if __name__ == '__main__':
    import random
    to_sort = [
        [],
        [1],
        [1, 2],
        [2, 1],
        [random.randint(0,100) for _ in xrange(100)]
    ]
    print "testing..."
    for A in to_sort:
        assert insertion_sort(A[:]) == sorted(A)
    print "Ok!"

```


### Quick sort
Divide an conquer, separating the array in high an low values, w.r.t. a pivot value (the `partition` operation). Then, recurse in the sub-arrays.


* Type: internal, comparison, not stable, divide and conquer.
* Benefits: sequential and localized access => awesome with caches!
* Complexity:
    * Time
        * Best case: \\(O\left(N\cdot\log(N)\right)\\)
        * Average case: \\(O\left(N\cdot\log(N)\right)\\)
        * Worst case: \\(O\left(N^2\right)\\)
    * Space: \\(O(\log(N))\\). For the recursion stack.
* Other names: partition-exchange sort



``` python

def partition(A, low, high):
    # pick the pivot (anywhere you wish)
    pivot = A[(low + high) / 2]
    # partition
    l = low
    h = high
    while l <= h:
        # scan from the right until you find an element that doesn't belong.
        # Note that the pivot is one of such elements, and it's available for
        # being moved about.
        while A[l] < pivot:
            l += 1
            continue
        # scan from the left until you find an element that doesn't belong.
        while A[h] > pivot:
            h -= 1
            continue
        # switch!
        if l <= h:
            A[l], A[h] = A[h], A[l]
            l += 1
            h -= 1
    return h, l  # Note that now h < l.



def quick_sort(A,low=0,high=None):
    if high is None:
        high = len(A) - 1
    if high - low < 1:
        return

    low_separator, high_separator = partition(A, low, high)
    # Now, the pivotal value is in its final position.
    # Recursion:
    quick_sort(A, low, low_separator)
    quick_sort(A, high_separator, high)


if __name__ == '__main__':
    import random
    to_sort = [
        [],
        [1],
        [1, 2],
        [2, 1],
        [3,1,2],
        [random.randint(0, 100) for _ in xrange(100)]
    ]
    print "testing..."
    for A in to_sort:
        A_sorted = A[:]
        quick_sort(A_sorted)
        assert A_sorted == sorted(A)
    print "Ok!"
```

### Merge sort
blah finish below.


* Type: internal, comparison, not stable, divide and conquer.
* Benefits: sequential and localized access => awesome with caches!
* Complexity:
    * Time
        * Best case: \\(O\left(N\cdot\log(N)\right)\\)
        * Average case: \\(O\left(N\cdot\log(N)\right)\\)
        * Worst case: \\(O\left(N^2\right)\\)
    * Space: \\(O(\log(N))\\). For the recursion stack.
* Other names: partition-exchange sort



``` python

def merge(a , b):
    a_i = 0
    b_i = 0
    merged = []
    while a_i < len(a) and b_i < len(b):
        if a[a_i] < b[b_i]:
            merged.append(a[a_i])
            a_i += 1
        else:
            merged.append(b[b_i])
            b_i += 1
    return merged + a[a_i:] + b[b_i:]


def merge_sort_recursive(A):
    if len(A) <= 1:
        return A
    middle = len(A) / 2
    return merge(
        merge_sort_recursive(A[:middle]),
        merge_sort_recursive(A[middle:])
    )


def merge_sort_iterative(A):
    lists = [[a] for a in A] + [[]]
    while len(lists) > 1:
        new_lists = []
        for i in xrange(1, len(lists), 2):
            new_lists.append(merge(lists[i-1], lists[i]))
        if len(lists) % 2 == 1:
            new_lists.append(lists[-1])
        lists = new_lists
    return lists[0]


if __name__ == '__main__':
    import random
    to_sort = [
        [],
        [1],
        [1, 2],
        [2, 1],
        [3,1,2],
        [random.randint(0, 100) for _ in xrange(100)]
    ]
    print "testing..."
    for A in to_sort:
        assert merge_sort_recursive(A[:]) == sorted(A)
        assert merge_sort_iterative(A[:]) == sorted(A)
    print "Ok!"

```

## Counting sort

Counting sort builds an array of length max(input) and stores there the frequencies of the input values.
Then, it processes that array to store in it the number of values smaller than each index. This way, this temporary array holds the final positions of all the values to be sorted.
With that, you can just build the sorted array in a single pass.



* Complexity:
    * Time
        * Best case: \\(O\left(N + K\right)\\)
        * Average case: \\(O\left(N + K\right)\\)
        * Worst case: \\(O\left(N + K\right)\\)
    * Space: \\(O(K + N\\).


``` python

def counting_sort(A):
    # Take care of the empty corner case
    if not A:
        return []

    # Compute element frequencies
    k = max(A)
    tmp = [0] * (k + 1)
    for a in A:
        tmp[a] += 1

    # Compute cumulative element frequencies (tmp[i]= how many elements <= i ?)
    for index, count in enumerate(tmp):
        if index == 0:
            continue
        tmp[index] += tmp[index - 1]


    # Now, we can directly place each number at its final place
    sorted = [None] * len(A)
    for a in A:
        tmp[a] -= 1
        sorted[tmp[a]] = a
    return sorted


if __name__ == '__main__':
    import random
    to_sort = [
        [],
        [1],
        [1, 2],
        [2, 1],
        [3,1,2],
        [random.randint(0, 100) for _ in xrange(100)]
    ]
    print "testing..."
    for A in to_sort:
        assert counting_sort(A[:]) == sorted(A)
    print "ok"
```

### Bucket sort

### Radix sort

### Heap sort



