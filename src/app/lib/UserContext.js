'use client'
import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

const employees = [
  { id: 1, name: 'Anna Schmidt', title: 'Project Manager' },
  { id: 2, name: 'Ben Müller', title: 'Sales Director' },
  { id: 3, name: 'Clara Weber', title: 'Developer' }
];

export default function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    const employee = localStorage.getItem('selectedUser');
    return employee ? JSON.parse(employee) : employees[0]; // Default to Anna if no saved user
  });

  useEffect(() => {
    localStorage.setItem('selectedUser', JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, employees }}>
      {children}
    </UserContext.Provider>
  );
}