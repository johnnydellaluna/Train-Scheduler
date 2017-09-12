 $(document).ready(function() {
  console.log("am i working")

 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA3r-pdioP_sfPT10JJxWLi7WuC3wPz-y0",
    authDomain: "my-awesome-project-ea93d.firebaseapp.com",
    databaseURL: "https://my-awesome-project-ea93d.firebaseio.com",
    projectId: "my-awesome-project-ea93d",
    };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#submit").on("click", function (event) {
    event.preventDefault();
    console.log("test")

          // Code for handling the push
      database.ref().push({
        name: $("#name").val().trim(),
        role: $("#role").val().trim(),
        date: $("#date").val().trim(),
        rate: $("#rate").val().trim(),
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });






  })

        database.ref().on("child_added", function(snapshot) {
          var monthsWorked = time(snapshot.val().date);

          var newRow = "<tr> <td>" + snapshot.val().name + "</td>";
          newRow += "<td>" + snapshot.val().role + "</td>";
          newRow += "<td>" + snapshot.val().date + "</td>";
          newRow += "<td>" + monthsWorked + "</td>";
          newRow += "<td>" + snapshot.val().rate + "</td>";
          newRow += "<td>" + (snapshot.val().rate * monthsWorked) + "</td> </tr>";

        $("#tbody").html($("#tbody").html() + newRow);






      })


        function time (date) {
          moment(date, "MM.DD.YYYY").fromNow();
          console.log(moment(date, "MM.DD.YYYY").fromNow());
          console.log(date)
          return Math.abs(moment(date).diff(moment(), "months"));







        }
})