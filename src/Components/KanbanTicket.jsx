import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { StatusIcons, PriorityIcons, UserIcon } from '../constants';

const KanbanTicket = ({ ticket, index, groupBy, users }) => {
    const StatusIcon = StatusIcons[ticket.status];
    const PriorityIcon = PriorityIcons[getPriorityLabel(ticket.priority)];

    return (
        <Draggable draggableId={ticket.id} index={index}>
            {(provided) => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className="card"
                >
                    <div className="card-header">
                        <span className="card-id">{ticket.id}</span>
                        <div className="ticket-icons">
                            {groupBy === 'priority' && (
                                <>
                                    <UserIcon />
                                </>
                            )}
                            {groupBy === 'status' && (
                                <>
                                    <UserIcon />
                                </>
                            )}
                        </div>
                    </div>
                    <h2 className="card-title">
                        {(groupBy === 'user' || groupBy === 'priority') && StatusIcon && <StatusIcon />}
                        <div>
                        {ticket.title}
                        </div>
                    </h2>
                    <div class="tag-container">

                        {(groupBy === 'user' || groupBy === 'status') && PriorityIcon && <div class="alert-icon"> <PriorityIcon /> </div>}

                        <div className="tag-container">
                            {ticket.tag.map((tag, tagIndex) => (
                                <div key={`${ticket.id}-${tagIndex}`} className="feature-tag">
                                    <div className="feature-tag-circle" />
                                    <span className="feature-tag-text">{tag}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    );
};

// Helper function for priority labels
const getPriorityLabel = (priority) => {
    switch (priority) {
        case 4:
            return 'Urgent';
        case 3:
            return 'High';
        case 2:
            return 'Medium';
        case 1:
            return 'Low';
        case 0:
            return 'No priority';
        default:
            return 'No priority';
    }
};

export default KanbanTicket;
