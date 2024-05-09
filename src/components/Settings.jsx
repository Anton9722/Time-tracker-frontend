import Navbar from "./Navbar"

function Settings ({logout, isAdmin}) {
    return (
        <div>
            <Navbar logout={logout} isAdmin={isAdmin}/>
            <h2>Settings will be included in a future update</h2>
        </div>
    )
}

export default Settings