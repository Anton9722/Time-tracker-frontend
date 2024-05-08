import React, { useEffect, useRef, useState } from 'react';
import Chart, { Tooltip } from 'chart.js/auto';
import Navbar from "./Navbar";

function Statistics ({logout, accountId}) {
    const [taskAndTime, setTaskAndTime] = useState([]);
    const [totalSeconds, setTotalSeconds] = useState("");
    const [longestSingleTask, setLongestSingleTask] = useState("");
    const [mostPopularTask, setMostPopularTask] = useState("");
    const [allTasksThisWeek, setAllTasksThisWeek] = useState([]);

    useEffect(() => {
        fetchData();
    }, []); 

    const fetchData = () => {
        let currentDate = new Date();
        let currentYear = currentDate.getFullYear();
        let currentMonth = currentDate.getMonth() + 1;
        let currentDay = currentDate.getDate();
        let dateToday = currentYear + "/" + currentMonth + "/" + currentDay;
        fetch("http://sholiday.faboul.se/dagar/v2.1/" + dateToday)
            .then(res => res.json())
            .then(data => {
                let currentWeek = data.dagar[0].vecka;

                fetch("http://localhost:8080/account/getalltasks/" + accountId)
                    .then(res => res.json())
                    .then(data => {
                        let allTasks = data;
                        let tasksCurrentWeek = allTasks.filter(task => task.createdOnWeek === currentWeek);

                        setAllTasksThisWeek(tasksCurrentWeek)

                        let longestTaskTime = 0
                        let longestTaskName = ""
                        tasksCurrentWeek.forEach(task => {
                            if(task.taskTime > longestTaskTime) {
                                longestTaskTime = task.taskTime
                                longestTaskName = task.taskName
                            }
                        })

                        setLongestSingleTask(longestTaskName + ": " + longestTaskTime + "s")

                        let onlyTaskname = tasksCurrentWeek.map(task => task.taskName);
                        let uniqueTasksSet = new Set(onlyTaskname);
                        let uniqueTasksArray = [...uniqueTasksSet];

                        let taskAndTimesArrayToUse = [];
                        uniqueTasksArray.forEach(taskName => {
                            let totalSeconds = 0;
                            tasksCurrentWeek.forEach(task => {
                                if(task.taskName === taskName) {
                                    totalSeconds += task.taskTime;
                                }
                            });
                            let toAdd = {
                                task: taskName,
                                totalSeconds: totalSeconds
                            };
                            taskAndTimesArrayToUse.push(toAdd);
                        });
                        setTaskAndTime(taskAndTimesArrayToUse);
                        let allTaskTotalTime = 0;
                        taskAndTimesArrayToUse.forEach(task => {
                            allTaskTotalTime += task.totalSeconds
                        })
                        setTotalSeconds(allTaskTotalTime)

                        let mostPopularTaskToSave = ""
                        let valueHolder = 0
                        taskAndTimesArrayToUse.forEach(task => {
                            if(task.totalSeconds > valueHolder) {
                                valueHolder = task.totalSeconds
                                mostPopularTaskToSave = task.task
                            }
                        })
                        setMostPopularTask(mostPopularTaskToSave)
                    });
            });
    };

    const chartRef = useRef(null);

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');
        let myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: taskAndTime.map(item => item.task), 
                datasets: [{
                    label: '# of Seconds',
                    data: taskAndTime.map(item => item.totalSeconds), 
                    borderWidth: 1,
                    backgroundColor: "rgba(161, 253, 101, 0.5)",
                    borderColor: "rgba(161, 253, 101)",
                    
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: "white"
                        }
                    },
                    x: {
                        ticks: {
                            color: "white"
                        }
                    }
                }
            }
        });
        return () => {
            myChart.destroy();
        };
    }, [taskAndTime]);

    return (
        <div>
            <Navbar logout={logout}/>

            <h1 id="statsTitle">Statistics For Current Week</h1>

            <div id="topStatsBoxesContainer">
                <div class="topStatsBoxes">
                    <h2>Most Popular Task:</h2>
                    <h2>{mostPopularTask}</h2>
                </div>
                <div class="topStatsBoxes">
                    <h2>Total Time All Tasks:</h2>
                    <h2>{totalSeconds}s</h2>
                </div>
                <div class="topStatsBoxes">
                    <h2>Longest Single Task:</h2>
                    <h2>{longestSingleTask}</h2>
                </div>
            </div>

            <div id="canvasContainer">
                <canvas ref={chartRef} id="myChart"></canvas>
            </div>

            <div id="detailedStatsContainer">
                <h2>Task history (this week)</h2>
                <ul>
                    {allTasksThisWeek.map(task => (
                        <li>
                            <h3>{task.taskName} {task.taskTime}s</h3>
                            <hr></hr>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Statistics;