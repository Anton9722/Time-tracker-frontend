import { useState } from 'react'
import Login from './components/Login'
import Signup from './components/Signup'

function App() {

  //används för att se om vi ska visa login sida 
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //när användare loggat in sparar vi deras id här då det kommer behövas för olika fetches framöver
  const [accountId, setAccountId] = useState("");

  //anväder som en switch emellan login och signup komponenter
  const [showLoginOrSignupComponent, setShowLoginOrSignupComponent] = useState(true);

  //byter mellan login och signup sidan
  const changeBetweenLoginAndSignup = (loginOrSignup) => {
    setShowLoginOrSignupComponent(loginOrSignup)
  }

  //körs när användare loggat in med rätt lösen och username
  const handleLogin = (id) => {
    alert("du loggade in! :D")
    setAccountId(id)
    setIsLoggedIn(true)
  }

  //körs när användare gjort en användate
  const handleSignup = () => {
    alert("du har skapat en användare :D ")
  }

  return(
    <>
    {showLoginOrSignupComponent ? <Login onLogin={handleLogin} goToSignup={changeBetweenLoginAndSignup}/> : <Signup onSignup={handleSignup} goToLogin={changeBetweenLoginAndSignup}/>}
    {isLoggedIn && <h1>Välkommen!</h1>}
    
    </>
  )
}

export default App
