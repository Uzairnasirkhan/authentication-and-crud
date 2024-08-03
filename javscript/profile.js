import{db,doc,getDocs,collection} from "../firebase.js"

const homeHandler = () =>{
    window.location.href = "../index.html"
  }

  const users = collection(db,"users")

  

  const d1 = document.querySelector("#d1")
  const d2 = document.querySelector("#d2")
  const d3 = document.querySelector("#d3")
  
  const profileLoad = async() =>{
    const arruser = []
    const querySnapshot = await getDocs(users)

    querySnapshot.forEach( (doc) =>{
        const obj = {
           id: doc.id,...doc.data()
        }

        arruser.push(obj)

        
    d1.innerText += obj.fullname
    d2.innerText += obj.gender
    d3.innerText += obj.email
  

    })


}


  window.addEventListener("load",profileLoad)
  window.homeHandler = homeHandler
  