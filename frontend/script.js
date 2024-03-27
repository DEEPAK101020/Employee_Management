const login = document.getElementById("login");
const register = document.getElementById("register");
const button = document.getElementById("btn");

function moveRegister() {
  login.style.left = "-400px";
  register.style.left = "50px";
  button.style.left = "110px";
}

function moveLogin() {
  login.style.left = "50px";
  register.style.left = "450px";
  button.style.left = "0";
}

const loginemail=document.getElementById("loginemail");
const loginpassword=document.getElementById("loginpassword");





const baseURL = "https://employee-management-7nvy.onrender.com/";
document.getElementById("login").addEventListener("submit",(e)=>{
    e.preventDefault();
})
document.getElementById("register").addEventListener("submit",(e)=>{
    e.preventDefault();
})

document.getElementById("register-btn").addEventListener("click", registerUser);
async function registerUser() {
    const email=document.getElementById("registeremail").value;
    const password=document.getElementById("registerpass").value;
    const confirmpassword=document.getElementById("registerpass2").value

 
  try {
    if (email && password && confirmpassword) {
      const response = await fetch(`${baseURL}user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email ,password ,confirmpassword }),
      });

      const data = await response.json();
console.log(data);
      if (response.ok) {
        console.log(data.msg)
      } else {
        console.log(data.msg)
        
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }
}


//
document.getElementById("login-btn").addEventListener("click", loginuser);
async function loginuser() {
    const email=document.getElementById("loginemail").value;
    const password=document.getElementById("loginpassword").value;


 
    try {
        if (email && password) {
          const response = await fetch(`${baseURL}user/login`, {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });
          const data = await response.json();
          if (response.ok) {
  
    
            localStorage.setItem("token", data.token);
            console.log(data);
            setTimeout(() => {}, 1000000);
            location.href = "./dashboard.html";
          }
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }