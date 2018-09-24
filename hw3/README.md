1.What code draws the blades of grass?
stroke(random(60, 70), 100, 90);
    line(x, height-10, x + random(-10, 10), height-10-random(h));

    x = x + 10;

    if (x > width) {
      x = random(10);
      h = h + 3;
    }

2.What code makes the "lawnmower" come by? How often does it come by?
    if (random() > 0.999) {
        noStroke();
        fill(255);
        rect(-1, -1, width+2, height-15);
        h = 10;
      }

    When the value of random() get value 0.001

3.What's the point of the h variable?
    The height of grass, and it is getting longer by time.

4.What do the three numerical arguments of colorMode do?
    The maximum value of each value.

5.What does the -10 do in the second and fourth arguments of the line function, height-10-random(h)? Why is it there?
    Random height of grass blade. To set the height of grass blade looks naturally.


------------------------------------------------------------------


1.If an array has 5 elements in it, what are the valid index values for the array? (Hint: what's always the first index value?)
    if "var = x": x[0], x[1], x[2], x[3], x[4]

2.What is the difference between a for loop and a while loop?
    Those are basically same, bur a while loop is only for javascript?

3.Use Google or your favorite search website to figure out what the three parts of a for loop are called in JavaScript.
    Declare value, set the length for looping, and declare how often it will print.

4.How does code refer to the number of elements (aka "entries") in an array? (Hint: it shows up in the code you modified!)
    From 0 to large number?


------------------------------------------------------------------

1.What's the point of an object?
  Object is function what built-in p5 to make shape easily.

2.What's an example of a range you might use for the map function?
  It could be useful to make interactive color as set range of width and height into RGB or HSB maximum values.

3.What line of code would give me a random year in the last century?
  I do not understand the question.
