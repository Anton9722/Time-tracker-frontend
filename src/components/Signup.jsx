import React, {useState} from 'react';

function Signup({onSignup, goToLogin}) {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    //den här körs när något i username fältet körs
    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    //same fast med password fält
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    //när formen submittas körs detta
    const handleSubmit = (e) => {
        e.preventDefault()

        let newAccount = {
            username: username,
            password: password
        }

        fetch("http://localhost:8080/account/create", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newAccount)
        })
        //när du fixat krav på att skapa användare är det här du ska lägga till mer sen -then.then(data) och titta om användare blivit skapad, för just nu har du gjot så att det inte finns några krav och 2 pers kan ha samma username och heta "{{]}]{}[]}" om dem vill
        onSignup()
    }

    //för att byta till login sidan
    const handleClick = () => {
        goToLogin(true)
    }

    return (
        <div>
            <img src="src\assets\images\logo.png" class="logoLoginAndSignup"></img>
        <form class="loginAndSignupForm" onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            <input required type="text" class="loginAndSignUpInput" placeholder="Username" value={username} onChange={handleUsernameChange}></input>
            <input required type="password" class="loginAndSignUpInput" placeholder="Password" value={password} onChange={handlePasswordChange}></input>
            <button class="btn" id="signupBtn">Sign Up</button>
        </form>
            <p class="textUnderFormLoginAndSignup">Already have an account? <a id="loginLink" class="link" onClick={handleClick}>Login here</a></p>
        </div>
    )
}

export default Signup