const { profile } = require("console");
const express = require("express");

const app = express();
const fs = require('fs');



app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
///parsers form
app.set("view engine","ejs");
//view engine(html ejs)

app.use(express.static("public"));
///other codes (css,js...)

app.get("/", (req, res) => {
  // Reading the contents of the current directory
fs.readdir("./files", (err, files) => {
res.render("index",{files:files})
}); 
});

app.post("/create", (req, res) => {
  
  console.log(req.body)

fs.writeFile(`./files/${req.body.title.split(" ").join("")}.txt`,req.body.detail,(err) => {
 
res.redirect("/")
});

});

app.get("/files/:filename", (req, res) => {
  fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, filedata) => {
    if (err) {
      console.log(err);
      return res.send("File not found");
    }

    res.render("profile", {
      filename: req.params.filename,
      filedata
    });
  });
});

app.get("/edit/:filename", (req, res) => {
  fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, filedata) => {
    if (err) {
      console.log(err);
      return res.send("File not found");
    }

    res.render("edit",{filename:req.params.filename});
  });
});

app.post("/edit", (req, res) => {
   fs.rename(`./files/${req.body.prev}`,`./files/${req.body.new}`,(err)=>{
    if (err)console.log(err);
else console.log("File renamed");
res.redirect(`/`)
   })
});



app.listen(3000, () => {
  console.log("Server running on port 3000");
});