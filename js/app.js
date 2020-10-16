'use strict';

console.log('hello world');{

}

var parentElement = document.getElementById('seattle');
// console.log(parentElement);

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

var ul = document.createElement('ul');
article.appendChild(ul);

for (var i = 0; i < seattle.name.length; i++) {
  var li = document.createElement('li');
  li.textContent = seattle.name[i];
  ul.appendChild(li);
}





var tokyo = {
  name: 'Tokyo',
  minCust = 3,
  maxCust = 24,
  avgCookieSale = 1.2,
}

var dubai = {
  name: 'Dubai',
  minCust = 11,
  maxCust = 38,
  avgCookieSale = 3.7,
}