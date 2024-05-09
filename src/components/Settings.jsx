import { useState } from "react"
import Navbar from "./Navbar"

function Settings ({logout, isAdmin, changeTheme}) {

    const [selectedTheme, setSelectedTheme] = useState("")

    const handleThemeChange = (e) => {
        setSelectedTheme(e.target.value)
    }

    const handleClick = () => {

        if (selectedTheme !== "") {
            changeTheme(selectedTheme);
        }

    }

    return (
        <>
            <Navbar logout={logout} isAdmin={isAdmin}/>
            <div id="settingsContainer">
                <h1 id="settingsTitle">Change Theme</h1>
                <select name="task" id="themeSelector" value={selectedTheme} onChange={handleThemeChange}>
                    <option disabled selected value="">--Select Theme--</option>
                    <option value="style.css">Default Theme</option>
                    <option value="darkBlueTheme.css">Dark Blue</option>
                </select>
                <button id="changeThemeBtn" onClick={handleClick}>CHANGE THEME</button>
            </div>
        </>
    )
}

export default Settings