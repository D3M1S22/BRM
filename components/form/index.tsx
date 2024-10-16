'use client'

import React, { useState } from 'react'
import {FaLock, FaLockOpen, FaChevronUp, FaChevronDown} from 'react-icons/fa'
import {Field} from '@/stores/useFormStore'

type FormFielProps = {
  label: string
  id: string
  type: string
  placeholder: string
  size?: "w-full" | "w-1/2" | string
  dropdownItems?: string[]
  setter?: (val:Field<string>) => void
}

export const FormField = ({label, id, type, placeholder, size, dropdownItems, setter}:FormFielProps) => {
  const [isEncrypted, setIsEncrypted] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false); 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [value, setValue] = useState('');

  const toggleEncryption = () => {
    setter && setter({value, encrypted: !isEncrypted});
    setIsEncrypted(!isEncrypted); // Toggle the lock state
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle the category dropdown
  };

  const handleChange = (val: string, encryptedState = isEncrypted) => {
    setValue(val); // Update the input value state
    if (setter) {
      setter({ value: val, encrypted: encryptedState }); // Pass the Field structure to the onChange callback
    }
    if(type === 'dropdown')
      setIsDropdownOpen(false); // Close the dropdown after selecting
  };


  return (
    <div className={`mb-4 relative ${size}`}>
      <label className="block text-white text-sm font-medium mb-1" htmlFor={id}>{label}</label>
      <div className="relative">
        {type !== 'textarea' && type !== 'dropdown' ?
          <input
            type={type}
            id={id}
            placeholder={placeholder}
            onChange={(e) => handleChange(e.target.value)} 
            className="w-full px-4 py-2 text-black bg-gray-100 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 pr-10"
          />
          :
          type === 'textarea'  ? 
            <textarea
              id={id}
              placeholder={placeholder}
              onChange={(e) => handleChange(e.target.value)}
              className="w-full px-4 py-2 text-black bg-gray-100 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
          :
            type === 'dropdown' ? 
            <>
            <div className="w-full px-4 py-2 bg-gray-100 text-black rounded-lg border border-gray-300 cursor-pointer flex items-center justify-between relative"
              onClick={toggleDropdown}
            >
              <span>{value || "Select"}</span>
                {isDropdownOpen ? <FaChevronUp className='absolute right-10' /> : <FaChevronDown className='absolute right-10' />}
            </div>
            {isDropdownOpen && 
              <div className="absolute left-0 right-0 mt-2 bg-gray-100 rounded-lg shadow-lg border border-gray-300 max-h-60 overflow-y-auto z-10">
                <ul className="text-black">
                  {dropdownItems?.map((category:string) => (
                    <li
                      key={category}
                      className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => handleChange(category)}
                    >
                      {category}
                    </li>
                  ))}
                  </ul>
              </div>
            }
            </>
            :
              <>
                <svg className="w-12 h-12 text-blue-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M16.88 9.94l-5.66 5.66a1 1 0 01-1.41 0L6.12 12.7a1 1 0 111.41-1.41l3.13 3.12 5.66-5.66a1 1 0 111.41 1.41z"></path>
                </svg>
                <span className="mt-2 text-base leading-normal text-blue-500">Select a file</span>
                <input id="file-upload" type="file" className="hidden" />
              </>
        }
        { !isEncrypted ? 
          <FaLockOpen
            aria-valuetext='Decrypt metadata'
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-xl cursor-pointer transition duration-300 text-gray-400`}
            onClick={toggleEncryption}
            onMouseLeave={() => setIsTooltipVisible(false)}
            onMouseEnter={() => setIsTooltipVisible(true)}// Hide tooltip on mouse leave
          />
          :
          <FaLock
            aria-valuetext='Encrypt metadata'
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-xl cursor-pointer transition duration-300 text-red-400`}
            onClick={toggleEncryption}
            onMouseEnter={() => setIsTooltipVisible(true)}
            onMouseLeave={() => setIsTooltipVisible(false)}// Show tooltip on hover
          />
        }
        {/* Tooltip */}
        {isTooltipVisible && (
          <div className="absolute right-12 top-[-30px] p-2 bg-gray-700 text-white text-xs rounded-lg shadow-lg">
            {`${isEncrypted ? "Decrypt" : "Encrypt" } ${label}`} 
          </div>
        )}
      </div>
      {/* Encryption Message */}
      <p className="text-xs mt-2 text-gray-400">
        {isEncrypted ? 'Encrypted' : 'Unencrypted'}
      </p>
    </div>
  )
}
