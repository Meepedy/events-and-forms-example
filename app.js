//Before we can add an event listener we need to get our element somehow.
var button1 = document.getElementById('btn1');
var button2 = document.getElementById('btn2');

//Almost every interaction you do on a webpage has an event associated with it. 
//Whether it be simply moving your mouse, clicking a button, or typing into a form.
//In order to utilize these events we have to add an event listener, whose job is to listen for these events happening.

//Here we add an event listener who listens for a click event on our button1 and runs iWasClicked.
//Make sure not to put () after iWasClicked otherwise it will execute immediately when the page loads and not when a button is clicked.
button1.addEventListener('click', iWasClicked);

function iWasClicked(){
  console.log('I was clicked');
};

//When button1 is clicked it just console logs I was clicked, but what if we want to know what button was clicked?
button2.addEventListener('click', whoWasClicked);

//When an event listener calls a function it automatically passes in an event object with all kinds of info about what happened.
//using event.target we can get the element that was clicked, the .id tells us the id of that element.
function whoWasClicked(event) {
  console.log(event.target.id + ' was clicked');

  //a shortcut instead of event.target is to just put this, this refers to the element in the context of our event
  console.log(this.id + " was clicked");
}

//Now we know how to add click events to a specfic button, but what about if I want to add an event listener to a group of buttons?
//Well up above we used getElementByID to get our buttons, which returns a single DOM element.
//Lets say we want to get all the buttons with a specific class.

//We can use getElementByClassName to return an array of buttons with the class name 'button'
var buttons = document.getElementsByClassName('buttons');

//buttons.addEventListener('click', weWereClicked)
// ^ This doesn't work because buttons is an array of elements, not a single element.

//We can solve that but creating a loop
for(var i = 0; i < buttons.length; i++){
  buttons[i].addEventListener('click', weWereClicked);
}

function weWereClicked() {
  console.log('we were clicked');
}

//Now we know how to add a click event to buttons, but what about those other page events I mentioned above.
//Lets try text input in a form.

//Just like before with our first 2 buttons we can use getElementById to get the form.
var input1 = document.getElementById('input1');

//Also just like before we add the event listener, but this time instead of click we created an event listener
//for input. Everytime someone inputs anything into the form it will fire the event.
input1.addEventListener('input', iChanged);

function iChanged(event) {
  //Text inputs have a value property that allows us to acces the text inside
  console.log(input1.value)
}

//Another form input we can use is a checkbox.
var check1 = document.getElementById('check1');

//Here we use the change event, so anytime the element changes it fires the event,
//in this case if the checkbox is check or unchecked
check1.addEventListener('change', amIchecked);

function amIchecked() {
  //remember that this referes to the element the event is on.
  console.log('Am I checked: ' + this.checked)
}

//Another common use for the change event is with dropdown menus
var dropdown1 = document.getElementById('drop1');

dropdown1.addEventListener('change', whatIsSelected);

function whatIsSelected() {
  //If you look in the html you'll see we used a <select> with <option> tags inside, each option tag has a value.
  //When you select something it sets our <select> tag's value to the value of the <option>
  console.log(dropdown1.value + " is selected.");
}

//Before we get to how this can all be used in Salmon Cookies I'd like to mention some shortcuts.

//It has been mentioned in previous lectures that you can chain together methods,
//here we chain together getElementByID and addEventListener instead of defining the variable and then adding
//the event listener on a seperate line.
//We can also just define our function right inside of our addEventListener arguments.
document.getElementById('btn5').addEventListener('click', function(){
  console.log(this.id + " was clicked");
//If this confuses you do what we did up above.
});

//So now you might be wondering how all this can be used in your Salmon Cookies project.
//So lets use a form to generate a table of people's names.

//Lets get our form.
var form = document.getElementById('nameForm');

//Lets get our text inputs
var firstName = document.getElementById('first');
var middleName = document.getElementById('middle');
var lastName = document.getElementById('last');

//Let's also get premade, empty table
//We don't use id here because there is only 1 table, but it still returns an array so we get the first element.
var table = document.getElementsByTagName('table')[0]

//<form>'s have a submit event for when the submit button is clicked.
form.addEventListener('submit', createTableRow);

//We create a constructor to store the names we get from our input
function Person(first, middle, last){
  this.first = first;
  this.middle = middle;
  this.last = last;
}

//render method to display it on the page
Person.prototype.render = function() {
  //Cool fact, Object.keys() converts your properties into an array.
  var tr = document.createElement('tr');
  var names = Object.values(this);
  for(var i = 0; i < names.length; i++){
    var td = document.createElement('td');
    console.log(names);
    td.textContent = names[i];
    tr.appendChild(td);
  };
  table.appendChild(tr);
};

function createTableRow(event){
  //Prevent default wasn't mentioned about but is something to know. it prevents the default behavior, form submission refreshes the page by default.
  event.preventDefault();

  //create a new person object by passing in the values from our text input
  var newPerson = new Person(firstName.value, middleName.value, lastName.value);
  newPerson.render();
};





  



