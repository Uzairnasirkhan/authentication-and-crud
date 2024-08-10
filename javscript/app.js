//window.addEventListener("load", () => {
  //  console.log(localStorage.getItem("user"));
  //  if (!localStorage.getItem("user")) {
     // window.location.replace("../pages/login.html");
    //}
  //});

import{
    app,db,collection,addDoc,deleteDoc,doc,getDocs,updateDoc
} from "../firebase.js"

console.log(app)
console.log(db)

const todoCollection = collection(db, "todos")
const todoParent = document.querySelector(".todoParent")

const body = document.querySelector(".body")
const lightmode = document.getElementById("lightmode")
const darkmode = document.getElementById("darkmode")
const todoInput = document.getElementById("todoInput")
const addBtn = document.getElementById("addBtn")
const dltAllbtn = document.getElementById("dltAllbtn")



function darkfunc(){
    body.style.backgroundColor = "#1F1F1F"
    darkmode.style.backgroundColor = "white"
    darkmode.style.color = "black"
    lightmode.style.background = "none"
    lightmode.style.color = "white"
    todoInput.style.border = "1px solid white"
    todoInput.style.color = "white"
}

function lightfunc(){
    body.style.backgroundColor = "white"
    lightmode.style.backgroundColor = "white"
    lightmode.style.color = "black"
    darkmode.style.background = "none"
    darkmode.style.color = "white"
    todoInput.style.border = "1px solid black"
    todoInput.style.color = "black"
}




const addTodo = async () => {
    try {
//        const todoInput = document.getElementById("input")
       // console.log("todoInput", todoInput.value)

        const todoObj = {
            value: todoInput.value
        }

        const res = await addDoc(todoCollection, todoObj)
        getTodo()
        console.log("res", res.id)
    } catch (error) {
        console.log("error", error.message)
    }
}





const getTodo = async () => {
    try{
      const querySnapshot = await getDocs(todoCollection)
      const arrayTodo = []

      todoParent.innerHTML = ""

      querySnapshot.forEach( (doc) =>{
          const obj = {
            id: doc.id ,...doc.data()
          }

          arrayTodo.push(obj)

          todoParent.innerHTML += `<div class="card" style="width: 18rem;" id="todoList">
            <div class="card-body">
              <h5 class="card-title">${obj.value}</h5>
              <button class="btn btn-light" onclick="editTodo(this)" id="${obj.id}"><i class="fa-regular fa-pen-to-square"></i></button>
              <button class="btn btn-danger" id="${obj.id}" onclick="deleteTodo(this)"><i class="fa-regular fa-trash-can"></i></button>
            </div>
          </div>`
      })
    }

    catch(err){
         console.log("error" , err.message)
    }


}



const deleteTodo = async (eleme) => {
    //console.log("deleteTodo", eleme.id)
    try {
        await deleteDoc(doc(db, "todos", eleme.id))
        getTodo()
    } catch (error) {
        console.log("error", error.message)
    }
}



const editTodo = async (editele) =>{
    try{
        const uptodo = prompt("update ToDo")
        if(uptodo.trim() !== ""){
            editele.previousElementSibling.innerHTML = uptodo;
            await updateDoc(doc(db, "todos", editele.id) , {
              value: uptodo
            })
            getTodo()
            console.log(editele.id)
                      
        }
        else{
            alert("invalid input")
        }
    }
    catch(error){
        console.log("error",error.message)
    }
}



const logoutBtn = () => {
    localStorage.removeItem("user");
    localStorage.clear();
    window.location.replace("../pages/login.html");
  };
  

  const profilePage = () =>{
    window.location.href = "./pages/profile.html"
  }




window.addEventListener("load" ,getTodo)
window.darkfunc = darkfunc
window.lightfunc = lightfunc
window.addTodo = addTodo
window.deleteTodo = deleteTodo
window.editTodo = editTodo
window.logoutBtn = logoutBtn
window.profilePage = profilePage
