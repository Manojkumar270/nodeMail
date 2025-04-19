const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.ethereal.email",
  secure: false,
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,//
  },
});

class Mail {
  constructor() {
    this.mailOptions = {
      from: {
        address: process.env.EMAIL,
        name: "manoj",
      },
    };
  }

  setCompanyName(name) {
    this.mailOptions.from.name = name;
  }

  setSenderEmail(email) {
    this.mailOptions.from.address = email;
  }

  setTo(receiver) {
    let receivers=this.mailOptions.to||[]
    receivers.push(receiver)
    this.mailOptions.to = receivers;
  }

  setCC(cc){
    let ccs=this.mailOptions.cc||[]
    ccs.push(cc)
    this.mailOptions.cc = ccs;
  }
  setBCC(bcc){
    let bccs=this.mailOptions.bcc||[]
    bccs.push(bcc)
    this.mailOptions.bcc = bccs;
  }

  setSubject(subject) {
    this.mailOptions.subject = subject;
  }

  setText(text) {
    this.mailOptions.text = text;
  }

  setHtml(html) {
    this.mailOptions.html = html;
  }

  send() {
    transporter.sendMail(this.mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("email sent successfully" + info.response);
      }
    });
  }
}

module.exports = Mail;
