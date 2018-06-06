const SlackBot = require("slackbots");
const axios = require("axios");

const bot = new SlackBot({
  token: "xoxb-376558584390-374971627008-s5f9V4pCLiFA8BoBZRMJ6uAi",
  name: "slack-bot"
});

// Start bot

bot.on("start", () => {
  const params = {
    icon_emoji: ":smiley:"
  };

  bot.postMessageToChannel("general", "This is going to be funny...", params);
});

// error handle
bot.on("error", err => console.log(err));

// msg handle

bot.on("message", data => {
  if (data.type !== "message") {
    return;
  }

  // console.log(data);
  handleMessage(data.text);
});

// response to data
function handleMessage(message) {
  if (message.includes(" chucknorris")) {
    chuckJoke();
  }
}

// tell chuck joke
function chuckJoke() {
  axios.get('http://api.icndb.com/jokes/random').then(res => {
    const joke = res.data.value.joke;

    const params = {
        icon_emoji: ":laughing:"
      };
    
      bot.postMessageToChannel('general', `Chuck Norris: ${joke}`, params);

  });
}
