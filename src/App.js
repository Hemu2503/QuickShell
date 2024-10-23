import React, { useEffect, useState } from 'react';
import KanbanBoard from './../src/components/KanbanBoard';
import './App.css';

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState('status'); // Default grouping
  const [sortOrder, setSortOrder] = useState('priority'); // Default sorting

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        const data = await response.json();
        setTickets(data.tickets);
        setUsers(data.users);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <KanbanBoard
        tickets={tickets}
        users={users}
        grouping={grouping}
        setGrouping={setGrouping}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
    </div>
  );
}

export default App;
