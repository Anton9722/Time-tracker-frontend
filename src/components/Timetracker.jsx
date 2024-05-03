import Navbar from "./Navbar"

function Timetracker ({skrivId}) {

    const dodo = () => {
        skrivId()
    }

    return (
        <>
        <Navbar/>
        <div id="taskCreatorContainer">

            <form id="addNewTaskForm">
                <h3>ADD NEW TASK</h3>
                <input required type="text" id="taskCreatorInput" placeholder="Task Name"></input>
                <button class="btn" id="addNewTaskBtn">ADD TASK</button>
            </form>
            
            <div id="taskSelectorContainer">
                <h2>CHOOSE A TASK</h2>
                <select name="task" id="taskSelector">
                    <option value="volvo">Volvo</option>
                </select>
            </div>

            <button class="btn" id="startTaskBtn" onClick={dodo}>START</button>

        </div>
        </>
    )
}

export default Timetracker