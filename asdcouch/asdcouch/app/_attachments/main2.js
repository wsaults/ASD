$('#home').live("pageshow", function() {
	$.couch.db("development").view("app/items", {
		success: function(data) {
			console.log(data);
			$('#itemlist').empty();
			$.each(data.rows, function(index, v) {
				var obj = v.value;
				//console.log(obj.select[1]);
				$('#itemlist').append(
					$('<li>').append(
						$('<a>')
							.attr("href", "item.html?items=" + v.key)
							.text(v.key + ': ' + obj.select[1])
					)
				);
			});
			$('#itemlist').listview('refresh');
		}
	});
});

var urlVars = function(urlData) {
	var urlParts = urlData.split('?');
	var urlPairs = urlParts[1].split('&');
	var urlValues = {};
	for (var pair in urlPairs) {
		var keyValue = urlPairs[pair].split('=');
		var key = decodeURIComponent(keyValue[0]);
		var value = decodeURIComponent(keyValue[1]);
		urlValues[key] = value;
	}
	//console.log('urlValues: ' + urlValues[key]);
	return urlValues;
};

$('#item').live("pageshow", function() {
	var urlData = $(this).data("url");
	//console.log('urlData: ' + urlData);
	var obj = urlVars(urlData);
	//console.log('obj: ' + obj);
	var object = obj.items;
	console.log('object: ' + object);
	
	$.couch.db("development").view("app/items", {
		success: function(data) {
			console.log(data);
			$('#itemDetails').empty();
			$.each(data.rows, function(index, v) {
				// If this is the item we are looking for
				// then get all of the item details.
				if (v.key === obj.items) {
					console.log(v.key);
					var o = v.value;
					$('#itemDetails').append(
						$('<li>').text(o.itemNumber[0] + " " + o.itemNumber[1]).add(
							$('<li>').text(o.itemSelect[0] + " " + o.itemSelect[1]).add(
								$('<li>').text(o.itemColor[0] + " " + o.itemColor[1]).add(
									$('<li>').text(o.itemPrice[0] + " " + o.itemPrice[1]).add(
										$('<li>').text(o.quantity[0] + " " + o.quantity[1]).add(
											$('<li>').text(o.giftWrapped[0] + " " + o.giftWrapped[1]).add(
												$('<li>').text(o.applyCouponCode[0] + " " + o.applyCouponCode[1]).add(
													$('<li>').text(o.receiveEmail[0] + " " + o.receiveEmail[1]).add(
														$('<li>').text(o.textarea[0] + " " + o.textarea[1])
													)
												)
											)
										)
									)
								)
							)
						)
					);
				}
			});
			$('#itemDetails').listview('refresh');
		}
	});
});

$('#delete').click(function () {
	$.couch.db.removeDoc({_id:"mydoc", _rev: "1-2345"
	}); 
});