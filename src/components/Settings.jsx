import Navbar from "./Navbar"

function Settings ({logout}) {
    return (
        <div>
            <Navbar logout={logout}/>
            <h1>Settings Page</h1>
        </div>
    )
}

export default Settings