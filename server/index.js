const express = require("express");
const randomString = require("randomstring");
const cors = require("cors");
const pool = require("./db");
// const Link = require('./model/link')
require("dotenv").config();
const port = process.env.PORT || 8000;
const app = express();
app.use(express.json());
app.use(cors());

// const map = new Map()

// app.post("/shorten", async (req, res) => {
//   const originalUrl = req.body.url;
//   const code = randomString.generate(8);
//   // map.set(code, originalUrl)

//   const link = await Link.create({
//     originalURL: originalUrl,
//     shortenedURL: `http://localhost:8000/${code}`,
//     visited: 0,
//     code: code,
//   });

//   return res.status(200).json({ shortenLink: link.shortenedURL });
// });

// app.get("/:id", async (req, res) => {
//   const ID = req.params.id;
//   console.log(ID);
//   // return res.status(200).json({
//   //     originalUrl: map.get(ID)
//   // })

//   // return res.redirect(map.get(ID))

//   const link = await Link.findOne({ code: ID });
//   link.visited++;
//   link.save();

//   return res.redirect(link.originalURL);
// });
app.get("/url", async (req, res) => {
  try {
    const userEmail = "test@test.com";
    const urls = await pool.query(`SELECT * FROM urls where user_email = $1`, [
      userEmail,
    ]);
    console.log(urls.rows);
    res.send(urls.rows);
  } catch (error) {
    console.log(error);
  }
});
app.listen(port, () => {
  console.log(`server http://localhost:${port}`);
});
// mongoDB.then(() => {

// });
