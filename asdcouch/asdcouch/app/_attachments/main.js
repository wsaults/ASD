$(document).ready(function() {
	console.log("Ready!");
	
	$.ajax({
      url: "_view/items",
      dataType: "json",
      success: function(data){
      	console.log("Success");
      	$.each(data.rows, function(key, item) {
      		var itemNumber = item.value.itemNumber
      		, itemSelect = item.value.itemSelect
      		, itemColor = item.value.itemColor
      		, itemPrice = item.value.itemPrice
      		, quantity = item.value.quantity
      		, giftWrapped = item.value.giftWrapped
      		, applyCouponCode = item.value.applyCouponCode
      		, receiveEmail = item.value.receiveEmail
      		, select = item.value.select
      		, textarea = item.value.textarea;
      		
      		$('#itemlist').append(
      			$('<li>').append($('<a>').attr("href", "#").text(item.key)).append(
      				$('<ul>').append(
      					$('<li>').text(itemNumber[0] + " " + itemNumber[1]).add(
      						$('<li>').text(itemSelect[0] + " " + itemSelect[1]).add(
      							$('<li>').text(itemColor[0] + " " + itemColor[1]).add(
      								$('<li>').text(itemPrice[0] + " " + itemPrice[1]).add(
      									$('<li>').text(quantity[0] + " " + quantity[1]).add(
      										$('<li>').text(giftWrapped[0] + " " + giftWrapped[1]).add(
      											$('<li>').text(applyCouponCode[0] + " " + applyCouponCode[1]).add(
      												$('<li>').text(receiveEmail[0] + " " + receiveEmail[1]).add(
      													$('<li>').text(select[0] + " " + select[1]).add(
      														$('<li>').text(textarea[0] + " " + textarea[1])
      													)
      												)
      											)
      										)
      									)
      								)
      							)
      						)
      					)
      				)
      			)
      		);
      	});
      	
      },
      error: function(){
         console.log("Error.")
      },
      complete: function(data) {
            if(data !== null){
            	$('#itemlist').listview('refresh');
            }
      }
   });
});