//array of strings related to interested topics
//save array as var = topics
//take topics in array and create buttons in my html
//use loop to append buttons
// user clicks button should grab 10 static, non-animated gifs and append to page.
// user clicks the static image and it should animate until user clicks again.  (Could hover)
//Display rating of gif

var topics = ["Rick and Morty", "Voltron", "Castlevania", "Teen Titans", "Gravity Falls", "Family Guy",];
var numberOfGifs = 10;
var cutOffRating = "pg-13";

function renderButtons() {
    for (var i = 0; i < topics.length; i++) {
        var newButton = $("<button>");
        newButton.addClass("btn")
        newButton.addClass("cartoon-button")
        newButton.text(topics[i]);
        $("#button-container").append(newButton);
    }
    $(".cartoon-button").off("click");

    $(".cartoon-button").on("click", function () {
        $(".gif-image").off("click");
        $("#gif-container").empty();
        $("#gif-container").removeClass("dashed-border");
        
        populateGifContainer($(this).text());
    });
    console.log("cartoon button:" + newButton);

}

function addButton(show) {
    if (topics.indexOf(show) === -1) {
        topics.push(show);
        $("#button-container").empty();
        
        renderButtons();
    }
}

function populateGifContainer(show) {
    $.ajax({
        url: "https://api.giphy.com/v1/gifs/search?q=" + show +
            "&api_key=xigroTHEUG8QM3lv6mDfDSLcVvPCh8t2&rating=" + cutOffRating + "&limit=" + numberOfGifs,
        method: "GET"
    }).then(function (response) {
        response.data.forEach(function (element) {
            newDiv = $("<div>")
            newDiv.addClass("newGifContainer");
            newDiv.append("<p>Rating: " +
                element.rating.toUpperCase() + "</p>");

            var newImage = $("<img src = '" + element.images.fixed_height_still.url + "'/>");
            newImage.addClass("gif-image");
            newImage.attr("state", "still")
            newImage.attr("still-data", element.images.fixed_height_still.url);
            newImage.attr("animated-data", element.images.fixed_height.url)
            newDiv.append(newImage);
            $("#gif-container").append(newDiv);
        });

        $("#gif-container").addClass("dashed-border");
        $(".gif-image").off('click');
        $(".gif-image").on('click', function () {
            if ($(this).attr("state") === "still") {
                $(this).attr("state", "animated");
                $(this).attr("src", $(this).attr("animated-data"));
            }
            else {
                $(this).attr("state", "still");
                $(this).attr("src", $(this).attr("still-data"));

            }
        });
    });
}

$(document).ready(function(){
	renderButtons();
	$("#submit").on("click", function(){
		event.preventDefault();
		addButton($("#cartoon-show").val().trim());
		$("#cartoon-show").val("");
	});
});