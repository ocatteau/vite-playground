import { useTodo } from "./useTodo";
import { TodoList } from "./TodoList";
import { TodoInput } from "./TodoInput";
import { TodoItem } from "./TodoItem";

export const Todo = ({items}: { items: TodoItem[] }) => {
  const {todos, onItemAdded, markItemAsDone} = useTodo(items);

  return (
    <>
      <h1>Todos :</h1>
      <TodoInput onItemAdded={onItemAdded}/>
      <TodoList todos={todos} markItemAsDone={markItemAsDone}/>
    </>
  )
}