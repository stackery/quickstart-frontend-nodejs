// Add your API endpoint
const API_ENDPOINT = "https://q638nucor2.execute-api.us-east-2.amazonaws.com/local";
const time = new Date();

//AJAX POST
$('#submit').click(function(e) {
  e.preventDefault();

  const inputData = {
    "content": $('#itemInput').val(),
    "timestamp": time.toLocaleString()
    };

  var ajaxRequest = $.ajax({
      type: "POST",
      url: `${API_ENDPOINT}/newItem`,
      data: JSON.stringify(inputData),
      contentType: "application/json",
      dataType: "text",
      success: function (response) {
        console.log(response);
      }
    });

  //When the request successfully finished, execute passed in function
  ajaxRequest.done(function(response){
    document.getElementById("itemAdded").innerHTML = "Item Added!";
  });

  //When the request failed, execute the passed in function
  ajaxRequest.fail(function(jqXHR, status){
    alert(`Something went wrong: ${JSON.stringify(status)}`);
  });
});

//AJAX GET REQUEST
$('#getItems').click(function (e) {
  e.preventDefault();
  $.ajax({
    url: `${API_ENDPOINT}/items`,
    crossDomain: true,
    dataType: 'json',
    type: 'GET',
    contentType: 'application/json',
    success: function (response) {
      $('#itemsTable tr').slice(1).remove();
      jQuery.each(response, function(i,data) {
        $("#itemsTable").append("<tr> \
            <th scope='row'>" + data['id'] + "</td> \
            <td>" + data['content'] + "</td> \
            <td>" + data['timestamp'] + "</td> \
            </tr>");
      });
    },
    error: function () {
      alert("Something went wrong");
    }
  });
});
