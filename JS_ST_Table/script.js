const username = document.getElementById("username");
const password = document.getElementById("password");
const email = document.getElementById("email");
const gender = document.getElementById("gender");
const birthday = document.getElementById("birthday");
let table = document.getElementById("table");
let arr =[];



function InputSubmit(){

  var obj = {
    username : username.value,
    password : password.value,
    email : email.value,
    birthday : birthday.value,
    gender : gender.value
    
  }

  if(checkForm() === 0){
    return;
  }
  else{
 
    // arrow function()
    // find()
    // we could have sued  if (arr.find(i => i.username === obj.username)) 
    if (usernameExists(obj.username, arr)) {

      showAllert("Username already exists.");
      return;
    }
    

    arr.push(obj);
    saveToLocalStorage(arr);
    renderTable(arr);
  }
}

function usernameExists(username, arr) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].username === username) {
      return true;
    }
  }
  return false;
}


function showAllert(text){

  var div = document.createElement("div");
  div.setAttribute("id", "AlertWin");

  if(text == "Fill all Forms"){
    div.classList.add("AlertWinRed")
  }
  else{
    div.classList.add("AlertWinYellow")
  }

  var icon = document.createElement("i");
  icon.classList.add("fa-solid", "fa-circle-exclamation");
  var message = document.createTextNode(text);
  div.appendChild(icon);
  div.appendChild(message);


  document.body.appendChild(div);

    setTimeout(function() {
      div.classList.add("fade-out");
      setTimeout(function() {
        
        div.parentNode.removeChild(div);
      }, 1000); 
    }, 2000);
}

function checkForm() {
  if (
    username.value === '' ||
    password.value === '' ||
    email.value === '' ||
    birthday.value === '' ||
    gender.value === ''
  ) {

    showAllert('Fill all Forms')
  
    return 0; 
  }

  if(password.value!= '' && password.value.length <= 7){

    showAllert('Password must be at lest 8 Characters')


    return 0;

  }

  else{
      


    return 1;
  }
  

}




function DotPassword(obj){
  let hiddenPassword ='';

    for(let k = 0; k<obj.length; k++){
      hiddenPassword += '*'
    }

    return hiddenPassword;
  

}



function ShowPassword(index) {
  const currentPass = arr[index];
  const passwordLocation = document.querySelectorAll("#table tr")[index + 1].querySelectorAll("td")[1];
  const firstButton = document.querySelectorAll("#table tr")[index + 1].querySelector(".ShowPassword");

  const isPasswordVisible = passwordLocation.innerText === currentPass.password;

  if (!isPasswordVisible) {
    passwordLocation.innerText = currentPass.password;
    firstButton.innerHTML = `<i class="fa-solid fa-lock"></i>`;
    firstButton.style.backgroundColor = "red";
  } else {
    passwordLocation.innerText = DotPassword(currentPass.password);
    firstButton.innerHTML = `<i class="fa-solid fa-unlock"></i>`;
    firstButton.style.backgroundColor = "";
  }
}



function renderTable(Arr) {
  table.innerHTML = ` 
      <tr>   
          <th> <span class="TrHead"><span><i class="fa-solid fa-book"></i>Username</span> <i onclick="Sort('username')" class="fa-solid fa-sort"></i></span> </i></th>
          <th><i class="fa-solid fa-lock"></i>Password</th>
          <th> <span class="TrHead"> <span><i class="fa-regular fa-envelope"></i>Email</span><i onclick="Sort('email')" class="fa-solid fa-sort"></i></span> </th>
          <th>  <span class="TrHead">  <span><i class="fa-solid fa-cake-candles"></i>Birthday  </span><i onclick="Sort('birthday')" class="fa-solid fa-sort"></i></span></th>
          <th> <span class="TrHead">Gender <i onclick="Sort('gender')" class="fa-solid fa-sort"></i> </span></th>
          <th>Action</th> 
      </tr>
  `;


  let rowCount = 0;

  for (let i = 0; i < Arr.length; i++) {
    const hiddenPassword = DotPassword(Arr[i].password);

    let row = `
      <tr style="background-color: ${rowCount % 2 === 0 ? 'hsla(198, 93%, 95%, 0.8)' : 'inherit'}">
        <td>${Arr[i].username}</td>
        <td>${hiddenPassword}</td>
        <td>${Arr[i].email}</td>
        <td>${Arr[i].birthday}</td>
        <td> <button class="Gender${Arr[i].gender}"><i class="fa-solid fa-venus"></i>${Arr[i].gender}</button></td>
        <td>
          <span class="ACTRBNT">
              <button class="ShowPassword" id="change" onclick="ShowPassword(${i})"><i class="fa-solid fa-unlock"></i></button>
              <button class="ActionBNT" onclick="deleteRow(${i})"><i class="fa-solid fa-x"></i></button>
          </span>
        </td>
      </tr>
    `;
    table.innerHTML += row;
    rowCount++;
  }
}



function deleteRow(index) {
  arr.splice(index, 1);
  renderTable(arr);
  saveToLocalStorage(arr); 
}




function Sort(element) {
  if (element === 'username' || element === 'email' || element === 'birthday' || element === 'gender') {

    const firstElementValue = arr[0][element]; 
    const lastElementValue = arr[arr.length - 1][element]; 
    const isAscending = firstElementValue < lastElementValue; 
      
      if (isAscending) {
          arr.sort((a, b) => b[element].localeCompare(a[element])); 
      } else {
          arr.sort((a, b) => a[element].localeCompare(b[element])); 
      }
      
      renderTable(arr);
  }
}


  // save to local storeage 

  function saveToLocalStorage(data){
    localStorage.setItem(`tableData` , JSON.stringify(data));
  }
  function loadFromLocalStorage() {
    const storedData = localStorage.getItem('tableData');
    if (storedData !== null) {
      return JSON.parse(storedData);
    } else {
      return [];
    }

  }

  function initTable() {
    arr = loadFromLocalStorage(); 
    renderTable(arr); 
  }
  

  window.onload = initTable;