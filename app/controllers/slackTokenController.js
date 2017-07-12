
const Token = require('../models/tokens.js');
const slack = require('slack');

function SlackTokenHandler() {
  this.storeToken = function storeToken(req, res) {
    // eslint-disable-next-line camelcase
    const client_id = process.env.SLACK_CLIENT_ID;
    // eslint-disable-next-line camelcase
    const client_secret = process.env.SLACK_CLIENT_SECRET;
    const code = req.query.code;
    slack.oauth.access({ client_id, client_secret, code }, (err, data) => {
      if (err) {
        console.error(err);
      }
      console.log(data);
      const tokenPromise = Token.findOne({ access_token: data.access_token }).exec();
      tokenPromise.then((token) => {
        if (token) {
          console.log('Team already installed app.');
          req.flash('info', 'You have already installed Temere in that slack team!');
          res.redirect('https://temerebot.herokuapp.com/');
        } else {
          const newToken = new Token();
          newToken.access_token = data.access_token;
          newToken.scope = data.scope;
          newToken.user_id = data.user_id;
          newToken.team_name = data.team_name;
          newToken.team_id = data.team_id;
          newToken.bot = data.bot;
          newToken.save();
          req.flash('success', 'Successfully installed Temere! Thank you!');
          res.redirect('https://temerebot.herokuapp.com/');
        }
      });
    });
  };
}

module.exports = SlackTokenHandler
  ;
