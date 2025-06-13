'use client'
import React from "react";
import { useState } from "react";
import styles from "./components.module.css";
import Link from "next/link";
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

const getActiveLinks = (path) => {
 switch (path) {
      case '/':
        return { main: [], dropdown: [] };
      default:
        return {
          main: [
            { name: 'Buchen', path: '/booking' },
            { name: 'Meine Reisen', path: '/profile' }
          ],
          dropdown: [
            { name: 'Destinationen', path: '/destinations' },
            { name: 'Hotels', path: '/hotels' },
            { name: 'Meetings', path: '/meetings' },
            { name: 'Flüge', path: '/flights' },
            { name: 'Mitarbeiter', path: '/mitarbeiter' }
          ]
        };
    }
  };

  const { main, dropdown } = getActiveLinks(pathname)

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
           {dropdown.length > 0 && (
            <li style={{ position: 'absolute', margin: '0 10px', listStyleType: "none", right: "10px"  }}>
              <i className="fas fa-gear" style={{ cursor: 'pointer', fontSize: '20px'}} onClick={() => setIsDropdownOpen(!isDropdownOpen)}></i>
              <ul className={`${styles.headerDropdown} ${isDropdownOpen ? '' : styles.hidden}`}>
                {dropdown.map((item) => (
                  <li key={item.path} style={{ padding: '5px 5px', border: "1px solid black" }}>
                    <Link href={item.path}>{item.name}</Link>
                  </li>
                ))}
              </ul>
            </li>
          )}
      </nav>
    </header>
  );
}
