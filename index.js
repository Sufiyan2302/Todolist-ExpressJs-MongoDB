const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const saveBtn = document.querySelector("#saveBtn");
const editBtn = document.getElementById("editBtn");
const patchBtn = document.getElementById("patchBtn");
const todoList = document.getElementById("todoList");

let taskarr = [];

function renderTodos(todos) {
  todoList.innerHTML = todos
    .map(
      (v, index) => `
      <li class="list" data-index="${index}">
        <span>${v}</span>
        <div class="actions">
          <button class="complete-btn">✓</button>
          <button class="delete-btn">✕</button>
        </div>
      </li>`
    )
    .join("");
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("/api/todo", {
      credentials: "include",
    });

    const data = await res.json();
    console.log("API raw response:", data);

    let todos = [];

    // ✅ CASE 1: data is an array
    if (Array.isArray(data)) {
      todos = data.flatMap((doc) => doc.Todo || []);
    }
    // ✅ CASE 2: data is a single object
    else if (data && Array.isArray(data.Todo)) {
      todos = data.Todo[0].Todo;
    }

    renderTodos(todos);
  } catch (err) {
    console.error("Failed to load todos:", err);
  }
});

async function addTodo() {
  let task = todoInput.value.trim();
  if (task === "") return;

  taskarr.push(task);
  try {
    let data = await fetch("/", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([task]),
    });

    const res = await fetch("/api/todo");
    const todos = await res.json();

    renderTodos(todos.Todo[0].Todo);
  } catch (err) {
    console.log(err);
  }

  todoInput.value = "";
}

// ✅ EVENT DELEGATION (ONLY ONCE)
todoList.addEventListener("click", async (e) => {
  const li = e.target.closest("li");
  if (!li) return;

  const index = Number(li.dataset.index);

  // COMPLETE
  if (e.target.classList.contains("complete-btn")) {
    li.classList.toggle("completed");
  }

  // DELETE (only clicked task)
  if (e.target.classList.contains("delete-btn")) {
    try {
      const res = await fetch(`/todo/${index}`, {
        method: "DELETE",
        credentials: "include",
      });

      const updatedTodos = await res.json();
      renderTodos(updatedTodos);
    } catch (err) {
      console.error(err);
    }
  }
});

addBtn.addEventListener("click", addTodo);
