function init() {
  $("#submit").on("click", () => {
    var selectedTypes = [];
    $('input[name=ttype]:checked').each(function() {
      selectedTypes.push($(this).val()); // Add each selected value to the array
    });

    $.ajax({
      type: "GET", // Consider using POST if submitting data
      url: "/submit", // URL to which the request is sent
      processData: true,
      data: { // Data to be sent to the server
        flu: $("#flu").val(),
        diab: $("#diab").val(),
        bp: $("#bp").val(),
        skin: $("#skin").val(),
        pros: $("#pros").val(),
        den: $("#den").val(), // Fixed selector
        vis: $("#vis").val(), // Fixed selector
        check: $("#check").val() // Fixed selector
      },
      dataType: "json",
      success: function (cards) {
        console.log("Success");
        // generateCards(cards); // Assuming you have this function defined somewhere
        window.location.href = "../results.html"; // Redirect to results.html
      },
      error: function (jqXHR, textStatus, errorThrown) {
        alert("Error: " + jqXHR.responseText);
        alert("Error: " + textStatus);
        alert("Error: " + errorThrown);
      }
    });
  });
}




$( () => {
  init();
});
