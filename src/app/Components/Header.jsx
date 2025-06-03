'use client'
import React from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname()
  console.log(pathname)

const getActiveStyle = (path) => {
    switch (path) {
      case '/':
        return [];
      default:
        return [{ name: 'Buchen', path: '/booking' },
                { name: 'Destinationen', path: '/destinations' },
                { name: 'Hotels', path: '/hotels' },
                { name: 'Meine Reisen', path: '/profile' }];
    }
  };

  const navItems = getActiveStyle(pathname)

  return (
    <header>
      <nav>
        <Link href="/">
            <img width="150px" alt="Business Trips" src="/images/logo.png" />
        </Link>
          {navItems.map((item) => (
          <li key={item.path}>
            <Link
              href={item.path}
              className={`nav-item ${pathname === item.path ? 'active' : ''}`}
            >
              {item.name}
            </Link>
          </li>))}
      </nav>
    </header>
  );
}
