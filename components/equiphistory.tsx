'use client'


import React, { useState, useEffect } from 'react'

interface Task {
  id: number
  job: string
  location: string
  startDate: string
  endDate: string
}

const jobs = [
  "TEM-004 COAL_5S", "TEM-003 GOLD_5S", "TEM-001 COAL_1S", "TEM-099 GOLD_1W",
    "TEM-002 GOLD_2S", "TEM-033 COPPER_1C", "TEM-999 COPPER_4S", "TEM-111 GOLD_4W"
]

const locations = [
  "Ravenswood Gold", "Mt Isa Mines", "Townsville Office", "Cannington Mine", "Goldcoast Office",
  "Brisbane Office", "Collinsville Coal", "Carmichael Coal", "Blair Athol Coal", "Olive Downs"
]

function generateRandomDate(start: Date, end: Date) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

function formatDate(date: Date) {
  return date.toISOString().split('T')[0]
}

function generateTask(id: number): Task {
  const startDate = generateRandomDate(new Date(2023, 0, 1), new Date())
  const endDate = new Date(startDate)
  endDate.setDate(endDate.getDate() + Math.floor(Math.random() * 30) + 1)

  return {
    id,
    job: jobs[Math.floor(Math.random() * jobs.length)],
    location: locations[Math.floor(Math.random() * locations.length)],
    startDate: formatDate(startDate),
    endDate: formatDate(endDate)
  }
}

function getMonthYear(date: Date) {
  return date.toLocaleString('default', { month: 'short', year: 'numeric' });
}

function getDaysInMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}
interface idname
{
    equipmentId:string
    equipmentName:string
    closeModal:()=>void
}
export default function EquipHistory({equipmentId,equipmentName,closeModal}:idname) {
  const [tasks, setTasks] = useState<Task[]>([])
 // const [equipName, setEquipmentName] = useState("Heavy Duty Crane XL-5000")
  const [viewMode, setViewMode] = useState<'cards' | 'gantt'>('cards')

  useEffect(() => {
    // Generate initial tasks
    const initialTasks = Array.from({ length: 5 }, (_, i) => generateTask(i + 1))
    setTasks(initialTasks)
  }, [])

  const addNewTask = () => {
    const newTask = generateTask(tasks.length + 1)
    setTasks([...tasks, newTask])
  }

  const toggleViewMode = () => {
    setViewMode(viewMode === 'cards' ? 'gantt' : 'cards')
  }

  const sortedTasks = [...tasks].sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
  const earliestDate = new Date(sortedTasks[0]?.startDate || new Date())
  const latestDate = new Date(sortedTasks[sortedTasks.length - 1]?.endDate || new Date())
  const totalDays = Math.ceil((latestDate.getTime() - earliestDate.getTime()) / (1000 * 60 * 60 * 24))

  return (
    <>
    
    <div className="auto-generated-tasks">
    <div style={{display:'flex',justifyContent:'space-between'}}>
      <h1>{equipmentName} Job History</h1>
      <button onClick={closeModal}>Close</button>
      </div>
      <div className="controls">
        <button onClick={addNewTask} className="add-task-btn">Generate New Task</button>
        <button onClick={toggleViewMode} className="toggle-view-btn">
          Switch to {viewMode === 'cards' ? 'Gantt' : 'Card'} View
        </button>
      </div>
      {viewMode === 'cards' ? (
        <div className="task-list">
          {tasks.map((task) => (
            <div key={task.id} className="task-item">
              <h2>{task.job}</h2>
              <p className="location">📍 {task.location}</p>
              <p className="date">🗓 {task.startDate} - {task.endDate}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="gantt-chart">
          <div className="gantt-header">
            <div className="gantt-months">
              {Array.from({ length: Math.ceil(totalDays / 30) }, (_, i) => {
                const monthDate = new Date(earliestDate);
                monthDate.setMonth(earliestDate.getMonth() + i);
                return (
                  <div key={i} className="gantt-month" style={{ width: `${(getDaysInMonth(monthDate) / totalDays) * 100}%` }}>
                    {getMonthYear(monthDate)}
                  </div>
                );
              })}
            </div>
   {/*         <div className="gantt-days">
              {Array.from({ length: totalDays }, (_, i) => (
                <div key={i} className="gantt-day">{i + 1}</div>
              ))}
          
            
            </div>*/}
          </div>
          {sortedTasks.map((task) => {
            const startDays = Math.floor((new Date(task.startDate).getTime() - earliestDate.getTime()) / (1000 * 60 * 60 * 24))
            const duration = Math.ceil((new Date(task.endDate).getTime() - new Date(task.startDate).getTime()) / (1000 * 60 * 60 * 24))
            return (
              <div key={task.id} className="gantt-task">
                <div className="gantt-task-info">
                  <strong>{task.job}</strong>
                  <span>{task.location}</span>
                </div>
                <div className="gantt-task-bar" style={{ marginLeft: `${(startDays / totalDays) * 100}%`, width: `${(duration / totalDays) * 100}%` }}>
                  <span className="gantt-task-dates">{task.startDate} - {task.endDate}</span>
                </div>
              </div>
            )
          })}
        </div>
      )}
      <style jsx>{`
        .auto-generated-tasks {
          font-family: Arial, sans-serif;
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f5f5f5;
          border-radius: 8px;
        }

        h1 {
          color: #333;
          text-align: center;
          margin-bottom: 30px;
        }

        .controls {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-bottom: 20px;
        }

        .add-task-btn, .toggle-view-btn {
          padding: 10px 20px;
          font-size: 16px;
          color: #fff;
          background-color: #3498db;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .add-task-btn:hover, .toggle-view-btn:hover {
          background-color: #2980b9;
        }

        .task-list {
          display: grid;
          gap: 20px;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        }

        .task-item {
          background-color: #ffffff;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s ease-in-out;
        }

        .task-item:hover {
          transform: translateY(-5px);
        }

        .task-item h2 {
          color: #2c3e50;
          margin-top: 0;
          margin-bottom: 10px;
          font-size: 1.2em;
        }

        .task-item p {
          margin: 5px 0;
          color: #34495e;
        }

        .location, .date {
          font-weight: bold;
          color: #7f8c8d;
        }

        .gantt-chart {
          overflow-x: auto;
          background-color: #fff;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .gantt-header {
          margin-bottom: 10px;
        }

        .gantt-months {
          display: flex;
          border-bottom: 1px solid #e0e0e0;
          margin-bottom: 5px;
        }

        .gantt-month {
          text-align: center;
          font-size: 14px;
          font-weight: bold;
          color: #2c3e50;
          padding: 5px 0;
        }

        .gantt-days {
          display: flex;
        }

        .gantt-day {
          flex: 1;
          text-align: center;
          font-size: 12px;
          color: #7f8c8d;
        }

        .gantt-task {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
        }

        .gantt-task-info {
          width: 200px;
          padding-right: 20px;
        }

        .gantt-task-info strong {
          display: block;
          font-size: 14px;
          color: #2c3e50;
        }

        .gantt-task-info span {
          font-size: 12px;
          color: #7f8c8d;
        }

        .gantt-task-bar {
          height: 30px;
          background-color: #3498db;
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 12px;
          position: relative;
        }

        .gantt-task-dates {
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          text-align: center;
          font-size: 10px;
          color: #7f8c8d;
          margin-top: 2px;
        }

        @media (max-width: 768px) {
          .task-list {
            grid-template-columns: 1fr;
          }

          .gantt-task-info {
            width: 150px;
          }

          .gantt-task-bar {
            height: 20px;
            font-size: 10px;
          }
        }
      `}</style>
    </div>
    </>
  )
}