// Selecciona el formulario para crear nuevas tareas.
const formNewTask = document.querySelector("#createTaskForm");
// Selecciona el input para ingresar la descripción de la nueva tarea.
const inputCreateTask = document.querySelector("#inputCreateTask");
// Selecciona el select para elegir la prioridad de la nueva tarea.
const selectPriority = document.querySelector("#selectPriority");
// Selecciona la sección donde se listarán las tareas.
const sectiontaskList = document.querySelector("#taskList");

/**
 * TODO Evitar que el texto desborde de la tarea
 * TODO Cargar una lista de 4 notas por defecto
 */

// Variable para controlar el ID único de las nuevas tareas.
let miId = 5;

/**
 * ! Display a message to the user using SweetAlert2 based on the type of message.
 * @param {string} typeMsg - The type of message to be displayed. Can be "taskOk", "taskEmpty", or "taskDelete".
 * @param {string} message - The main message to be displayed to the user.
 * @returns {void} - The function does not return a value but triggers a SweetAlert2 modal.
 * ? "taskOk" shows a success message
 * ? "taskEmpty" warns the user about the need to enter a task description.
 * ? "taskDelete" informs the user that a task has been successfully deleted.
 *  TODO: Consider adding more case types for different notifications.
 * ? Example usage: displayMsg("taskOk", "New task added successfully");
 */
const displayMsg = (typeMsg, message) => {
  switch (typeMsg) {
    case "taskOk":
      return Swal.fire({
        title: message,
        text: "No olvides realizarla!",
        icon: "success",
      });
    case "taskEmpty":
      return Swal.fire({
        title: message,
        text: "Por favor, ingresa una descripción para la tarea.",
        icon: "warning",
      });
    case "taskDelete":
      Swal.fire({
        title: message,
        text: "La tarea ha sido eliminada",
        icon: "error",
      });
  }
};

/**
 * !Añade una nueva tarea al array de tareas si esta tiene descripción.
 * @param {Object} newTask - Objeto que representa la nueva tarea a añadir.
 * @returns {Object} - Objeto con el resultado de la operación (éxito o fracaso) y un mensaje.
 * ? Example usage: keepTask(newObjextTask);
 */
const keepTask = (newTask) => {
  if (newTask.description !== "") {
    miId++;
    taskArray.push(task);
    return {
      success: true,
      message: "Nueva tarea añadida!",
    };
  } else {
    return {
      success: false,
      message: "Tarea vacía!",
    };
  }
};

/**
 * ! Elimina una tarea del array de tareas y del DOM.
 * @param {Event} event - Evento que dispara la función, usado para obtener el ID de la tarea a eliminar.
 */
const deleteTask = (event) => {
  let id = event.target.dataset.id;

  let resultFindById = taskArray.findIndex((task) => task.id === id);
  taskArray.splice(resultFindById, 1);

  let padre = event.target.parentNode.parentNode;
  let hijo = event.target.parentNode;

  padre.removeChild(hijo);
  displayMsg("taskDelete", "Tarea eliminada!");
};

/**
 * ! Pinta una tarea en el DOM.
 * @param {Object} task - Objeto que representa la tarea a pintar.
 * @param {Element} dom - Elemento del DOM donde se pintará la tarea.
 * ? Example usage: printOneTask(newTask, sectiontaskList);
 */
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

/**
 * ! Obtiene los datos del formulario, crea una nueva tarea y la añade si es válida.
 * @param {Event} event - Evento que dispara la función, usado para prevenir el comportamiento por defecto del formulario.
 */
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
    displayMsg("taskOk", response.message);
  } else {
    displayMsg("taskEmpty", response.message);
  }

  event.target.reset();
};

// ! Añade un event listener al formulario para crear nuevas tareas al enviar el formulario.
formNewTask.addEventListener("submit", getDataForm);
