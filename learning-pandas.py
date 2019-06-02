ser = {
    'index': [ 0, 1, 2, 3 ],
    'data': [ 145, 142, 38, 13 ]
}

def get(ser, idx):
    value_idx = ser['index'].index(idx)
    return ser['data'][value_idx]

get(ser, 1)

songs = {
    'index': [ 'John', 'Paul', 'George', 'Ringo' ],
    'data': [ 145, 142, 38, 13 ]
}

get(songs,'John')

import pandas as pd
songs2 = pd.Series([ 145, 142, 38, 13 ], name='counts')

songs2

songs2.index

songs3 = pd.Series([ 145, 142, 38, 13 ],
    name='Song_Counts',
    index=[ 'John', 'Paul', 'George', 'Ringo' ]);

songs3.index

songs3

class DataFoo:
    pass

ringo = pd.Series(
    ['Richard', 'Starkey', 13, DataFoo()],
    name='ringo',
    index=['1', '2', '3', '4'])

ringo

ringo.index
