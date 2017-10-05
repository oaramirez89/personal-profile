const router = require('express').Router()
module.exports = router
const nodemailer = require('nodemailer');

if (process.env.NODE_ENV !== 'production') require('../secrets');

router.get('/', (req, res, next) => {

})

router.post('/', (req, res, next) => {
  nodemailer.createTestAccount((err, account) => {
    if (err) {
      console.error('Failed to create a testing account');
      console.error(err);
      return process.exit(1);
    }

    // Create a SMTP transporter object
    let transporter = nodemailer.createTransport(
      {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: true,
        auth: {
          user: process.env.USER_NAME,
          pass: process.env.USER_PWD
        },
        logger: false,
        debug: false // include SMTP traffic in the logs
      },
      {
        // default message fields

        // sender info
        from: 'Ramirez Veratudela <no-reply@ramirezveratudela.com>',
        headers: {
          'X-Laziness-level': 1000 // just an example header, no need to use this
        }
      }
    );

    console.log('Credentials obtained, sending message...');

    // Message object
    let message = {
      // Comma separated list of recipients
      from: req.body.Name + '<' + req.body.Email + '>',
      to: 'Oscar Ramirez <oscar@ramirezveratudela.com>',

      // Subject of the message
      subject: req.body.Subject,

      // plaintext body
      text: req.body.Message,

    };

    transporter.sendMail(message, (error, info) => {
      if (error) {
        console.log('Error occurred');
        console.log(error.message);
        return process.exit(1);
      }

      console.log('Message sent successfully!');
      console.log(nodemailer.getTestMessageUrl(info));

      // only needed when using pooled connections
      transporter.close();

      res.status(204).end();
    });
  })

})
