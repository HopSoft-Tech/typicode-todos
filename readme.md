# Typicode Todos

Typicode Todos is a simple and functional Todo application that uses the JSONPlaceholder Typicode API to demonstrate CRUD (Create, Read, Update, Delete) functionality. This project is built with HTML, CSS, and JavaScript.

## Features

- Fetch and display a list of todos from the Typicode API
- Add new todos
- Mark todos as completed
- Delete todos
- Update todos' completion status

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Web browser
- Internet connection

### Installation

1. Clone the repo:

   ```bash
   git clone https://github.com/HopSOft-Tech/typicode-todos.git
   ```

2. Navigate to the project directory:

   ```bash
   cd typicode-todos
   ```

3. Open `index.html` in your preferred web browser:

   ```bash
   open index.html
   ```

## Usage

1. Open the application in your web browser.
2. The initial list of todos will be fetched and displayed.
3. To add a new todo:
   - Type a task in the input field.
   - Click the "Add" button or press Enter.
4. To mark a todo as completed:
   - Click on the todo item. It will toggle the `done` class.
5. To delete a todo:
   - Double-click on the todo item. It will be removed from the DOM and the server.

## Code Overview

### HTML

The HTML file provides the structure for the application, including a form to add new todos and a container to display the list of todos.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <title>Typicode Todos</title>
  </head>
  <body>
    <div class="container">
      <header>
        <h1>Typicode Todos</h1>
      </header>
      <main>
        <form id="todo-form">
          <input type="text" id="title" placeholder="Add Todo..." />
          <button type="submit">Add</button>
        </form>
        <div id="todo-list"></div>
      </main>
    </div>
    <script src="./script.js"></script>
  </body>
</html>
```

### JavaScript

The JavaScript file contains functions to interact with the Typicode API and manage the todo list.

#### Fetch and Display Todos

Fetch todos from the API and display them on the page:

```javascript
const getTodos = () => {
  fetch(`${apiUrl}?_limit=15`)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((todo) => addTodoToDOM(todo));
    });
};
```

#### Add Todo

Add a new todo to the API and the DOM:

```javascript
const createTodo = (e) => {
  e.preventDefault();

  if (e.target.firstElementChild.value.trim() === "") {
    e.target.firstElementChild.value = "";
    e.target.firstElementChild.focus();
    alert("Please enter a todo");
    return;
  }

  const newTodo = {
    title: e.target.firstElementChild.value,
    completed: false,
  };

  fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify(newTodo),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => addTodoToDOM(data));
};
```

#### Toggle Completed Status

Toggle the completion status of a todo and update the API:

```javascript
const toggleCompleted = (e) => {
  if (e.target.classList.contains("todo")) {
    e.target.classList.toggle("done");
    updateTodo(e.target.dataset.id, e.target.classList.contains("done"));
  }
};
```

#### Delete Todo

Delete a todo from the API and remove it from the DOM:

```javascript
const deleteTodo = (e) => {
  if (e.target.classList.contains("todo")) {
    const id = e.target.dataset.id;
    fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => e.target.remove());
  }
};
```

#### Initialize Application

Initialize the application by setting up event listeners and fetching the initial todos:

```javascript
const init = () => {
  document.addEventListener("DOMContentLoaded", getTodos);
  document.querySelector("#todo-form").addEventListener("submit", createTodo);
  document
    .querySelector("#todo-list")
    .addEventListener("click", toggleCompleted);
  document.querySelector("#todo-list").addEventListener("dblclick", deleteTodo);
};

init();
```

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/yourFeature`)
3. Commit your Changes (`git commit -m 'Add your message'`)
4. Push to the Branch (`git push origin feature/yourFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Your Name - [ndukelex4@gmail.com](mailto:ndukelex4@gmail.com)

Project Link: [https://github.com/HopSOft-Tech/typicode-todos](https://github.com/HopSOft-Tech/typicode-todos)

```

```
