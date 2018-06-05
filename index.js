const SlackBot = require('slackbots');
const axious = require('axios');

const bot = new SlackBot({
    token: 'xoxb-376558584390-374971627008-s5f9V4pCLiFA8BoBZRMJ6uAi',
    name: 'slack-bot'
});

// Start bot

bot.openIm('start', () => {
    const params = {
        icon_emojo: ':smiley:' 
    }

    bot.postMessageToChannel('general', 'Get Ready To HAHA', params);
});



bot.on('error', (err) => console.log(err));


// msg handle

bot.on('message', (data) => {
    if(data.type !== 'message') {
        return;
    }

    console.log(data);
});