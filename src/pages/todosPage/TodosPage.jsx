import { useEffect, useState } from "react";
import TodoItem from "../../components/TodoItem";

const URL = "http://localhost:8000/todos";

function TodosPage() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [editInput, setEditInput] = useState("");
  const [editId, setEditId] = useState(null);

  async function createTodo(event) {
    event.preventDefault();
    const data = {
      status: false,
      title: input,
    };

    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status === 201) {
      const newTodo = await response.json();
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setInput("");
    }
  }

  async function getTodos() {
    const response = await fetch(URL);
    const data = await response.json();
    setTodos(data);
  }

  async function deleteTodo(id) {
    const response = await fetch(URL + `/${id}`, {
      method: "DELETE",
    });

    if (response.status === 200) {
      getTodos();
    }
  }

  async function updateTodoStatus(status, id) {
    const data = { status };

    const response = await fetch(URL + `/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  async function updateTodoTitle(id) {
    const data = { title: editInput };

    const response = await fetch(URL + `/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status === 200) {
      getTodos();
      setEditId(null);
      setEditInput("");
    }
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <>
      <h2>Todos</h2>
      <form onSubmit={createTodo}>
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <button>add</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            updateTodoStatus={updateTodoStatus}
            deleteTodo={deleteTodo}
            setEditId={setEditId}
            setEditInput={setEditInput}
            editId={editId}
            editInput={editInput}
            updateTodoTitle={updateTodoTitle}
          />
        ))}
      </ul>
    </>
  );
}

export default TodosPage;
