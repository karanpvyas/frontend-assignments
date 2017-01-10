//appendchild to karna hi padega na!
//read about cloneNode method ------
// is using innerHTML a good thing?
//can call onclick even  if js loaded later, but cannot bind anything to it, right?

//data storage
var data = [
  {
    'roomType' : 'Standard',
    'rate' : 1000
  },
  {
    'roomType' : 'Semi-Deluxe',
    'rate' : 2000
  },
  {
    'roomType' : 'Deluxe',
    'rate' : 3000
  },
  {
    'roomType' : 'Suite',
    'rate' : 4000
  }
]

var sortingInformation = {
  sortedBy:'rate',
  sortOrder:'ascending'
}

//this func must be made in lesser lines.
var sortData = function(by){
  if (by === 'type'){
    if(sortingInformation.sortedBy === 'type'){
      if(sortingInformation.sortOrder === 'ascending'){
        //do type desc
        data.sort(function(a, b){
          return a.roomType < b.roomType ;
        });
        sortingInformation.sortOrder='descending';
        document.querySelector('#roomTypeArrow').className = 'glyphicon glyphicon-arrow-down';
      }else if(sortingInformation.sortOrder == 'descending'){ // this check isnt really needed, but just for integrity...
        //do type asce
        data.sort(function(a, b){
          return a.roomType > b.roomType ;
        });
        sortingInformation.sortOrder='ascending';
        document.querySelector('#roomTypeArrow').className = 'glyphicon glyphicon-arrow-up';
      }
    }else {
      //do type asce
      data.sort(function(a, b){
        return a.roomType > b.roomType ;
      });
      sortingInformation.sortOrder='ascending';
      sortingInformation.sortedBy='type';
      document.querySelector('#roomTypeArrow').className = 'glyphicon glyphicon-arrow-up';
      document.querySelector('#roomRateArrow').className = '';
    }
  }else if (by === 'rate'){ // this check isnt really needed, but just for integrity...
    if(sortingInformation.sortedBy === 'rate'){
      if(sortingInformation.sortOrder === 'ascending'){
        //do rate desc
        data.sort(function(a, b){
          return a.rate < b.rate ;
        });
        sortingInformation.sortOrder='descending';
        document.querySelector('#roomRateArrow').className = 'glyphicon glyphicon-arrow-down';
      }else if(sortingInformation.sortOrder == 'descending'){ // this check isnt really needed, but just for integrity...
        //do rate asce
        data.sort(function(a, b){
          return a.rate > b.rate ;
        });
        sortingInformation.sortOrder='ascending';
        document.querySelector('#roomRateArrow').className = 'glyphicon glyphicon-arrow-up';
      }
    }else {
      //do rate asce
      data.sort(function(a, b){
        return a.rate > b.rate ;
      });
      sortingInformation.sortOrder='ascending';
      sortingInformation.sortedBy='rate';
      document.querySelector('#roomRateArrow').className = 'glyphicon glyphicon-arrow-up';
      document.querySelector('#roomTypeArrow').className = '';
    }
  }else{
    console.log('something bad happened.')
  }
  // console.log(data);
  displayRooms();
}

//should get rid of this variable, but eh!
var roomRates = {
  'Standard':1000,
  'Semi-Deluxe':2000,
  'Deluxe':3000,
  'Suite':4000
}

var roomsBooked = {
 //sample 'roomType' : numOfRoomsBooked
}

//to change the gross total of a room's total, in the individual rows
var changeGrossValue = function(roomType, rate){
  let numOfRooms = event.target.value;
  document.querySelector('#'+roomType+'_grossTotal').innerHTML = numOfRooms * rate;
  //change the roomsBooked var
  if(numOfRooms===0){
    delete roomsBooked[roomType];
  }else{
    roomsBooked[roomType] = numOfRooms;
  }
  //must change the total, so...
  changeTotal(); // should put this.changeTotal here or what?
}

//to change the total
var changeTotal = function(){
  let sum = 0;
  Object.keys(roomsBooked).forEach(function(roomType){
    sum+=roomsBooked[roomType]*roomRates[roomType]
  });
  document.querySelector('#total').innerHTML = sum;
  changeNetTotal(); //should use this here?
}

//to change the net total
var changeNetTotal = function(){
  document.querySelector('#netTotal').innerHTML=(
    parseInt(document.querySelector('#total').innerHTML)*(100-document.querySelector('#discount').value)*0.01
  );
}

//putting template outside the function so as it doenst need to be "got" everytime
var template = document.querySelector('#template');

var displayRooms = function(){
  var bookingTable = document.querySelector('#bookingTable');
  //emptying it first
  while (bookingTable.firstChild) {
    bookingTable.removeChild(bookingTable.firstChild);
  }
  for(var i = 0; i<data.length; i++){
    var room = data[i];
    var clone = template.content.cloneNode(true);
    var spans = clone.querySelectorAll('span');
    spans[0].innerHTML = room.roomType;
    spans[1].innerHTML = room.rate;
    clone.querySelector('input').id = room.roomType + '_num'; // eg. Deluxe_num (num of rooms)
    clone.querySelector('input').onclick = changeGrossValue.bind(this, room.roomType, room.rate); // wooooooo
    clone.querySelector('input').onkeyup = changeGrossValue.bind(this, room.roomType, room.rate); // wooooooo
    if(room.roomType in roomsBooked){
      clone.querySelector('input').value = roomsBooked[room.roomType];
    }else{
      clone.querySelector('input').value = 0;
    }
    spans[2].innerHTML = room.rate * clone.querySelector('input').value;
    spans[2].id = room.roomType + '_grossTotal'
    bookingTable.appendChild(clone);
  }
}

displayRooms();
