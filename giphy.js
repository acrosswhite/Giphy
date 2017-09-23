var giphs = ["confused", "happy", "excited", "sarcastic", "grumpy"];

      // this function re-renders the HTML to display the appropriate content
function displayEmotionsGif() {

  $("#emotions").empty();

  var emotions = $(this).attr("data-name");
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + emotions + "&api_key=9b203687108545728e67856c167e9113&limit=10&rating=pg-13";

  // Creating an AJAX call to giphy
  $.ajax({
    url: queryURL,
    method: "GET"
    //number of gifs display is 10
    //static gifs
  }).done(function(response) {

    for (var i of response.data){
       // Creating a div to hold content
    var emotionDiv = $("<div class='imgEmotion'>");
    var label = $("<div class='imgRating'>");

    // Retrieving the URL for the image
    var stillImgURL = i.images.fixed_width_still.url;
    var animateImgURL = i.images.fixed_width.url;

    // Creating an element to hold the image
    var image = $("<img>");
    $(image).attr("src", stillImgURL);
    


    $(image).attr("data-state", "still");
    $(image).attr("data-animate", animateImgURL);
    $(image).attr("data-still", stillImgURL);


    // Appending the image
    emotionDiv.append(label);
    $(label).text("Rating: " + i.rating);
    emotionDiv.append(image);
    $("#emotions").prepend(emotionDiv);

    $(image).on("click", function() {
      console.log("image click");
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
  }
   
  });

}

// Function for displaying data
function renderButtons() {

  // Deleting the emotion button prior to adding new 
  
  $("#buttons-view").empty();

  // Looping through the array 
  for (var i = 0; i < giphs.length; i++) {
    //dynamicaly generating buttons
    var giphyButton = $("<button/>");
    giphyButton.addClass("emotion");
    // Adding a data-attribute
    giphyButton.attr("data-name", giphs[i]);
    giphyButton.text(giphs[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(giphyButton);
    $(giphyButton).click(displayEmotionsGif);
  }
}

// button click event
$("#add-emotion").on("click", function(event) {
  event.preventDefault();
  // input from the textbox
  var emotion = $("#emotion-input").val().trim();

  // Adding to array
  giphs.push(emotion);

  // Calling renderButtons which handles the processing of our movie array
  renderButtons();

});


$(document).ready(function(){
  renderButtons();
});

