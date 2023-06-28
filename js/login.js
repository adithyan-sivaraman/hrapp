const email = document.getElementById("email");
const password = document.getElementById("password");

email.addEventListener("click",()=>{
    const emailSpan = document.querySelector(".email");
    emailSpan.textContent = "Email";
    email.removeAttribute("placeholder")
})
password.addEventListener("click",()=>{
    const passSpan = document.querySelector(".password");
    passSpan.textContent = "Password";
    password.removeAttribute("placeholder")
})

const form = document.getElementById("form");
form.addEventListener("submit",(e)=>{
    e.preventDefault();

    
        let email = document.getElementById("email").value;
        let pass = document.getElementById("password").value
   
        const data = {
            email:email,
            password:pass
        }
      
        fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          })
            .then((response) => response.text())
            .then((responseData) => {
              console.log(responseData);
              if(responseData=="Valid login"){
                
                localStorage.setItem("username",email);
                console.log(localStorage.getItem("username"))
                
              }
              else {
                let dialog = document.querySelector("dialog")
                let msg = document.getElementById("message")
                dialog.show()
                msg.textContent = "Invalid Login Credentials"
                setTimeout(()=>{
                  dialog.close()
                },2000)
              }
            })
            .catch((error) => {
              console.error("Error:", error);
            });

})

const show = document.getElementById("show");
const hide = document.getElementById("hide");

show.addEventListener("click",()=>{
  show.classList.add("d-none")
  hide.classList.remove("d-none")
  password.type = "text"
})

hide.addEventListener("click",()=>{
  hide.classList.add("d-none")
  show.classList.remove("d-none")
  password.type="password"
})