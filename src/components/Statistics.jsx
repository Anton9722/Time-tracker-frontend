import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import Navbar from "./Navbar";

function Statistics ({logout, accountId}) {
    //usestate som håller totala tider för varje task namn
    const [taskAndTime, setTaskAndTime] = useState([]);

    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth() + 1;
    let currentDay = currentDate.getDate();
    let dateToday = currentYear + "/" + currentMonth + "/" + currentDay
    fetch("http://sholiday.faboul.se/dagar/v2.1/" + dateToday)
    .then(res => res.json())
    .then(data => {

        let currentWeek = data.dagar[0].vecka

        fetch("http://localhost:8080/account/getalltasks/" + accountId)
        .then(res => res.json())
        .then(data => {
            
            let allTasks = data
            let tasksCurrentWeek = []

            {allTasks.map(task => {
                if (task.createdOnWeek === currentWeek) {
                    tasksCurrentWeek.push(task)
                }
            })}

            let onlyTaskname = []
            tasksCurrentWeek.forEach(task => {
                onlyTaskname.push(task.taskName)
            })
            //en Set gör om en array till en Set fast den håller bara unika värden från den arrayn så en [1,1,2,4,4] blir en {1,2,4}
            let uniqueTasksSet = new Set(onlyTaskname);
            let uniqueTasksArray = [...uniqueTasksSet]


            let taskAndTimesArrayToUse = []
            let totalSeconds
            uniqueTasksArray.forEach(taskName => {

                totalSeconds = 0

                tasksCurrentWeek.forEach(task => {

                    if(task.taskName === taskName) {
                        totalSeconds += task.taskTime
                    }

                })

                let toAdd = {
                    task: taskName,
                    totalSeconds: totalSeconds
                }
                taskAndTimesArrayToUse.push(toAdd)
            })
            console.log(taskAndTimesArrayToUse);
        })

    })

    //ritar upp vår bar chart
    const chartRef = useRef(null);
    let myChart = null;
    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');

        if (myChart) {
            myChart.destroy();
        }

        myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Städa', 'Plugga', 'Springa', 'Läsa'],
                datasets: [{
                    label: '# of Seconds',
                    data: [12, 5, 7, 9],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        return () => {
            if (myChart) {
                myChart.destroy();
            }
        };
    }, []); 
    
    return (
        <div>
            <Navbar logout={logout}/>

            <h1 id="statsTitle">Statistics For Current Week</h1>

            <div id="topStatsBoxesContainer">
                <div class="topStatsBoxes">
                    <h2>Most Popular Task</h2>
                </div>
                <div class="topStatsBoxes">
                    <h2>Total Time</h2>
                </div>
                <div class="topStatsBoxes">
                    <h2>Longest Single Task</h2>
                </div>
            </div>

            <div id="canvasContainer">
                <canvas ref={chartRef} id="myChart"></canvas>
            </div>

            <div id="detailedStatsContainer">
                <h2>Place holder element</h2>
            </div>

        </div>
    );
}

export default Statistics;