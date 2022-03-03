import React from 'react';

export default function ({ todo, remove, toggleDone }) {
    const rawDate = new Date(todo.date)
    const date = `${rawDate.getDate()}/${rawDate.getMonth()}/${rawDate.getFullYear()}`
    const time = `${rawDate.getHours()}:${rawDate.getMinutes()}`

    return (
        <div className="my-2 py-3 border-b border-gray-100">
            <div className="flex justify-start items-start space-x-3">
                <div>
                    <input type="checkbox" checked={todo.done} onChange={toggleDone} />
                </div>

                <div>
                    <div className="font-medium">
                        { todo.name }
                    </div>
                    <div className="text-sm text-gray-400">
                        { date } @ { time }
                    </div>
                    <button
                        onClick={() => remove(todo)}
                        className="text-red-500 mt-2 text-xs bg-red-100 rounded-full px-3 py-2">
                        Remove
                    </button>
                </div>
            </div>

        </div>
    )
}