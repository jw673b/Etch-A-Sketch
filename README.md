During the course of this mini-project, there were a number of challenges and lessons learned. Creating an etch a sketch was the first time I did any significant amount of manipulation of the DOM model using Javascript. I chose to use CSS display: Grid to create the grid and then filled in the grid using evenly sized divs. 

The default grid is 16x16 but a user is able to change the resolution of the grid using the Select Grid Size button. The default color is black, but this can be toggled to rainbow using the button titled Black. The rainbow setting will color each div using a randomly generated RGB color.

The main challenge I encountered over the course of this exercise was attaching the event listeners to each div. Firstly, adding the listeners to the new Divs. At first I tried to create a nodelist to add the listeners but as no divs were created when I tried to create the nodelist, I instead opted to add the listeners as each div was generated. 

The next challenge was changing the listeners to color the divs a random RGB color. For this, I opted to create a nodelist to toggle the listeners using removeEventListener and addEventListener along with the forEach method. 