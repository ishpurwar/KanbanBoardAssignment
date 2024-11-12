import React from 'react';
import KanbanColumn from './KanbanColumn';
import { groupTickets, sortTickets } from '../lib/utils';

const KanbanColumns = ({ tickets, groupBy, sortBy, users }) => {
    const groupedTickets = groupTickets(sortTickets(tickets, sortBy), groupBy, users);

    return (
        <div className="kanban-columns">
            {Object.keys(groupedTickets).map((group) => (
                <KanbanColumn
                    key={group}
                    title={group}
                    tickets={groupedTickets[group] || []}
                    groupBy={groupBy}
                    users={users}
                />
            ))}
        </div>
    );
};

export default KanbanColumns;
