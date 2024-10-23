import React from 'react';
import TicketCard from './TicketCard';
import './KanbanBoard.css'; // Ensure you have the correct CSS import
const DownIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.99583 12.75C9.89583 12.75 9.80208 12.7326 9.71458 12.6979C9.62708 12.6632 9.5486 12.6111 9.47916 12.5416L5.52791 8.59038C5.37041 8.43288 5.29513 8.25343 5.30208 8.05204C5.30902 7.85065 5.38888 7.67357 5.54166 7.52079C5.69444 7.36801 5.87152 7.29163 6.07291 7.29163C6.2743 7.29163 6.45138 7.36801 6.60416 7.52079L9.99999 10.9375L13.4167 7.52079C13.5694 7.36801 13.7465 7.2951 13.9479 7.30204C14.1493 7.30899 14.3264 7.38885 14.4792 7.54163C14.6319 7.6944 14.7083 7.87149 14.7083 8.07288C14.7083 8.27426 14.6296 8.45329 14.4721 8.60996L10.5208 12.5416C10.4458 12.6111 10.3646 12.6632 10.2771 12.6979C10.1896 12.7326 10.0958 12.75 9.99583 12.75Z" fill="#535961"/>
</svg>)
  function KanbanBoard({ tickets, users, grouping, setGrouping, sortOrder, setSortOrder }) {
  const groupedTickets = groupTickets(tickets, grouping, sortOrder, users);

  return (
    <div className="kanban-board">
      <div className="kanban-header">
        <div className="dropdown-container">
          <div className="dropdown display-dropdown">
            <button className="dropdown-button">Display
            <DownIcon src={DownIcon} alt="Dropdown Arrow" className="dropdown-icon" />
            </button>
            <div className="dropdown-content">
              <div className="nested-dropdown">
                <label>Group By:</label>
                <select onChange={(e) => setGrouping(e.target.value)} value={grouping}>
                  <option value="status">Status</option>
                  <option value="userId">User</option>
                  <option value="priority">Priority</option>
                </select>
              </div>
              <div className="nested-dropdown">
                <label>Sort By:</label>
                <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
                  <option value="priority">Priority</option>
                  <option value="title">Title</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="kanban-columns">
        {Object.keys(groupedTickets).map((key) => (
          <div key={key} className="kanban-column">
            <h2>{key}</h2>
            {groupedTickets[key].map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} users={users} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function groupTickets(tickets, groupBy, sortOrder, users) {
  const grouped = tickets.reduce((acc, ticket) => {
    const groupKey =
      groupBy === 'userId'
        ? users.find(user => user.id === ticket.userId)?.name || 'Unassigned'
        : ticket[groupBy] || 'No Group';

    if (!acc[groupKey]) acc[groupKey] = [];
    acc[groupKey].push(ticket);
    return acc;
  }, {});

  // Sorting tickets within each group
  Object.keys(grouped).forEach((key) => {
    grouped[key].sort((a, b) => {
      if (sortOrder === 'priority') {
        return b.priority - a.priority; // Higher priority first
      }
      return a.title.localeCompare(b.title); // Sort alphabetically by title
    });
  });

  return grouped;
}

export default KanbanBoard;
