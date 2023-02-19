import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Footer from './components/Footer';
import Instructions from './components/Instructions';
import AddForm from './components/AddForm';
import TodoList from './components/TodoList';
import userEvent from '@testing-library/user-event';
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
    render(<AddForm />);

    expect(screen.getByRole('heading', 'Add Item')).toBeInTheDocument();
  });

  it('does not allow adding todo items with <5 characters', async () => {
    render(<AddForm />);

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
    // We provide a mock for the api
    const todoListApi = {
      create: async (todoListItem) => {
        return {
          id: 'test',
          description: 'Description',
          complete: false,
        };
      },
    };

    // We simulate the state dependencies with a simple array + setter, so that
    // we can check later whether the todoItem has been appended to the todoItems array
    let todoItems = [];
    const setTodoItems = (items) => {
      todoItems = items;
    };

    render(<AddForm todoListApi={todoListApi} todoItems={todoItems} setTodoItems={setTodoItems} />);

    const input = screen.getByRole('textbox');
    const buttons = await screen.findAllByRole('button');

    const addBtn = buttons[0];

    fireEvent.change(input, {
      target: { value: '12345' },
    });

    fireEvent.click(addBtn);

    // Check whether the setTodoItems was triggered
    waitFor(() => {
      expect(todoItems).toHaveLength(1);
    });
  });
});

// For unknown reason so far, the TodoList will not let itself be tested positively in isolation with the useEffect hook
// If we render the TodoList component with the 3 dependencies (mocked), then for some reason the todoList items are
// not yet available in the dom. And no waitFor or other function seems to help await that. So we're rendering the App,
// so that at least we can assert the proper working through there.
describe('TodoList', () => {
  it('can show a list of TODO items on load', async () => {
    // We provide a mock for the api
    const todoListApi = {
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
    };

    render(<App todoListApi={todoListApi} />);

    expect(await screen.findByText('Description 2')).toBeInTheDocument();
  });

  it('can mark a todoItem as completed', async () => {
    // We provide a mock for the api
    const todoListApi = {
      getAll: async () => {
        return [
          {
            id: 'id1',
            description: 'Description 1',
            complete: false,
          },
        ];
      },
      update: async () => {
        return {
          id: 'id1',
          description: 'Description 1',
          complete: true,
        };
      },
    };

    render(<App todoListApi={todoListApi} />);

    const item1MarkButton = await screen.findByText('Mark as completed');

    expect(item1MarkButton).toBeInTheDocument();

    await userEvent.click(item1MarkButton);

    const item1 = await screen.findByText('Description 1');

    // Test that the line through class is set on the parent row
    expect(item1.closest('tr').className).toContain('text-decoration-line-through');
  });
});
