---
title: 8x speedup for Python's csv.DictWriter
date: 2015-08-03 21:34 UTC
tags:
---

Like many of you, I enjoy doing lots of data visualization and machine learning using [Pandas](http://pandas.pydata.org/).

Pandas loads CSV files (among other things), so natually I export my datasets in CSV format for easy consumption.
Today's CSV export was a bit on the slow side, so I decided to profile it.

My code looks something like this:

```python
with open(filename, 'wb') as csv_file:
    writer = csv.DictWriter(csv_file, fieldnames=fieldnames)
    for index, row in enumerate(data_iterator):
        writer.writerow(row)
```

And this is the reference speed:

```
time python csv_writer_with_default_args.py

real    0m41.033s
user    0m39.976s
sys     0m0.277s
```

So, let's profile it and look at the bottlenecks

```bash
python -m cProfile -o csv_writer.profile csv_writer.py
runsnake csv_writer.profile
```

![runsnakerun](/img/blog/runsnakerun.png)


It's pretty clear that `_dict_to_list` is the major bottleneck here. Let's look at the code in `csv.py`:

```python
def _dict_to_list(self, rowdict):                                                                                                                                                                                
    if self.extrasaction == "raise":
        wrong_fields = [k for k in rowdict if k not in self.fieldnames]
        if wrong_fields:
            raise ValueError("dict contains fields not in fieldnames: "
                             + ", ".join([repr(x) for x in wrong_fields]))
    return [rowdict.get(key, self.restval) for key in self.fieldnames]
```

The bottleneck is the safety check that this function performs if `self.extrasaction == "raise"`. In particular,
it checks that the `rowdict` that is about to be written doesn't have unexpected extra fields. Since this is a condition
that should never happen in my code, we can safely disable this check. Turns out we can do so by passing `DictWriter` 
a flag `extrasaction='ignore'`.

```python
with open(filename, 'wb') as csv_file:
    writer = csv.DictWriter(csv_file, extrasaction='ignore', fieldnames=fieldnames)
    for index, row in enumerate(data_iterator):
        writer.writerow(row)
```

What's the speed now?

```
time python csv_writer_fast.py

real    0m5.267s
user    0m4.407s
sys     0m0.147s
```

Success :)

