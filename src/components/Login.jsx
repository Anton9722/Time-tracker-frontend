import React, {useState} from 'react';

function Login({onLogin, goToSignup}) {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    //den här kör när något ändras i username input fältet
    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }
    //samma fast för password fält
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }
    //kör ni man submittar formen
    const handleSubmit = (e) => {
        e.preventDefault()
        
        fetch("http://localhost:8080/account/login/" + username + "/" + password)
        .then(res => res.json())
        .then(data => {
            if (data === true) {
                fetch("http://localhost:8080/account/getByUsername/" + username)
                .then(res => res.json())
                .then(data => {
                    onLogin(data.id, data.isAdmin)
                })
            } else {
                alert("Wrong username or password")
            }
        })

    }

    //för att byta till signup sidan
    const handleClick = () => {
        goToSignup(false)
    }

    return (
        <div>
            <img src="src\assets\images\logo.png" class="logoLoginAndSignup"></img>
        <form class="loginAndSignupForm" onSubmit={handleSubmit}>
            <h1>Log In</h1>
            <input required type="text" class="loginAndSignUpInput" placeholder="Username" value={username} onChange={handleUsernameChange}></input>
            <input required type="password" class="loginAndSignUpInput" placeholder="Password" value={password} onChange={handlePasswordChange}></input>
            <button class="btn" id="loginBtn">Login</button>
        </form>
            <p class="textUnderFormLoginAndSignup">Don't have an account? <a id="createAccountLink" class="link" onClick={handleClick}>Create an account</a></p>
        </div>
    )
}

export default Login