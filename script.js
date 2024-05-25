  const apiUrl = 'https://jsonplaceholder.typicode.com/todos';

  // This gets the todos from the api and adds them to the DOM, but limits the number of todos to 10
  const getTodos = () => {
    fetch(`${apiUrl}?_limit=15`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);  
        data.forEach((todo) => addTodoToDOM(todo));
      });
  };

  // Adds the todo to the DOM, also checks if the todo is completed and adds the appropriate class
  const addTodoToDOM = (todo) => {
    const div = document.createElement('div');
    div.classList.add('todo');
    div.appendChild(document.createTextNode(todo.title));
    div.setAttribute('data-id', todo.id);

    if (todo.completed) {
      div.classList.add('done');
    }

    document.getElementById('todo-list').appendChild(div);
  };

  const createTodo = (e) => {
    e.preventDefault();

    // Prevent User from submitting empty todo
    if (e.target.firstElementChild.value.trim() === '') { 
      e.target.firstElementChild.value = "";
      e.target.firstElementChild.focus();
      alert('Please enter a todo');
      return;
    } 

    // Prepare the new todo as an object
    const newTodo = {
      title: e.target.firstElementChild.value,
      completed: false,
    };

    fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify(newTodo),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => addTodoToDOM(data));
  };

  // This toggles the done class on the element and updates the api with the new value
  const toggleCompleted = (e) => {
    if (e.target.classList.contains('todo')) {
      e.target.classList.toggle('done');

      console.log(e.target.classList.contains('done'));
      updateTodo(e.target.dataset.id, e.target.classList.contains('done'));
    }
  };

  // This updates the todo in the api with a true/false value based on the class of the element. Which indicates if the todo is completed or not
  const updateTodo = (id, completed) => {
    fetch(`${apiUrl}/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ completed }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  // This sends a delete request to the api and removes the element from the DOM
  const deleteTodo = (e) => {
    if (e.target.classList.contains('todo')) {
      const id = e.target.dataset.id;
      fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
      })
        .then((res) => res.json())
        .then(() => e.target.remove());
    }
  };

  // This is called when the page loads
  const init = () => {
    document.addEventListener('DOMContentLoaded', getTodos);
    document.querySelector('#todo-form').addEventListener('submit', createTodo);
    document
      .querySelector('#todo-list')
      .addEventListener('click', toggleCompleted);
    document.querySelector('#todo-list').addEventListener('dblclick', deleteTodo);
  };

  init();
