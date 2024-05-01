
function Login() {
    return (
        <div>
            <img src="src\assets\images\logo.png" id="logoLogin"></img>
        <form id="loginform">
            <h1>Log In</h1>
            <input type="text" class="loginInput" placeholder="Email Address"></input>
            <input type="password" class="loginInput" placeholder="Password"></input>
            <button class="btn" id="loginBtn">Login</button>
        </form>
            <p id="paraUnderLoginForm">Don't have an account? <a id="createAccountLink">Create an account</a></p>
        </div>
    )
}

export default Login