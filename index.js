var request = require("request");
var striptags = require('striptags');
const TeleBot = require('telebot');
const accessToken = require('./Server/accessToken')
const bot = new TeleBot(accessToken.aT);
var OPSkinsAPI = require('@opskins/api');
var opskins = new OPSkinsAPI(accessToken.op);
const Start = require('./Modules/start')
const Menu = require('./Modules/menu')


var fs = require('fs');

setInterval(function() {
  request({
    uri: "http://informatica.uniroma2.it/f0?fid=50&srv=4&pag=0"
  }, function(error, response, body) {

    // File module

    if (error) {
      console.log("Site offline");
    }
    var resp = fs.readFileSync('./Calls/News/oldNews.txt', 'utf8')
    var msg = {
      "message_id": 6306,
      "from": {
        "id": 168919643,
        "is_bot": false,
        "first_name": "TunaFish",
        "username": "DoodlePain",
        "language_code": "it-IT"
      },
      "chat": {
        "id": 168919643,
        "first_name": "TunaFish",
        "username": "DoodlePain",
        "type": "private"
      },
      "date": 1522846281,
      "text": "📩 News",
      "reply": {}
    }
    if (resp !== body) {
      console.log("Something new on the site");
      News.update(msg)
    } else {
      console.log("Nothing new");
    }
  })
}, 60 * 60 * 1000);

bot.start(() => {
  var code = getAnErrorCodeSomehow();
  console.log("Connecting to OPSKINS service");
  if (code == ErrorCode.ACCESS_DENIED) {
    // access denied
    console.log("Access denied");
  }
});

// Start command
bot.on('/start', msg => {
  return Start.start(msg);
});

// Something
bot.on(/\bSomething/, msg => {
  Menu.menu(msg);
});