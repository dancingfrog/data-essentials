# R operates on vectors
(1 : 5) # means 1, 2, 3, 4, 5

# Non-linear vectors can be enumerated with c()
c(1, 2.5, 3, 4, 4.5) # means 1, 2.5, 3, 4, 4.5

# All arithmetic operators are *vectorized*
(1 : 5) + c(1, 2.5, 3, 4, 4.5)

# Operations on vectors are ordered
c(1, 3, 4, 4.5, 2.5) == c(1, 2.5, 3, 4, 4.5) # expr contains FALSE

# ... but agg functions may not be
median(c(1, 3, 4, 4.5, 2.5)) == median(c(1, 2.5, 3, 4, 4.5))

mean(1 : 5)

mean(c(1, 2.5, 3, 4, 4.5))

median(1 : 5)

median(c(1, 3, 5, 4, 2.5))

sum(1 : 5)

sum(c(1, 2.5, 3, 4, 4.5))

# Vector terms can have different lengths
c(1) + c(1.5 : 5)

# ... but multiplication & division require that the longer
# vector length is a multiple of the shorter vector length
c(-2 : 3) * c(1, 2, 3) # length 6 * length 3
