# Blog-Site-Project

8/19/2025  
We are on Part 3, first video.  
So far, we’ve added db.js and post.js. I figured out how to organize the files now. We are working with Atlas for the blog posts.

8/20/2025  
I was on Part 3, last video. Now I’m stuck on this error:

const err = new MongooseError(message);  
MongooseError: Operation 'posts.insertMany()' buffering timed out after 10000ms

8/27/2025  
Part 2, video 2 is where I’m confused.  
In app.js I commented something out, and that’s when it gave me the error:

failed to lookup view "layout"

This actually helped me show "Hello World" on my server. I found that the views > layouts > main.ejs file wasn’t working.

app.get("/", (req, res) => {  
 res.send("Hello World");  
});

I figured out that in my app.js file, line 22 originally had:

app.set("layouts", "./layout/main");

I changed it to just layout instead, and it pulled up my "Hello World."

9/2/2025  
I followed the YouTube video (Part 2), but my web page doesn’t look like it does at 7:55 in the video. I need to check this again to see what I missed.

I found where the problem is — it’s in the style.css. Something isn’t linking correctly. I need help with this.

9/4/2025
On part 3 second video

9/7/2025
Server is now getting an error that says
const err = new MongooseError(message);

MongooseError: Operation 'posts.inserMany() buffering timed out after 10000ms
