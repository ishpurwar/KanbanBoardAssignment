const ALL_STATUSES = ['Backlog', 'Todo', 'In progress', 'Done', 'Canceled'];
const ALL_PRIORITIES = ['No priority', 'Low', 'Medium', 'High', 'Urgent'];

export const getPriorityLabel = (priority) => {
    switch (priority) {
        case 4: return 'Urgent';
        case 3: return 'High';
        case 2: return 'Medium';
        case 1: return 'Low';
        case 0: return 'No priority';
        default: return 'No priority';
    }
};

export const getPriorityFromLabel = (label) => {
    switch (label) {
        case 'Urgent': return 4;
        case 'High': return 3;
        case 'Medium': return 2;
        case 'Low': return 1;
        case 'No priority': return 0;
        default: return 0;
    }
};

export const sortTickets = (tickets, sortBy) => {
    return [...tickets].sort((a, b) => {
        if (sortBy === 'priority') {
            return b.priority - a.priority;
        }
        return a.title.localeCompare(b.title);
    });
};

export const groupByStatus = (tickets) => {
    // Initialize with all possible statuses
    const groups = ALL_STATUSES.reduce((acc, status) => {
        acc[status] = [];
        return acc;
    }, {});

    // Add tickets to their respective groups
    tickets.forEach(ticket => {
        if (groups[ticket.status]) {
            groups[ticket.status].push(ticket);
        }
    });

    return groups;
};

export const groupByPriority = (tickets) => {
    const groups = ALL_PRIORITIES.reduce((acc, priority) => {
        acc[priority] = [];
        return acc;
    }, {});

    tickets.forEach(ticket => {
        const priority = getPriorityLabel(ticket.priority);
        if (groups[priority]) {
            groups[priority].push(ticket);
        }
    });

    return groups;
};

export const getUserNameById = (userId, users) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.name : null;
};

export const groupByUser = (tickets, users) => {
    const groups = users.reduce((acc, user) => {
        acc[user.name] = [];
        return acc;
    }, {});

    tickets.forEach(ticket => {
        const userName = getUserNameById(ticket.userId, users);
        if (userName && groups[userName]) {
            groups[userName].push(ticket);
        }
    });

    return groups;
};

export const groupTickets = (tickets, groupBy, users) => {
    switch (groupBy) {
        case 'status': return groupByStatus(tickets);
        case 'user': return groupByUser(tickets, users);
        case 'priority': return groupByPriority(tickets);
        default: return {};
    }
};

export const updateTicketInList = (tickets, updatedTicket) => {
    return tickets.map(ticket => 
        ticket.id === updatedTicket.id ? updatedTicket : ticket
    );
};
