$(document).ready(function(){
    //Variables: NASA Carbon Dioxide Data
    var carbonData;
    var carbonGraph;
    var co2URL = "http://www.hqcasanova.com/co2?callback=?";
    var newsURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    var image;
    var author;
    var title;
    var search = "Top News";
    
    /*var dateVar = "2010-10-30";
    var dsplit = dateVar.split("-");
    var d = new Date(dsplit[0],dsplit[1]-1,dsplit[2]);
    console.log(dateVar);
    console.log(dsplit);
    console.log(d);
    var eventDate = "Starting July 12";
    var slicedDate = eventDate.slice(9);
    console.log(slicedDate);*/

    //boolean startsWith(String prefix, int offset)

    /* TESTING */
    /* public class RegionMatchesDemo {
    public static void main(String[] args) {
        String searchMe = "Green Eggs and Ham";
        String findMe = "Eggs";
        int searchMeLength = searchMe.length();
        int findMeLength = findMe.length();
        boolean foundIt = false;
        for (int i = 0; 
             i <= (searchMeLength - findMeLength);
             i++) {
           if (searchMe.regionMatches(i, findMe, 0, findMeLength)) {
              foundIt = true;
              System.out.println(searchMe.substring(i, i + findMeLength));
              break;
           }
        }
        if (!foundIt)
            System.out.println("No match found.");
    }
}
*/


    ///Possible Others: //NOAA: 
                //Data Use Terms: ftp://aftp.cmdl.noaa.gov/data/trace_gases/co2/flask/surface/co2_mlo_surface-flask_1_ccgg_event.txt
                //Index of Data in form of folders: "ftp://aftp.cmdl.noaa.gov/data/"

    //=====================================================//
    //                        NAVBAR                       //
    //=====================================================//
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (event) {
            event.preventDefault();
    
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    //Ajax Call to retrieve climate NASA Carbon Dioxide Data
    $.getJSON ({
        url: co2URL,
        method: "GET"
    }).then(function(response) {
        var results = response.all;
        console.log("co2 response");
        console.log(response);
        console.log("co2 results"); 
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
        function newsAjax() {
            newsURL += '?' + $.param({
            'api-key': "bd4a830f78b54849a7803a662f876231",
            'q': search
            });
            $.ajax({
                url: newsURL,
                method: 'GET',
            }).then(function(result) {
                var array = result.response.docs;
                console.log("news search array");
                console.log(array);
                console.log("news search result");
                console.log(result);

                for (var i = 0; i < 3; i++) {

                    var newsDiv = $(".news").attr("src", array[i].web_url);
                    var title = $("<p>").text(array[i].headline.main);
                    var desc= $("<p>").text(array[i].snippet);
                    var dateConverted = moment(array[i].pub_date).format("LLL");
                    var date = $("<p>").text(dateConverted);
                    var urlGrab = $("<a>").text("Read Article").attr("href",array[i].web_url);
                    var url = $("<p>").html(urlGrab);
                        //console.log(url);
                    //var img = $("p").text(array[i].multimedia.url);
                    //console.log(img);

                    title.attr("class","title")
                    title.attr("href",array[i].web_url);
                    newsDiv.append(title);
                    newsDiv.append(desc);
                    newsDiv.append(url);
                    newsDiv.append(date);
                    //$("#news").append(newsDiv);
                };
            }).fail(function(err) {
                throw err;
            });
        };
        newsAjax();

        $("#news-search").on("click",function(event){
            event.preventDefault();
            
            $(".news").html("");
            $("#news-search").val();
            search = $("#search").val();
            newsAjax();
            console.log("search term");
            console.log(search);
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
            console.log("stargazing data");
            console.log(data);
            //var skyEvent = data.description;
            //console.log(skyEvent);
            //$("#skyEvent").text(skyEvent);
        }
    });
    $.getJSON('http://allorigins.me/get?url=https%3A//www.nytimes.com/interactive/2018/science/astronomy-space-calendar.html&callback=?', function(data){
	        //console.log(data.contents);
            var recent = $(data.contents).find('.g-graphic-calendar-item');
            var imgData = $(data.contents).find('img');
            var dateData = $(data.contents).find('h1');
            var titleData = $(data.contents).find('.g-graphic-calendar-item-summary');
            var textData = $(data.contents).find('p');

            var recentSpace = $("<div class = 'spaceEventsTitle'>");
            var recentSpaceImage = $("<div class = 'spaceEventsImage'>");
            var imageSpace = $("<img>");

            imageSpace.attr("src", imgData[0].src);
            
            recentSpaceImage.append(imageSpace);
            recentSpace.append(dateData[1]);
            recentSpace.append(titleData[0]);
            recentSpace.append(textData[2]);
            
            console.log(recent[0]);
            console.log(imgData[0].src);
            console.log(dateData[1]);
            console.log(titleData[0]);
            console.log(textData[2]);
            $("#spaceArticleImage").append(recentSpaceImage);
            $("#spaceArticleTitle").append(recentSpace);
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
            if (timer.hours == 23 && timer.minutes == 59 && timer.seconds == 59) animateCountdown(spans[0]); 
            
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