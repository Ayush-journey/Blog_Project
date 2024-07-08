const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash');

const app = express();
app.set("view engine", "ejs");
const port = 3000;


const initialContent = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const posts = [];

app.get("/", (req, res) => {
    res.render("home.ejs", {
        content: initialContent,
        posts: posts
    });
})

app.get("/about", (req, res) => {
    res.render("about.ejs", {
        content: initialContent,
    });
})

app.get("/contact", (req, res) => {
    res.render("contact.ejs", {
        content: initialContent,
    });
})

app.get("/compose", (req, res) => {
    res.render("compose.ejs");
})

app.post("/compose", (req,res) => {
    const post = {
        title: req.body["title"],
        content: req.body["content"],
    }
    posts.push(post);
    res.redirect("/");
})

app.get("/posts/:postName", function(req, res){
    const requestedTitle = _.lowerCase(req.params.postName);
  
    posts.forEach((post) => {
      const storedTitle = _.lowerCase(post.title);
  
      if (storedTitle === requestedTitle) {
        res.render("post.ejs", {
          title: post.title,
          content: post.content
        });
      }
    });
  
  });

app.listen(port, ()=>{
    console.log(`server is running on ${port} port.`)
})