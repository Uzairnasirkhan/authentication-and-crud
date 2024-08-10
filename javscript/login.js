// window.addEventListener("load", () => {
  //   if (localStorage.getItem("user")) {
    //   window.location.replace("../index.html");
     //}
    //});

import { auth, signInWithEmailAndPassword } from "../firebase.js";

const loginHandler = async ()=>{
    try{

        const email = document.querySelector("#email");
        const password = document.querySelector("#password");
   
        const response = await signInWithEmailAndPassword(
            auth,
            email.value,
            password.value
          );



          const a = response.user.uid
    
          localStorage.setItem("user", a);
          window.location.replace("../index.html");
          console.log(response, "response");

    }
    catch(error){
        alert("error",error.message)
    }
}


window.loginHandler = loginHandler;
