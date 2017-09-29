const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice'); //inline css for email clients
const htmlToText = require('html-to-text'); //convert html to text format
const promisify = require('es6-promisify');

//mailtrap io
const transportMailTrap = nodemailer.createTransport({
  host : process.env.MAIL_TRAP_HOST,
  port : process.env.MAIL_TRAP_PORT,
  auth : {
    user : process.env.MAIL_TRAP_USER,
    pass : process.env.MAIL_TRAP_PASS
  }
});

//for use a gmail account go to https://www.google.com/settings/security/lesssecureapps and turn less secure app ON
const transportGmail = nodemailer.createTransport({
  service: 'gmail',
  auth : {
    user : process.env.GMAIL_USER,
    pass : process.env.GMAIL_PASS
  }
});

const generateHTML = (filename, options = {}) => {
  const html = pug.renderFile(`${__dirname}/../views/email/${filename}.pug`, options); //we donot know where renderfile is executed, propably inside node_modules that's is why we use __dirname = current directory this file is running
  const inlined = juice(html); //inline the html
  return inlined;
};

exports.send = async (options) => {
  const html = generateHTML(options.filename, options);
  const text = htmlToText.fromString(html); 
  const mailOptions = {
    from : `Maxi Pao <noreply@maxipao.com>`,
    to : options.user.email,
    subject : options.subject,
    html,
    text
  }

  const sendMail = promisify(transportMailTrap.sendMail, transportMailTrap);
  return sendMail(mailOptions);
};