import { fireEvent, render, screen } from "@testing-library/react";
import { v4 as uuid } from "uuid";
import { ChangeEvent, KeyboardEvent, useState } from "react";

export interface TodoItem {
  id: string
  label: string
  done: boolean
}

export const TodoInput = ({onItemAdded} : {onItemAdded: (item: TodoItem) => void}) => {
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

export const useTodo = (items: TodoItem[]) => {
  const [todos, setTodos] = useState<TodoItem[]>(items)

  const onItemAdded = (item: TodoItem) => {
    setTodos([...todos, item]);
  };

  const markItemAsDone = (itemId: string) => {
    setTodos(todos.filter( todo => todo.id !== itemId));
  };

  return {todos, onItemAdded, markItemAsDone}
};

export const Todo = ({items}: { items: TodoItem[] }) => {
  const { todos, onItemAdded, markItemAsDone } = useTodo(items);

  return (
    <>
      <h1>Todos :</h1>
      <TodoInput onItemAdded={onItemAdded}/>
      <ol>
        {
          todos.map((item) =>
            <li key={item.id} role="todo-item">
              <input type="checkbox" checked={item.done} onChange={() => markItemAsDone(item.id)}/>
              <span>${item.label}</span>
            </li>)
        }
      </ol>
    </>
  )
}

describe('Todo App', () => {
  // render an item
  it('render an item', () => {
    const todos = [ {id: uuid(), label: 'Buy some milk', done: false} ];
    render(<Todo items={todos}/>);

    const todoItems = screen.getAllByRole('todo-item');
    expect(todoItems).toHaveLength(1);
    expect(todoItems[0]).toHaveTextContent('Buy some milk');
  });

  // render multiple items
  it('render multiple items', () => {
    const todos = [
      {id: uuid(), label: 'Buy some milk', done: false},
      {id: uuid(), label: 'Mow the lawn', done: false}
    ];
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
  it('mark an item as done', () => {
    const todos = [
      {id: uuid(), label: 'Buy some milk', done: false},
      {id: uuid(), label: 'Mow the lawn', done: false}
    ];
    render(<Todo items={todos}/>);

    fireEvent.click(screen.getAllByRole('checkbox')[0])

    const todoItems = screen.getAllByRole('todo-item');
    expect(todoItems).toHaveLength(1);
    expect(todoItems[0]).toHaveTextContent('Mow the lawn');
  });
});