
const nodemailer = require('nodemailer')
// create reusable transporter object using the default SMTP transport

let transporter = nodemailer.createTransport({

host: 'cp-wc12.lon01.ds.network',
port: 465,
secure: true, // true for 465, false for other ports
auth: {
    user: 'contact@hoohoop.co.nz', // generated ethereal user
    pass: process.env.EMAILPASS  // generated ethereal password
},
tls:{
  rejectUnauthorized:false
}
});

module.exports = transporter;