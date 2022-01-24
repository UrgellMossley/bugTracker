//Set up SMPT transporter to be exported into controller

//import nodemailer into app
const nodemailer = require(`nodemailer`)
//create our Transporter module. Define parameters which give us access to dummy SMTP server
//
const Transporter = nodemailer.createTransport({
    //create a pool connection which cna be re-used. All data comes from 3rd party tools config
    pool: true,
    host: "smtp.mailtrap.io",
    port: 465,
    secure: false, // use TLS
    auth: {
        user: "1a64199b958e8d",
        pass: "73fbd2532d82af",
    },
});

module.exports = Transporter