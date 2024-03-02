function init() {
  $("#submit").click(() => {
    var selectedTypes = []
    $('input[name=ttype]:checked').each(function() {
      selectedTypes.push($(this).val()); // Add each selected value to the array
    });

    $.ajax(
      "/submit",
      {
        type: "GET",
        url: "../results.html",
        processData: true,
        data: {
          flu: $("#flu").val(),
          diab: $("#diab").val(),
          bp: $("#bp").val(),
          skin: $("#skin").val(),
          pros: $("#pros").val(),
          den: $("den").val(),
          vis: $("vis").val(),
          check: $("check").val()
        },
        dataType: "json",
        success: function (cards) {
          console.log("Success")
          // generateCards(cards)
          

        },
        error: function (jqXHR, textStatus, errorThrown) {
          alert("Error: " + jqXHR.responseText);
          alert("Error: " + textStatus);
          alert("Error: " + errorThrown);
        }
      }
    );
  });
}

$( () => {
  init();
});
