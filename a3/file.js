/* request object */
var count = 1;

var requestObject = {
  dataType: 'json',
  url: 'https://api.bitcoinaverage.com/ticker/global/USD/',
  success: function(result){
      changeDOM(result);
  },
  error: function(e){
    console.log(e);
  }
}

var animateAndChange = function(id,obj){
  $(document.querySelector('#'+id)).fadeOut('fast');
  document.querySelector('#'+id).innerHTML = obj[id];
  $(document.querySelector('#'+id)).fadeIn('fast');

}

var changeDOM = function(obj){

  obj.avg = obj['24h_avg'];
  delete obj['24h_avg'];

  animateAndChange('avg',obj);
  animateAndChange('bid',obj);
  animateAndChange('ask',obj);
  animateAndChange('last',obj);

  var template = document.querySelector('#rowTemplate');
  var clone = template.content.cloneNode(true);
  var tds = clone.querySelectorAll('td');
  tds[0].innerHTML = obj['avg'];
  tds[1].innerHTML = obj['bid'];
  tds[2].innerHTML = obj['ask'];
  tds[3].innerHTML = obj['last'];
  tds[4].innerHTML = obj['timestamp'];

  console.log(clone);

  document.querySelector('#historical').appendChild(clone);

}

var getBitcoinData = function(){
  $.ajax(
    requestObject
  );
  setTimeout(getBitcoinData, 4000);
}

getBitcoinData();
