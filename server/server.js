const express = require("express");
const session = require("express-session");
const db = require("./database");
const app = express();

app.use("/static", express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "luna moon mond",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.set("view engine", "ejs");

// Home page
app.get("/", (req, res) => {});

app.listen(8080);
