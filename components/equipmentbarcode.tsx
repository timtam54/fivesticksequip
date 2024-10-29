'use client'

import { useState } from 'react'
import Barcode from 'react-barcode'
import SaveIcon from '@mui/icons-material/Save';
import QrCode2Icon from '@mui/icons-material/QrCode2';
interface idname
{
    equipmentId:string
    equipmentName:string
    closeModal:()=>void
}
export default function EquipmentBarcode({equipmentId,equipmentName,closeModal}:idname) {
  const [EquipmentId, setEquipmentId] = useState(equipmentId)
  const [EquipmentName, setEquipmentName] = useState(equipmentName)
  const [barcodeValue, setBarcodeValue] = useState('')

  const generateBarcode = () => {
    if (equipmentId && equipmentName) {
      setBarcodeValue(`${equipmentId}-${equipmentName}`)
    }
  }

  const downloadBarcode = () => {
    const canvas = document.querySelector('canvas')
    if (canvas) {
      const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
      let downloadLink = document.createElement('a')
      downloadLink.href = pngUrl
      downloadLink.download = `${equipmentId}-${equipmentName}-barcode.png`
      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)
    }
  }

  return (
    <>
   
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-6">
        
      <div style={{display:'flex',justifyContent:'space-between'}}>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">Equipment Details</h2>
        <button onClick={closeModal}>Close</button>
</div>
        <div className="space-y-4">
          <div>
            <label htmlFor="equipment-id" className="block text-sm font-medium text-gray-700 mb-1">
              Equipment No
            </label>
            <input
              id="equipment-id"
              type="text"
              placeholder="Enter equipment ID"
              value={EquipmentId}
              onChange={(e) => setEquipmentId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="equipment-name" className="block text-sm font-medium text-gray-700 mb-1">
              Equipment Name
            </label>
            <input
              id="equipment-name"
              type="text"
              placeholder="Enter equipment name"
              value={EquipmentName}
             onChange={(e) => setEquipmentName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
    <div style={{display:'flex',justifyContent:'space-between'}}>
          <button
            onClick={generateBarcode}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
          >
            <QrCode2Icon/>Barcode
          </button>
          
            <button onClick={(e:any)=>alert('save changes')}               
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-200">
              <SaveIcon/>Save Changes
            </button>
           
            </div>
        </div>
        {barcodeValue && (
          <div className="mt-6 flex flex-col items-center">
            <Barcode value={barcodeValue} />
            <button
              onClick={downloadBarcode}
              className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-200"
            >
              Download Barcode <QrCode2Icon/>
            </button>  
          </div>
        )}
      </div>
    </div>
    </>
  )
}