# Blog-Site-Project

8/19/2025
We are at part 3 first video.
So far we added db.js and post.js. I figured how to organize the files now. We are working with Atlas for the blog posts.

8/20/2025
Was on part 3 last video. Now stuck on error "const err = new MongooseError(message);
MongooseError: Operation 'posts.inserMany()' buffering times out after 10000ms

8/27/2025
Part 2-video 2 is where I'm confused just in case.
in the app.js I commented out and that's when it gave me the error failled to lookup view "layout" error. This helped show "Hello world" on my server. I found that the veiws > layouts > and main.ejs this file wasn't working.

app.get("/", (req, res) => {
res.send("Hello World");
});

Figured out that in my app.js file I need to change line 22 it had app.set("layouts", "./layout/main");

I changed it to layout instead and it pulled up my hello world

9/2/2025
I followed the youtube video in part 2 and my web page doesn't look like time 7:55. You'll need to check this again and see what you missed.

I found where the problem is and it's in the style.css something is linking right ask for help on this.
