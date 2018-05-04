# SkinSeller
> SkinSeller is an usefull bot made for everyone who wanna have an easy way to check what's happening on your account on OPSKINS.com
## Installation

OS X , Linux or Windows:

```sh
git clone https://github.com/DoodlePain/SkinSeller.git
cd SkinSeller
npm install
```

Now go to telegram and create a new bot (https://core.telegram.org/bots#3-how-do-i-create-a-bot)
BotFather will give you an HTTP API accessToken
Copy it and create a new file with

```sh
nano Server/accessToken.js
```

This will open nano text editor.
Meanwhile go to https://opskins.com/?loc=store_account and click to Advanced Options, scroll down ad get an API KEY
Paste this portion of code replacing caps text with the token BotFather gave you and the opskins api key

```sh
exports.aT = 'YOUR_TELEGRAM_TOKEN'
exports.op = 'YOUR_OPSKINS_API_KEY'
```

Ok, we are ready to go!
Type this to start your bot.

```sh
node index.js
```
