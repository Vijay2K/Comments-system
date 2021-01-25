const express = require("express");
const path = require("path");
const {v4 : uuidv4} = require("uuid");
const methodOverride = require("method-override");

const port = 3000;

const app = express();

app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


let comments = [
    {
        id : uuidv4(),
        username : "vijay",
        comment : "This is so cool"
    },
    {
        id : uuidv4(),
        username : "elliot",
        comment : "I live for this shit" 
    },
    {
        id : uuidv4(),
        username : "jhon",
        comment : "This look like a shit"
    }
]


app.get("/comments", (req, res) => {
    res.render("comments", {comments});
})

app.get("/comments/new", (req, res) => {
    res.render("new");
})

app.get("/comments/:id", (req, res) => {
    const {id} = req.params;
    const comment = comments.find(c => c.id === id);
    res.render("show", {comment});
})

app.get("/comments/:id/edit", (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render("edit", {comment});
})

app.post("/comments", (req, res) => {
    const {username, comment} = req.body;
    comments.push({username, comment, id : uuidv4()});
    res.redirect("comments");
})

app.patch("/comments/:id", (req, res) => {
    const { id } = req.params;
    const newComment = req.body.comment;
    const oldComment = comments.find(c => c.id === id);
    oldComment.comment = newComment;
    res.redirect("/comments");
})

app.delete("/comments/:id", (req, res) => {
    const { id } = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect("/comments"); 
})

app.listen(port, () => {
    console.log(`listening to localhost:${port}`);
})