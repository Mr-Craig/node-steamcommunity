var SteamCommunity = require('../index.js');
var SteamID = require('steamid');

SteamCommunity.prototype.deleteLeaderboardEntry = function(appID, leaderboardId, steamId, callback) {
	if(typeof steamId === 'string') {
		steamId = new SteamID(steamId);
	}

	var self = this;
	this.httpRequestPost({
		"uri": `https://partner.steamgames.com/apps/deleteleaderboardentry/${appID}`,
		"form": {
			"leaderboardid": leaderboardId,
			"sessionid": this.getSessionID(),
			"steamid": steamId.toString()
		},
        "json": true
	}, function(err, response, body) {
		if(!callback) {
			return;
		}

		if (err) {
			callback(err, null);
			return;
		}

		if(body.success) {
			callback(null, body);
		} else {
			callback(new Error("Unknown error"), null);
		}
	}, "steamcommunity");
}