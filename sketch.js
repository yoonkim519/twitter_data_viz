
var textlocation;
var input, button, canvas;

var canvasWidthRatio = 2/3;
var canvasHeightRatio = 1;

var canvasVerticalOffsetPercentage = 0.1;

var cityData = {};


function setup() {
	canvas = createCanvas(canvasWidthRatio * windowWidth, windowHeight);
	canvas.position(windowWidth * (1 - canvasWidthRatio), 0);

	tint(255, 127);
	img = loadImage("us_map.png");

	setupCities();

	//"Search" Heading
	textSize(20);
	fill(79,255,138);
  textFont('Open Sans');
  text('Search', 50, 120, 300, 400);

  //Textfield
	input = select("#searchBox");

  // button
	button = select("#searchButton");
	button.mousePressed(search);

  button.style("background-color","38,37,37");
	button.style("padding", "15px");
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
	canvas.position(windowWidth * (1 - canvasWidthRatio), 0);
}


function draw() {

	background(38,37,37);

	verticalOffset = canvasVerticalOffsetPercentage * windowHeight;


  var canvasWidth = canvasWidthRatio * windowWidth;
	var canvasHeight = canvasHeightRatio * windowHeight;

  var imageRatio = img.width / canvasWidth;
  image(img, 0, verticalOffset, canvasWidth, img.height / imageRatio);

  //location dots
	fill(255,255,255);
	//ellipse(canvasWidth/9.1, canvasHeight/2.6, 10, 10);


  //dots for locations
	var cirWidth = 13;
  noStroke();
	fill(79,255,138);

	// Draw all cities
	for (var key in cityData) {
		if (cityData.hasOwnProperty(key)) {
			var city = cityData[key];
			drawCity(key, canvasWidth, imageRatio, city.widthFactor, city.heightFactor);
		}
	}
}

function search() {
	getTweets(input.value());
}

function onTweetsLoaded(tweets){
	for (var i=0; i<=4; i++){
		var individualTweet = tweets[i];
	  var tweetText = individualTweet.user.name + " said: " + individualTweet.text + " at " + individualTweet.user.location;

		var tweetDiv = select("#tweetDiv" + (i + 1));
		tweetDiv.html(tweetText);
	}
}

function drawCity(name,canvasWidth, imageRatio, widthFactor, heightFactor){
	//dots for locations
	var cirWidth = 13;
	noStroke();
	fill(79,255,138);

  var x = canvasWidth * widthFactor;
	var y = verticalOffset + img.height / imageRatio * heightFactor;
	ellipse(x, y, cirWidth, cirWidth);
	text(name, x + 13, y + 5);

	cityData[name].position.x = x;
	cityData[name].position.y = y;
}

function mouseClicked() {
	var closestCity = "";
	var closestDistance = 99999999;
	for (var key in cityData) {
    if (cityData.hasOwnProperty(key)) {
				var x = cityData[key].position.x;
				var y = cityData[key].position.y;

				var distance = (mouseX - x) * (mouseX - x) + (mouseY - y) * (mouseY - y);
				if (distance < closestDistance) {
					closestDistance = distance;
					closestCity = key;
				}
    }
	}

  var verticalOffset = 0;
	if (closestCity != "") {
		var city = cityData[closestCity];
		updateFloatingDiv(city);
	}
}

function updateFloatingDiv(city) {
	var floatingDiv = select("#floatingDiv");
	floatingDiv.style("left", canvas.x + city.position.x + "px");
	floatingDiv.style("top", canvas.y + 20 + city.position.y + "px");
	floatingDiv.style("visibility", "visible");

	var title = select("#floatingTitle");
	title.html("Trending topics");

	var content = select("#floatingContent");

	// NOT LOADING
	if (city.trendStatus == "NOT_LOADING") {
		content.html("Loading...");
		city.trendStatus = "LOADING"
		getTrends(city.cityId); //hitting the twitter API

		// LOADING
	} else if (city.trendStatus == "LOADING"){
		content.html("Loading...");

		// DONE
	} else if (city.trendStatus == "DONE") {
		content.html("<ul>" +
				"<li>" + city.trends[0].name + "</li>" +
				"<li>" + city.trends[1].name + "</li>" +
				"<li>" + city.trends[2].name + "</li>" +
				"<li>" + city.trends[3].name + "</li>" +
				"<li>" + city.trends[4].name + "</li>" +
				"</ul>");
	}
}
