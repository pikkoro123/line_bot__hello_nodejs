var nodemailer = require('nodemailer')

var botEmail = 'bunnag.bot@gmail.com';
var botPassword = 'Bottob123!';

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: botEmail,
      pass: botPassword
    }
});
exports.sendEmail = function(botname, adminEmail, sender, text) {
    console.log('Start sending mail...\n' + botEmail + '\n' + botPassword);
    var mailOptions = {
        from: botEmail,
        to: adminEmail,
        subject: 'ข้อความที่บอท ' + botname + ' ไม่สามารถตอบได้',
        text: 'UserId ' + sender + ': ' + text + '\n\n\n\n\n\n' + 'กรุณาตอบกลับโดยด่วน!!!!!!!!' 
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });
    console.log('End sending mail...');
}