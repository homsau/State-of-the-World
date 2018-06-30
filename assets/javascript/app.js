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

    //var currentTime = moment();
    var deadline;
    var dateEvent;
    var countdown;
    //var difference = moment().diff(moment(dateEvent, "Month day, year hours:minutes:seconds"));
    var spaceCalendar = "https://calendar.google.com/calendar/embed?src=nytimes.com_89ai4ijpb733gt28rg21d2c2ek%40group.calendar.google.com&ctz=America%2FNew_York";
   
    function updateTimer(deadline){
        //var time is the difference between the deadline of the event and the newDate()
        //newDate() will be created and return the date and time for when updateTimer() is run (every one second).
        var time = deadline - new Date();
        //return an object from this function and pass these new values to var timer 
        return {
            //This object returns values by converting var time (milliseconds) into seconds, then minutes, etc. and using a modulus for overtime in each category
            "days": Math.floor( time/(1000*60*60*24)),
            "hours": Math.floor( (time/(1000*60*60)) % 24),
            "minutes": Math.floor( (time/1000/60) % 60),
            "seconds": Math.floor( (time/1000) % 60),
            "total": time 
        };
    }

    //CLARIFY EXPLANATION
    //When this function is called, it grabs the span elements and gives them the class "turn".
    //This function allows the elements then recieve that class's animations (turning) for 700 milliseconds.
    //After 700 milliseconds, the class and its animations are removed from the span element.
    function animateCountdown(span) {
        span.className = "turn";
        //This setTimeout will remove the class "turn" after 700 milliseconds, because the turn animation will last 300 milliseconds.
        setTimeout(function() {
            span.className = "";
        }, 700); 
      } 

    //This function takes the id "countdown" and the deadline variable which is set to a time and date
    function startTimer (id, deadline){
        //Set a time interval for the countdown
        var timeInterval = setInterval(function() {
            //which will get the html element and set the a timer that will update the deadline time every second.
            countdown = document.getElementById(id);
            //var timer will be given the value of a function that updates the time values every second
            var timer = updateTimer(deadline);
            //These outputs will update every second according to updateTimer().
            countdown.innerHTML = "<span>" + timer.days + "</span>"
                                + "<span>" + timer.hours + "</span>"
                                + "<span>" + timer.minutes + "</span>"
                                + "<span>" + timer.seconds + "</span>";

            //CAN I ADD CURLY BRACKETS AND CHANGE IT TO ===
            //Animations
            //The 4 numbers used in the countdown are referred to by index number and updated to give clock-like visuals
            var spans = countdown.getElementsByTagName("span");
            animateCountdown(spans[3]);
            if(timer.seconds == 59) animateCountdown(spans[2]);
            if (timer.minutes == 59 && timer.seconds == 59) animateCountdown(spans[1]);
            if (timer.hours == 23 && timer.minutes == 59 && timer.seconds == 59) animate(spans[0]); 
            
            //When the countdown finishes, all spans will display 0, and a special message about the day's event will display.
            if (timer.total < 1) {
                clearInterval(timerInterval);
                countdown.innerHTML = "<span>0</span><span>0</span><span>0</span><span>0</span>";
                $("#countdownEnd").text("This event is TODAY!!! Don't miss out!");
            } //INSERT CALLBACK FOR 24 HR INTERVAL, LEADS TO function newCountdown() which will pull the new latest event from the NYT API and reset the countdown.
      }, 1000);
    }

    //Upon the page loading, set the deadline time and date, and start the timer
    function countdownLoad() {
        deadline = new Date("July 27, 2018 17:00:00");
        startTimer("countdown", deadline);
    }
    countdownLoad();
 
//TIMER ENDS AT START OF EVENT
//Reset timer to subsequent event according to {UNKNOWN CALENDAR SOURCE} and moment()    

});