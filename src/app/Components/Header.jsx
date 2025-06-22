'use client'

import { useState, useContext } from 'react'
import styles from './components.module.css'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UserContext } from '../lib/UserContext'

export default function Header() {
  const pathname = usePathname()
  const { user, setUser, employees } = useContext(UserContext)
  const [isEmployeeDropdownOpen, setIsEmployeeDropdownOpen] = useState(false)

  const getActiveLinks = (path) => {
    switch (path) {
      case '/':
        return { main: [] }
      default:
        return {
          main: [
            { name: 'Buchen', path: '/booking' },
            { name: 'Meine Reisen', path: '/profile' }
          ]
        }
    }
  }

  const { main } = getActiveLinks(pathname)

  const handleEmployeeSelect = (employee) => {
    setUser(employee)
    setIsEmployeeDropdownOpen(false)
  }

  return (
    <header>
      <nav>
        <Link href="/">
          <img width="150px" alt="Business Trips" src="/images/logo.png" />
        </Link>
        {main.map((item) => (
          <li style={{ listStyleType: 'none', paddingTop: "9px", }} key={item.path}>
            <Link
              href={item.path}
            >
              {item.name}
            </Link>
          </li>))}
        <div className={styles.employeeContainer}>
          <span
            className={styles.employeeDisplay}
            onClick={() => setIsEmployeeDropdownOpen(!isEmployeeDropdownOpen)}
          >
            {user?.name}
          </span>
          {isEmployeeDropdownOpen && (
            <ul className={styles.employeeDropdown}>
              {employees.map((emp) => (
                <li
                  key={emp.id}
                  className={styles.employeeItem}
                  onClick={() => handleEmployeeSelect(emp)}
                >
                  {emp.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </nav>
    </header>
  )
}