const formNewTask = document.querySelector("#createTaskForm");
const inputCreateTask = document.querySelector("#inputCreateTask");
const selectPriority = document.querySelector("#selectPriority");
const sectiontaskList = document.querySelector("#taskList");
const taskArray = [
    {
        id: 1,
        description: 'Sacar al perro',
        priority: 'daily'
    },
    {
        id: 1,
        description: 'Ir a la revisión',
        priority: 'monthly'
    },
    {},
    {}
];
let miId = 5;

const keepTask = (newTask) => {
  if (newTask.description !== "") {
    miId++;
    taskArray.push(task);
    return {
      success: true,
      message: "Nueva tarea añadida",
    };
  } else {
    return {
      success: false,
      message: "No puedes agregar una tarea vacía",
    };
  }
};

const deleteTask = (event) => {
  let id = event.target.dataset.id;

  let resultFindById = taskArray.findIndex((task) => task.id === id);
  taskArray.splice(resultFindById, 1);

  let padre = event.target.parentNode.parentNode;
  let hijo = event.target.parentNode;

  padre.removeChild(hijo);
 Swal.fire({
    title: 'Tarea eliminada!',
    text: 'Has eliminado la tarea',
    icon: "error",
  });
};

const printOneTask = (task, dom) => {
  const div = document.createElement("div");
  const p = document.createElement("p");
  const button = document.createElement("button");
  button.addEventListener("click", deleteTask);
  button.textContent = "X";
  button.dataset.id = task.id;
  p.textContent = task.description;
  if (task.priority !== "") {
    p.classList.add(task.priority);
  } else {
    p.classList.add("noPriority");
  }
  div.append(p, button);
  dom.appendChild(div);
};

const getDataForm = (event) => {
  event.preventDefault();

  const newTask = {
    id: miId,
    description: inputCreateTask.value,
    priority: selectPriority.value,
  };
  const response = keepTask(newTask);

  if (response.success) {
    printOneTask(newTask, sectiontaskList);
    Swal.fire({
      title: response.message,
      text: "No olvides realizarla!",
      icon: "success",
    });
  } else {
    Swal.fire({
        title: 'Tarea vacía!',
        text: response.message,
        icon: "warning",
      });
  }
};

formNewTask.addEventListener("submit", getDataForm);
