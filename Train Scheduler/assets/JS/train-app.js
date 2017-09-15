 $(document).ready(function() {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDl_FlkwOUb0Mv-vOS0Jvw0wfp00g_FjcM",
    authDomain: "train-scheduler-5279d.firebaseapp.com",
    databaseURL: "https://train-scheduler-5279d.firebaseio.com",
    projectId: "train-scheduler-5279d",
    storageBucket: "",
    messagingSenderId: "635712118474"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  

  $("#submit").on("click", function (event) {
    event.preventDefault();
    console.log("test")

          // Code for handling the push
      database.ref().push({
        name: $("#name").val().trim(),
        destination: $("#destination").val().trim(),
        firsttime: $("#first-time").val().trim(),
        frequency: $("#frequency").val().trim(),
      });


  });

        database.ref().on("child_added", function(snapshot) {
          // Come up with value for next arrival and minutes away
              // Get the frequency from the form the user filled out. 

  var frequency = $("#frequency").val();
    console.log(frequency)

  // Get the first train time from the form the user filled out.

  var firstTime = $("#first-time").val();
    console.log(firstTime)

  // First Time (pushed back 1 year to make sure it comes before current time)
  var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
  console.log(firstTimeConverted);

  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % frequency;
  console.log(tRemainder);

  // Minute Until Train
  var tMinutesTillTrain = frequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

          // Write to the table body rows of information the user puts in.
          var newRow = "<tr> <td>" + snapshot.val().name + "</td>";
          newRow += "<td>" + snapshot.val().destination + "</td>";
          newRow += "<td>" + snapshot.val().frequency + "</td>";
          newRow += "<td>" + nextTrain + "</td>";
          newRow += "<td>" + tMinutesTillTrain + "</td>";

        $("#tbody").html($("#tbody").html() + newRow);






      });

})