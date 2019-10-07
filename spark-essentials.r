# Now let's create a simple list with 10000 integers
# xrange() is more memory efficient so let's use that
data <- 1:10001

# now see how big our list is
length(data)
data

# Now let's create a DataFrame from our list
frame <- data.frame(x = data)
length(frame)
frame
