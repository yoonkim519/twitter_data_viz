function getTweets(query) {
	var url = 'https://twitter-data-viz.herokuapp.com/1.1/search/tweets.json?q=' + query;
	httpGet(
	url,
	function(res) {
		onTweetsLoaded(res["statuses"]);
	});
}

function getTrends(cityId) {
	var url = 'https://twitter-data-viz.herokuapp.com/1.1/trends/place.json?id=' + cityId;
	httpGet(
	url,
	function(res) {
		onTrendsLoaded(cityId, res[0]["trends"]);
	});
}
