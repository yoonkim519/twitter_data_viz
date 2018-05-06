


function setupCities() {

  //New York
  setupCity("New York", 2459115, 1/1.2, 1/2.4);

  //San francisco
  setupCity("San Francisco", 2487956, 1/11, 1/2);


  //Los Angeles
  setupCity("Los Angeles", 2442047, 1/6, 1/1.6);

  //Seattle
  setupCity("Seattle", 2490383, 1/11, 1/8.2);

  //Orlando
  setupCity("Orlando", 2466256, 1/1.38, 1/1.24);

  //DC
  setupCity("DC", 2514815, 1/1.27, 1/2.0);

  //Chicago
  setupCity("Chicago", 2379574, 1/1.449, 1/2.8);
}

function setupCity(name, cityId, widthFactor, heightFactor) {
  cityData[name] = {
    cityId: cityId,
    trends: [],
    trendStatus: "NOT_LOADING",
    widthFactor: widthFactor,
    heightFactor: heightFactor,
    position: {x:0, y:0}
  };

  //getTrends(cityId);
}

function onTrendsLoaded(cityId, trends) {
  console.log("Got trends for: " + cityId);
 	for (var key in cityData) {
 		if (cityData.hasOwnProperty(key)) {
 			var city = cityData[key];
      if (city.cityId == cityId) {

        console.log("It was: " + key);
        city.trends = trends;
        city.trendStatus = "DONE";
        updateFloatingDiv(city);
      }
 		}
 	}
}
