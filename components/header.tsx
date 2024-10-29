'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MapIcon,Workflow, Instagram, Facebook, LogIn, UserPlus, Menu, X, Settings } from 'lucide-react'
import MoveUpIcon from '@mui/icons-material/MoveUp';
import CottageIcon from '@mui/icons-material/Cottage'
import { LinkedIn, MapSharp } from '@mui/icons-material'

type HeaderProps = {
  activePage: string
}

export default function Header({ activePage }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const menuItems = [
    { href: '/', label: 'Home', icon: <CottageIcon /> },
    { href: '/locations', label: 'Locations', icon: <MapIcon /> },
    { href: '/barcodetransfer', label: 'Barcode Transfer', icon: <MoveUpIcon /> },
    { href: '/calibration', label: 'Calibration', icon: <Settings /> },
  ]

  return (
    <header className="border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
           
            <img src="/icon.png"></img>
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                activePage === item.label
                  ? "bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
                  : "text-gray-600 hover:text-gray-800"
              }
           style={{display:'flex',justifyContent:'space-around'}} >
              {item.icon}
              {item.label}
            </Link>
          ))}
          <div className="flex items-center space-x-4">
            <Link href="https://www.linkedin.com/company/5-sticks-consulting/" target='other' className="text-gray-600 hover:text-gray-800">
              <LinkedIn className="w-5 h-5" />
            </Link>
            <Link href="https://facebook.com/profile.php?id=100065357865329" target='other' className="text-gray-600 hover:text-gray-800">
              <Facebook className="w-5 h-5" />
            </Link>  
            <Link href="https://www.google.com/maps/place/5+Sticks+Consulting/@-19.2455468,146.7938425,17z/data=!3m1!4b1!4m5!3m4!1s0x697e0302b73b3873:0x54626210f6e0651c!8m2!3d-19.2455468!4d146.7960312" target='other' className="text-gray-600 hover:text-gray-800">
              <MapSharp className="w-5 h-5" />
            </Link>
            {/*<Link href="/login" className="text-gray-600 hover:text-gray-800">
              <LogIn className={activePage === 'Login' ? "bg-blue-600 text-gray-100 hover:text-gray-800" : "text-gray-600 hover:text-gray-800"} />
            </Link>
            <Link href="/register" className={activePage === 'Register' ? "bg-blue-600 text-gray-100 hover:text-gray-800" : "text-gray-600 hover:text-gray-800"} >
              <UserPlus className="w-5 h-5" />
            </Link>*/}
          </div>
        </nav>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-600 hover:text-gray-800">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="flex flex-col items-center space-y-4 py-4">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={
                  activePage === item.label
                    ? "bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300 w-full text-center"
                    : "text-gray-600 hover:text-gray-800 w-full text-center"
                }
                onClick={toggleMenu}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
            <div className="flex items-center space-x-4 pt-4">
              <Link href="https://instagram.com" target='other' className="text-gray-600 hover:text-gray-800">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="https://facebook.com" target='other' className="text-gray-600 hover:text-gray-800">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="/login" className="text-gray-600 hover:text-gray-800">
                <LogIn className={activePage === 'Login' ? "bg-blue-600 text-gray-100 hover:text-gray-800" : "text-gray-600 hover:text-gray-800"} />
              </Link>
              <Link href="/register" className={activePage === 'Register' ? "bg-blue-600 text-gray-100 hover:text-gray-800" : "text-gray-600 hover:text-gray-800"} >
                <UserPlus className="w-5 h-5" />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}