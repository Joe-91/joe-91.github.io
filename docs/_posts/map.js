
let map;
//five locations of csun within an array //
var quizQuestions = [
    {
        "question": "Where is the book store",
        "Coordinates": [
            {
                "start-lat": 34.2391387552817,
                "end-lat": 34.238972333632795
            },
            {
                "start-long": -118.52856646250694,
                "end-long": -118.52837160566357
            }
        ]
    },
    {
        "question": "Where is Bayramian Hall",
        "Coordinates": [
            {
                "start-lat": 34.239953,
                "end-lat": 34.240700
            },
            {
                "start-long": -118.531438,
                "end-long": -118.530153
            }
        ]
    },
    {
        "question": "Where is Manzanita Hall",
        "Coordinates": [
            {
                "start-lat": 34.236877,
                "end-lat": 34.237834
            },
            {
                "start-long": -118.530564,
                "end-long": -118.529535
            }
        ]
    },
    {
        "question": "Where is Jacaranda Hall",
        "Coordinates": [
            {
                "start-lat": 34.241032,
                "end-lat": 34.242079
            },
            {
                "start-long": -118.529434,
                "end-long": -118.527833
            }
        ]
    },
    {
        "question": "Where is Citrus Hall",
        "Coordinates": [
            {
                "start-lat": 34.238893,
                "end-lat": 34.239126
            },
            {
                "start-long": -118.528592,
                "end-long": -118.527640
            }
        ]
    }
];

var correctedAnswers = 0;
var google = 0;

function initMap() {

    //disable zoom, scrolling and gesture handling//
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 34.239893, lng: -118.529265 },
        zoom: 17,
        gestureHandling: 'none',
        zoomControl: false,
        disableDefaultUI: true,
        styles: [
            {
                featureType: "administrative",
                elementType: "labels",
                stylers: [
                    { visibility: "off" }
                ]
            }, {
                featureType: "poi",
                elementType: "labels",
                stylers: [
                    { visibility: "off" }
                ]
            }, {
                featureType: "water",
                elementType: "labels",
                stylers: [
                    { visibility: "off" }
                ]
            }, {
                featureType: "road",
                elementType: "labels",
                stylers: [
                    { visibility: "off" }
                ]
            }
        ]
    });
    //#49AF30 is green. It will mark and highlight the correct area with the color green within google maps
    var quizResults = {
        "right": {
            strokeColor: '#49AF30',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#49AF30',
            fillOpacity: 0.35,
            map: map,
            bounds: {}
        },
        //#FF0000 is red. It will mark and highlight the correct area with the color red within google maps
        "wrong": {
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: map,
            bounds: {}
        }
    };
    //will highlight blue within #39A6BE/cyan from the given questions
    var rectangle; //=  new google.maps.Rectangle(quizResults.wrong);

    let i = 0;
    var div = document.createElement('div');
    var heading = document.createElement("h4");
    heading.style.backgroundColor = '#39A6BE';
    var t = document.createTextNode(quizQuestions[i].question);
    heading.appendChild(t);
    div.appendChild(heading);
    document.getElementById("questionArea").appendChild(div);

    //checks for the event listener from the double clicks
    map.addListener('click', function (e) {

        let selectedLat = e.latLng.lat();
        let selectedLng = e.latLng.lng();
        var quizQuestion = quizQuestions[i];
        var truePlace = false;
        var thisBounds = {
            north: quizQuestion.Coordinates[0]["start-lat"],
            south: quizQuestion.Coordinates[0]["end-lat"],
            east: quizQuestion.Coordinates[1]["end-long"],
            west: quizQuestion.Coordinates[1]["start-long"]
        };
        //checks and compares the latitude and longtitue from the start and end latitude and longtitude based on the quiz questions
        if (selectedLat > quizQuestion.Coordinates[0]["start-lat"] && selectedLat < quizQuestion.Coordinates[0]["end-lat"]) {
            if (selectedLng > quizQuestion.Coordinates[1]["start-long"] && selectedLng < quizQuestion.Coordinates[1]["end-long"]) {
                truePlace = true;
                correctedAnswers++;
            }
        }
        //Checks if its correct or if its wrong based on the quiz results.
        //It will give you an output if its correct or incorrect 
        if (truePlace) {
            quizResults.right.bounds = thisBounds;
            rectangle = new google.maps.Rectangle(quizResults.right);
            heading = document.createElement("h5");
            heading.style.color = '#49AF30'; //highlight result in green such as, your answer is correct
            t = document.createTextNode("Your answer is correct");
            heading.appendChild(t);
            div.appendChild(heading);
        } else {
            quizResults.wrong.bounds = thisBounds;
            rectangle = new google.maps.Rectangle(quizResults.wrong);
            heading = document.createElement("h5"); //size of correct or wrong answers
            heading.style.color = '#FF0000'; //highlight result in red such as, your answer is wrong
            t = document.createTextNode("Your answer is wrong");
            heading.appendChild(t);
            div.appendChild(heading);
        }
        // alert(e.latLng.lat())
        console.log(quizQuestion.Coordinates[0]["start-lat"]);
        if (i === quizQuestions.length - 1) {
            div = document.createElement('div');
            heading = document.createElement("h1");
            t = document.createTextNode(correctedAnswers + " Correct, " + (quizQuestions.length - correctedAnswers) + " Incorrect");//get the total correct and incorrect entries from the map
            heading.appendChild(t);
            div.appendChild(heading);
            document.getElementById("questionArea").appendChild(div);
        }

        if (i < quizQuestions.length) {
            i++;
            div = document.createElement('div');
            heading = document.createElement("h4"); //size given to the questions 
            heading.style.backgroundColor = '#39A6BE';//highlight questions to cyan 
            t = document.createTextNode(quizQuestions[i].question);
            heading.appendChild(t);
            div.appendChild(heading);
            document.getElementById("questionArea").appendChild(div);

        }


    });

}




