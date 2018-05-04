const accessToken = require('../../Server/accessToken')
const TeleBot = require('telebot');
const bot = new TeleBot(accessToken.aT);
const LV = require('../../Server/localVariables')
var fs = require('fs');


var OPSkinsAPI = require('@opskins/api');
var opskins = new OPSkinsAPI(accessToken.op);

let type = ["", "Sale", "Purchase", "Add Funds", "Redeemed Code", "Subscription Purchase", "Reversal"]
let states = ["", "Completed", "Refunded", "Refunded by Support"]


module.exports = {
  list: function(msg) {
    console.log(Date() + "Wallet module");
    let replyMarkup = bot.keyboard([
      ['📩 Something'],
      ['💰 Wallet']
    ], {
      resize: true
    });
    opskins.getWalletTransactionHistory({
      per_page: LV.listLimit
    }, (err, resp) => {
      console.log(resp);
      resp.transactions.forEach(elem => {

        let response = type[elem.type] + "\nAmmount : " + (elem.amount / 100) + " USD\nBalance after transaction : " + (elem.new_balance / 100) + " USD\nState : " + states[elem.state]
        bot.sendMessage(msg.from.id, response, {
          replyMarkup
        });
      });
    })
  }
}