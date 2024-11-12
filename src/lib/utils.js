export const getPriorityLabel = (priority) => {
    switch (priority) {
        case 4: return 'Urgent';
        case 3: return 'High';
        case 2: return 'Medium';
        case 1: return 'Low';
        case 0: return 'No priority';
        default: return '';
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
    return tickets.sort((a, b) => {
        if (sortBy === 'priority') {
            return b.priority - a.priority;
        }
        return a.title.localeCompare(b.title);
    });
};

export const groupByStatus = (tickets) => {
    return tickets.reduce((groups, ticket) => {
        if (!groups[ticket.status]) {
            groups[ticket.status] = [];
        }
        groups[ticket.status].push(ticket);
        return groups;
    }, {
        Todo: [],
        Backlog: [],
        'In progress': [],
        Done: [],
        Canceled: [],
    });
};

export const groupByPriority = (tickets) => {
    return tickets.reduce((groups, ticket) => {
        const priority = getPriorityLabel(ticket.priority);
        if (!groups[priority]) {
            groups[priority] = [];
        }
        groups[priority].push(ticket);
        return groups;
    }, {});
};

export const getUserNameById = (userId, users) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.name : 'Unknown User';
};

export const groupByUser = (tickets, users) => {
    return tickets.reduce((groups, ticket) => {
        const user = getUserNameById(ticket.userId, users);
        if (!groups[user]) {
            groups[user] = [];
        }
        groups[user].push(ticket);
        return groups;
    }, {});
};

export const groupTickets = (tickets, groupBy, users) => {
    switch (groupBy) {
        case 'status': return groupByStatus(tickets);
        case 'user': return groupByUser(tickets, users);
        case 'priority': return groupByPriority(tickets);
        default: return {};
    }
};