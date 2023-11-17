import React, { useState } from 'react';
import styles from './Dropdown.module.css';

export default function Dropdown() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <button onClick={toggleDropdown}>
        Open Dropdown
      </button>
      {isDropdownOpen && (
        <div className={styles.DropdownMenu}>
          {/* Dropdown menu content */}
          <ul>
            <li>Option 1</li>
            <li>Option 2</li>
            {/* Add more options as needed */}
          </ul>
        </div>
      )}
    </>
  );
};
