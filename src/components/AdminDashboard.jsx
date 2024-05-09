import React, {useState, useEffect} from "react";
import Navbar from "./Navbar"

function AdminDashboard({logout, isAdmin}) {

    const [allAccountsStats, setAllAccountsStats] = useState([])
    const [clickedAccountIndex, setClickedAccountIndex] = useState(null)
    const [clickedAccountInfo, setClickedAccountInfo] = useState(null)

    useEffect(() => {
        if(isAdmin) {
            fetch("http://localhost:8080/account/getallaccounts")
            .then(res => res.json())
            .then(data => {
                let statsToSave = []
                data.forEach(account => {
                    let totalTime = 0
                    if(account.taskList.length > 0) {
                        account.taskList.forEach(task => {
                            totalTime += task.taskTime
                        })
                    }
                    let statsFormat = {
                        username: account.username,
                        totalTaskTime: totalTime
                    }
                    statsToSave.push(statsFormat)
                });
                setAllAccountsStats(statsToSave)
            })
        }
    }, [isAdmin])

    const moreInfo = (index, username) => {
        setClickedAccountIndex(index)
        fetch("http://localhost:8080/account/getByUsername/" + username)
        .then(res => res.json())
        .then(data => {
            setClickedAccountInfo(data)
        })
    }

    //för att stänga more info rutan
    const closeMoreInfo = () => {
        setClickedAccountIndex(null)
        setClickedAccountInfo(null)
    }

    return(
        <div>
            <Navbar logout={logout} isAdmin={isAdmin}/>
            <div id="adminUserStatsContainer">
                <ul>
                    {allAccountsStats.map((account, index) => (
                        <div key={index}>
                            <h4 class="accountInfo">USERNAME: </h4>
                            <h4 class="accountInfoWhite">{account.username}</h4>
                            <br></br>
                            <h4 class="accountInfo">TOTAL TASK TIME: </h4>
                            <h4 class="accountInfoWhite">{account.totalTaskTime}s</h4>
                            <br></br>
                            <a class="btnAccountStats" onClick={() => moreInfo(index, account.username)}>Click Here For More Detailed Information</a>
                            {clickedAccountIndex === index && clickedAccountInfo && 
                            <div class="moreInfoContainer">
                                <a id="closeMoreInfo" onClick={closeMoreInfo}>x</a>
                                <h4 class="moreInfoTitels">Account Status:</h4>
                                <p class="moreInfoInformation">{clickedAccountInfo.isAdmin ? "ADMIN" : "USER"}</p>
                                <h4 class="moreInfoTitels">Account Id</h4>
                                <p class="moreInfoInformation">{clickedAccountInfo.id}</p>
                                <h4 class="moreInfoTitels">Saved Task Names:</h4>
                                <p class="moreInfoInformation">{clickedAccountInfo.savedTaskNames.map(task => "[" + task + "]").join(" ")}</p>
                                <h4 class="moreInfoTitels">Task History:</h4>
                                <ul className="moreInfoInformation">
                                    {clickedAccountInfo.taskList.map(task => (
                                        <li>
                                            [TASK: ({task.taskName}), TIME: ({task.taskTime}s), CREATED WEEK: ({task.createdOnWeek})]
                                        </li>
                                    ))}
                                </ul>
                            </div>}
                            <hr></hr>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default AdminDashboard