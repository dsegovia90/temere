
module.exports = function(app){

	app.get('/temere', function(req, res){
		var slackResponse = {}
		slackResponse.response_type = 'in_channel'
		slackResponse.text = 'Hello rhinos!'
		res.type('application/json').json(slackResponse).end()
	})

}