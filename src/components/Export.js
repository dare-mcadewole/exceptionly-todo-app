import React from 'react';

export default function Export ({ todos }) {
    const exportTodo = () => {
        const header = `S/N,Item,Status,Date`
        let content = `data:text/csv;charset=utf-8,${header}\r\n`;
        // We could also use a reducer() here.
        todos.forEach(
            (todo, i) => content += `${i+1},${todo.name},${todo.done ? 'Done' : 'Pending'},${todo.date}\r\n`
        );
        window.open(encodeURI(content));
    }

    return (
        <button onClick={exportTodo} className="text-blue-500 text-sm font-medium">
            Export Todo List ↑
        </button>
    )
}