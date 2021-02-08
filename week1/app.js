const { App } = require('@slack/bolt');

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

const newchannel = "C01MAE1JMDZ";
app.message("hello", async ({message,say}) => {
    await say(`Hola <@${message.user}>`);
} );

app.event('member_joined_channel', async ({ event, client }) => {
    try {
        const result = await client.chat.postMessage({
            channel: newchannel,
            text:`Fifi is cool, introduce yourself <@${event.user}>`,
        });
        console.log(result);
    }
    catch (error) {
      console.error(error);
    }
  });

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();
