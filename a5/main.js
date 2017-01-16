// add own warning indicator
//use parent's ref and delete todo rather than whole re rendering

//binding events
document.querySelector('#todoTextInput').onkeypress = function(){
  if(event.code === 'Enter'){
    event.preventDefault(); // what it actuall does - read.
    document.querySelector('#okBtn').click();
  }
}




//global object structure
var allData = {
  tags: {
    'tag': [1231525315,51231531251]
  },
  todos: {
    '1203891230812': {
      todoText: 'go to gym',
      tags: ['asdasd','asdasdasd'],
      createdAt: '', //in string
      status: 'undone'
    },
    '13123123123123' : {
      todoText: 'go to gym again',
      tags: ['asdasd','asdasdasd'],
      createdAt: '', //in string
      status: 'undone'
    },
    '231231231235' : {
      todoText: 'again and again',
      tags: [],
      createdAt: '',
      status: 'undone'
    }
  }
}

var addNewTodo = function(){
  console.log('adding new todo');
  let dateObject = new Date();
  let todoText = document.querySelector('#todoTextInput').value;
  let createdAt = dateObject.toString();
  let status = 'undone';
  let tags =[];
  let id = dateObject.valueOf().toString();
  console.log(id);

  //making a todo
  let todo = {
    'todoText': todoText,
    'tags': tags,
    'createdAt' : createdAt,
    'status': status
  };

  //alter allData, add the todo with id as id
  allData.todos[id] = todo;

  //add in the tags if any
  for(var i = 0; i<tags.length; i++){
    let tag = tags[i];
    if(allData.tags.tag){
      allData.tags.tag += id; // find a better and safer way
    }else{
      allData.tags[tag] = [id];
    }
  }

  //emptying the input box
  document.querySelector('#todoTextInput').value = '';

  //finally rendering -- renders whole, any better way?
  render();
}

var addTag = function(){

}

var markImportant = function(){

}

var render = function(){
  let allTodosDiv = document.querySelector('#allTodos');

  //deleting all children
  while(allTodosDiv.firstChild){
    allTodosDiv.removeChild(allTodosDiv.firstChild);
  }

  let todoTemplate = document.querySelector('#todoListItem');

  // http://stackoverflow.com/a/684692 ask this.
  let todos = allData.todos;
  let c = 1;
  for(var key in todos){
    if(todos.hasOwnProperty(key)){
      //redner a single todo
      let clone = todoTemplate.content.cloneNode(true);
      clone.querySelectorAll('.todoSerialNumber')[0].innerHTML = c++;
      clone.querySelectorAll('.col-xs-9')[0].innerHTML = todos[key].todoText;
      clone.querySelectorAll('.col-xs-2')[0].innerHTML = (todos[key].status==='done' ? '<span style="color:green">Done!</span>':'<span style="color:red">Not done!</span>');
      clone.querySelectorAll('.todo')[0].setAttribute('data-todoID', key); //here [] notation didnt work, why?

      //repetitive check, remove it later
      if(todos[key].status === 'done'){
        clone.querySelectorAll('.completeTodo')[0].parentNode.removeChild(clone.querySelectorAll('.completeTodo')[0]); // doubt -- wtf!
      }
      //TODO doubt HOW TO STYLE A DOC FRAGMENT!

      allTodosDiv.appendChild(clone);
    }
  }

  //if no todos, TELL THAT
  if (Object.keys(todos).length === 0){
    allTodosDiv.innerHTML = '<div style="text-align:center;border-radius:10px;color:white;background-color:red">ADD SOME TODOS AND GET WORKING!</div>'
  }
}

var completeTodo = function(){
  let originElement = event.target;
  let parentElement = originElement.parentNode;
  let id = parentElement.getAttribute('data-todoID');

  allData.todos[id].status = 'done';

  //optimise this -- do it directly, later TODO
  render();
}

var deleteTodo = function(){
  let originElement = event.target;
  let parentElement = originElement.parentNode;
  let id = parentElement.getAttribute('data-todoID');

  let todoToDelete = allData.todos[id];
  let tags = todoToDelete.tags;

  // removing the todo from allData
  delete allData.todos[id];

  //can remove the elemtn directly, but eh.
  //TODO do it!
  render();

  //removing the id from tags
  //TODO write this code ------ later.
}

//initial rendering.
render();
