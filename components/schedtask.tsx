'use client'

import React, { useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@mui/material'
// Mock data for users and tasks
const users = [
  { id: 1, name: 'Gregg' },
  { id: 2, name: 'Leonie' },
  { id: 3, name: 'Jaques' },
]

const tasks: { [key: number]: { date: string; title: string }[] } = {
  1: [
    { date: '2024-10-05', title: 'Project meeting' },
    { date: '2024-10-05', title: 'Calibrating devices' },
    { date: '2024-10-12', title: 'Client call' },
    { date: '2024-10-15', title: 'Calibrating Equipment' },
    { date: '2024-10-20', title: 'Calibrating Pumps' },
  ],
  2: [
    { date: '2024-10-08', title: 'Team building' },
    { date: '2024-10-05', title: 'Calibrating devices' },
    { date: '2024-10-12', title: 'Calibrating Pumps' },
    { date: '2024-10-15', title: 'Presentation prep' },
    { date: '2024-10-25', title: 'Calibrating devices' },
  ],
  3: [
    { date: '2024-10-03', title: 'Training session' },
    { date: '2024-10-05', title: 'Calibrating devices' },
    { date: '2024-10-15', title: 'Calibrating meters' },
    { date: '2024-10-18', title: 'Mt Isa' },
    { date: '2024-10-30', title: 'Performance review' },
  ],
}
interface prop
{
    
    closeModal:()=>void
}

export default function SchedTask({closeModal}:prop) {
  const [isOpen, setIsOpen] = useState(true)
  const [selectedUser, setSelectedUser] = useState(users[0])
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const toggleModal = () => setIsOpen(!isOpen)

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const userId = parseInt(event.target.value)
    setSelectedUser(users.find(user => user.id === userId) || users[0])
  }

  const changeMonth = (increment: number) => {
    setCurrentMonth(prevMonth => {
      const newMonth = new Date(prevMonth)
      newMonth.setMonth(newMonth.getMonth() + increment)
      return newMonth
    })
  }

  const renderCalendar = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDay = firstDay.getDay()

    const calendar = []
    let day = 1

    for (let i = 0; i < 6; i++) {
      const week = []
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < startingDay) {
          week.push(<td key={`empty-${j}`} className="p-2"></td>)
        } else if (day > daysInMonth) {
          break
        } else {
          const date = new Date(year, month, day)
          const dateString = date.toISOString().split('T')[0]
          const dayTasks = tasks[selectedUser.id].filter(task => task.date === dateString)
          week.push(
            <td key={day} className="p-2 border border-gray-200">
              <button
                className={`w-full h-full p-2 rounded-lg text-left ${
                  dayTasks.length > 0 ? 'bg-blue-100 hover:bg-blue-200' : 'hover:bg-gray-100'
                } ${selectedDate?.getDate() === day ? 'ring-2 ring-blue-500' : ''}`}
                onClick={() => setSelectedDate(date)}
              >
                <div className="font-semibold">{day}</div>
                {dayTasks.map((task, index) => (
                  <div key={index} className="text-xs truncate text-gray-600">
                    {task.title}
                  </div>
                ))}
              </button>
            </td>
          )
          day++
        }
      }
      calendar.push(<tr key={i}>{week}</tr>)
      if (day > daysInMonth) break
    }

    return calendar
  }

  const selectedTasks = selectedDate
    ? tasks[selectedUser.id].filter(
        task => new Date(task.date).toDateString() === selectedDate.toDateString()
      )
    : []

  if (!isOpen) {
    return <button onClick={toggleModal} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Open Calendar</button>
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Schedule equipment to be calibrated by peron / day</h2>
         
          <button onClick={closeModal}><X className="h-6 w-6" />Close</button>
        </div>
        <div className="p-4">
          <div className="mb-4">
            <label htmlFor="user-select" className="block text-sm font-medium text-gray-700 mb-1">
              Select User
            </label>
            <select
              id="user-select"
              value={selectedUser.id}
              onChange={handleUserChange}
              className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
            >
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-between items-center mb-4">
            <button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-gray-200">
              <ChevronLeft className="h-6 w-6" />
            </button>
            <h3 className="text-lg font-semibold">
              {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </h3>
            <button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-gray-200">
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <th key={day} className="p-2 text-center border border-gray-200">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>{renderCalendar()}</tbody>
            </table>
          </div>
          {selectedDate && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">
                Schedule selected equipment to be calibrated on {selectedDate.toLocaleDateString()}:
              </h3>
              <Button variant='outlined' onClick={(e:any)=>{e.preventDefault();closeModal}}>Submit</Button>
              {selectedTasks.length > 0 ? (
                <ul className="list-disc pl-5">
                  {selectedTasks.map((task, index) => (
                    <li key={index}>{task.title}</li>
                  ))}
                </ul>
              ) : (
                <p>No tasks scheduled for this day.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}