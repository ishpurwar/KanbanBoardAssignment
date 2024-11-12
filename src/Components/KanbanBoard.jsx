import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import ViewOptions from './ViewOptions';
import KanbanColumns from './KanbanColumns';
import { getPriorityFromLabel, getPriorityLabel,getUserNameById } from '../lib/utils';

const KanbanBoard = () => {
    const [tickets, setTickets] = useState([]);
    const [groupBy, setGroupBy] = useState('status');
    const [sortBy, setSortBy] = useState('priority');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
            const data = await response.json();
            setTickets(data.tickets);
            setUsers(data.users);
        };
        fetchData();
    }, []);

    const handleDragEnd = (result) => {
        if (!result.destination) return;
        
        const { source, destination, draggableId } = result;

        // Find the ticket being dragged
        const ticketToUpdate = tickets.find(ticket => ticket.id === draggableId);
        if (!ticketToUpdate) return;

        // Create a copy of the tickets array
        const newTickets = Array.from(tickets);
        
        // Remove the ticket from its current position
        const ticketIndex = newTickets.findIndex(t => t.id === draggableId);
        const [removedTicket] = newTickets.splice(ticketIndex, 1);
        
        // Create the updated ticket
        const updatedTicket = { ...removedTicket };

        // Update the ticket based on the destination column
        switch (groupBy) {
            case 'status':
                updatedTicket.status = destination.droppableId;
                break;
            case 'priority':
                updatedTicket.priority = getPriorityFromLabel(destination.droppableId);
                break;
            case 'user':
                const targetUser = users.find(user => user.name === destination.droppableId);
                if (targetUser) {
                    updatedTicket.userId = targetUser.id;
                }
                break;
        }

        // Find all tickets in the destination column
        const destinationColumnTickets = newTickets.filter(ticket => {
            switch (groupBy) {
                case 'status':
                    return ticket.status === destination.droppableId;
                case 'priority':
                    return getPriorityLabel(ticket.priority) === destination.droppableId;
                case 'user':
                    return getUserNameById(ticket.userId, users) === destination.droppableId;
                default:
                    return false;
            }
        });

        // Calculate the insert position
        let insertIndex;
        if (destinationColumnTickets.length === 0) {
            // If the column is empty, add to the end of the array
            insertIndex = newTickets.length;
        } else {
            // Find the first ticket in the destination column
            const firstTicketInDestination = newTickets.findIndex(ticket => {
                switch (groupBy) {
                    case 'status':
                        return ticket.status === destination.droppableId;
                    case 'priority':
                        return getPriorityLabel(ticket.priority) === destination.droppableId;
                    case 'user':
                        return getUserNameById(ticket.userId, users) === destination.droppableId;
                    default:
                        return false;
                }
            });

            insertIndex = firstTicketInDestination === -1 
                ? newTickets.length 
                : firstTicketInDestination + destination.index;
        }

        // Insert the updated ticket at the calculated position
        newTickets.splice(insertIndex, 0, updatedTicket);

        // Update state with the new array
        setTickets(newTickets);
    };

    return (
        <div className="kanban-board">
            <div className='navbar'>
                <ViewOptions
                    groupBy={groupBy}
                    sortBy={sortBy}
                    handleGroupBy={setGroupBy}
                    handleSortBy={setSortBy}
                />
            </div>
            <DragDropContext onDragEnd={handleDragEnd}>
                <KanbanColumns
                    tickets={tickets}
                    groupBy={groupBy}
                    sortBy={sortBy}
                    users={users}
                />
            </DragDropContext>
        </div>
    );
};

export default KanbanBoard;