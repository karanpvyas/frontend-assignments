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

var changeDOM = function(obj){
  $(document.querySelector('#avg')).fadeOut('fast');
  document.querySelector('#avg').innerHTML = obj['24h_avg'];
  $(document.querySelector('#avg')).fadeIn('fast');

  $(document.querySelector('#bid')).fadeOut('fast');
  document.querySelector('#bid').innerHTML = obj['bid'];
  $(document.querySelector('#bid')).fadeIn('fast');

  $(document.querySelector('#ask')).fadeOut('fast');
  document.querySelector('#ask').innerHTML = obj['ask'];
  $(document.querySelector('#ask')).fadeIn('fast');

  $(document.querySelector('#last')).fadeOut('fast');
  document.querySelector('#last').innerHTML = obj['last'];
  $(document.querySelector('#last')).fadeIn('fast');


  var beautified = '<span class="badge">'+ count++ +'</span>'+'<br>' + JSON.stringify(obj, null, 2) +'<br>' + '------------- <br> fetched at '+ new Date().toTimeString().split(" ")[0] + '<hr />';
  document.querySelector('#historical').innerHTML += beautified;
}

var getBitcoinData = function(){
  $.ajax(
    requestObject
  );
  setTimeout(getBitcoinData, 4000);
}

getBitcoinData();
