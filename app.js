const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());

app.listen(80, () => {
  console.log('The server started on port 80 !!!!!!');
});

app.get('/', (req, res) => {
  res.send(
    "<h1 style='text-align: center'>Wellcome to Goolrant Rest API <br><br><===============></h1>"
  );
});

app.post('/sendmail', (req, res) => {
  console.log('request came');
  let user = req.body;
  sendMail(user, (info) => {
    console.log(`The mail has beed send 😃 and the id is ${info.messageId}`);
    res.send(info);
  });
});

async function sendMail(user, callback) {
  // create reusable transporter object using the default SMTP transport
  console.log(user);
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'basitadil21@gmail.com',
      pass: 'efpblitlytmmmsoy',
    },
  });

  let mailOptions = {
    from: user.email, // sender address
    to: 'info@goolrant.com', // list of receivers
    subject: user.subject, // Subject line
    html: `<div>
    <h3>Thanks for reaching out GoolRant.Someone will be with you shortly.</h3>
    <table class="table">
       <tbody>
          <tr>
             <th style="border: 1px solid #dddddd;
                text-align: left;
                padding: 8px;">Customer Name</th>
             <td style="border: 1px solid #dddddd;
                text-align: left;
                padding: 8px;">${user.firstName} ${user.lastName}</td>
          </tr>
          <tr>
             <th style="border: 1px solid #dddddd;
                text-align: left;
                padding: 8px;">Customer Email</th>
             <td style="border: 1px solid #dddddd;
                text-align: left;
                padding: 8px;">${user.email}</td>
          </tr>
          <tr>
             <th style="border: 1px solid #dddddd;
                text-align: left;
                padding: 8px;">Customer Phone</th>
             <td style="border: 1px solid #dddddd;
                text-align: left;
                padding: 8px;">${user.phone}</td>
          </tr>
          <tr>
             <th style="border: 1px solid #dddddd;
                text-align: left;
                padding: 8px;">Customer Message</th>
             <td style="border: 1px solid #dddddd;
                text-align: left;
                padding: 8px;">${user.descmessage}</td>
          </tr>
       </tbody>
    </table>
    <p style="margin:10px;padding:0;">Thanks</p>
    <p style="margin:10px;padding:0;">GoolRant Team</p>
 </div>`,
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);

  callback(info);
}
