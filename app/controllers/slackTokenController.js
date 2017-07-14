
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
      const tokenPromise = Token.findOne({ access_token: data.access_token }).exec();
      tokenPromise.then((token) => {
        if (token) {
          console.log('Team already installed app.');
          token.access_token = data.access_token;
          token.scope = data.scope;
          token.user_id = data.user_id;
          token.team_name = data.team_name;
          token.team_id = data.team_id;
          token.bot = data.bot;
          token.save();
          req.flash('info', 'You have already installed Temere in that slack team!');
          res.redirect(process.env.REDIRECT_URI);
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
          res.redirect(process.env.REDIRECT_URI);
        }
      });
    });
  };
}

module.exports = SlackTokenHandler;
