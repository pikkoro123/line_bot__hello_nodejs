
// Webhook URL
// https://line-pikkoro.herokuapp.com/webhook

// Channel access token
// hvvNLdeebyEq4CQDtuKScLo8FxKOnMfJyE+91x2ROY0hT/mZBnVza+vnya1tOSmHrHhB1TOk2MJ14AyOlYpykcGozEOmubDFYj4/F83hOPVyASXwtlTXZHswYVSr7R9PiAT78o+NqBJzutynZLpL7gdB04t89/1O/w1cDnyilFU=

var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')
var app = express()
// var cors = require('cors')

const adminUserIds = ['U0f5c4c43a6894b7cdb496ba7e200788e'];

// app.use(cors())
app.use(bodyParser.json())

app.set('port', (process.env.PORT || 4000))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.get('/', function (req, res) {
	res.send('Hello')
})

app.post('/webhook', (req, res) => {
    var text = req.body.events[0].message.text
    var sender = req.body.events[0].source.userId
    var replyToken = req.body.events[0].replyToken
    console.log(text, sender, replyToken)
    console.log(typeof sender, typeof text)
    // console.log(req.body.events[0])
    if (text === 'สวัสดี' || text === 'Hello' || text === 'hello') {
        sendText(sender, 'สวัสดีค่ะ เราเป็นผู้ช่วยปรึกษาด้านความรัก สำหรับหมามิ้น 💞')
    } else {
      // TODO: Notification to Admin
      // jibbiw123456@hotmail.com Pikkoro U0f5c4c43a6894b7cdb496ba7e200788e
      var userId;
      for(userId in adminUserIds) {
        sendText(userId, 'มีข้อความที่ไม่สามารถตอบได้\n\"' + text + "\"")
      }
    }
    res.sendStatus(200)
})

function sendText (sender, text) {
    let data = {
      to: sender,
      messages: [
        {
          type: 'text',
          text: text
        }
      ]
    };
    console.log('requesting.......................');
    request({
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {hvvNLdeebyEq4CQDtuKScLo8FxKOnMfJyE+91x2ROY0hT/mZBnVza+vnya1tOSmHrHhB1TOk2MJ14AyOlYpykcGozEOmubDFYj4/F83hOPVyASXwtlTXZHswYVSr7R9PiAT78o+NqBJzutynZLpL7gdB04t89/1O/w1cDnyilFU=}'
      },
      url: 'https://api.line.me/v2/bot/message/push',
      method: 'POST',
      body: data,
      json: true
    }, function (err, res, body) {
      if (err) console.log('error')
      if (res) console.log('success')
      if (body) console.log(body)
    });
    console.log('done............................');
}

app.listen(app.get('port'), function () {
  console.log('run at port', app.get('port'))
})