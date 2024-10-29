'use client'

import React, { useState } from 'react'
import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@mui/material'
// Replace with your actual Google Maps API key
const GOOGLE_MAPS_API_KEY = 'AIzaSyAxbtLagZ2yetvjrygh8qyL3rrtxYAHSlE'

// Sample locations
const locations = [
    { id: 1, name: 'Townsville Office', address: 'Suite 3 45/49 Bundock St Belgian Gardens QLD, AUS', lat: -19.2456556, lng: 146.7936314 },
    { id: 2, name: 'Brisbane Office', address: 'Unit 3 26 Argyle Street Albion QLD 4010', lat: -27.4413289, lng: 153.0425 },
    { id: 3, name: 'Gold Coast Office', address: '1/44 THomas Drive, Surfers Paradise', lat: -28.02, lng: 153.4 },
    { id: 4, name: 'Carmichael Coal', address: 'Belyando, Queensland, Australia', lat: -22.03, lng: 146.383 },
    { id: 5, name: 'Collinsville Coal', address: 'Whitsunday, Queensland, Australia', lat: -20.3357, lng: 147.44 },
    { id: 6, name: 'Ravenswood Gold', address: 'Charters Towers, Queensland, Australia', lat: -20.0963, lng: 146.888 },
    { id: 7, name: 'Cannington Silver/Lead', address: 'Mt Isa, Queensland, Australia', lat: -21.86, lng: 140.907 },
]

const mapContainerStyle = {
  width: '100%',
  height: '500px'
}

const center = {
    lat: -23,
    lng: 145
}
interface prop
{
    
    closeModal:()=>void
}
export default function SiteTransfer({closeModal}:prop) {
  const [isOpen, setIsOpen] = useState(true)
  const [selectedLocation, setSelectedLocation] = useState({ id: 0, name: null, address: null, lat: -19.2456556, lng: 146.7936314 },
  )

  //const openModal = () => setIsOpen(true)
  //const closeModal = () => setIsOpen(false)

  const handleLocationSelect = (location) => {
    setSelectedLocation(location)
    //closeModal()
  }

  return (
    <div>
      

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="p-4 border-b" style={{display:'flex',justifyContent:'Space-Between'}}>
              <h2 className="text-xl font-semibold">Select a Location</h2>

              <Button variant='contained' onClick={closeModal}><X className="h-6 w-6" />Transfer</Button>  
            </div>

            <div className="p-4">
              <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={center}
                  zoom={5}
                >
                  {locations.map((location) => (
                    <Marker
                      key={location.id}
                      position={{ lat: location.lat, lng: location.lng }}
                      onClick={() => handleLocationSelect(location)}
                    />
                  ))}

{selectedLocation && (
          <InfoWindow
            position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
            onCloseClick={() => setSelectedLocation(null)}
          >
            <div>
              <h2 className="text-lg font-semibold">{selectedLocation.name}</h2>
              <p className="text-sm">{selectedLocation.address}</p>
            </div>
          </InfoWindow>
        )}
                </GoogleMap>
              </LoadScript>
            </div>
            <div className="p-4 border-t flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedLocation && (
        <p className="mt-4">
          Selected location: {selectedLocation.name}
        </p>
      )}
    </div>
  )
}