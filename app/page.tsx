'use client'

import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import Header from '@/components/header'
import EquipmentBarcode from '@/components/equipmentbarcode'
import EquipHistory from '@/components/equiphistory'
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff'
import QrCode2Icon from '@mui/icons-material/QrCode2'
import { Button } from '@mui/material'
import PermDataSettingIcon from '@mui/icons-material/PermDataSetting';
import MoveUpIcon from '@mui/icons-material/MoveUp';
import GridOnIcon from '@mui/icons-material/GridOn';
import SchedTask from '@/components/schedtask'
import SiteTransfer from '@/components/sitetransfer'

type Location = string
type Equipment = {
  id: number
  name: string
  location: Location
  status: 'Available' | 'In Use' | 'Maintenance'
}

// Sample data
const locations: Location[] = ['Townsville Office', 'Brisbane Office', 'Goldcoast Office', 'Cannington Mine', 'Ravenswood Gold Mine', 'George Fisher Mine']
const equipmentData: Equipment[] = [
  { id: 1, name: 'Pump31', location: 'Townsville Office', status: 'Available' },
  { id: 2, name: 'Pump15', location: 'Brisbane Office', status: 'In Use' },
  { id: 3, name: 'Pump23', location: 'Goldcoast Office', status: 'Maintenance' },
  // ... (rest of the equipment data)
]

export default function EquipmentManagement() {
  const [selectedLocation, setSelectedLocation] = useState<Location | 'All'>('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredEquipment, setFilteredEquipment] = useState(equipmentData)
  const [emodal, setEModal] = useState(false)
  const [hmodal, setHModal] = useState(false)
  const [equipmentId, setEquipmentId] = useState(0)
  const [equipmentName, setEquipmentName] = useState('')
  const [showCheckboxes, setShowCheckboxes] = useState(false)
  const [selectedEquipment, setSelectedEquipment] = useState<number[]>([])

  useEffect(() => {
    const filtered = equipmentData.filter((item) => {
      const locationMatch = selectedLocation === 'All' || item.location === selectedLocation
      const searchMatch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
      return locationMatch && searchMatch
    })
    setFilteredEquipment(filtered)
  }, [selectedLocation, searchTerm])

  const toggleCheckboxes = () => {
    setShowCheckboxes(!showCheckboxes)
    setSelectedEquipment([])
  }

  const toggleEquipmentSelection = (id: number) => {
    setSelectedEquipment(prev =>
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    )
  }

  const calibrate=()=>{
    setCModal(true);
  }

  const transfer=()=>{
    setTModal(true);
  }
  const [cmodal,setCModal]=useState(false);
  const [tmodal,setTModal]=useState(false);
  const exportToCSV = () => {
    const selectedItems = filteredEquipment.filter(item => selectedEquipment.includes(item.id))
    const csvContent = [
      ['ID', 'Name', 'Location', 'Status'],
      ...selectedItems.map(item => [item.id, item.name, item.location, item.status])
    ].map(e => e.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', 'selected_equipment.csv')
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <>
      <Header activePage={'Home'}/>
      {emodal && <EquipmentBarcode equipmentId={equipmentId.toString()} equipmentName={equipmentName} closeModal={() => setEModal(false)} />}
      {hmodal && <EquipHistory equipmentId={equipmentId.toString()} equipmentName={equipmentName} closeModal={() => setHModal(false)} />}
      {cmodal && <SchedTask closeModal={() => setCModal(false)} />}
      {tmodal && <SiteTransfer closeModal={() => setTModal(false)} />}
      {!cmodal && !tmodal && <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Equipment Management System</h1>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="w-full sm:w-1/3">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Select Location
            </label>
            <select
              id="location"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value as Location | 'All')}
            >
              <option value="All">All Locations</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
          
          <div className="w-full sm:w-2/3">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Search Equipment
            </label>
            <div className="relative">
              <input
                type="text"
                id="search"
                className="p-2 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Search Equipment"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>
          <Button variant="outlined" color="primary" onClick={toggleCheckboxes} style={{width:showCheckboxes?'200px':'600px'}}>
            {showCheckboxes ? 'Hide Select' : <><GridOnIcon/>Fieldlist, <PermDataSettingIcon/>Calibrate, <MoveUpIcon/>Transfer</>}
          </Button>
          {(selectedEquipment.length === 0)&&showCheckboxes&&<div style={{color:'red'}}>check equipment items and then you can transfer, calibrate, export</div>}
          {showCheckboxes && (
            <Button variant="contained" color="secondary" style={{backgroundColor:'red',width:'250px',color:'white'}} onClick={exportToCSV} disabled={selectedEquipment.length === 0}>
              <GridOnIcon/>Export Field List
            </Button>
          )}
          {showCheckboxes && (
            <Button variant="contained" color="secondary" style={{backgroundColor:'red',width:'250px',color:'white'}} onClick={transfer} disabled={selectedEquipment.length === 0}>
              <MoveUpIcon/>Site Transfer
            </Button>
          )}
{showCheckboxes && (
            <Button variant="contained" color="secondary" style={{backgroundColor:'red',width:'250px',color:'white'}} onClick={calibrate} disabled={selectedEquipment.length === 0}>
              <PermDataSettingIcon/>Calibrate
            </Button>
          )}
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {showCheckboxes && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Select
                  </th>
                )}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">History</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEquipment.map((item) => (
                <tr key={item.id}>
                  {showCheckboxes && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedEquipment.includes(item.id)}
                        onChange={() => toggleEquipmentSelection(item.id)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </td>
                  )}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <Button variant="outlined" onClick={() => {setEquipmentName(item.name); setEquipmentId(item.id); setEModal(true);}}>
                      <QrCode2Icon /> {item.name}
                    </Button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <Button variant="outlined" onClick={() => {setEquipmentName(item.name); setEquipmentId(item.id); setHModal(true);}}>
                      <HistoryToggleOffIcon />
                    </Button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${item.status === 'Available' ? 'bg-green-100 text-green-800' : 
                        item.status === 'In Use' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredEquipment.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No equipment found matching the current filters.</p>
        )}
      </div>}
    </>
  )
}