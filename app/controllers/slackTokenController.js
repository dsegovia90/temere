
var Token = require('../models/tokens.js')
var slack = require('slack')

function SlackTokenHandler(){

	this.storeToken = function(req, res){
		console.log('trying to install')
		var client_id = process.env.SLACK_CLIENT_ID
		var client_secret = process.env.SLACK_CLIENT_SECRET
		var code = req.query.code
		slack.oauth.access({client_id, client_secret, code}, function(err, data){
			if(err){
				console.error(err)
			}
			console.log(data)
			var tokenPromise = Token.findOne({access_token: data.access_token}).exec()
			tokenPromise.then(function(token){
				if(token){
					console.log('Team already installed app.')
					req.flash('info', 'You have already installed Temere in that slack team!')
					res.redirect('https://temerebot.herokuapp.com/')
				}else{
					var newToken = new Token()
					newToken.access_token = data.access_token
					newToken.scope = data.scope
					newToken.user_id = data.user_id
					newToken.team_name = data.team_name
					newToken.team_id = data.team_id
					newToken.bot = data.bot
					newToken.save()
					req.flash('success', 'Successfully installed Temere! Thank you!')
					res.redirect('https://temerebot.herokuapp.com/')
				}
			})
		})
	}
}

module.exports = SlackTokenHandler