const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT|| 7878;
const Mail = require("./mail");
app.use(express.json());
const fs = require("fs");
const path = require("path");
const {emailqueue}=require("./emailqueue")
const {emailWorker}=require("./emailWorker")

app.post("/mail", async (req, res) => {
  //   console.log(req.body);
  const { receiverid, subject, text, name } = req.body;
  let fileLocation = fs.readFileSync(path.join(__dirname, "mail.html"),"utf8");
  fileLocation = fileLocation.replace("[name]", name);
  const mail = new Mail();
  mail.setTo(receiverid);
  mail.setSubject(subject);
  mail.setText(text);
  mail.setHtml(fileLocation);
  mail.setCC("mk4539587@gmail.com")
  mail.setBCC("manojkumarp2705@gmail.com")
  // mail.send();
  await emailqueue.add("send email",mail)
  console.log(mail);
  
  res.send("Email sent!");
});


app.listen(PORT, () =>
  console.log("connexted to port http://localhost:" + PORT)
);
