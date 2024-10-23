import React from 'react';
import './Header.css';

const Header = ({ setGroupBy, setSortBy }) => {
  return (
    <div className="header">
      <div className="group-by">
        <label>Group By:</label>
        <select onChange={(e) => setGroupBy(e.target.value)}>
          <option value="status">Status</option>
          <option value="user">User</option>
          <option value="priority">Priority</option>
        </select>
      </div>

      <div className="sort-by">
        <label>Sort By:</label>
        <select onChange={(e) => setSortBy(e.target.value)}>
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </select>
      </div>
    </div>
  );
};

export default Header;
