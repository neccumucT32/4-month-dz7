function TodoItem({
  todo,
  updateTodoStatus,
  deleteTodo,
  setEditId,
  setEditInput,
  editId,
  editInput,
  updateTodoTitle,
}) {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.status}
        onChange={(e) => updateTodoStatus(e.target.checked, todo.id)}
      />
      {editId === todo.id ? (
        <>
          <input
            type="text"
            value={editInput}
            onChange={(e) => setEditInput(e.target.value)}
          />
          <button onClick={() => updateTodoTitle(todo.id)}>Update</button>
        </>
      ) : (
        <span className={todo.status ? "active" : ""}>{todo.title}</span>
      )}
      <button onClick={() => deleteTodo(todo.id)}>delete</button>
      {editId !== todo.id && (
        <button
          onClick={() => {
            setEditId(todo.id);
            setEditInput(todo.title);
          }}
        >
          Edit
        </button>
      )}
    </li>
  );
}

export default TodoItem;
