'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X, User, ChevronDown, LogOut } from 'lucide-react'
import { cropWalletAddress } from '@/utils'
import { useRouter } from "next/navigation";
import { useLogout, useUser } from '@account-kit/react'

export default function HeaderNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { logout } = useLogout();
  const user = useUser();

  useEffect(() => {
    setIsMounted(true)

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  if (!isMounted) {
    return null;
  }

  if(!user?.address) router.push("/");

  return (
    <header className="fixed top-0 left-0 right-0 bg-black shadow-md z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image src="/BRM_logo_raw.png" alt="Logo" width={90} height={90} className="rounded-full" />
            </Link>
          </div>

          {/* Desktop Navigation */}


          {/* User Info / Login Button */}
          <div className="hidden md:block">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-pink-500 focus:outline-none"
                >
                  <User className="h-6 w-6" />
                  <span className="font-medium">{cropWalletAddress(user.address)}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                    <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                    <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex justify-center">
                <p className="text-gray-700">Not logged</p>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-pink-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-black shadow-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {user ? (
              <>
                <Link href="/profile" className="text-gray-700 hover:text-pink-500 block px-3 py-2 rounded-md text-base font-medium">Profile</Link>
                <button onClick={logout} className="text-gray-700 hover:text-pink-500 block w-full text-left px-3 py-2 rounded-md text-base font-medium">
                  Logout
                </button>
              </>
            ) : (
              <div className="flex justify-center">
                <p className="text-gray-700">Not logged</p>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
