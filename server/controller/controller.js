const randomString = require("randomstring");
const pool = require("../db");
const { isExpired } = require("../config/expire");

exports.create = async (req, res) => {
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
};
exports.sendtoUrl = async (req, res) => {
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
};
exports.getAllurls = async (req, res) => {
  try {
    const { user } = req.params;
    const urls = await pool.query(`SELECT * FROM urls where user_email = $1`, [
      user,
    ]);
    res.send(urls.rows);
  } catch (error) {
    console.log(error);
  }
};
