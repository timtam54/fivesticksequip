'use client'

import React, { useState, useCallback, useRef } from 'react'
import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api'
import Header from '@/components/header'
import { Search } from 'lucide-react'

interface location{
  id: number;
  name: string;
  address: string;
  lat: number;
  lng: number;
}
// Sample location data
const locations:location[] = [
  { id: 1, name: 'Townsville Office', address: 'Suite 3 45/49 Bundock St Belgian Gardens QLD, AUS', lat: -19.2456556, lng: 146.7936314 },
  { id: 2, name: 'Brisbane Office', address: 'Unit 3 26 Argyle Street Albion QLD 4010', lat: -27.4413289, lng: 153.0425 },
  { id: 3, name: 'Gold Coast Office', address: '1/44 THomas Drive, Surfers Paradise', lat: -28.02, lng: 153.4 },
  { id: 4, name: 'Carmichael Coal', address: 'Belyando, Queensland, Australia', lat: -22.03, lng: 146.383 },
  { id: 5, name: 'Collinsville Coal', address: 'Whitsunday, Queensland, Australia', lat: -20.3357, lng: 147.44 },
  { id: 6, name: 'Ravenswood Gold', address: 'Charters Towers, Queensland, Australia', lat: -20.0963, lng: 146.888 },
  { id: 7, name: 'Cannington Silver/Lead', address: 'Mt Isa, Queensland, Australia', lat: -21.86, lng: 140.907 },
]

// Table component
const LocationTable = ({ filteredLocations }: { filteredLocations: location[] }) => (
  <div className="overflow-x-auto bg-white rounded-lg shadow">
    <table className="w-full">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {filteredLocations.map((location) => (
          <tr key={location.id} className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{location.name}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{location.address}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

// Map component
const LocationMap = ({ filteredLocations }: { filteredLocations: location[] }) => {
  const mapContainerStyle = {
    width: '100%',
    height: '500px'
  }

  const center = {
    lat: -23,
    lng: 145
  }

  const [selectedLocation, setSelectedLocation] = useState<location|null>()

  return (
    <LoadScript googleMapsApiKey="AIzaSyAxbtLagZ2yetvjrygh8qyL3rrtxYAHSlE">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={6}
      >
        {filteredLocations.map((location) => (
          <Marker
            key={location.id}
            position={{ lat: location.lat, lng: location.lng }}
            onClick={() => setSelectedLocation(location)}
          />
        ))}
        {selectedLocation && (
          <InfoWindow
            position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
            onCloseClick={() => setSelectedLocation(null)}
          >
            <div>
              <h3 className="font-bold">{selectedLocation.name}</h3>
              <p>{selectedLocation.address}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  )
}

// Main component
export default function Locations() {
  const [activeTab, setActiveTab] = useState('map')
  const [searchTerm, setSearchTerm] = useState('')
  const searchInputRef = useRef(null)

  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.address.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSearch = useCallback(() => {
    setSearchTerm(searchInputRef.current!)
  }, [])

  return (
    <div>
      <Header activePage={'Locations'} />
      <main className="flex-grow container mx-auto px-4 py-4">
        
        <div className="mb-2 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Locations</h1>

          <div className="relative w-full sm:w-64">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search locations..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleSearch}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('table')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'table'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Table View
            </button>
            <button
              onClick={() => setActiveTab('map')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'map'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Map View
            </button>
          </div>
        </div>
        
        {activeTab === 'table' ? (
          <LocationTable filteredLocations={filteredLocations} />
        ) : (
          <div className="bg-white p-4 rounded-lg shadow">
            <LocationMap filteredLocations={filteredLocations} />
          </div>
        )}
      </main>
    </div>
  )
}