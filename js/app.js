'use strict';

//Declare a constant variable to use for all the stores hours. Assuming they all have the same hours for now
const HOURS_OF_OPERATION = ['6AM', '7AM', '8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM'];

//Instantiate all the stores
var seattle = new Store("Seattle",23,65,6.3);
var tokyo = new Store("Tokyo",3,24,1.2);
var dubai = new Store("Dubai",11,38,3.7);
var paris = new Store("Paris",20,38,2.3);
var lima = new Store("Lima",2,16,4.6);

//Add all the stores to an array to make things easier
var stores = [seattle, tokyo, dubai, paris, lima];

//Get the store form
var addStoreForm = document.getElementById("addStoreForm");
addStoreForm.addEventListener('submit', addNewStoreSales);

//Add a new store's sales to the table
function addNewStoreSales(event){
	event.preventDefault();
	if(!event.target.checkValidity()){
		return;
	}

	//Get all the store data from the form fields
	var locationNameInput = document.getElementById("locationName");
	var minCustInput = document.getElementById("minCust");
	var maxCustInput = document.getElementById("maxCust");
	var avgCookieSaleInput = document.getElementById("avgCookieSale");

	//Parse out the input values
	var locationName = locationNameInput.value;
	var minCust = minCustInput.value;
	var maxCust = maxCustInput.value;
	var avgCookieSale = avgCookieSaleInput.value;

	//Create a new store object
	var newStore = new Store(locationName,minCust,maxCust,avgCookieSale);

	//Don't need these any more. Clear all the input fields for the next form submit. 
    locationNameInput.value = "";
    minCustInput.value = "";
    maxCustInput.value = "";
    avgCookieSaleInput.value = "";

	//Add a new store to the array, might need to refer to this store later
	stores.push(newStore);

	//render this store in the store table
	newStore.renderHourlySales(getStoreTable());

	//re-render the store table footer to include the totals for the newly added store
	renderStoreTableFooter(stores);
}

//Render the store table
renderStoreTable(stores);

//Store Constructor
function Store(locationName,minCust,maxCust,avgCookieSale){
	this.minCust = minCust;
	this.maxCust = maxCust;
	this.avgCookieSale = avgCookieSale;
	this.locationName = locationName;
	this.hourlySales = new Map();

	//Returns the number of cookies sold at a specified time
	this.getSalesAtHour = function(timeOfSale){
		var cookiesSold = 0;
		if(this.getHourlySales().has(timeOfSale)){
			cookiesSold = this.getHourlySales().get(timeOfSale);
		}
		return cookiesSold;
	};
	
	//Returns the total number of cookies sold for this store
	this.getTotalCookiesSold = function(){
		var totalCookiesSold = 0;
		var sales = this.getHourlySales().entries();
		//Loop through all the sales entries from the hourly sales map
		for(var cookiesSold of sales){
			totalCookiesSold += cookiesSold;
		}
		return totalCookiesSold;
	};
	
	//Generate today's simulated hourly sales
	this.getHourlySales = function(){
		//If we havent genrated sales yet, create some.
		//Otherwise, there's no need to generate them again... return what we got.
		if(this.hourlySales.size < HOURS_OF_OPERATION.length){
			var customerCount = 0;
			var salesCount = 0;
			for(var i=0; i < HOURS_OF_OPERATION.length; i++){
				var hour = HOURS_OF_OPERATION[i];
				var numberOfCustomers = this.getRandomCustomerCount();
				var cookieSales = Math.ceil(numberOfCustomers * this.avgCookieSale);
				
				//Add this hour's sales to the Map 
				//The hour is the key and the number of cookies sold is the value
				this.hourlySales.set(hour,cookieSales);
			}
		}
		return this.hourlySales;
	};
	
	//Generate a random customer count based on the min and max customer counts
	this.getRandomCustomerCount = function(){
		return Math.floor(Math.random() * (this.maxCust - this.minCust)) + this.minCust;
	};
	
	//Render this store's sales in the DOM
	this.renderHourlySales = function(tableElement){
		
		//Get parent element
		var storeTable = tableElement;
		
		//Create a new row in the table for this store
		var storeTableRow = document.createElement('tr')
	
		//Render the locations name
		var storeLocation = document.createElement('td');
		storeLocation.textContent = this.locationName;
		
		//Append this location name as the first item in this row
		storeTableRow.appendChild(storeLocation);
		
		//Render the houly sales in this store's table row
		var locationHourlySales = document.createElement('ul');
		var sales = this.getHourlySales();
		for(var i=0; i < HOURS_OF_OPERATION.length; i++){
			var hour = HOURS_OF_OPERATION[i];
			var cookiesSold = this.getSalesAtHour(hour);
			
			//Add this hour's sales to the table row
			var thisHoursSales = document.createElement('td');
			thisHoursSales.textContent = cookiesSold;
			storeTableRow.appendChild(thisHoursSales);
		}
		
		//Add this store's sales row to the store table
		storeTable.appendChild(storeTableRow);
	};
}

//Get the store table. Created method to grab it so I'm not repeating myself
function getStoreTable(){
	return document.getElementById("store-table");
}

//Render the store table header containing store hours
function renderStoreTableHeader(){
	//Get parent element
	var storeTable = getStoreTable();
	var headerRow = document.createElement('tr');
	
	var blankCell = document.createElement('td');
	headerRow.appendChild(blankCell);
	
	for(var i=0; i<HOURS_OF_OPERATION.length; i++){
		var hourCell = document.createElement('td');
		hourCell.textContent = HOURS_OF_OPERATION[i];
		headerRow.appendChild(hourCell);
	}
	storeTable.appendChild(headerRow);
}

//Render the store table footer containing sales totals
function renderStoreTableFooter(stores){
	//Get parent element
	var storeTable = getStoreTable();

	//Check if a footer containing the total cookie sales already exists
	 var totalCookieSales = document.getElementById("totalCookieSales");
	 if(totalCookieSales){
	 	//Remove it from the DOM, we probably want to update it with new data
	 	totalCookieSales.remove();
	 }

	//Create a new foorter with an id so we can easily find it again later
	var footerRow = document.createElement('tr');
	footerRow.setAttribute("id","totalCookieSales");
	
	var totalRowTitle = document.createElement('td');
	totalRowTitle.textContent = "Totals"
	footerRow.appendChild(totalRowTitle);
	
	for(var i=0; i<HOURS_OF_OPERATION.length; i++){
		var hour = HOURS_OF_OPERATION[i];
		var cookiesSoldThisHour = 0;
		for(var s=0; s<stores.length; s++){
			var cookiesSoldAtThisStoreAtThisHour = stores[s].getSalesAtHour(hour);
			cookiesSoldThisHour += cookiesSoldAtThisStoreAtThisHour;
		}
		var totalCookiesSoldThisHourAcrossAllStores = document.createElement('td');
		totalCookiesSoldThisHourAcrossAllStores.textContent = cookiesSoldThisHour;
		footerRow.appendChild(totalCookiesSoldThisHourAcrossAllStores);
	}
	storeTable.appendChild(footerRow);
}

//Render an array of stores in a table
function renderStoreTable(stores){
	//First: render the table header
	renderStoreTableHeader();
	
	//Second: render each store in a table row inside the store table
	for(var i=0; i<stores.length; i++){
		stores[i].renderHourlySales(getStoreTable());
	}
	
	//Third: render the table footer
	renderStoreTableFooter(stores)
}