// Project: Deliverable 1
// Name: William Saults
// Term: 0812

// Wait until the DOM is ready
$(document).ready(function() {
   
	// Global Variables
	var verifyValue,
		giftValue = "No",
		couponValue = "No",
		emailValue = "No"
	;
	
	function setQuantityLabel() {
		console.log("Ran setQty");
		var qty = $('quantity').val();
	}
	
	function getSelectedRadio() {
		var radios = document.forms[0].verify;
		$.each(radios, function(key, value) {
			if(radios[key].checked) {
				verifyValue = radios[key].value;
			}
		});
	}
	
	function getCheckBoxValue() {
		if($('#giftWrapped').attr('checked')) {
			giftValue = $('#giftWrapped').val();
		} else {
			giftValue = "No";
		}
		
		if($('#applyCouponCode').attr('checked')) {
			couponValue = $('#applyCouponCode').val();
		} else {
			couponValue = "No";
		}
		
		if($('#receiveEmail').attr('checked')) {
			emailValue = $('#receiveEmail').val();
		} else {
			emailValue = "No";
		}
	}
	
	function toggleControls(n) {
		switch(n) {
			case "on":
				$('#formContents').hide();
				$('#clearAll').show();
				$('#displayDataToggle').hide();
				$('#backToFormToggle').show();
				break;
			
			case "off":
				$('#formContents').show();
				$('#itemForm').show();
				$('#clearAll').show();
				$('#displayDataToggle').show();
				$('#items').hide();
				$('#backToFormToggle').hide();
				break;
			
			default:
				return false;
		}
	}
	
	function storeData(key) {
		// If there is no key, then this is a new item.
		if(!key) {
			var id = Math.floor(Math.random()*100000001);
		} else {
			id = key;
		}
		console.log("Submitting data.");
		getSelectedRadio();
		getCheckBoxValue();
		// Get all form field values.
		var item = {};
			item.itemNumber = ["SKU:", $('#itemNumber').val()];
			item.itemColor = ["Color:", $('#itemColor').val()];
			item.itemPrice = ["Price:", $('#itemPrice').val()];
			item.quantity = ["Quantity:", $('#quantity').val()];
			// Checkboxes
			item.giftWrapped = ["Gift Wrapped:", giftValue];
			item.applyCouponCode = ["Apply Coupon Code:", couponValue];
			item.receiveEmail = ["Receive Email:", emailValue];
			// Radio
			item.verify = ["Verify:", verifyValue];
			// Select
			item.select = ["Item:", $('#select').val()];
			item.textarea = ["Feedback:", $('#textarea').val()];
		
		// Save the data into local storage
		localStorage.setItem(id, JSON.stringify(item));
		alert("Item saved.");
		
		window.location.reload();	
	}
	
	function validate(e) {		
		// Reset Error Messages
		$('#errors').html("");
		
		// Get Error Messages
		var messageArray = []
		
		// Item number validation
		// check for some format. ex: AAA###
		if($('#itemNumber').val() === "") {
			var itemNumberError = "Please enter a valid item SKU";
			messageArray.push(itemNumberError);
		}
		
		// Item price validation
		if($('#itemPrice').val() === "") {
			var itemPriceError = "Please enter a valid item price";
			messageArray.push(itemPriceError);
		}
		
		// Item quantity validation
		if($('#quantity').val() === "") {
			var itemQuantityError = "Please enter a valid item quantity";
			messageArray.push(itemQuantityError);
		}
		// Textarea validation
		// check for length 255 char
		if($("#textarea").val().length > 255) {
			var textAreaError = "Please enter 255 or less characters";
			messageArray.push(textAreaError);
		}
		
		console.log("-validate- this.key " + this.key)
		
		if (messageArray.length >= 1) {
			$.each(messageArray, function(key, value) {
				var txt = $('<li>');
				txt.html(messageArray[key]);
				$('#errors').append(txt);
			});
				
			e.preventDefault();
			return false;
		} else {
			// If everything validates, save the data.
			storeData(this.key);
		}
	}
	
	function editItem(key) {
		// Show the form
		toggleControls("off");
		
		// Grab the data from our item in local storage.
		var value = localStorage.getItem(key);
// 		console.log("value " + value);
		console.log("-edit item- this.key " + key)
		var item = $.parseJSON(value);
		
		// Populate the form fields with current localStorage values.
		$('#itemNumber').val(item.itemNumber[1]);		
		$('#itemColor').val(item.itemColor[1]);
		$('#itemPrice').val(item.itemPrice[1]);
		$('#quantity').val(item.quantity[1]);
		$('#select').val(item.select[1]);
		$('#textarea').val(item.textarea[1]);

		// Checkboxes
		if (item.giftWrapped[1] === "Yes") {
			$('#giftWrapped').attr('checked');
		}
		if (item.applyCouponCode[1] === "Yes") {
			$('#applyCouponCode').attr('checked');
		}
		if (item.receiveEmail[1] === "Yes") {
			$('#receiveEmail').attr('checked');
		}
		
		// Radio
		var radios = document.forms[0].verify;
		$.each(radios, function(i, value) {
			if (radios[i].value === "human" 
			&& item.verifyValue[1] == "human") {
				radios[i].attr('checked');
			} else if (radios[i].value === "martian" 
			&& item.verifyValue[1] == "martian") {
				radios[i].attr('checked');
			} else if (radios[i].value === "robot" 
			&& item.verifyValue[1] == "robot") {
				radios[i].attr('checked');
			}
		});
			
		// Remove the initial listener from the input 'save' button.
		$('#submit').off("click", validate);
	
		// Change the submit button value to edit
		$('#submit').val("Edit Item");
		// Save the key value established in this function as 
		// a property oof the editSubmit event
		$('#submit').on("click", function() {
			storeData(key);
		});
		$('#submit').key = key;
	}
	
	function deleteItem(key) {
		console.log("-deleteItem- key " + key);
		var ask = confirm("Are you sure you want to delete this item?");
		if(ask && key !== undefined) {
			localStorage.removeItem(key);
			alert("Item was deleted.");
			window.location.reload();
		} else {
			alert("Item was NOT deleted.");
		}
	}
	
	// Creates the edit and delete links for each item
	function makeItemLinks(key, linksLi) {
		console.log("-makeItemLinks- key " + key);
		var editLink = $('<a>');
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Item";
		editLink.click(function () {
			editItem(key);
		});
		editLink.html(editText);
		linksLi.append(editLink);
		
		var breakTag = $('<br>');
		linksLi.append(breakTag);
		
		var deleteLink = $('<a>');
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Item";
		deleteLink.click(function () {
			deleteItem(key);
		});
		
		deleteLink.html(deleteText);
		linksLi.append(deleteLink);
		
		var hrTag = $('<hr>');
		linksLi.append(hrTag);
	}
	
	function getData() {
		toggleControls("on");
		if(localStorage.length === 0) {
			alert("There is no data in local storage. Default data has been added.");
			autoFillData();
		}
		console.log("Getting data.");
		$(document.body).append($('<br>'));
   		$(document.body).append($('<hr>'));
		var makeDiv = $('<div>');
		makeDiv.attr("id", "items");
		var makeList = $('<ul>');
		makeDiv.append(makeList);
		$(document.body).append(makeDiv);
		$('#items').show;
		$.each(localStorage, function(k, l) {
			var makeli = $('<li>');
			var linksLi = $('<li>');
			makeList.append(makeli);
			var key = localStorage.key(k);
			var value = localStorage.getItem(key);
			var obj = $.parseJSON(value);
			var makeSubList = $('<ul>');
			makeli.append(makeSubList);
			getImage(obj.select[1],makeSubList);
			$.each(obj, function(j, value) {
				var makeSubli = $('<li>');
				makeSubList.append(makeSubli);
				var optSubText = obj[j][0]+" "+obj[j][1];
				makeSubli.html(optSubText);
				makeSubList.append(linksLi);
			});
			// Create our edit and delete links for each item
			makeItemLinks(localStorage.key(k), linksLi); 
		});
	}
	
	function autoFillData() {
		// Store the JSON Object into local storage.
		$.each(json, function(key, value) {
			console.log("alert");
			var id = Math.floor(Math.random()*100000001);
			localStorage.setItem(id, JSON.stringify(json[key]));
		});
	}
	
	// Get the image depending on what value was selected.
	function getImage(catName, makeSubList) {
		var imageLi = $('<li>');
		makeSubList.append(imageLi);
		var newImg = $('<img>');
		var setSrc = newImg.attr("src", "images/" + catName + ".png");
		console.log("The catName is: " + catName);
		imageLi.append(newImg);
	}
	
	function clearLocalData() {
		console.log("Clearing data.");
		if(localStorage.length === 0) {
			alert("No data to clear");
		} else {
			localStorage.clear();
			alert("Local Storage Cleared");
			window.location.reload();
			return false;
		}
	}
	
	function humanTest() {
		$('#responsiveH').show();
		$('#responsiveM').hide();
		$('#responsiveR').hide();
	}
	
	function martianTest() {
		$('#responsiveH').hide();
		$('#responsiveM').show();
		$('#responsiveR').hide();
	}
	function robotTest() {
		$('#responsiveH').hide();
		$('#responsiveM').hide();
		$('#responsiveR').show();
	}
	
	$('#submit').on("click", validate);
	$('#clearAll').click(clearLocalData);
	$('#displayData').click(getData);
	$('#backToForm').click(function(){
		window.location.reload();
		toggleControls("off");
	});
	
	$('#h').click(humanTest);
	$('#h').on("touchstart", humanTest);
	
	$('#m').click(martianTest);
	$('#m').on("touchstart", martianTest);
	
	$('#r').click(robotTest);
	$('#r').on("touchstart", robotTest);
	
	setQuantityLabel();
	
	$('#responsiveH').show();
	$('#responsiveM').hide();
	$('#responsiveR').hide();
	
	toggleControls("off");
		
});