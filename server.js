const express = require("express");
const app = express();

let count = 0;

app.use(express.static("public"));

app.get("/count", (req,res)=>{
  count++;
  res.json({count});
});

app.listen(8080, ()=>{
  console.log("Server running on port 8080");
});
