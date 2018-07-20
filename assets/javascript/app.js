$(document).ready(function(){
    //Variables: NASA Carbon Dioxide Data
    var carbonData;
    var carbonGraph;
    var co2URL = "http://www.hqcasanova.com/co2?callback=?";
    var newsURL;
    var spaceEventURL = "https://www.nytimes.com/interactive/2018/science/astronomy-space-calendar.html&callback=?";
    var image;
    var author;
    var title;
    var search = "Top News";
    var newsKey = newsConfig.NEWS_API_KEY;
    var i;
    var j;
    var t;
    var deadlineArray = [ 
        ["Dec 22 2018", "Dec 24 2018"],
        ["Dec 21 2018", "Dec 22 2018"],
        ["Dec 14 2018", "Dec 16 2018"],
        ["Nov 26 2018", "Nov 27 2018"],
        ["Nov 17 2018", "Nov 19 2018"],
        ["Oct 21 2018", "Oct 23 2018"],
        ["Oct 1 2018", "Oct 2 2018"],
        ["Sept 22 2018", "Sept 23 2018"],
        ["Sept 12 2018", "Sept 13 2018"],
        ["Aug 17 2018", "Aug 18 2018"],
        ["Aug 15 2018", "Aug 16 2018"],
        ["Aug 12 2018", "Aug 14 2018"],
        ["Aug 11 2018", "Aug 12 2018"],
        ["Aug 4 2018", "Aug 5 2018"],
        ["Jul 30 2018", "Aug 1 2018"],
        ["Jul 27 2018", "Jul 28 2018"],
        ["Jul 12 2018", "Jul 14 2018"],
        ["Jul 6 2018", "Jul 7 2018"]
    ];
    
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

    //=====================================================//
    //                         CO2                         //
    //=====================================================//
    //Ajax Call to retrieve climate NASA Carbon Dioxide Data
    $.getJSON ({
        url: co2URL,
        method: "GET"
    }).then(function(response) {
        var results = response.all;
        //console.log("co2 response");
        //console.log(response);
        //console.log("co2 results"); 
        //console.log(results);
        //var title = $("<p>").text(results);
        //$("#carbonData").append(title);
        
        var latest = $("<span>").text(response[0] + " ppm");            
        $("#latest").append(latest);
        
        var yearly = $("<span>").text(response[1] + " ppm");
        $("#yearly").append(yearly);

    }).fail(function(errorAjax) {
        //console.log("Ajax Error " + errorAjax);
    });

    //=====================================================//
    //                         NEWS                        //
    //=====================================================//
    $(document).ready(function(){
        function newsAjax() {
            newsURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
            newsURL += '?' + $.param({
            'api-key': newsKey,
            'q': search
            });
            $.ajax({
                url: newsURL,
                method: 'GET',
            }).then(function(result) {
                var array = result.response.docs;
                //console.log("news search array");
                //console.log(array);
                //console.log("news search result");
                //console.log(result);

                for (var i = 0; i < 3; i++) {

                    var newsDiv = $(".news").attr("src", array[i].web_url);
                    var newsArticle = $("<div>");
                    var title = $("<p>").text(array[i].headline.main);
                    var desc = $("<p>").text(array[i].snippet);
                    var dateConverted = moment(array[i].pub_date).format("LLL");
                    var date = $("<p>").text(dateConverted);
                    var urlGrab = $("<a>").text("Read Article").attr("href",array[i].web_url);
                    var url = $("<p>").html(urlGrab);

                    title.attr("class","title")
                    title.attr("href",array[i].web_url);
                    newsDiv.append(newsArticle);
                    newsArticle.append(title);
                    newsArticle.append(desc);
                    newsArticle.append(url);
                    newsArticle.append(date);
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
            //console.log("search term");
            //console.log(search);
        });
    });

    //===========================================//
    //           STARGAZING ARTICLES             //
    //===========================================//

    $.getJSON ({
        url: "https://allorigins.me/get?url=" + spaceEventURL
    }).then(function(data){
        // console.log(data.contents);
        var recent = $(data.contents).find('.g-graphic-calendar-item');
        var imgData = $(data.contents).find('img');
        var dateData = $(data.contents).find('h1');
        var titleData = $(data.contents).find('.g-graphic-calendar-item-summary');
        var textData = $(data.contents).find('p');
        var recentSpace = $("<div class = 'spaceEventsTitle'>");
        var recentSpaceImage = $("<div class = 'spaceEventsImage'>");
        var imageSpace = $("<img>");
        var recentSpaceText = $("<span>");

        imageSpace.attr("src", imgData[0].src);
        recentSpaceImage.append(imageSpace);
        recentSpace.append(dateData[1]);
        recentSpace.append(titleData[0]);
        recentSpaceText.append(textData[2]);
            
        //console.log(recent[0]);
        //console.log(imgData[0].src);
        //console.log(dateData[1]);
        //console.log(titleData[0]);
        //console.log(textData[2]);
        $("#spaceArticleImage").append(recentSpaceImage);
        $("#spaceArticleText").html(recentSpaceText);
        $("#spaceArticleTitle").append(recentSpace);
    }).fail(function(errorAjax) {
        //console.log(errorAjax);
    });
   

    //===========================================//
    //        STARGAZING EVENTS/TIMER            //
    //===========================================//
    function getTimeRemaining(endtime){
        var t = Date.parse(endtime) - Date.parse(new Date());
        var seconds = Math.floor( (t/1000) % 60 );
        var minutes = Math.floor( (t/1000/60) % 60 );
        var hours = Math.floor( (t/(1000*60*60)) % 24 );
        var days = Math.floor( t/(1000*60*60*24) );
        return {'total':t, 'days':days, 'hours':hours, 'minutes':minutes, 'seconds':seconds};
    }
    
    function initializeCountdown(id, endtime){
        clearInterval(timeinterval);
        var countdown = document.getElementById(id);
        var daysSpan = countdown.querySelector('.days');
        var hoursSpan = countdown.querySelector('.hours');
        var minutesSpan = countdown.querySelector('.minutes');
        var secondsSpan = countdown.querySelector('.seconds');
        //console.log("initializeCountdown: step 1");
          
        //this function updates the time remaining until the event every second
        function updateCountdown(){
            t = getTimeRemaining(endtime);
            daysSpan.innerHTML = t.days;
            hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
            minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
            secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
    
            //if the countdown hits 0, stop updating the countdown
            if(t.total<=0){
                clearInterval(timeinterval);
                //console.log("initializeCountdown: Timer reached 0");
            }
        }
        updateCountdown(); // run function once at first to avoid delay
        var timeinterval = setInterval(updateCountdown, 1000);
    }
    
    // iterate over each element in the deadlineArray
    for(i = 0; i < deadlineArray.length; i++) {
        var startDate = deadlineArray[i][0];
        var endDate = deadlineArray[i][1];
    
        // put dates in milliseconds for easy comparisons
        var startMs = Date.parse(startDate);
        var endMs = Date.parse(endDate);
        var currentMs = Date.parse(new Date());
    
        //if current data is before the start date, count down to it
        if(currentMs < startMs) {
            //console.log("Current Time: " + currentMs);
            //console.log("Upcoming Event[i]: " + i + " Starts: " + startMs + " Ends: " + endMs);
            //console.log("End date: " + endDate)
         
            initializeCountdown('countdown', endDate);
        }
        // if current date is between start and end dates, display event message
        else if(endMs > currentMs && currentMs >= startMs) {
            //console.log("Event happening: " + i);
            countdown.innerHTML = "<span>0</span><span>0</span><span>0</span><span>0</span>";
            $("#spaceCash").text("This event is TODAY!!! Don't miss out!").css("style", "display: block");
        }
    }

    //When this function is called, it grabs the span elements and gives them the class "turn".
    //This function allows the elements then recieve that class's animations (turning) for 700 milliseconds.
    //After 700 milliseconds, the class and its animations are removed from the span element.
    /*function animateCountdown(span) {
        span.className = "turn";
        //This setTimeout will remove the class "turn" after 700 milliseconds, because the turn animation will last 300 milliseconds.
        setTimeout(function() {
            span.className = "";
        }, 700); 
    }*/

    //The 4 numbers used in the countdown are referred to by index number and updated to give clock-like visuals
    /*var spans = countdown.getElementsByTagName(".countdown");
    animateCountdown(spans[3]);
    if (t.seconds == 59) animateCountdown(spans[2]);
    if (t.minutes == 59 && t.seconds == 59) animateCountdown(spans[1]);
    if (t.hours == 23 && t.minutes == 59 && t.seconds == 59) animateCountdown(spans[0]);*/
});