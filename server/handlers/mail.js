const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice'); //inline css for email clients
const htmlToText = require('html-to-text'); //convert html to text format
const promisify = require('es6-promisify');
const sgMail = require('@sendgrid/mail'); //to send emails using SendGrid
const { getMessage } = require('./errorHandlers');

const errorTrace = 'handlers/mail >';

//mailtrap io
const transportMailTrap = nodemailer.createTransport({
  host : process.env.MAIL_TRAP_HOST,
  port : process.env.MAIL_TRAP_PORT,
  auth : {
    user : process.env.MAIL_TRAP_USER,
    pass : process.env.MAIL_TRAP_PASS
  }
});

const generateHTML = (filename, options = {}) => {
  const html = pug.renderFile(`${__dirname}/../views/email/${filename}.pug`, options); //we donot know where renderfile is executed, propably inside node_modules that's is why we use __dirname = current directory this file is running
  const inlined = juice(html); //inline the html
  return inlined;
};

//sends emails with nodemailer+mailtrap (or gmail if we change the transport used)
const sendMtMail = async (options) => {
  const html = generateHTML(options.filename, options);
  const text = htmlToText.fromString(html); 
  const mailOptions = {
    from: options.fromEmail ? options.fromEmail : 'support@atomiCoconut.com',
    to : options.toEmail,
    subject : options.subject,
    html,
    text,
    attachments: [{
      filename: 'coconut.png',
      path: __dirname +'/images/coconut.png',
      cid: 'logo' //my mistake was putting "cid:logo@cid" here! 
    }]
  }

  const sendMail = promisify(transportMailTrap.sendMail, transportMailTrap);
  return sendMail(mailOptions);
};

//Sends emails using SendGrid platform
const sendSgMail = async (options) => {
  const html = generateHTML(options.filename, options);
  const text = htmlToText.fromString(html); 
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const mailOptions = {
    to: options.toEmail,
    from: options.fromEmail ? options.fromEmail : 'support@atomiCoconut.com',
    subject: options.subject,
    text,
    html
  };
  
  return sgMail.send(mailOptions);
};

exports.send = async(options) => {
  const methodTrace = `${errorTrace} send() >`;
  
  if (process.env.NODE_ENV === 'production') {
    console.log(`${methodTrace} ${getMessage('message', 1041, null, true, 'SendGrid')}`);
    return sendSgMail(options);
  } else {
    console.log(`${methodTrace} ${getMessage('message', 1041, null, true, 'Mailtrap')}`);
    return sendMtMail(options);
  }
}