import { useState } from 'react'
import Login from './components/Login'
import Signup from './components/Signup'
import Timetracker from './components/Timetracker';
import Statistics from './components/Statistics';
import Settings from './components/Settings';
import AdminDashboard from './components/AdminDashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  //används för att se om vi ska visa login sida 
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //när användare loggat in sparar vi deras id här då det kommer behövas för olika fetches framöver
  const [accountId, setAccountId] = useState("");

  const [isAdmin, setIsAdmin] = useState(false);

  //anväder som en switch emellan login och signup komponenter
  const [showLoginOrSignupComponent, setShowLoginOrSignupComponent] = useState(true);

  //byter mellan login och signup sidan
  const changeBetweenLoginAndSignup = (loginOrSignup) => {
    setShowLoginOrSignupComponent(loginOrSignup)
  }

  //körs när användare loggat in med rätt lösen och username
  const handleLogin = (id, isUserAdmin) => {
    setAccountId(id)
    setIsLoggedIn(true)
    setIsAdmin(isUserAdmin)
  }

  //körs när användare gjort en användate
  const handleSignup = () => {
    alert("New account have been created")
    setShowLoginOrSignupComponent(true);
  }
  //logout funktion
  const logout = () => {
    setIsLoggedIn(false)
  }

  //ändra färg tema
  const changeTheme = (theme) => {
    let cssStylesheetLink = document.getElementById("themeStylesheet")
    cssStylesheetLink.href = "src/" + theme
  }

  return(
    <>
      {!isLoggedIn && showLoginOrSignupComponent && (
        <>
          <Login onLogin={handleLogin} goToSignup={changeBetweenLoginAndSignup}/>
        </>
      )}
      {!isLoggedIn && !showLoginOrSignupComponent && (
        <>
          <Signup onSignup={handleSignup} goToLogin={changeBetweenLoginAndSignup}/>
        </>
      )}
    {isLoggedIn && 
      <Router>
        <Routes>
          <Route exact path="/" element={<Timetracker isAdmin={isAdmin} accountId={accountId} logout={logout}/>} />
          <Route path="/statistics" element={<Statistics isAdmin={isAdmin} accountId={accountId} logout={logout}/>} />
          <Route path="/settings" element={<Settings changeTheme={changeTheme} isAdmin={isAdmin} logout={logout}/>} />
          <Route path="/admin" element={<AdminDashboard isAdmin={isAdmin} logout={logout}/>} />
        </Routes>
      </Router>
    }
    
    </>
  )
}

export default App
