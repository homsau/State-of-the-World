$(document).ready(function(){
    //Variables: NASA Carbon Dioxide Data
    var carbonData;
    var carbonGraph;
    var nasaURL = "https://api.nasa.gov/vital-signs/carbon-dioxide?api_key=b477jSnypgJoZCZOYWU1juSC6M98vvmuEizQioTi";
        ///Possible Others:
            //NOAA: 
                //Data Use Terms: ftp://aftp.cmdl.noaa.gov/data/trace_gases/co2/flask/surface/co2_mlo_surface-flask_1_ccgg_event.txt
                //Index of Data in form of folders: "ftp://aftp.cmdl.noaa.gov/data/"

    var errorAjax = $("#carbonDataContainer").text("Error retreiving data.");


    //Ajax Call to retrieve climate NASA Carbon Dioxide Data
    $.ajax ({
        url: nasaURL,
        method: "GET"
    }).then(function(response) {
        var results = response.data
        console.log("Ajax Successful" + results);
    }).fail(function(errorAjax) {
        console.log("Ajax Error" + errorAjax);
    });
});