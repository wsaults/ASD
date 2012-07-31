// Project: Deliverable 1
// Name: William Saults
// Term: 0612

// Wait until the DOM is ready
window.addEventListener("DOMContentLoaded", function() {

	// Global Variables
	var verifyValue,
		giftValue = "No",
		couponValue = "No",
		emailValue = "No"
/* 		selectGroup = ["*Choose an item","Watch","Wallet","Purse"] */
	;
	
	// getElementById Function
	function $(x){
		var element = document.getElementById(x);
		return element;
	}
	
	var errMsg = $('errors');
	
	function makeCats() {
		var forTag = document.getElementsByTagName("form")
/* 			selectLi = $('select') */
			;
/*
			var makeSelect = document.createElement('select');
			
			makeSelect.setAttribute("id", "groups");
			
		for(var i=0, j=selectGroup.length; i<j; i++) {
			var makeOption = document.createElement('option');
			var optText = selectGroup[i];
			makeOption.setAttribute("value",optText);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		}
		
		selectLi.appendChild(makeSelect);
*/
	}
	
	function setQuantityLabel() {
		console.log("Ran setQty");
		var qty = $('quantity').value;
/* 		$('quantityLabel').value = qty; */
	}
	
	function getSelectedRadio() {
		var radios = document.forms[0].verify;
		for(var i = 0; i < radios.length; i++) {
			if(radios[i].checked) {
				verifyValue = radios[i].value;
			}
		}
	}
	
	function getCheckBoxValue() {
		if($('giftWrapped').checked) {
			giftValue = $('giftWrapped').value;
		} else {
			giftValue = "No";
		}
		
		if($('applyCouponCode').checked) {
			couponValue = $('applyCouponCode').value;
		} else {
			couponValue = "No";
		}
		
		if($('receiveEmail').checked) {
			emailValue = $('receiveEmail').value;
		} else {
			emailValue = "No";
		}
	}
	
	function toggleControls(n) {
		switch(n) {
			case "on":
				$('itemForm').style.display = "none";
				$('clearAll').style.display = "inline";
				$('displayData').style.display = "none";
/* 				$('addNew').style.display = "inline"; */
				break;
			
			case "off":
				$('itemForm').style.display = "block";
				$('clearAll').style.display = "inline";
				$('displayData').style.display = "inline";
/* 				$('addNew').style.display = "none"; */
				$('items').style.display = "none";
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
			item.itemNumber = ["SKU:", $('itemNumber').value];
			item.itemColor = ["Color:", $('itemColor').value];
			item.itemPrice = ["Price:", $('itemPrice').value];
			item.quantity = ["Quantity:", $('quantity').value];
			// Checkboxes
			item.giftWrapped = ["Gift Wrapped:", giftValue];
			item.applyCouponCode = ["Apply Coupon Code:", couponValue];
			item.receiveEmail = ["Receive Email:", emailValue];
			// Radio
			item.verify = ["Verify:", verifyValue];
			// Select
			item.select = ["Item:", $('select').value];
			item.textarea = ["Feedback:", $('textarea').value];
		
		// Save the data into local storage
		localStorage.setItem(id, JSON.stringify(item));
		alert("Item saved.");
		
		window.location.reload();	
	}
	
	function validate(e) {
		// Define the elements we want to check
		var getGroup = $('groups');
		var getItemNumber = $('itemNumber'); // check for some format. ex: AAA###
		var getItemPrice = $('itemPrice'); // check for $##.## format
		var getQuantity = $('quantity'); // make sure it is a number
		var getTextArea = $('textarea'); // check for length 255 char
		
		// Reset Error Messages
		errMsg.innerHTML = "";
/*
		getGroup.style.border = "none";
		getItemNumber.sytle.border = "none";
		getItemPrice.sytle.border = "none";
		getQuantity.sytle.border = "none";
		getTextArea.sytle.border = "none";
*/
		
		// Get Error Messages
		var messageArray = [];
		
		// Group validation		
/*
		if(getGroup.value === "*Choose an item") {
			var groupError = "Please choose an Item.";
 			getGroup.style.border = "1px solid red"; 
			messageArray.push(groupError);
		}
*/
		
		// Item number validation
		if(getItemNumber.value === "") {
			var itemNumberError = "Please enter a valid item SKU";
/* 			getItemNumber.sytle.border = "1px solid red"; */
			messageArray.push(itemNumberError);
			
		}
		
		// Item price validation
		if(getItemPrice.value === "") {
			var itemPriceError = "Please enter a valid item price";
/* 			getItemPrice.sytle.border = "1px solid red"; */
			messageArray.push(itemPriceError);
		}
		
		// Item quantity validation
		if(getQuantity.value === "") {
			var itemQuantityError = "Please enter a valid item quantity";
/* 			getQuantity.sytle.border = "1px solid red"; */
			messageArray.push(itemQuantityError);
		}
		// Textarea validation
		if(getTextArea.value.length >= 255) {
			var textAreaError = "Please enter a 256 or less characters";
/* 			getTextArea.sytle.border = "1px solid red"; */
			messageArray.push(textAreaError);
		}
		
		if (messageArray.length >= 1) {
			for(var i=0, j=messageArray.length; i < j; i++) {
				var txt = document.createElement('li');
				txt.innerHTML = messageArray[i];
				errMsg.appendChild(txt);
			}
			e.preventDefault();
			return false;
		} else {
			// If everything validates, save the data.
			storeData(this.key);
		}
	}
	
	// Links and Submit Click Events
	var submit = $('submit');
	submit.addEventListener("click", validate);
	var qtyListener = $('quantity');
/* 	qtyListener.addEventListener("change", setQuantityLabel); */
	
	function editItem() {
		// Grab the data from our item in local storage.
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
		// Show the form
		toggleControls("off");
		
		// Populate the form fields with current localStorage values.
		$('select').value = item.select[1];
		$('itemNumber').value = item.itemNumber[1];
		$('itemColor').value = item.itemColor[1];
		$('itemPrice').value = item.itemPrice[1];
		$('quantity').value = item.quantity[1];
		$('select').value = item.select[1];
		$('textarea').value = item.textarea[1];

		// Checkboxes
		if (item.giftWrapped[1] === "Yes") {
			$('giftWrapped').setAttribute("checked", "checked");
		}
		if (item.applyCouponCode[1] === "Yes") {
			$('applyCouponCode').setAttribute("checked", "checked");
		}
		if (item.receiveEmail[1] === "Yes") {
			$('receiveEmail').setAttribute("checked", "checked");
		}
		
		// Radio
		var radios = document.forms[0].verify;
		for (var i=0; i<radios.length; i++) {
			if (radios[i].value === "human" && item.verifyValue[1] == "human") {
				radios[i].setAttribute("checked", "checked");
			} else if (radios[i].value === "martian" && item.verifyValue[1] == "martian") {
				radios[i].setAttribute("checked", "checked");
			} else if (radios[i].value === "robot" && item.verifyValue[1] == "robot") {
				radios[i].setAttribute("checked", "checked");
			}
		}
		
		// Remove the initial listener from the input 'save' button.
		submit.removeEventListener("click", storeData);
		// Change the submit button value to edit
		$('submit').value = "Edit Item";
		var editSubmit = $('submit');
		// Save the key value established in this function as a property oof the editSubmit event
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;
	}
	
	function deleteItem() {
		var ask = confirm("Are you sure you want to delete this item?");
		if(ask) {
			localStorage.removeItem(this.key);
			alert("Item was deleted.");
			window.location.reload();
		} else {
			alert("Item was NOT deleted.");
		}
	}
	
	// Creates the edit and delete links for each item
	function makeItemLinks(key, linksLi) {
		var editLink = document.createElement('a');
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Item";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
		
		var breakTag = document.createElement('br');
		linksLi.appendChild(breakTag);
		
		var deleteLink = document.createElement('a');
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Item";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
		
		var hrTag = document.createElement('hr');
		linksLi.appendChild(hrTag);
	}
	
	function getData() {
		toggleControls("on");
		if(localStorage.length === 0) {
			alert("There is no data in local storage. Default data has been added.");
			autoFillData();
		}
		console.log("Getting data.");
		document.body.appendChild(document.createElement('br'));
   		document.body.appendChild(document.createElement('hr'));
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$('items').style.display = "block";
		for(var i=0, len=localStorage.length; i < len; i++) {
			var makeli = document.createElement('li');
			var linksLi = document.createElement('li');
			makeList.appendChild(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var obj = JSON.parse(value);
			var makeSubList = document.createElement('ul');
			makeli.appendChild(makeSubList);
			getImage(obj.select[1],makeSubList);
			for(var n in obj) {
				var makeSubli = document.createElement('li');
				makeSubList.appendChild(makeSubli);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubli.innerHTML = optSubText;
				makeSubList.appendChild(linksLi);
			}
			makeItemLinks(localStorage.key(i), linksLi); // Create our edit and delete links for each item
		}
	}
	
	function autoFillData() {
		// Store the JSON Object into local storage.
		for(var n in json) {
			var id = Math.floor(Math.random()*100000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
	}
	
	// Get the image depending on what value was selected.
	function getImage(catName, makeSubList) {
		var imageLi = document.createElement('li');
		makeSubList.appendChild(imageLi);
		var newImg = document.createElement('img');
		var setSrc = newImg.setAttribute("src", "images/" + catName + ".png");
		console.log("The catName is: " + catName);
		imageLi.appendChild(newImg);
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
		$('responsiveH').style.display = "inline";
		$('responsiveM').style.display = "none";
		$('responsiveR').style.display = "none";
	}
	
	function martianTest() {
		$('responsiveH').style.display = "none";
		$('responsiveM').style.display = "inline";
		$('responsiveR').style.display = "none";
	}
	function robotTest() {
		$('responsiveH').style.display = "none";
		$('responsiveM').style.display = "none";
		$('responsiveR').style.display = "inline";
	}
	
	var clearAll = $('clearAll', clearLocalData);
	clearAll.addEventListener("click", clearLocalData);

	var displayData = $('displayData');
	displayData.addEventListener("click", getData);
	
	var isHuman = $('h', humanTest);
	isHuman.addEventListener("click", humanTest);
	isHuman.addEventListener("touchstart", humanTest);
	
	var isMartian = $('m', martianTest);
	isMartian.addEventListener("click", martianTest);
	isMartian.addEventListener("touchstart", martianTest);
	
	var isRobot = $('r', robotTest);
	isRobot.addEventListener("click", robotTest);
	isRobot.addEventListener("touchstart", robotTest);
	
/* 	makeCats(); */
	
	setQuantityLabel();
	
	$('responsiveH').style.display = "inline";
	$('responsiveM').style.display = "none";
	$('responsiveR').style.display = "none";

}); // End "DOMContentLoaded" listener