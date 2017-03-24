$(document).ready(function() {

	//Get jquery references to form elements
	var restaurant = $('#restaurant');
	var zipcode = $('#zipcode');
	var dish = $('#dish');
	var rating = $('#rating');
	var salty = $('#salty');
	var spicy = $('#spicy');
	var sweet = $('#sweet');
	var comment = $('#comment');


	//Event listener for when form is submitted
	$("#newCrumb-form").on("submit", handleFormSubmit);

	function handleFormSubmit(event){
		event.preventDefault();

		//If the form is missing Restaurant name, Zip code or dishname, don't submit the Post request
		if (!restaurant.val().trim() || !zipcode.val().trim() || !dish.val().trim()){
			return;
		}

		console.log("You have minimum fields to add the data to DB");
		console.log(restaurant.val().trim() + '|' + zipcode.val().trim() + dish.val().trim() + '|' + rating.val().trim() + '|' + salty.val().trim() + '|' + spicy.val().trim() + '|' + sweet.val().trim() + '|' + comment.val().trim() + '|')

		//Build the basic object for Post request
	}

	//POST request - submit and reload user page

});