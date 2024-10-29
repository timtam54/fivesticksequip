'use client'

import Header from '@/components/header'
import React, { useState, useEffect } from 'react'

// Mock data for staff and tasks
const staffMembers = [
  { id: 1, name: 'Gregg' },
  { id: 2, name: 'Leonie' },
  { id: 3, name: 'Jaques' },
] 

const taskData = {
  1: [
    { date: '2024-10-05', description: 'Project meeting' },
    { date: '2024-10-05', description: 'Calibrating devices' },
    { date: '2024-10-12', description: 'Client call' },
    { date: '2024-10-15', description: 'Calibrating Equipment' },
    { date: '2024-10-20', description: 'Calibrating Pumps' },
  ],
  2: [
    { date: '2024-10-08', description: 'Team building' },
    { date: '2024-10-05', description: 'Calibrating devices' },
    { date: '2024-10-12', description: 'Calibrating Pumps' },
    { date: '2024-10-15', description: 'Presentation prep' },
    { date: '2024-10-25', description: 'Calibrating devices' },
  ],
  3: [
    { date: '2024-10-03', description: 'Training session' },
    { date: '2024-10-05', description: 'Calibrating devices' },
    { date: '2024-10-15', description: 'Calibrating meters' },
    { date: '2024-10-18', description: 'Mt Isa' },
    { date: '2024-10-30', description: 'Performance review' },
  ],
}

export default function StaffCalendar() {
  const [selectedStaff, setSelectedStaff] = useState(staffMembers[0].id)
  const [currentDate, setCurrentDate] = useState(new Date(2024, 9, 1)) // October 2024
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    setTasks(taskData[selectedStaff] || [])
  }, [selectedStaff])

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()

  const getDayColor = (day) => {
    const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return tasks.some(task => task.date === dateString) ? 'bg-blue-200' : 'bg-white'
  }

  const getTaskDescription = (day) => {
    const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    const task = tasks.find(task => task.date === dateString)
    return task ? task.description : ''
  }

  return (
    <>
    <Header activePage={'Calibration'} />
    <div className="container mx-auto p-4 font-sans">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Staff Calendar</h1>
      <div className="mb-6">
        <label htmlFor="staff-select" className="block text-sm font-medium text-gray-700 mb-2">Select Staff Member:</label>
        <select
          id="staff-select"
          value={selectedStaff}
          onChange={(e) => setSelectedStaff(Number(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        >
          {staffMembers.map(staff => (
            <option key={staff.id} value={staff.id}>{staff.name}</option>
          ))}
        </select>
      </div>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center font-bold p-2 bg-gray-100">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {[...Array(firstDayOfMonth)].map((_, index) => (
            <div key={`empty-${index}`} className="p-4 bg-gray-50"></div>
          ))}
          {[...Array(daysInMonth)].map((_, index) => {
            const day = index + 1
            const taskDescription = getTaskDescription(day)
            return (
              <div
                key={day}
                className={`p-4 ${getDayColor(day)} relative group transition duration-150 ease-in-out hover:shadow-md`}
              >
                <span className="absolute top-1 left-1 text-sm font-medium text-gray-700">{day}</span>
                {taskDescription && (
                  <div className="mt-4 text-xs text-gray-600 truncate" title={taskDescription}>
                    {taskDescription}
                  </div>
                )}
                {taskDescription && (
                  <div className="absolute hidden group-hover:block bg-white border border-gray-200 p-2 z-10 top-full left-0 mt-1 rounded shadow-lg text-sm text-gray-800 w-48">
                    {taskDescription}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
    </>
  )
}