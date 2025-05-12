import { useState } from "react";

import { TodoItem } from "./TodoItem";

export const useTodo = (items: TodoItem[]) => {
  const [todos, setTodos] = useState<TodoItem[]>(items)

  const onItemAdded = (item: TodoItem) => {
    setTodos([...todos, item]);
  };

  const markItemAsDone = (itemId: string) => {
    setTodos(todos.filter(todo => todo.id !== itemId));
  };

  return {todos, onItemAdded, markItemAsDone}
};