// Initialize Firebase
var config = {
    apiKey: "AIzaSyA4JIszrpaEK-EOzvp-vfWtY-cL54Q6JUY",
    authDomain: "homewok-f79d0.firebaseapp.com",
    databaseURL: "https://homewok-f79d0.firebaseio.com",
    storageBucket: "homewok-f79d0.appspot.com",
    messagingSenderId: "529400238636"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

    $('#submitTrain').on('click',function(){

          var trainName = $('#newTrain').val().trim();
          var	tdestination = $('#newDest').val().trim();
          var	firstTime = moment($('#firstTime').val().trim(),"HH:mm").format("X");
          var	frequency = $('#frequency').val().trim();


          var newest = {
          	name: trainName,
          	destination: tdestination,
          	start: firstTime,
          	freq:frequency
          }

          database.ref().push(newest);

          $('#newTrain').val('');
          $('#newDest').val('');
          $('#firstTime').val('');
          $('#frequency').val('');

      return false;

});


database.ref().on("child_added", function(childSnapshot){
          var trainName = childSnapshot.val().name;
          var newDest = childSnapshot.val().destination;
          var firstTime = childSnapshot.val().start;
          var frequency = childSnapshot.val().freq;

          var firstTrain = moment.unix(firstTime).format("hh:mm a");
          var nextArrival;
          var minutesAway;

          var converted = moment(firstTrain,"hh:mm a").subtract(1, "years");
          var currentTime = moment();
          var diffTime = moment().diff(moment(converted), "minutes");
          var remainder = diffTime % frequency;
          var minutesAway = frequency - remainder;
          var nextArrival = moment().add(minutesAway, "minutes");
          var trainsNextArrival = moment(nextArrival).format("hh:mm a");

      $('#myTable > tbody').append('<tr><td>' + trainName + '</td><td>' + newDest + '</td><td>' + frequency + '</td><td>' + trainsNextArrival + '</td><td>' + minutesAway + '</td></tr>');



});
