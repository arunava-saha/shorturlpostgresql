const bcrypt = require("bcrypt");
const pool = require("../db");
const jwt = require("jsonwebtoken");
exports.Register = async (req, res) => {
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
};
exports.Login = async (req, res) => {
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
};
