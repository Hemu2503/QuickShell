import React from 'react';
import './TicketCard.css';

// Importing icons for priorities
import UrgentPriorityColor from './icons/SVG - Urgent Priority colour.svg';
import HighPriority from './icons/Img - High Priority.svg';
import MediumPriority from './icons/Img - Medium Priority.svg';
import LowPriority from './icons/Img - Low Priority.svg';
import NoPriority from './icons/No-priority.svg';

// Importing icons for statuses
import ToDo from './icons/To-do.svg';
import InProgress from './icons/in-progress.svg';
import Done from './icons/Done.svg';
import Backlog from './icons/Backlog.svg';
import Cancelled from './icons/Cancelled.svg';

// Placeholder image for user profile picture
const user = 'https://api.quicksell.co/v1/internal/frontend-assignment';
// Map priority icons
const priorityIcons = {
  4: UrgentPriorityColor,
  3: HighPriority,
  2: MediumPriority,
  1: LowPriority,
  default: NoPriority,
};

// Map status icons
const statusIcons = {
  todo: ToDo,
  inprogress: InProgress,
  done: Done,
  backlog: Backlog,
  cancelled: Cancelled,
};

// Function to get priority icon based on the priority level
const getPriorityIcon = (priority) => {
  return priorityIcons[priority] || priorityIcons['default'];
};

// Function to get status icon
const getStatusIcon = (status) => {
  return statusIcons[status.toLowerCase()] || statusIcons['todo']; // Default to "To-Do" if no match
};

function TicketCard({ ticket, users }) {
  const user = users.find(user => user.id === ticket.userId) || {};
  const userImageUrl = user.image // Use user's image or placeholder

  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <div className="ticket-info">
        <span className="user-avatar">
  <div className="user-id">{ticket.userId}</div>
  <div className="user-name">{user.name}</div>
</span>

          <h3 className="ticket-title">
            
            <img src={getStatusIcon(ticket.status)} alt="status-icon" className="status-icon" />
            {ticket.title}
          </h3>
          <div className="ticket-details">
            
            <img src={getPriorityIcon(ticket.priority)} alt="priority-icon" className="priority-icon" />
            <span className="priority-text">{getPriorityLabel(ticket.priority)}</span>
            
            {/* Add the tag here, assuming ticket.tag is the relevant field from the API */}
            {ticket.tag && <span className="ticket-tag">{ticket.tag}</span>}
            
          </div>
        </div>
      </div>
    </div>
  );
}

// Function to get priority label text
const getPriorityLabel = (priority) => {
  switch (priority) {
    case 4: return 'Urgent';
    case 3: return 'High';
    case 2: return 'Medium';
    case 1: return 'Low';
    default: return 'No priority';
  }
};

export default TicketCard;
