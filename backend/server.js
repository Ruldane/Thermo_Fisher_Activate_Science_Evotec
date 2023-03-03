const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");


dotenv.config();

const { readdirSync } = require("fs");

const app = express();
app.use(express.json());
app.use(cors());

// create dynamic routes with readdirSync
readdirSync("./routes").map((r) => app.use("/", require(`./routes/${r}`)));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
