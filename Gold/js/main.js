// Project: Deliverable 1
// Name: William Saults
// Term: 0812

// Wait until the DOM is ready
$(document).ready(function() {
   
	// Global Variables
	var verifyValue,
		verifyDataFormat = "",
		giftValue = "No",
		couponValue = "No",
		emailValue = "No"
	;
	
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
	
	/* AJAX data formating */
	$('#l').click(localSelected);
	$('#l').on("touchstart", localSelected);
	
	$('#j').click(jsonSelected);
	$('#j').on("touchstart", jsonSelected);
	
	$('#x').click(xmlSelected);
	$('#x').on("touchstart", xmlSelected);
	
	$('#c').click(csvSelected);
	$('#c').on("touchstart", csvSelected);
	
	setQuantityLabel();
	
	$('#responsiveH').show();
	$('#responsiveM').hide();
	$('#responsiveR').hide();
	
	toggleControls("off");

});
	
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
		console.log("Getting data.");
		console.log("Data type is " + $('input:radio[name=dataFormat]:checked').val());
		
		verifyDataFormat = $('input:radio[name=dataFormat]:checked').val();
		verifyDataFormat = verifyDataFormat.toLowerCase();
		
		if (verifyDataFormat === "xml") {
			console.log("run getXMLAjax");
			getXMLAjax();
				
		} else if (verifyDataFormat === "csv") {
			console.log("run getCSVAjax");
			getCSVAjax();
				
		}
		
		if (verifyDataFormat === "json") {
			console.log("run getJSONAjax");
			getJsonAjax();
				
		} else {
			if(localStorage.length === 0) {
// 				alert("There is no data in local storage. Default data has been added.");
				console.log("Normal Autofill");
				autoFillData();
				displayJSONData();
			} else {
				displayJSONData();
			}
		}
	}
	
	function autoFillData() {
		// Store the JSON Object into local storage.
		$.each(json, function(key, value) {
			console.log("alert");
			var id = Math.floor(Math.random()*100000001);
			localStorage.setItem(id, JSON.stringify(json[key]));
		});
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
	
	
	/* AJAX data formating */
	function localSelected() {
		verifyDataFormat = "local";
	}
	
	function jsonSelected() {
		verifyDataFormat = "json";
	}
	
	function xmlSelected() {
		verifyDataFormat = "xml";
	}
	function csvSelected() {
		verifyDataFormat = "csv";
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

function autoFillDataFromAJAX(ajaxData) {
	// Store the JSON Object into local storage.
	console.log(ajaxData);
	$.each(ajaxData, function(key, value) {
		console.log(value);
		var id = Math.floor(Math.random()*100000001);
		localStorage.setItem(id, JSON.stringify(value));
		
	});
	console.log("autoFillDataFromAJAX complete");
	console.log("run displayJSONData");
	displayJSONData();
}

// listen for display data click then do this
function getJsonAjax(){
   $.ajax({
      url: "xhr/data.json",
      type: "GET",
      dataType: "json",
      success: function(data){
      	console.log("Success");
//       	console.log(data);
//         storeAjaxData(data);
        autoFillDataFromAJAX(data);
      },
      error: function(){
         console.log("Error.")
      }
   });
}

function getXMLAjax(){
   $.ajax({
      url: "xhr/data.xml",
      type: "GET",
      dataType: "xml",
      success: function(data){
      	console.log("Success");
      	console.log(data);
		displayXMLData(data);
      },
      error: function(){
         console.log("Error.")
      }     
   });
};

function getCSVAjax(){
   $.ajax({
      url: "xhr/data.csv",
      type: "GET",
      dataType: "text",
      success: function(data){
		console.log("Success");
		console.log(data);
		displayCSVData(data);
      },
      error: function(){
         console.log("Error.")
      }     
   });
};

function displayJSONData() {
	console.log("JSON output");
	$(document.body).append($('<br>'));
	$(document.body).append($('<hr>'));
	var makeDiv = $('<div>');
	makeDiv.attr("id", "items");
	var makeList = $('<ul>');
	makeDiv.append(makeList);
	$(document.body).append(makeDiv);
	$('#items').show;
	console.log(localStorage);
	$.each(localStorage, function(k, l) {
		var makeli = $('<li>');
		var linksLi = $('<li>');
		makeList.append(makeli);
		var key = localStorage.key(k);
		var value = localStorage.getItem(key);
		console.log(key);
		console.log(value);
		var obj = $.parseJSON(value);
		console.log(obj);
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

function displayXMLData(xml) {
	console.log("XML output");
	var obj = $(xml);
	obj.find("item").each(function(){
		var item = $(this);
		console.log(item);
		var itemSelect = $(item.find("itemSelect"));
		var itemNumber = $(item.find("itemNumber"));
		var itemColor = $(item.find("itemColor"));
		var itemPrice = $(item.find("itemPrice"));
		var quantity = $(item.find("quantity"));
		var giftWrapped = $(item.find("giftWrapped"));
		var applyCouponCode = $(item.find("applyCouponCode"));
		var receiveEmail = $(item.find("receiveEmail"));
		var select = $(item.find("select"));
		var textarea = $(item.find("textarea"));
		      
		$(document.body).append($('<br>'));
		$(document.body).append($('<hr>'));
		var makeDiv = $('<div>');
		makeDiv.attr("id", "items");
		var makeList = $('<ul>');
		makeDiv.append(makeList);
		$(document.body).append(makeDiv);
		$('#items').show;
		
		var makeli = $('<li>');
		var linksLi = $('<li>');
		makeList.append(makeli);
		var makeSubList = $('<ul>');
		makeli.append(makeSubList);
		
		getImage(itemSelect.text(),makeSubList);
		
		var makeSubli = $('<li>').text(function() { return "Item: " + itemSelect.text(); });
		makeSubList.append(makeSubli);
		makeSubli = $('<li>').text(function() { return "SKU: " + itemNumber.text(); });
		makeSubList.append(makeSubli);
		makeSubli = $('<li>').text(function() { return "Color: " + itemColor.text(); });
		makeSubList.append(makeSubli);
		makeSubli = $('<li>').text(function() { return "Price: " + itemPrice.text(); });
		makeSubList.append(makeSubli);
		makeSubli = $('<li>').text(function() { return "Quantity: " + quantity.text(); });
		makeSubList.append(makeSubli);
		makeSubli = $('<li>').text(function() { return "Gift Wrapped: " + giftWrapped.text(); });
		makeSubList.append(makeSubli);
		makeSubli = $('<li>').text(function() { return "Apply Coupon Code: " + applyCouponCode.text(); });
		makeSubList.append(makeSubli);
		makeSubli = $('<li>').text(function() { return "Receive Email: " + receiveEmail.text(); });
		makeSubList.append(makeSubli);
		makeSubli = $('<li>').text(function() { return "Item: " + select.text(); });
		makeSubList.append(makeSubli);
		makeSubli = $('<li>').text(function() { return "Feedback: " + textarea.text(); });
		makeSubList.append(makeSubli);
		
	});
		
	console.log("end displayXMLData");
}

function displayCSVData(csv) {
	var lines = csv.split("\r");
	console.log(lines);
	// The lines variable is now an array of lines of text.
	console.log(lines.length);
	for (var lineNum = 0; lineNum < lines.length; lineNum++) {
		// Get the current line/row
		var row = lines[lineNum];
		var columns = row.split(",");
		// The columns variable is now an array.
		
		if (lineNum > 0) {
			console.log(columns);
			
			$(document.body).append($('<br>'));
			$(document.body).append($('<hr>'));
			var makeDiv = $('<div>');
			makeDiv.attr("id", "items");
			var makeList = $('<ul>');
			makeDiv.append(makeList);
			$(document.body).append(makeDiv);
			$('#items').show;
			
			var makeli = $('<li>');
			var linksLi = $('<li>');
			makeList.append(makeli);
			var makeSubList = $('<ul>');
			makeli.append(makeSubList);
			
			getImage(columns[0],makeSubList);
			
			var makeSubli = $('<li>').text(function() { return "Item: " + columns[0]; });
			makeSubList.append(makeSubli);
			makeSubli = $('<li>').text(function() { return "SKU: " + columns[1]; });
			makeSubList.append(makeSubli);
			makeSubli = $('<li>').text(function() { return "Color: " + columns[2]; });
			makeSubList.append(makeSubli);
			makeSubli = $('<li>').text(function() { return "Price: " + columns[3]; });
			makeSubList.append(makeSubli);
			makeSubli = $('<li>').text(function() { return "Quantity: " + columns[4]; });
			makeSubList.append(makeSubli);
			makeSubli = $('<li>').text(function() { return "Gift Wrapped: " + columns[5]; });
			makeSubList.append(makeSubli);
			makeSubli = $('<li>').text(function() { return "Apply Coupon Code: " + columns[6]; });
			makeSubList.append(makeSubli);
			makeSubli = $('<li>').text(function() { return "Receive Email: " + columns[7]; });
			makeSubList.append(makeSubli);
			makeSubli = $('<li>').text(function() { return "Item: " + columns[8]; });
			makeSubList.append(makeSubli);
			makeSubli = $('<li>').text(function() { return "Feedback: " + columns[9]; });
			makeSubList.append(makeSubli);
		}
	}
	
}