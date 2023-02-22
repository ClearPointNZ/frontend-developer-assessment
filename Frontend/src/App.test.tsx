import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import Footer from './components/Footer';
import Instructions from './components/Instructions';
import AddForm from './components/AddForm';
import { TodoListApi, TodoListItem } from './Globals';
import App from './App';

describe('Footer', () => {
  it('renders the Footer component', () => {
    render(<Footer />);

    expect(screen.getByText('clearpoint.digital')).toBeInTheDocument();
  });
});

describe('Instructions', () => {
  it('renders the Instructions component', () => {
    render(<Instructions />);

    expect(screen.getByText('Todo List App')).toBeInTheDocument();
  });
});

describe('AddForm', () => {
  it('renders the AddForm component', () => {
    render(<AddForm todoListApi={mockedTodoListApi} todoItems={mockedTodoItems} setTodoItems={mockedSetTodoItems} />);

    expect(screen.getByRole('heading')).toBeInTheDocument();
  });

  it('does not allow adding todo items with <5 characters', async () => {
    render(<AddForm todoListApi={mockedTodoListApi} todoItems={mockedTodoItems} setTodoItems={mockedSetTodoItems} />);

    const input = screen.getByRole('textbox');
    const buttons = await screen.findAllByRole('button');

    const addBtn = buttons[0];

    expect(input).toBeInTheDocument();
    expect(addBtn).toBeInTheDocument();

    fireEvent.change(input, {
      target: { value: '1234' },
    });

    fireEvent.click(addBtn);

    const alert = screen.getByText('Please describe your TODO with a minimum of 5 characters');
    expect(alert).toBeInTheDocument();
  });

  it('Adds a todo item with 5 or more characters', async () => {
    render(<AddForm todoListApi={mockedTodoListApi} todoItems={mockedTodoItems} setTodoItems={mockedSetTodoItems} />);

    const input = screen.getByRole('textbox');
    const buttons = await screen.findAllByRole('button');

    const addBtn = buttons[0];

    fireEvent.change(input, {
      target: { value: '12345' },
    });

    fireEvent.click(addBtn);

    // Check whether the setTodoItems was triggered
    await waitFor(() => {
      expect(mockedTodoItems).toHaveLength(1);
    });
  });
});

// For unknown reason so far, the TodoList will not let itself be tested positively in isolation with the useEffect hook
// If we render the TodoList component with the 3 dependencies (mocked), then for some reason the todoList items are
// not yet available in the dom. And no waitFor or other function seems to help await that. So we're rendering the App,
// so that at least we can assert the proper working through there.
describe('TodoList', () => {
  it('can show a list of TODO items on load', async () => {
    render(<App todoListApi={mockedTodoListApi} />);

    expect(await screen.findByText('Description 2')).toBeInTheDocument();
  });

  it('can mark a todoItem as completed', async () => {
    render(<App todoListApi={mockedTodoListApi} />);

    const markButtons = await screen.findAllByText('Mark as completed');

    const item1MarkButton = markButtons[0];

    expect(item1MarkButton).toBeInTheDocument();

    const tr = item1MarkButton.closest('tr');
    if (!tr) {
      throw new Error('The first mark as completed button does not have a TR parent');
    }

    fireEvent.click(item1MarkButton);

    // Check whether the setTodoItems was triggered
    await waitFor(() => {
      expect(tr.className).toContain('text-decoration-line-through');
    });
  });
});

const mockedTodoListApi: TodoListApi = {
  getAll: async () => {
    return [
      {
        id: 'id1',
        description: 'Description 1',
        complete: false,
      },
      {
        id: 'id2',
        description: 'Description 2',
        complete: false,
      },
      {
        id: 'id3',
        description: 'Description 3',
        complete: false,
      },
    ];
  },
  get: async () => {
    return {
      id: 'id1',
      description: 'Description 1',
      complete: false,
    };
  },
  create: async (todoListItem: TodoListItem) => {
    return { ...todoListItem };
  },
  update: async (todoListItem: TodoListItem) => {
    return { ...todoListItem };
  },
};

// We simulate the state dependencies with a simple array + setter, so that
// we can check later whether the todoItem has been appended to the todoItems array
let mockedTodoItems: TodoListItem[] = [];
const mockedSetTodoItems = (items: TodoListItem[]) => {
  mockedTodoItems = items;
};
