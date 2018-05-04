const accessToken = require('../Server/accessToken')
const TeleBot = require('telebot');
const bot = new TeleBot(accessToken.aT);
const LV = require('../Server/localVariables')
var fs = require('fs');



var OPSkinsAPI = require('@opskins/api');
var opskins = new OPSkinsAPI(accessToken.op);
module.exports = {
  menu: function(msg) {
    console.log(Date() + "Menu module");

    let userSteamID
    opskins.getSteamID(function(err, steamID) {
      if (err) {
        console.log("Error:");
        console.log(err.message);
      } else {
        console.log("My SteamID is: " + steamID);
        userSteamID = steamID

        opskins.getBalance(function(err, balance) {
          if (err) {
            console.log("Error:");
            console.log(err.message);
          } else {
            console.log("My Balance is: " + balance / 100 + " USD");
            balance
            let replyMarkup = bot.keyboard([
              ['📩 Something'],
              ['💰 Wallet']
            ], {
              resize: true
            });

            opskins.getPurchaseHistory({
              type: 4,
              per_page: LV.listLimit
            }, (err, resp) => {
              console.log(resp.purchases);
              resp.purchases.forEach(elem => {
                response = "Item name : " + elem.item_name + "\nPrice : " + (elem.amount_paid / 100) + " USD " + "\nSale id : " + elem.sale_id + "\nDate : " + Date(elem.timestamp)
                bot.sendMessage(msg.from.id, response, {
                  replyMarkup
                });
              });
            })


            return bot.sendMessage(msg.from.id, 'SteamID : ' + userSteamID + "\nUser balance : " + balance / 100 + " USD ", {
              replyMarkup
            });

          }
        })

      }
    });
  }
}