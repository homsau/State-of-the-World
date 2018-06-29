$(document).ready(function(){
    //Variables: NASA Carbon Dioxide Data
    var carbonData;
    var carbonGraph;
    var co2URL = "http://www.hqcasanova.com/co2?callback=?";
    var newsURL = "";
    var image;
    var author;
    var title;
    
        ///Possible Others:
            //NOAA: 
                //Data Use Terms: ftp://aftp.cmdl.noaa.gov/data/trace_gases/co2/flask/surface/co2_mlo_surface-flask_1_ccgg_event.txt
                //Index of Data in form of folders: "ftp://aftp.cmdl.noaa.gov/data/"

    //Ajax Call to retrieve climate NASA Carbon Dioxide Data
    $.getJSON ({
        url: co2URL,
        method: "GET"
    }).then(function(response) {
        var results = response.all;
        //console.log(results);
    }).fail(function(errorAjax) {
        console.log("Ajax Error " + errorAjax);
    });
    newsURL = 'https://newsapi.org/v2/everything?q=' + 'Environment' + '&apiKey=2e2db0a043d34d749395b99000738b93';

    $.ajax({
        url: newsURL,
        method: "GET"
        })
    .then(function(response) {
        var results = response.articles;
            
        console.log(response);
        console.log(response.articles);

        for (var i = 0; i < 3; i++) {
            var newsDiv = $("<div class='news'>");
            image = $("<img class='img'>");
            image.attr("src", results[i].urlToImage);
            title = $("<p>").text(results[i].title);
            author = $("<p>").text(results[i].author);
            description = $("<p>").text(results[i].description);

            newsDiv.attr("src", results[i].url);
            //console.log(results[i].title);
            //console.log(results[i].url);
            //console.log(results[i].urlToImage);
            newsDiv.prepend(image);
            newsDiv.append(title);
            newsDiv.append(author);
            newsDiv.append(description);
        $("#news").append(newsDiv);
        };
    });
    //=====================================================//
    //           STARGAZING EVENTS AND TIMERS              //
    //=====================================================//
    //Clock displays current time and updates every second
    function setClock() {
        setInterval (function() {
            $("#clock").html(moment().format("hh:mm:ss A"))
        }, 1000);
    }
    setClock();

    var currentTime = moment();
    var dateEvent = new Date("July 27, 2018 17:00:00");
    var difference = moment().diff(moment(dateEvent, "Month day, year hours:minutes:seconds"));

    function displayTimer() {
        //Display dateEvent to test
        $("#countdownDiv").html(moment().format("Month day, year hours:minutes:seconds"));
        //Reset timer to subsequent event according to {UNKNOWN CALENDAR SOURCE} and moment()
        //Find difference of current moment() and stargazing moment()
        //Decrement the "difference timer" in real time
        //At 0 second left, {either specific time of day or at onset of day}, show "This event is TODAY!!! Don't miss out!"
    }
    displayTimer();
});