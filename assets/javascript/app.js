$(document).ready(function(){
    //Variables: NASA Carbon Dioxide Data
    var carbonData;
    var carbonGraph;
    var co2URL = "http://www.hqcasanova.com/co2?callback=?";
    var newsURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    var image;
    var author;
    var title;
    
    ///Possible Others: //NOAA: 
                //Data Use Terms: ftp://aftp.cmdl.noaa.gov/data/trace_gases/co2/flask/surface/co2_mlo_surface-flask_1_ccgg_event.txt
                //Index of Data in form of folders: "ftp://aftp.cmdl.noaa.gov/data/"

    //Ajax Call to retrieve climate NASA Carbon Dioxide Data
    $.getJSON ({
        url: co2URL,
        method: "GET"
    }).then(function(response) {
        var results = response.all;
        console.log(response);
        console.log(results);
        //var title = $("<p>").text(results);
        //$("#carbonData").append(title);
        
        var latest = $("<span>").text(response[0] + " ppm");            
        $("#latest").append(latest);
        
        var yearly = $("<span>").text(response[10] + " ppm");
        $("#yearly").append(yearly);

    }).fail(function(errorAjax) {
        console.log("Ajax Error " + errorAjax);
    });


    $(document).ready(function(){
    
        var search = "Top News";

        $("#news-search").on("click",function(){
            var search = $("#search").val();

            newsURL += '?' + $.param({
                'api-key': "bd4a830f78b54849a7803a662f876231",
                'q': search
            });
            $.ajax({
                url: newsURL,
                method: 'GET',
            }).then(function(result) {
                var array = result.response.docs;
                console.log(array);
                console.log(result);
        
                for (var i = 0; i < 3; i++) {

                    var newsDiv = $(".news");
                        newsDiv.attr("src", array[i].web_url);
                    var desc= $("<p>").text(array[i].snippet);
                    var title = $("<a>").text(array[i].headline.main);
                    var date = $("<p>").text(array[i].pub_date);
                    var url = $("<a>").text("here");
                        url.attr("href",array[i].web_url);

                    console.log(url);

                    //$(".news").css({"margin": "50px 20px 0px 20px",});
                    title.attr("class","title")
                    title.attr("href",array[i].web_url);
                    newsDiv.append(title);
                    newsDiv.append(desc);

                    newsDiv.append(url);
                    newsDiv.append(date);
                    $("#news").append(newsDiv);
                };
                console.log(search);
            }).fail(function(err) {
                throw err;
            });
            // $("#news-search").on("click",function(event){
            // event.preventDefault();
            // var search = $("#search").val();
            // $("#news-search").val("");


            // newsDiv.append(url);
            // newsDiv.append(date);
            // $("#news").append(newsDiv);
         });
    });

    //=====================================================//
    //           STARGAZING EVENTS AND TIMERS              //
    //=====================================================//
    //Test clock displays current time and updates every second
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
//    var calendarURL = "https://www.googleapis.com/calendar/v3/calendars/" + calendarId + "/events";
    var calendarId = "nytimes.com_89ai4ijpb733gt28rg21d2c2ek@group.calendar.google.com"
    var calendarAPI = 'AIzaSyD9Acwa6prtm9uMcRWWXzh8RkxJdl74_NM';
//    var calendarClientId = '249858206713-7q9afsf3r25lec5ikcqc8f8qv2f9ijn8.apps.googleusercontent.com';
//    var calendarDiscoveryDocs = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
//    var calendarScopes = "https://www.googleapis.com/auth/calendar.readonly";
   // /embed?src=nytimes.com_89ai4ijpb733gt28rg21d2c2ek%40group.calendar.google.com&ctz=America%2FNew_York";
    var spaceArticleURL; 

    $.ajax({
        url:"https://www.googleapis.com/calendar/v3/calendars/" + calendarId + "/events?key=" + calendarAPI,
        success: function(data) {
          console.log(data);
        }
    });

/*    

 //Param ("orderBy", "StartTime")
    //param("singleEvents", true)
    //OR 
    //.items[] which returns all events in list (appears to be an array of an object). Must also be consistently updating metdata.
    //$("#calendarResults")

    calendarURL += '?' + $.param ({
        "key=API_key" : "AIzaSyD9Acwa6prtm9uMcRWWXzh8RkxJdl74_NM"
    });

    $.ajax ({
        url: calendarURL,
        method: "GET"
    }).then(function(response) {
        var eventList = response.items;
        var discoveryDoc = response.discovery.apis.getRest;

        console.log(response);
        console.log(eventList);
        console.log(discoveryDoc);
    });
*/
/*
    function start() {
        // 2. Initialize the JavaScript client library.
        gapi.client.init({
          'apiKey': 'AIzaSyD9Acwa6prtm9uMcRWWXzh8RkxJdl74_NM',
          // Your API key will be automatically added to the Discovery Document URLs.
          'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
        }).then(function() {
          // 3. Initialize and make the API request.
          return gapi.client.people.people.get({
            'resourceName': 'people/me',
            'requestMask.includeField': 'person.names'
          });
        }).then(function(response) {
          console.log(response.result);
        }, function(reason) {
          console.log('Error: ' + reason.result.error.message);
        });
      };
      // 1. Load the JavaScript client library.
      gapi.load('client', start);
*/
   
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
            countdown.innerHTML = "<span id='timerDays'>" + timer.days + "</span>"
                                + "<span id='timerHours'>" + timer.hours + "</span>"
                                + "<span id='timerMinutes'>" + timer.minutes + "</span>"
                                + "<span id='timerSeconds'>" + timer.seconds + "</span>";

            //CAN I ADD CURLY BRACKETS AND CHANGE IT TO ===
            //Animations
            //The 4 numbers used in the countdown are referred to by index number and updated to give clock-like visuals
            var spans = countdown.getElementsByTagName("span");
            animateCountdown(spans[3]);
            if (timer.seconds == 59) animateCountdown(spans[2]);
            if (timer.minutes == 59 && timer.seconds == 59) animateCountdown(spans[1]);
            if (timer.hours == 23 && timer.minutes == 59 && timer.seconds == 59) animate(spans[0]); 
            
            //When the countdown finishes, all spans will display 0, and a special message about the day's event will display.
            if (timer.total < 1) {
                clearInterval(timerInterval);
                countdown.innerHTML = "<span>0</span><span>0</span><span>0</span><span>0</span>";
                $("#countdownEnd").text("This event is TODAY!!! Don't miss out!");
            } //INSERT CALLBACK FOR 24 HR INTERVAL, LEADS TO function countdownLoad() 
            //which will .getTime() from the latest event from the NYT API and reset the countdown.
      }, 1000);
    }

    //Upon the page loading, set the deadline time and date, and start the timer
    function countdownLoad() {
        //update deadline as the next available event date
        deadline = new Date("July 27, 2018 17:00:00");
        startTimer("countdown", deadline);
    }
    countdownLoad();
 
//TIMER ENDS AT START OF EVENT
//Reset timer to subsequent event according to {UNKNOWN CALENDAR SOURCE} and moment()    



});