var data =
  {
    numOfSubjects:5,
    subjects:['english','maths','science','geo','web'],
    studentDetails:
      [
        {
          'name':'karan',
          'subjectsAndMarks':[
              {'english':80},
              {'maths':78},
              {'science':95},
              {'geo':98},
              {'web':80}
            ]
          },
          {
            'name':'sahil',
            'subjectsAndMarks':[
                {'english':85},
                {'maths':78},
                {'science':87},
                {'geo':62},
                {'web':83}
              ]
            },
            {
              'name':'komal',
              'subjectsAndMarks':[
                  {'english':81},
                  {'maths':99},
                  {'science':45},
                  {'geo':67},
                  {'web':98}
                ]
            },
            {
              'name':'gaurav',
              'subjectsAndMarks':[
                {'english':81},
                {'maths':57},
                {'science':98},
                {'geo':61},
                {'web':98}
              ]
            },
            {
              'name':'darshan',
              'subjectsAndMarks':[
                {'english':98},
                {'maths':93},
                {'science':78},
                {'geo':84},
                {'web':90}
              ]
            }
        ]
      }


//setting up
var body  = document.getElementsByTagName("body")[0];
var table = document.createElement('table');
table.className = "table";
body.appendChild(table);

//first row
var headTr = document.createElement('tr');
// headTr.className = 'bg-info';
headTr.appendChild(giveMeATd('Name'));
data.subjects.map(function(subName){
  return giveMeATd(subName);
}).map(function(td){
  headTr.appendChild(td);
});
table.appendChild(headTr);

//all the other rows
data.studentDetails.map(function(studentProfile){
  var tr = document.createElement('tr');
  tr.appendChild(giveMeATd(studentProfile.name));
  studentProfile.subjectsAndMarks.map(function(subAndMarksObj){
    tr.appendChild(giveMeATd(Object.values(subAndMarksObj)[0]));
  });
  return tr;
}).map(function(tr){
  table.append(tr);
});

//a function to give DOM element td with innerHTMLset to the text given
function giveMeATd(text){
  var temp = document.createElement('td');
  temp.innerHTML=text;
  return temp;
}

//now the dynamic stuff
var isTotalDone = false;
var isPercentDone = false;

var handleTotal = function(){

    if(isTotalDone){
      alert('yoyoyoyoyoyooyoyoyo!!!');
      return;
    }

    isTotalDone = true;
    var allTrs = document.getElementsByTagName('tr');
    //why isnt slice working here
    // var trs = allTrs.splice(0,1);
    for(var i=0; i<allTrs.length; i++){
      if(i==0){
        allTrs[i].appendChild(giveMeATd('Total'));
      }else{
        var total = 0;
        // console.log(allTrs[i].childNodes);
        var tds = allTrs[i].childNodes;
        //map doesnt work here too!!!!!!!!!!!!!!!!!
        // tds.map(function(td){
        //   if(parseInt(td.innerHTML)!=undefined){
        //     total+=parseInt(td.innerHTML);
        //   }
        // })
        for(var j=0;j<tds.length;j++){
          if(j>0){
            total+=parseInt(tds[j].innerHTML);
          }
        }
        allTrs[i].appendChild(giveMeATd(total));
      }
    }
}

var handlePercentage = function(){
  if(!isTotalDone) {alert('total up first!');return;}
  if(isPercentDone) {alert('cmon bro!'); return;}

  isPercentDone = true;
  var allTrs = document.getElementsByTagName('tr');
  //why isnt slice working here
  // var trs = allTrs.splice(0,1);
  for(var i=0; i<allTrs.length; i++){
    if(i==0){
      allTrs[i].appendChild(giveMeATd('Percentage'));
    }else{
      var total = 0;
      // console.log(allTrs[i].childNodes);
      var tds = allTrs[i].childNodes;
      //map doesnt work here too!!!!!!!!!!!!!!!!!
      // tds.map(function(td){
      //   if(parseInt(td.innerHTML)!=undefined){
      //     total+=parseInt(td.innerHTML);
      //   }
      // })
      for(var j=0;j<tds.length;j++){
        if(j>0){
          total+=parseInt(tds[j].innerHTML);
        }
      }
      allTrs[i].appendChild(giveMeATd((total/(2*(data.numOfSubjects))).toString()+'%'));
    }
  }
}
