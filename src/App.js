import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import Todo from './components/Todo';
import Export from './components/Export';

const LOCAL_KEY = 'EXCEPTIONLY_TODOS';

function App() {
  let [todos, setTodo] = useState([]);
  let [filteredTodos, setFilteredTodos] = useState([]);
  let [searchKey, setSearchKey] = useState('');
  let todoInput = useRef()
  let suffix = null;

  useEffect(() => {
    setTodo(JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]'))
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(todos))
  }, [todos])

  useEffect(() => {
    setFilteredTodos(todos.filter((t) => t.name.indexOf(searchKey) !== -1))
  }, [searchKey, todos])

  const add = (ev) => {
    ev.preventDefault();
    let name = todoInput.current.value?.trim();
    if (name.length) {
      setTodo([{
        name, date: new Date(), done: false
      }, ...todos])
      todoInput.current.value = '';
    }
  }

  const removeItem = (index) => {
    if (window.confirm('Are you sure you want to remove this item?')) {
      setTodo(todos.filter((todo, i) => i !== index))
    }
  }

  const toggleDone = (index) => {
    let updatedTodos = [...todos]
    updatedTodos[index].done = !updatedTodos[index].done
    setTodo(updatedTodos)
  }

  if (searchKey.length && !filteredTodos.length) {
    suffix = (
      <div className="text-sm text-gray-400 text-center my-5">
        No item matches your search query.
      </div>
    )
  }


  return (
    <div className="min-h-screen py-5 md:py-10 flex md:justify-center items-center md:bg-[#FAFAFA]">
      <div className="w-full md:w-[480px] p-6 md:p-12 mx-auto bg-white rounded-xl">
        <h1 className="text-2xl font-bold mb-6">
          TODO App (React)
        </h1>

        <section className="mb-3">
          <div>
            <input
              onInput={(e) => setSearchKey(e.target.value)}
              placeholder="Search List"
              className="bg-gray-100 rounded-full px-5 h-12 w-full"
            />
          </div>
        </section>

        <section>
          <Export todos={[...todos]} />
        </section>

        <section className="mt-6">
          <form onSubmit={add}>
            <div className="flex flex-col justify-center items-center mb-3">
              <input
                ref={todoInput}
                placeholder="Enter Todo Item"
                className="bg-gray-100 focus:bg-gray-200/50 rounded-full h-12 px-4 w-full"
              />
              <button type="submit" className="rounded-full bg-blue-500 text-white h-12 px-5 mt-2">
                Add Item
              </button>
            </div>
          </form>

          <div className="text-sm text-gray-400">
            {!searchKey.length && <span>
              { todos.length } item(s)  
            </span>}
          </div>

          <section>
            {
              (searchKey.length ? filteredTodos : todos).map((todo, i) =>
                <Todo
                  key={todo.name}
                  todo={todo}
                  remove={() => removeItem(i)}
                  toggleDone={() => toggleDone(i)}
                />
              )
            }
            { suffix }
          </section>
        </section>
      </div>
    </div>
  );
}

export default App;
