import { fireEvent, render, screen } from "@testing-library/react";
import { v4 as uuid } from "uuid";
import { Todo } from "../Todo";

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