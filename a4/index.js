var width = 100;
var template = document.querySelector('#imageTemplate');

var fetchAnimateChange = function(){
  var element = this;
  $.ajax({
    url:'https://randomuser.me/api',
    dataType:'json',
    method:'GET',
    success: function(response){
      $(element).fadeOut(10); // image is loading before the img fades out, thats y 10.
      var clone = template.content.cloneNode(true);
      clone.querySelectorAll('img')[0].src = response.results[0].picture.large;
      clone.querySelectorAll('.name')[0].innerHTML = response.results[0].name.title +' '+ response.results[0].name.first +' '+ response.results[0].name.last + '\
      <br />'+response.results[0].phone +'<br />' +response.results[0].phone;
      // deleting all children
      while(element.firstChild){
        element.removeChild(element.firstChild);
      }
      element.appendChild(clone);
      $(element).fadeIn('slow');
      setTimeout(function(){
        fetchAnimateChange.call(allSegments[parseInt((Math.random()*15) + 1)]);
      }, 1500);
    },
    error: function(e){
      console.log("error: ", e);
    }
  });
}

var allSegments = document.querySelectorAll('.col-xs-3');
for(var i = 0; i<allSegments.length; i++){
  setTimeout(function(i){
    fetchAnimateChange.call(allSegments[i]);  //am i using 'this' correctly here or should i just pass as an argument?
  },001,i);
}

//////////// imp //////////// setTimeout doesnt get the lexical scope of for loop's variables
