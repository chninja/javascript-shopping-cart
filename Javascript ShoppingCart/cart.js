
//@author Catherine Higgins
//Need to add the x functionality near an item for complete delete

console.log('cart.js started')

//Here is a price index based on item id to be used as reference
var prices = [100.25, 30.25, 12.45];

//This is for the input fields
var x = document.getElementsByName("MicroScope Kit")
var y = document.getElementsByName("Planetarium game")
var z = document.getElementsByName("Dinosaur toy")


//currently set up as an empty array at the start of each session
var cart = [];

//Listen for quantity changes
var shop = document.querySelector("#shop");
shop.addEventListener("input", quantityChange, false);

//This code listens for all the children in 
//the shop and doesn't not bubble up to the parent shop div
function quantityChange(e) {

    if (e.target !== e.currentTarget) {
    
      var id = e.target.id
     
      //Determine if item is in cart already
      var foundIndex = isItemInCart(id,cart)
      
     
      //If item is already in the cart update quantity
      if(foundIndex !== -1){
      	 if(e.target.value == 0){
      	 	//delete
      	 	cart.splice([foundIndex],1)
  
      	 } else {
      	 	//There is match
      	    cart[foundIndex].quantity = e.target.value
      	 }
      } 
      //Add item to cart
      else {
      	//Value cannot be 0
      	if(e.target.value != 0){
      	 	cart.push({id: e.target.id, item:e.target.name, prices: prices[e.target.id-1], quantity: e.target.value})
      	}
      }
   	  //Render output
      renderedCart()
    }
    //Stop propagation
    e.stopPropagation();
}


//rendertoTable
var renderedCart = function() {

	//Append on many items in the cart
	document.querySelector('#addContent').innerHTML = ""
	document.querySelector('#addContent1').innerHTML = ""
	const newParagraph = document.createElement('h3');
	//Update cart quantities
	newParagraph.textContent = message()
	document.querySelector('#addContent1').appendChild(newParagraph);


	//Append items to table
	
	var table = document.querySelector('#table')
	table.innerHTML=""
	
		//Set up header
	 	var item = document.createTextNode("Item")
	 	var qty = document.createTextNode("Qty")
	 	var pri = document.createTextNode("Price")
	   	var tot = document.createTextNode("Total")
	   	var space = document.createTextNode("")

	   	var row1 = document.createElement("tr");
	 	var cell1 = document.createElement("td");
	    cell1.appendChild(item);
	    row1.appendChild(cell1);

	    cell1 = document.createElement("td");
	    cell1.appendChild(qty);
	    row1.appendChild(cell1);

	    cell1 = document.createElement("td");
	    cell1.appendChild(pri);
	    row1.appendChild(cell1);

	    cell1 = document.createElement("td");
	    cell1.appendChild(tot);
	    row1.appendChild(cell1);

	    cell1 = document.createElement("td");
	    cell1.appendChild(space);
	    row1.appendChild(cell1);

	    table.appendChild(row1);
	for (var i = 0; i < cart.length; i++) {
		//Create removal button
		const removeButton = document.createElement('button')
		removeButton.textContent = 'x';
	   
	    // creates a table row
	    var row = document.createElement("tr");

	 	var cell;
	 	
	 
		//Create TextNode to insert in column
		var cellTextname = document.createTextNode(cart[i].item)
		var cellTextqty = document.createTextNode(cart[i].quantity)
		var cellTextprices = document.createTextNode(cart[i].prices)
	   	var cellTexttotal = document.createTextNode(perRowtotal(cart[i].quantity,cart[i].prices).toFixed(2))
	    var remove = document.createTextNode(removeButton)

	    removeButton.setAttribute('id', cart[i].id);

	    //Append to column and then row and repeat process
	    cell = document.createElement("td");
	    cell.appendChild(cellTextname);
	    row.appendChild(cell);

	    cell = document.createElement("td");
	    cell.appendChild(cellTextqty);
	    row.appendChild(cell);

	    cell = document.createElement("td");
	    cell.appendChild(cellTextprices);
	    row.appendChild(cell);

	    cell = document.createElement("td");
	    cell.appendChild(cellTexttotal);
	    row.appendChild(cell);

	    cell = document.createElement("td");
	    cell.appendChild(removeButton);
	    row.appendChild(cell);

	    //Append the row
		table.appendChild(row);
		
	
	}

	 

	//Append total costs
    var cost = totalCost()
	var hst = calculateTaxes(cost)
	var grandTotal = cost + hst;
	
	document.querySelector('#totalpretax').innerHTML = "";
	document.querySelector('#taxes').innerHTML = "";
	document.querySelector('#total').innerHTML = "";

	const newParagraph = document.createElement('p');
	newParagraph.textContent = `Total:  $${cost.toFixed(2)} `;
	document.querySelector('#totalpretax').appendChild(newParagraph);
	const newP = document.createElement('p');

	newP.textContent = `HST:  $${hst.toFixed(2)} `;
	document.querySelector('#taxes').appendChild(newP);
	const newP = document.createElement('p');
	
	newP.textContent = `Grand Total: $${grandTotal.toFixed(2)} `;
	document.querySelector('#taxes').appendChild(newP);

	


}



var message = function() {
	if(cart.length == 0){
		return `You cart is empty`;
	} else {
		var totalItems = 0;
		cart.forEach(function(item) {
			totalItems += 	parseInt(item.quantity, 10)
		})
		return `You have ${totalItems} items in your cart`;	
	}
}

//emptycart
var empty = document.querySelector("#empty");
empty.addEventListener("click", function(){
		//deleted all cart items
		cart.splice(0,cart.length)
		//update table
	 	renderedCart()
	 	//Reset values
	 	x[0].value = "0"
		y[0].value ="0"
		z[0].value = "0"
		
})
//calculate per total per line
var perRowtotal = function(qty, prices){
	return total = qty * prices
}

//calculate total
var totalCost  = function(){
	var sum = 0;
	cart.forEach(function (item){
		sum += item.prices * item.quantity
	});
	return sum;
}

// calculate taxes on item
var calculateTaxes = function(cost){
	return cost * (.18)
}

//Is the item already in the cart if so just update quantity
var isItemInCart = function(id, cart) {
    for (var i = 0;  i< cart.length; i += 1) {
        if (cart[i].id === id) {
            return i;
        }
    } 
    return -1;
}

var table1 = document.querySelector("#table");
table1.addEventListener('click', function(e){

		var result = isItemInCart(e.target.id, cart)
		cart.splice(result,1)
	  	renderedCart()
	  	if(e.target.id == 1) {
	  			x[0].value = "0"
	  	} else if(e.target.id == 2){
	  			y[0].value = "0"
	  	}else{
	  			z[0].value = "0"
	  	}
	  	e.stopPropagation()
	  

	 }, false);
