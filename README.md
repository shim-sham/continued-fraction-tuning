# tuning systems! (in progress...)
This project compares the different types of tuning systems: pythagorean, just intonation, and equal temperament.<br>
It creates the fractions needed for each interval for each system from scratch to show exactly how each system works.
<br>N.B.: The Hackatime tracking for this didn't count the first 1 hour and 41 mins I spent on this, as I hadn't initialised this repo yet!
## why I made this
This is inspired by <a href = "https://www.whitman.edu/Documents/Academics/Mathematics/bartha.pdf" target="_blank">Piano Tuning and Continued Fractions</a> by Matthew Barta, an article I found while researching the real world applications of continued fractions.

## how I made this
A *lot* of research on the systems of tuning was put into this to find out exactly how each one works. <br>
I tried getting the maths parts done first, and *then* i added css and outputting to screen.
## what I struggled with and what I learned
- learnt that Pythagorean tuning starts descending in perfect fifths from minor second onwards, to create a more accurate system.
- learnt about Math.pow

## for anyone who's interested...
### pythagorean scale
this scale has actually been in use since Ancient Mesopotamia! there are two main intervals that correspond to frequency ratios.
- an octave leap = multiplying the frequency by 2
- a perfect fifth up = multiplying the frequency by 3/2.

essentially, the whole scale is tuned to the first note. you move up or down in perfect fifths (3/2), and adjust the octaves (2) to keep the notes in the range of one octave. <br>the problem with this tuning system is that it creates something called the 'Pythagorean Comma', which is a small gap that is made quite obvious when you close the circle of fifths; if you move up 12 perfect fifths, you're *supposed* to be 7 octaves above your starting note. however, (3/2)^12 != 2^7. some specific intervals will sound just slightly out of tune because of this discrepancy.<br>
this is all caused by our two main frequency ratios. we are trying to make an equation that is based on tripling (perfect fifths) be equal to an equation based on doubling; we're trying to solve 2^x = 3^y, where x and y are rational.