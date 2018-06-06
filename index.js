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
  } else if (message.includes(" yomama")) {
    yoMamaJoke();
  } else if (message.includes(" thatreally")) {
    thatReally();
  } else if (message.includes(" random")) {
    randomJoke();
  } else if (message.includes(" help")) {
    runHelp();
  }
}

// tell chuck joke
function chuckJoke() {
  axios.get("http://api.icndb.com/jokes/random").then(res => {
    const joke = res.data.value.joke;

    const params = {
      icon_emoji: ":laughing:"
    };

    bot.postMessageToChannel("general", `Chuck Norris: ${joke}`, params);
  });
}

// yomama joke
function yoMamaJoke() {
  axios.get("http://api.yomomma.info").then(res => {
    const joke = res.data.joke;

    const params = {
      icon_emoji: ":laughing:"
    };

    bot.postMessageToChannel("general", `Yo mamma: ${joke}`, params);
  });
}

// tell a random joke
function randomJoke() {
  const rand = Math.floor(Math.random() * 2) + 1;
  if (rand === 1) {
    chuckJoke();
  } else if (rand === 2) {
    yoMamaJoke();
  }
}

// that really
function thatReally() {
    axios.get("http://api.chew.pro/trbmb").then(res => {
      const joke = res.data;
  
      const params = {
        icon_emoji: ":laughing:"
      };
  
      bot.postMessageToChannel("general", `That Really: ${joke}`, params);
    });
  }

// help
function runHelp() {
  const params = {
    icon_emoji: ":question:"
  };

  bot.postMessageToChannel(
    "general",
    `Help: Type @jokebot with 'chucknorris', 'yomama' or 'random' to get a reply with joke`,
    params
  );
}
