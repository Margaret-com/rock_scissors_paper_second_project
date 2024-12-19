const form = document.querySelector('.form')
const error_message = document.getElementById('error-message')
let password = document.getElementById('password')
let eyeIcon = document.getElementById('eyeIcon')

//Handle SignUp
if(window.location.pathname.includes("signUp.html")){
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const repeatPassword = document.getElementById('repeat-password').value;
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const existingUser = users.find(user => user.username === username);

        //validation
        if (password.length < 8 || !/[A-Z]/.test(password) || !/[0-9]/.test(password) ) {
            error_message.innerText = "Password must be at least 8 characters long, contain at least one uppercase letter and one number";
            setTimeout(() => {
                location.reload();
            }, 3000); 
            return;
        }

        if (password !== repeatPassword) {
            error_message.innerText = "Passwords do not match.";
            setTimeout(() => {
                location.reload();
            }, 3000); 
            return;
        }

        if (existingUser) {
            error_message.innerText = "This username is already in use. Please choose another one.";
            setTimeout(() => {
                location.reload();
            }, 3000); 
            return;
        }
        // Store user data in localStorage
        const user = {
            name, 
            username,
            email,
            password,
        };
        
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));

        error_message.innerText = '';

        alert("Signup successful! Redirecting to login...");
        window.location.href = "login.html";
    })
}

//Handle Login
if (window.location.pathname.includes("login.html")) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const existingUser = users.find(user => user.username === username && user.password === password);

        if(!existingUser)
             {
            error_message.innerText = "Invalid username or password. Please try again or sign up.";
            setTimeout(() => {
                error_message.innerText = '';
            }, 3000); 
            return;
        }

        alert("Login successful! Redirecting...");
        window.location.href = "index.html";
    })
}

eyeIcon.onclick = function(){
    if(password.type === "password") {
        password.type = "text"
        eyeIcon.src = "images/eye-on.png"
    } else {
        password.type = "password"
        eyeIcon.src = "images/eye-off.png"
    }
}