const express = require("express");
const randomString = require("randomstring");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const pool = require("./db");
// const Link = require('./model/link')
require("dotenv").config();
const port = process.env.PORT || 8000;
const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/create-short-url", async (req, res) => {
  try {
    let uniqueID = randomString.generate(8);
    const { user_email, original_url } = req.body;
    await pool.query(
      `INSERT INTO urls(id, user_email, original_url, code, clicks, date ) VALUES('${uniqueID}','${user_email}', '${original_url}', '${uniqueID}', '${0}', '${Date()}')`
    );
    return res.json({ message: "Done", code: uniqueID });
  } catch (error) {
    console.log(error);
  }
});
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
// auth
app.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    const salt = bcrypt.genSaltSync(8);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const signup = await pool.query(
      `INSERT INTO users(email, hashed_password ) VALUES('${email}',  '${hashedPassword}')`
    );
    const token = jwt.sign({ email }, "secret", { expiresIn: "2hr" });
    return res.json({ email, token });
  } catch (error) {
    if (error) {
      res.json({ details: error.detail });
    }
  }
});
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (!users.rows.length)
      return res.json({ details: "User does not exist!" });
    const login = await bcrypt.compare(password, users.rows[0].hashed_password);
    if (login) {
      const token = jwt.sign({ email }, "secret", { expiresIn: "2hr" });
      res.json({ email: users.rows[0].email, token });
    } else {
      res.json({ details: "login failed" });
    }
  } catch (error) {
    console.log(error);
  }
});
app.listen(port, () => {
  console.log(`server http://localhost:${port}`);
});
