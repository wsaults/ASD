function(doc) {
  if (doc._id.substr(0, 8) === "project:") {
    emit(doc._id.substr(8), {
    	"itemSelect": doc.itemSelect,
    	"itemNumber" : doc.itemNumber,
		"itemColor": doc.itemColor,
		"itemPrice": doc.itemPrice,
		"quantity": doc.quantity,
		"giftWrapped": doc.giftWrapped,
		"applyCouponCode": doc.applyCouponCode,
		"receiveEmail": doc.receiveEmail,
		"select": doc.select,
		"textarea": doc.textarea
    });
  }
};