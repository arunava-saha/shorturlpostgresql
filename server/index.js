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

// app.post("/api/create-short-url", async (req,res)=>{
// 	let uniqueID = randomString(8);
// 	let sql = `INSERT INTO links(longurl,shorturlid) VALUES('${}','${}')`;
//   await pool.query(
//     `INSERT INTO links(id,shorturlid) VALUES('${}','${}')`
//   );

// });
function isExpired(createdAt) {
  const expirationTime = 2 * 24 * 60 * 60 * 1000; // 2 days in milliseconds
  const currentTime = new Date().getTime();
  return currentTime - new Date(createdAt).getTime() > expirationTime;
}
app.get("/:id", async (req, res) => {
  try {
    const ID = req.params.id;

    const link = await pool.query(`SELECT * FROM urls where code = $1`, [ID]);
    if (!isExpired(link.rows[0].date)) {
      await pool.query(
        `UPDATE urls SET clicks=${link.rows[0].clicks + 1} WHERE  code = $1`,
        [ID]
      );

      return res.redirect(link.rows[0].original_url);
    } else {
      return res.json({ message: "Link expired" });
    }
  } catch (error) {
    console.log(error);
  }
});
app.get("/v1/urls/:user", async (req, res) => {
  try {
    const { user } = req.params;
    const urls = await pool.query(`SELECT * FROM urls where user_email = $1`, [
      user,
    ]);
    // console.log(urls.rowCount);
    res.send(urls.rows);
  } catch (error) {
    console.log(error);
  }
});
app.listen(port, () => {
  console.log(`server http://localhost:${port}`);
});
