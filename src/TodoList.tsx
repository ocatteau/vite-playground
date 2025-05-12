import { TodoItem } from "./TodoItem";

export const TodoList = ({todos, markItemAsDone}: { todos: TodoItem[], markItemAsDone: (itemId: string) => void }) => {
  return (
    <ol>
      {
        todos.map((item) =>
          <li key={item.id} role="todo-item">
            <input type="checkbox" checked={item.done} onChange={() => markItemAsDone(item.id)}/>
            <span>${item.label}</span>
          </li>)
      }
    </ol>
  )
}