       var giphs = ["confused", "bored", "sarcastic", "excited"];

      // displayMovieInfo function re-renders the HTML to display the appropriate content
      function displayEmotionsGif() {

        var emotions = $(this).attr("data-name");
        var queryURL = "https://www.giphy.com" + emotions + "9b203687108545728e67856c167e9113";

        // Creating an AJAX call for the specific movie button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

          // Creating a div to hold the movie
          var emotionDiv = $("<div class='emotion'>");

          // Retrieving the URL for the image
          var imgURL = response.Poster;

          // Creating an element to hold the image
          var image = $("<img>").attr("src", imgURL);

          // Appending the image
          emotionDiv.append(image);

          // Putting the entire movie above the previous movies
          $("#emotions").prepend(emotionDiv);
        });

      }

      // Function for displaying movie data
      function renderButtons() {

        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of movies
        for (var i = 0; i < giphs.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of movie to our button
          a.addClass("emotion");
          // Adding a data-attribute
          a.attr("data-name", giphs[i]);
          // Providing the initial button text
          a.text(giphs[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

      // This function handles events where a movie button is clicked
      $("#add-emotion").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var emotion = $("#emotion-input").val().trim();

        // Adding movie from the textbox to our array
        giphs.push(emotion);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
      });

      // Adding a click event listener to all elements with a class of "movie"
      $(document).on("click", ".movie", displayEmotionsGif);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();



 /*$("#cat-button").on("click", function() {

      //
      var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=cats";

      //
      $.ajax({
        url: queryURL,
        method: "GET"
      })

      //
      .done(function(response) {

        //
        var imageUrl = response.data.image_original_url;

        //
        var catImage = $("<img>");

        //
        catImage.attr("src", imageUrl);
        catImage.attr("alt", "cat image");

        //
        $("#images").prepend(catImage);
      });
    });




$(".gif").on("click", function() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
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
    });*/