console.log("hello");

$(document).ready(function() {
  $(".devour-it").on("click", function(event) {
    var id = $(this).data("id");

    $.ajax("/api/burgers/" + id, {
      type: "PUT"
    }).done(function() {
      console.log("burger #" + id + " has been devoured");
      // Reload the page to get the updated list
      location.reload();
    });
  });

  $("#submit").on("click", function(event) {
    event.preventDefault();

    var name = $("#burger")
      .val()
      .trim();

    var newBurger = {
      burger_name: name
    };
    $.post("/api/addburgers", newBurger).done(function(data) {
      console.log(data);
      location.reload();
    });
  });
});
