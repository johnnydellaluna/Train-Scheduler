 $(document).ready(function() {
  console.log("am i working")

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

  // Use moment.js to know current time

  var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // Get the frequency from the form the user filled out. 

  var frequency;

  // Get the first train time from the form the user filled out.

  var firstTrain;

  

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






  })

        database.ref().on("child_added", function(snapshot) {
          // Come up with value for next arrival and minutes away
          var nextArrival;

          var minutesAway;

          // Write to the table body rows of information the user puts in.
          var newRow = "<tr> <td>" + snapshot.val().name + "</td>";
          newRow += "<td>" + snapshot.val().destination + "</td>";
          newRow += "<td>" + snapshot.val().frequency + "</td>";
          newRow += "<td>" + nextArrival + "</td>";
          newRow += "<td>" + minutesAway + "</td>";

        $("#tbody").html($("#tbody").html() + newRow);






      })

        // Include moment.js time conversions to determine the two time variables

        function time (date) {
          







        }
})