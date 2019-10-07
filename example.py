from IPython.display import JSON

data = {"foo": {"bar": "baz"}}

JSON(data)

string = "Hydrogen"

for index, letter in enumerate(string):
    print((letter, index))

import os
os.chdir("/data")
os.getcwd()
