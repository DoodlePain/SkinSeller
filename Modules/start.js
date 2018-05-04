const accessToken = require('../Server/accessToken')
const TeleBot = require('telebot');
const bot = new TeleBot(accessToken.aT);
var fs = require('fs');

module.exports = {
  start: function(msg) {
    //Something
    console.log(Date() + "Start module");
    let replyMarkup = bot.keyboard([
      ['📩 Something']
    ], {
      resize: true
    });
    var users = fs.readFile('./Server/LocalFiles/users.txt', function(err, data) {
      if (err) {
        return console.log(Date() + "File read " + err);
      } else {
        return data;
      }
    })
    users = users + "\n" + msg.from.id + " : " + msg.from.first_name + " " + msg.from.username
    fs.writeFile('./Server/LocalFiles/users.txt', users, function(err) {
      if (err) throw err;
    });
    return bot.sendMessage(msg.from.id, 'Welcome to the Skin Seller bot.\nSet your OPSKINS Api token if you didn\'t.', {
      replyMarkup
    });

  }
}