// const bodyParser = require("body-parser");
const express = require("express");


const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];
const PATH = '/posts';
let id = 1;
const server = express();


// to enable parsing of json bodies for post requests
server.use(express.json());

// TODO: your code to handle requests

server.post(PATH, (req, res)=>{
    const {author, title, contents} = req.body;
    if(!author || !title || !contents){
        return res
        .status(STATUS_USER_ERROR)
        .json({error: "No se recibieron los parámetros necesarios para crear el Post"})
    }
    const post ={
        author, title, contents, id:id++
    };
    posts.push(post);
    res.status(200).json(post);
});


server.post(`${PATH}/author/:author`, (req, res) => {
    const {title, contents} = req.body;
    const {author} = req.params;
    if(!author || !title || !contents){
        return res
        .status(STATUS_USER_ERROR)
        .json({error: "No se recibieron los parámetros necesarios para crear el Post"})
    }
    const post ={
        author, title, contents, id:id++
    };
    posts.push(post);
    res.status(200).json(post);
});


server.get(PATH, (req, res)=>{
    const {term} = req.query;
    if(term){
        const term_posts = posts.filter(p => p.title.includes(term) || p.contents.includes(term)
        );
        return res.json(term_posts);
    }
    res.json(posts); 
});


server.get(`${PATH}/:author`, (req, res)=>{
    const {author} = req.params;
    const autor = posts.filter(p=>p.author === author)
    if( autor.length === 0){
        return res.status(STATUS_USER_ERROR).json({error: "No existe ningun post del autor indicado"})
    }
    res.json(autor);
 });


server.get(`${PATH}/:author/:title`, (req, res)=>{
    const {author, title} = req.params;
    const fil = posts.filter((p) => p.author === author && p.title === title);
  if (fil.length === 0) {
    return res.status(STATUS_USER_ERROR).json({
      error: "No existe ningun post con dicho titulo y autor indicado",
    });
  }
  res.json(fil);
});

server.put(PATH, (req, res)=>{
    const {id, title, contents} = req.body;
    if(!id || !title || !contents){
        return res
        .status(STATUS_USER_ERROR)
        .json({error: "No se recibieron los parámetros necesarios para modificar el Post"})
    }
    const posteos = posts.find( p => p.id === id)
    if(posteos){
        posteos.title=title
        posteos.contents=contents
        res.json(posteos)
    } else {
        return res.status(STATUS_USER_ERROR).json({error:"No corresponde con un post válido"})
    }
});


server.delete(PATH, (req, res) => {
    let { id } = req.body;
    const findeo = posts.find((p) => p.id === parseInt(id));
    if (!id || !findeo) {
      return res
        .status(STATUS_USER_ERROR)
        .json({ error: "Mensaje de error" });
    }
    posts = posts.filter((f) => f.id !== parseInt(id));
    res.json({ success: true });
  });


  server.delete('/author', (req, res) => {
    let { author } = req.body;
    const findeo = posts.find((p) => p.author === author);
    if (!findeo || !author) {
      return res
        .status(STATUS_USER_ERROR)
        .json({ error: "No existe el autor indicado" });
    }
    let authordelete = [];
    posts = posts.filter((p) => {
      if (p.author !== author) {
        return true;
      } else {
        authordelete.push(p);
      }
    });
    return res.json(authordelete);
  });


module.exports = { posts, server };
