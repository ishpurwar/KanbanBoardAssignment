import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { ColumnIcon, Dotme, Add } from '../constants';
import KanbanTicket from './KanbanTicket';

const KanbanColumn = ({ title, tickets, groupBy, users }) => {
    return (
        <div className="kanban-column">
            <div className='title-column'>
                <div className="tile-container">
                    <div>
                        <ColumnIcon title={title} groupBy={groupBy} />
                    </div>
                    <h3>{title}</h3>
                    <span>{tickets.length}</span>
                </div>
                <div className="tile-container" style={{ color: "#6a6b6f" }}>
                    <Add />
                    <Dotme />
                </div>
            </div>
            <Droppable droppableId={title}>
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className='drop'>
                        {tickets.map((ticket, index) => (
                            <KanbanTicket 
                                key={ticket.id} 
                                ticket={ticket} 
                                index={index} 
                                groupBy={groupBy}
                                users={users} 
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default KanbanColumn;