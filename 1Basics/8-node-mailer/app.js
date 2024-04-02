const nodemailer = require("nodemailer")
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "eraneesakbar@gmail.com",
    pass: "ynfe ijqe qlgh ebqj"
  }
});

var mailOptions = {
  from: "eraneesakbar@gmail.com",
  // to: "aneesakbar33@gmail.com, aneesakbar333@gmail.com",
  to: "aneesakbar33333@gmail.com",
  subject: "This id demo mail",
  // text: "Hey hope you got this mail."
  html: "<h1>This is html</h1>"
}
transporter.sendMail(mailOptions, (err, info) => {
  if (err) {
    console.log("Error while sending mail ", err)
  } else {
    console.log(info);
    console.log("========================================");
    console.log("Mail sent ", info.response);
  }
})