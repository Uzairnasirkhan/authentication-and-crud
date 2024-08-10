 window.addEventListener("load", () => {
     if (localStorage.getItem("user")) {
       window.location.replace("../index.html");
     }
   });

import { auth,
    createUserWithEmailAndPassword,
    db,
    doc,
    setDoc,
    signInWithEmailAndPassword,} from "../firebase.js"

console.log(auth)





const signupHandler = async ()=>{
    try{
    
      const email = document.getElementById("email")
      const passsword = document.getElementById("password")
      const fullName = document.querySelector("#fullName");
      const gender = document.querySelector("#gender");
      
      //object
      const userObj = {
         fullname: fullName.value,
         email: email.value,
         gender: gender.value
      }
     console.log(userObj)

     const response = await createUserWithEmailAndPassword(
        auth,
        email.value,
        password.value
      );
      const uid = response.user.uid;


      const userResponse = await setDoc(doc(db, "users" , uid) ,userObj);
      alert("successfully signed up")
      window.location.href = "../pages/login.html"



    }
    catch(error){
        console.log("error",error.message)
    }
}


window.signupHandler = signupHandler

