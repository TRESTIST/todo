//theme
const btnLight = document.querySelector(".theme__btn-adjust");
const btnCustom = document.querySelector(".theme__btn-cog");
const theme = document.querySelector("#theme");



btnLight.addEventListener("click", (e) => {
  e.preventDefault();
  //добавление и удаление анимации
  document.body.classList.add("animation");
  setTimeout(() => {
    document.body.classList.remove("animation");
  }, 500);

  //Проверяем если атрибут href === css/style Тогда меняем

  if (theme.getAttribute("href") === "css/style.css") {
    theme.href = "css/light.css";
  } else if (theme.getAttribute("href") === "css/light.css") {
    theme.href = "css/style.css";
  }

  localStorage.setItem("theme", theme.getAttribute("href"));
});



//custom theme
btnCustom.addEventListener("click", (e) => {
  //запрос цвета
  const question = prompt("Выберите цвет: ");
  //ставим цвет который указал пользователь
  document.body.style.background = question;
  //сохранение в localStorage
  localStorage.setItem("bgColor", question);
});

//при загрузке
window.addEventListener("load", () => {
  //получаем данные localStorage('bgColor')
  const bgColor = localStorage.getItem("bgColor");
  document.body.style.background = bgColor;
  //получаем данные localStorage('theme')

  const local = localStorage.getItem("theme");
  if (!local) {
    localStorage.setItem("theme",'css/style.css')
  }


  const saveTheme = localStorage.getItem("theme");
  theme.href = saveTheme;



});

//add task

const title = document.querySelector(".ask__input");
const content = document.querySelector(".area__input");
const btnAdd = document.querySelector(".ask-btn");
const task = document.querySelector(".task");

//on load window

window.addEventListener("load", () => {
  const isTodos = localStorage.getItem("todos");

  if (!isTodos) {
    localStorage.setItem("todos", JSON.stringify([]));
  } else {
    const todos = JSON.parse(localStorage.getItem("todos"));

    const newTodos = todos.map((item, index) => {
      return { ...item, id: index };
    });
    localStorage.setItem("todos", JSON.stringify(newTodos));

    const templete = newTodos
      // .reverse()
      .reduce((prev, { title, content, completed, id }) => {
        if (completed) {
          return (
            prev +
            ` <div class="task completed">${cardTemplate(
              title,
              content,
              id
            )}</div>  `
          );
        } else {
          return (
            prev +
            ` <div class="task">${cardTemplate(title, content, id)}</div> `
          );
        }
      }, "");
    task.innerHTML = templete;
  }
});

//add new task

btnAdd.addEventListener("click", (e) => {
  location.reload();

  if (title.value === "" && content.value === "") alert("Введите текст!");

  if (title.value !== "" && content.value !== "") {
    const todos = JSON.parse(localStorage.getItem("todos"));
    localStorage.setItem(
      "todos",
      JSON.stringify([
        ...todos,
        {
          title: title.value,
          content: content.value,
          completed: false,
        },
      ])
    );
  }
});

//card

function cardTemplate(title, content, id) {
  if (content.length >= 195) {
    return `
    <div class="task__header">
      <h3 class="task__header-text" >${title}</h3>
    </div>
  <div class="tasks">
    <div class="task__content shorted">
      <p class="tasks__title">${content}</p>
    </div>
    <div class="tasks-btn">
      <button class="btn__complite" onclick="compliteTask(${id})">
        <i class="fas fa-check"></i>
      </button>
    <button class="btn__trash"  onclick="deleteTask(${id})">
      <i class="fas fa-trash"></i>
    </button>
    </div>
  </div>

    `;
  }
  if (content.length < 195) {
    return `
    <div class="task__header">
      <h3 class="task__header-text" >${title}</h3>
    </div>
  <div class="tasks">
    <div class="task__content">
      <p class="tasks__title ">${content}</p>
    </div>
    <div class="tasks-btn">
      <button class="btn__complite" onclick="compliteTask(${id})" >
        <i class="fas fa-check"></i>
      </button>
    <button class="btn__trash" onclick="deleteTask(${id})">
      <i class="fas fa-trash"></i>
    </button>
    </div>
  </div>

    `;
  }
}

// buttons

function deleteTask(id) {
  // const askDelete = confirm("Удалить?");
  // if (!askDelete) return;
  const todos = JSON.parse(localStorage.getItem("todos"));
  const newTodos = todos.filter((item) => item.id !== id);

  localStorage.setItem("todos", JSON.stringify(newTodos));
  location.reload();
}

function compliteTask(id) {
  const todos = JSON.parse(localStorage.getItem("todos"));
  const newTodos = todos.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        completed: !item.completed,
      };
    } else {
      return item;
    }
  });
  localStorage.setItem("todos", JSON.stringify(newTodos));
  location.reload();
}
