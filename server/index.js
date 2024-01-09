const express = require("express");
const cors = require("cors");
const { router } = require("./routes/routes");

require("dotenv").config();
const port = process.env.PORT || 8000;
const app = express();
app.use(express.json());
app.use(cors());
app.use("/", router);

app.listen(port, () => {
  console.log(`server http://localhost:${port}`);
});
