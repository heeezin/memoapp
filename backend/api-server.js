const express = require('express')
const app = express()
const port = 3000
const bodyParser = require("body-parser");
const database = require("./database");

// const url = 'https://memo.herokuapp.com/'

// export const fetchPosts = () => axios.get(url)
// export const createPost = (newPost) => axios.post(url, newPost)
// export const updatePost = (id, updatedPost) => {
//   return axios.patch(`${url}/${id}`, updatedPost)
// }
// export const deletePost = (id) => axios.delete(`${url}/${id}`)
// export const likePost = (id) => axios.patch(`${url}/${id}/likePost`)


app.use(bodyParser.json());

app.get('/api/memos', async (req, res) => {
    const result = await database.run("SELECT * FROM memos");
    res.send(result)
});

app.post("/api/memos", async (req, res) => {
    await database.run(`INSERT INTO memos (content) VALUES (?)`, [req.body.content]);
    const result = await database.run("SELECT * FROM memos");
    res.send(result);
});

app.put("/api/memos/:id", async(req, res) => {
    await database.run(`UPDATE memos SET content = ? WHERE id = ?`, [req.body.content, req.params.id]);
    const result = await database.run("SELECT * FROM memos");
    res.send(result);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});