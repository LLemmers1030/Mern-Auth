const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


const db = require("./config/keys").mongoURI;

mongoose.connect(db, {useNewUrlParser:true, useUnifiedTopology: true})
    .then(() => console.log("MongoDb connected"))
    .catch(err => console.log(err));

app.use(passport.initialize());

require("./config/passport")(passport);

app.use("/api/users", users);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on ${port} !`));