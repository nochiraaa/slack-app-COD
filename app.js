const { App } = require('@slack/bolt');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

// Listens to incoming messages that contain "hello"
app.message('COD', ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  say({
    blocks: [
      {
        'type': 'section',
        'text': {
          'type': 'mrkdwn',
          'text': 'Thank you! This app is starting.\nChoose Cat Or Dog!'
        }
      }
    ]
  });

  say({
    blocks: [
      {
        'type': 'actions',
        "elements": [
          {
            "type": "button",
            "text": {
              "type": "plain_text",
              "text": ":cat:",
              "emoji": true
            },
            "action_id": "cat"
          },
          {
            "type": "button",
            "text": {
              "type": "plain_text",
              "text": ":dog:",
              "emoji": true
            },
            "action_id": "dog"
          },
        ]
      }
    ]
  });
});

app.action('cat', ({ body, ack, say }) => {
  // Acknowledge the action
  ack();
  say('https://http.cat/200');
});

app.action('dog', ({ body, ack, say }) => {
  // Acknowledge the action
  ack();
  say('https://httpstatusdogs.com/200-ok');
});


(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();