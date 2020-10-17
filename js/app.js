'use strict';

console.log('hello world'); {

}

///Store Constructor
function Store(locationName,minCust,maxCust,avgCookieSale){
	this.minCust = minCust;
	this.maxCust = maxCust;
	this.avgCookieSale = avgCookieSale;
	this.locationName = locationName;
	this.hoursOfOperation = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];
	this.hourlySales = [];
	this.totalSales = 0;
	
	//Generate today's simulated hourly sales
	this.getHourlySales = function(){
		if(this.hourlySales === undefined || this.hourlySales.length==0){
			this.totalSales=0;
			var customerCount = 0;
			var salesCount = 0;
			for(var i=0; i < this.hoursOfOperation.length; i++){
				var hour = this.hoursOfOperation[i];
				var numberOfCustomers = this.getRandomCustomerCount();
				var cookieSales = Math.ceil(numberOfCustomers * this.avgCookieSale);
				
				//Increment total cookie sales
				this.totalSales += cookieSales;
				
				//Add this hours sales to array
				this.hourlySales.push(hour +": "+cookieSales+" cookies");
			}
		}
		return this.hourlySales;
	};
	
	//Generate a random customer count based on the min and max customer counts
	this.getRandomCustomerCount = function(){
		return Math.floor(Math.random() * (this.maxCust - this.minCust)) + this.minCust;
	};
	
	//Render this store's sales in the DOM
	this.renderHourlySales = function(){
		
		//Get parent element
		var store = document.getElementById(this.locationName.toLowerCase());
	
		//Render the locations name
		var locationHeader = document.createElement('h2');
		locationHeader.textContent = this.locationName;
		
		//Render the houly sales in an unordered list
		var locationHourlySales = document.createElement('ul');
		var sales = this.getHourlySales();
		for(var i=0; i < sales.length; i++){
			
			//Render houly sale count
			var sale = document.createElement('li');
			sale.textContent = sales[i];
			
			//Append sale count to the list of sales
			locationHourlySales.appendChild(sale);
		}
		
		//Render the total sales
    var totalSales = document.createElement('li');
    totalSales.textContent = this.totalSales;
		locationHourlySales.appendChild(totalSales);
		
		//Add everything to the store page element
		store.appendChild(locationHeader);
		store.appendChild(locationHourlySales);
	};
}

  var seattle = new Store("Seattle", 23, 65, 6.3);
  seattle.renderHourlySales();

  var tokyo = new Store("Tokyo", 3, 24, 1.2);
  tokyo.renderHourlySales();

  var dubai = new Store("Dubai", 11, 38, 3.7);
  dubai.renderHourlySales();

  var paris = new Store("Paris", 20, 38, 2.3);
  paris.renderHourlySales();

  var lima = new Store("Lima", 2, 16, 4.6);
  lima.renderHourlySales();

// the pattern
// creat element
// give it content
// append to the DOM
// var article = document.createElement('article');
// parentElement.appendChild(article);

//var h2 = document.createElement('h2');
//h2.textContent = seattle.name;
//article.appendChild(h2);

//var p = document.createElement('p');
//p.textContent = `${seattle.name} is the location`;
//article.appendChild(p);

// var seattle = {
//  name: 'Seattle',
//  minCust: 23,
//  maxCust: 65,
//  avgCookieSale: 6.3,
// }

// var tokyo = {
//  name: 'Tokyo',
//  minCust: 3,
//  maxCust: 24,
//  avgCookieSale: 1.2,
// }

//var dubai = {
//  name: 'Dubai',
//  minCust: 11,
//  maxCust: 38,
//  avgCookieSale: 3.7,
// }

//var paris = {
//  name: 'Paris',
//  minCust: 20,
//  maxCust: 38,
//  avgCookieSale: 2.3,
// }

// var lima = {
//  name: 'Lima',
//  minCust: 2,
//  maxCust: 16,
//  avgCookieSale: 4.6,
// }



// Store Constructor