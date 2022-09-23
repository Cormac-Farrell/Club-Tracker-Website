
"use strict";

const express = require("express");
const logger = require("./utilities/logger");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUpload());

app.engine(
  ".hbs",
  exphbs({
    extname: ".hbs",
    defaultLayout: "main",

    helpers: {
      uppercase: function(word) {
        let uppercaseWord = word.toUpperCase();
        return uppercaseWord;
      },
      formatDate: function(date) {
        let d = new Date(date);
        let dayNum = d.getDay();
        let dateNum = d.getDate();
        let month = d.getMonth();
        let year = d.getFullYear();

        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        
        let monthname = months[month];
        let dayname = days[dayNum];
        
        return dayname + " " + monthname + " " + dateNum + ", " + year;
      },
      capitalise: function(word) {
        let capitalisedWord = word[0].toUpperCase() + word.slice(1);
        return capitalisedWord;
      },
    }
  })
);
app.set("view engine", ".hbs");

const routes = require("./routes");
app.use("/", routes);

const listener = app.listen(process.env.PORT || 4000, function() {
  logger.info("Your app is on Port " + listener.address().port);
});
