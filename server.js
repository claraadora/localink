const express = require("express");
const connectDB = require("./config/db");

const app = express();

app.get("/", (req, res) => res.send("API running"));

//Defining routes
app.use("/api/shopper", require("./routes/api/shopper"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
