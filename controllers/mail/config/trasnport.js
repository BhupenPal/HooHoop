
const nodemailer = require('nodemailer')
// create reusable transporter object using the default SMTP transport


let transporter = nodemailer.createTransport({

host: 'smtpout.secureserver.net',
port: 465,
secure: true, // true for 465, false for other ports
auth: {
    user: 'contactus@edudictive.in', // generated ethereal user
    pass: '$C6f@L9rGo'  // generated ethereal password
},
tls:{
  rejectUnauthorized:false
}
});

module.exports = transporter;