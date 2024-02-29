// Selecciona el formulario para crear nuevas tareas.
const formNewTask = document.querySelector("#createTaskForm");
// Selecciona la sección donde se listarán las tareas.
const sectiontaskList = document.querySelector("#taskList");
// Selecciona el buscador en tiempo real
const formTaskSearch = document.querySelector("#taskSearch");
// Selecciona el select para filtrar por prioridad
const filterPriority = document.querySelector("#filterPriority");


// Variable para controlar el ID único de las nuevas tareas.
let miId = 101;

//CREAR UNA NUEVA TAREA

/**
 * ! Muestra un mensaje al usuario usando SweetAlert2 basado en el tipo de mensaje.
 * @param {string} typeMsg - El tipo de mensaje a mostrar. Puede ser "taskOk", "taskEmpty" o "taskDelete".
 * @param {string} message - El mensaje principal a mostrar al usuario.
 * @returns {void} - La función no devuelve un valor pero activa un modal de SweetAlert2.
 * ? "taskOk" muestra un mensaje de éxito
 * ? "taskEmpty" advierte al usuario sobre la necesidad de ingresar una descripción de la tarea.
 * ? "taskDelete" informa al usuario que una tarea ha sido eliminada con éxito.
 * ? Ejemplo de uso: displayMsg("taskOk", "Nueva tarea añadida con éxito");
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
    taskArray.push(newTask);
    miId++;
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
    task.priority = "noPriority";
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
    description: event.target.inputCreateTask.value,
    priority: event.target.selectPriority.value,
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
/**
 * ! Imprime todas las tareas en un elemento del DOM especificado.
 * @param {Array} lista - Un array de objetos tarea que se van a imprimir.
 * @param {HTMLElement} domElement - El elemento del DOM donde se imprimirán las tareas.
 * * Itera sobre el array de tareas proporcionado y para cada tarea, llama a la función `printOneTask` pasando el objeto de la tarea y el elemento del DOM como argumentos. Esta función no devuelve nada,pero modifica el DOM al añadir los elementos de cada tarea al elemento especificado.
 * ? Cada objeto tarea dentro de la lista debe tener un formato específico que la función `printOneTask` pueda procesar, usualmente incluyendo propiedades como `id`, `description`, y `priority`.
 */
function printAllTask(lista, domElement) {
  sectiontaskList.innerHTML = "";
  lista.forEach((item) => printOneTask(item, domElement));
}

printAllTask(taskArray, sectiontaskList);

// ! Añade un event listener al formulario para crear nuevas tareas al enviar el formulario.
formNewTask.addEventListener("submit", getDataForm);

//FIlTRAR LAS TAREAS



const getDataFilterPriority = (event) => {
  console.log(event.target.value);

  event.preventDefault();
  let priority = event.target.value;

  if (event.target.value !== "") {
    let filterlist = taskArray.filter((task) => task.priority === priority);
    printAllTask(filterlist, sectiontaskList);
  } else {
    printAllTask(taskArray, sectiontaskList);
  }
};
filterPriority.addEventListener("change", getDataFilterPriority);

const filterSearch = (event) => {
  const filterList = taskArray.filter((task) => {
    return task.description
      .toLowerCase()
      .startsWith(event.target.value.toLowerCase());
  });
  printAllTask(filterList, sectiontaskList);
};
formTaskSearch.addEventListener("input", filterSearch);
