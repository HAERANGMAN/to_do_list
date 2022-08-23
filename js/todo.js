const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");
const doingList = document.getElementById("doing-list");
const doneList = document.getElementById("done-list");

//JSON.stringify() -> 스트링화
//JSON.parse() -> 오브젝트화
////////////////////////////////////////////////////////////
//[SAVING]

//항상 새 리스트에서 출발하기 떄문에 새로고침해서 입력하면 새로저장됨
//그래서 기존의 것을 가져오기 위해 const가 아니라 let으로 바꿈
let toDos = [];
const TODOS_KEY = "todos";

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}


let doings = [];
const DOINGS_KEY = "doings";

function saveToDos() {
  localStorage.setItem(DOINGS_KEY, JSON.stringify(doings));
}


let dones = [];
const DONES_KEY = "dones";

function saveToDos() {
  localStorage.setItem(DONES_KEY, JSON.stringify(dones));
}

////////////////////////////////////////////////////////////
//[DOING]
//event는 함수가 사용되었던 이벤트에대한 값들을 저장하는 것
function deleteTodoList(event) {
  const doing_list = event.target.parentElement; //이벤트.타겟하기.이벤트값중파렌트엘리먼트
  doing_list.style = "text-weight: bold";
  const doing_btn = doing_list.querySelector("button");
  doing_btn.innerText = "👨🏻‍💻";
  // doing_list.doing_list;
  doingList.appendChild(doing_list);
  doing_btn.addEventListener("click", doneTodoList);
  // doing_list.querySelector("button").innerText("🐥");
  // toDos 배열이 가진 값에 filter를 통해 삭제를 누른 toDos의 id값을 제외한
  // 다른 id를 가진 toDos는 유지시켜줌
  toDos = toDos.filter((tomato) => tomato.id !== parseInt(toDoList.id));
  saveToDos();
}
// list.filter(); // n번째에 함수값이 적용되어서나온값이 n과동일하면 리스트에남김

////////////////////////////////////////////////////////////
//[DONE]
function doneTodoList(event) {
  const done_list = event.target.parentElement; //이벤트.타겟하기.이벤트값중파렌트엘리먼트
  done_list.style = "text-decoration:line-through";
  done_list.querySelector("button").innerText = "✅";
  // done_list.done_list;
  doneList.appendChild(done_list);
  // done_list.querySelector("button").innerText("🐥");
  // toDos 배열이 가진 값에 filter를 통해 삭제를 누른 toDos의 id값을 제외한
  // 다른 id를 가진 toDos는 유지시켜줌
  toDos = toDos.filter((tomato) => tomato.id !== parseInt(doingList.id));
  saveToDos();
}

////////////////////////////////////////////////////////////
//[ADDING]
//createElement의 사용!
function paintToDo(newToDo) {
  const new_li = document.createElement("li");
  new_li.id = newToDo.id;
  const new_span = document.createElement("span");
  new_span.innerText = newToDo.text;
  const btn = document.createElement("button");
  btn.innerText = "🐥";
  btn.style = "margin: 0px 10px 3px 0px";
  new_li.appendChild(btn);
  new_li.appendChild(new_span);
  toDoList.appendChild(new_li);
}

function paintToDo(newToDo) {
  const new_li = document.createElement("li");
  new_li.id = newToDo.id;
  const new_span = document.createElement("span");
  new_span.innerText = newToDo.text;
  const btn = document.createElement("button");
  btn.innerText = "👨🏻‍💻";
  btn.style = "margin: 0px 10px 3px 0px";
  new_li.appendChild(btn);
  new_li.appendChild(new_span);
  doingList.appendChild(new_li);
}

function paintToDo(newToDo) {
  const new_li = document.createElement("li");
  new_li.id = newToDo.id;
  const new_span = document.createElement("span");
  new_span.innerText = newToDo.text;
  const btn = document.createElement("button");
  btn.innerText = "✅";
  btn.style = "margin: 0px 10px 3px 0px";
  new_li.appendChild(btn);
  new_li.appendChild(new_span);
  doneList.appendChild(new_li);
}


//event는 submit이라는 이벤트에대한 값들을 저장하는 것
//이벤트 인자를 가져와서 먼저 새로고침 안되기 멈춰놓기
function handleToDoSubmit(event) {
  event.preventDefault();
  const newToDoInput = toDoInput.value; //인풋은 여기서 저장됨
  toDoInput.value = ""; //그리고 값은 리셋
  const newToDoObj = {
    text: newToDoInput,
    id: Date.now(), //시간을 id값으로 사용
  };
  toDos.push(newToDoObj); //append가 push임
  paintToDo(newToDoObj);
  saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);
// toDoForm.addEventListener("submit", handleToDoSubmit);
// toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);
const savedDoings = localStorage.getItem(DOINGS_KEY);
const savedDones = localStorage.getItem(DONES_KEY);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos; //만약 local에 값이 있다면 변수로 돌려줌(새로고침해도 기존값저장위해)
  //arrow function : for문처럼 사용 item이 i가 됨
  //parsedToDos.forEach((item) => console.log("this is turn off item", item));
  //forEach를 통해 len(parsedToDos)만큼 (함수)실행
  parsedToDos.forEach(paintToDo);
}

if (savedDoings !== null) {
  const parsedDoings = JSON.parse(savedDoings);
  doings = parsedDoings; 
  parsedDoings.forEach(paintToDo);
}

if (savedDones !== null) {
  const parsedDones = JSON.parse(savedDones);
  dones = parsedDones; 
  parsedDones.forEach(paintToDo);
}

//옮겨지는 것 만들기
// btn.addEventListener("click", deleteTodoList);
// btn.addEventListener("click", deleteTodoList);
// btn.addEventListener("click", deleteTodoList);


//ProcessingInstruction
checkAll in localStorage.value()
if list {
  addlist.li
}
get.toDoInput
savelocal + todolist.li

addEventListener(todolist, todoing)

const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");
const doingList = document.getElementById("doing-list");
const doneList = document.getElementById("done-list");


