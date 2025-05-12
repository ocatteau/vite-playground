import { fireEvent, render, screen } from "@testing-library/react";
import { v4 as uuid } from "uuid";
import { ChangeEvent, KeyboardEvent, useState } from "react";

export interface TodoItem {
  id: string
  label: string
  done: boolean
}

export const Todo = ({items}: { items: TodoItem[] }) => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<TodoItem[]>(items)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value)
  };

  const handleAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      setTodos([...todos, {id: uuid(), label: todo, done: false}]);
    }
  };

  return (
    <>
      <h1>Todos :</h1>
      <input type="text" role="new-item" value={todo} onChange={handleChange} onKeyDown={handleAddItem}/>
      <ol>
        {
          todos.map((item) =>
            <li key={item.id} role="todo-item">${item.label}</li>)
        }
      </ol>
    </>
  )
}

describe('Todo App', () => {
  // render an item
  it('render an item', () => {
    const todos = [ {id: uuid(), label: 'Buy some milk', done: false} ]
    render(<Todo items={todos}/>);

    const todoItems = screen.getAllByRole('todo-item');
    expect(todoItems).toHaveLength(1);
    expect(todoItems[0]).toHaveTextContent('Buy some milk');
  });

  // render multiple items
  it('render multiple items', () => {
    const todos = [{id: uuid(), label: 'Buy some milk', done: false}, {id: uuid(), label: 'Mow the lawn', done: false}]
    render(<Todo items={todos}/>);

    const todoItems = screen.getAllByRole('todo-item');
    expect(todoItems).toHaveLength(2);
    expect(todoItems[0]).toHaveTextContent('Buy some milk');
    expect(todoItems[1]).toHaveTextContent('Mow the lawn');
  });

  // add new item to the list
  it('add new item to the list', () => {
    render(<Todo items={[]}/>);

    const input = screen.getByRole('new-item')
    fireEvent.change(input, { target: { value: 'Buy some milk' } })
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 })

    const todoItems = screen.getAllByRole('todo-item');
    expect(todoItems).toHaveLength(1);
    expect(todoItems[0]).toHaveTextContent('Buy some milk');
  });
  // mark an item as done
});