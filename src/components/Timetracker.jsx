import React, {useState, useEffect} from "react";
import Navbar from "./Navbar"
function Timetracker ({accountId, logout, isAdmin}) {

    const [taskName, setTaskName] = useState("");
    const [options, setOptions] = useState([]);
    const [selectedTask, setSelectedTask] = useState("");
    const [choosenTask, setChoosenTask] = useState("");
    const [totalSeconds, setTotalSeconds] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);

    //funktion för att spara ny task name
    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("https://timetracker-app-9og5n.ondigitalocean.app/account/addtask/" + taskName + "/" + accountId, {
            method: 'POST',
        }).then(() => {
            fetchSavedTaskNames()
            setTaskName("")
            alert("New task added")
        })
    }

    //fångar värdet i input fältet för ny task
    const handleNewTaskInputChange = (e) => {
        setTaskName(e.target.value)
    }

    //useEffect kör en funktion vid varje rendering av komponenten (rendering sker när sidan först laddas och även när statet förändras)
    useEffect(() => {
        fetchSavedTaskNames()
    }, [])
    
    //hämtar alla sparade task names för kontot
    const fetchSavedTaskNames = () => {
        fetch("https://timetracker-app-9og5n.ondigitalocean.app/account/get/" + accountId)
        .then(res => res.json())
        .then(data => {
            //hämtar listan och med taske names och sparar den i vårt state "options"
            setOptions(data.savedTaskNames)
        })
    }

    //fångar värdet från task selectorn
    const handleTaskSelectorChange = (e) => {
        setSelectedTask(e.target.value)
    }

    //starta timer (posta ny task till kontot om knappen är för att stoppa en task)
    const startTimer = () => {
        if (selectedTask === "") {
            alert("Please select a task")
            return
        }
        if(isTimerRunning === false) {
            setChoosenTask(selectedTask)
            let startTaskBtn = document.getElementById("startTaskBtn")
            startTaskBtn.style.backgroundColor = "red";
            startTaskBtn.innerText = "STOP TIMER";
            setIsTimerRunning(true)
        } else {
            let startTaskBtn = document.getElementById("startTaskBtn")
            startTaskBtn.style.backgroundColor = "#A1FD65";
            startTaskBtn.innerText = "START TIMER";
            setIsTimerRunning(false)


            let currentDate = new Date();
            let currentYear = currentDate.getFullYear();
            let currentMonth = currentDate.getMonth() + 1;
            let currentDay = currentDate.getDate();
            let dateToday = currentYear + "/" + currentMonth + "/" + currentDay

            //api som hämtar info om om specefik dag, bland annat vecko nummer som jag behöver
            fetch("https://sholiday.faboul.se/dagar/v2.1/" + dateToday)
            .then(res => res.json())
            .then(data => {

                let newTask = {
                    taskName: choosenTask,
                    taskTime: totalSeconds,
                    createdOnWeek: data.dagar[0].vecka
    
                }
    
                fetch("https://timetracker-app-9og5n.ondigitalocean.app/task/create/" + accountId, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newTask)
                })
            })
            setTotalSeconds(0)

        }
    }
    //räknar och uppdaterar tiden medans timern är igång
    useEffect(() => {
        let intervalId;

        if (isTimerRunning) {
            intervalId = setInterval(() => {
                setTotalSeconds(prevSeconds => prevSeconds + 1);
            }, 1000);
        } else {
            clearInterval(intervalId);
        }

        return () => clearInterval(intervalId);

    }, [isTimerRunning])

    return (
        <>
        <Navbar logout={logout} isAdmin={isAdmin}/>
        <div id="taskCreatorContainer">

            <form id="addNewTaskForm" onSubmit={handleSubmit}>
                <h3>ADD NEW TASK</h3>
                <input required type="text" id="taskCreatorInput" placeholder="Task Name" value={taskName} onChange={handleNewTaskInputChange}></input>
                <button class="btn" id="addNewTaskBtn">ADD TASK</button>
            </form>
            
            <div id="taskSelectorContainer">
                <h2>CHOOSE A TASK</h2>
                <select name="task" id="taskSelector" value={selectedTask} onChange={handleTaskSelectorChange}>
                    <option disabled selected value="">--Select Task--</option>
                    {options.map(option => (
                        <option value={option.value}>{option}</option>
                    ))}
                </select>
            </div>

            <button class="btn" id="startTaskBtn" onClick={startTimer}>START TIMER</button>

        </div>

        <div id="timedTaskContainer">
            <h1 id="timedTask">{choosenTask} TIME: {totalSeconds}s</h1>
        </div>
        </>
    )
}

export default Timetracker