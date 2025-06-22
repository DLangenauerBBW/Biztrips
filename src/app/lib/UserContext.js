'use client'
import { createContext, useState, useEffect } from 'react'
import { getEmployees } from './Fetch'

export const UserContext = createContext()

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    async function fetchEmployees() {
      try {
        const data = await getEmployees() 
        setEmployees(data)
        const savedUser = localStorage.getItem('selectedUser')
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser)
          const validUser = data.find(emp => emp.id === parsedUser.id)
          setUser(validUser || data[0] || null)
        } else {
          setUser(data[0] || null)
        }
      } catch (error) {
        console.error('Failed to fetch employees:', error)
        setEmployees([])
        setUser(null)
      }
    }

    fetchEmployees()
  }, [])

  useEffect(() => {
    if (user) {
      localStorage.setItem('selectedUser', JSON.stringify(user))
    }
  }, [user])

  return (
    <UserContext.Provider value={{ user, setUser, employees }}>
      {children}
    </UserContext.Provider>
  )
}