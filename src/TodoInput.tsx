import { ChangeEvent, KeyboardEvent, useState } from "react";
import { v4 as uuid } from "uuid";

import { TodoItem } from "./TodoItem";

export const TodoInput = ({onItemAdded}: { onItemAdded: (item: TodoItem) => void }) => {
  const [todo, setTodo] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value)
  };

  const handleAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      onItemAdded({id: uuid(), label: todo, done: false});
    }
  };

  return (
    <input type="text" role="new-item" value={todo} onChange={handleChange} onKeyDown={handleAddItem}/>
  )
}