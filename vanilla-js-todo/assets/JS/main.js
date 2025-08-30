const inputTarefa = document.querySelector(".inputTarefa");
const btnTarefa = document.querySelector(".btnTarefa");
const tarefas = document.querySelector(".tarefas");

document.addEventListener("click", (e) => {
  const el = e.target;
  if (el.classList.contains("checkBox")) {
    const confirmWindow = window.confirm(
      "Are you sure you want to delete this item from the list?"
    );

    if (confirmWindow === true) {
      el.parentElement.classList.add("completed");
      setTimeout(() => {
        el.parentElement.remove();
        salvarTarefas();
        inputTarefa.focus();
      }, 500);
    } else {
      if (confirmWindow === false) {
        e.preventDefault();
        inputTarefa.focus();
        salvarTarefas();
      }
    }
  }
});

function createTask(textInput) {
  const checkingBox = document.createElement("input");
  checkingBox.setAttribute("class", "checkBox");
  checkingBox.setAttribute("type", "checkbox");

  const li = document.createElement("li");

  li.textContent = textInput;
  tarefas.appendChild(li);

  li.appendChild(checkingBox);

  inputTarefa.value = "";
  inputTarefa.focus();
}

btnTarefa.addEventListener("click", function () {
  if (!inputTarefa.value) return;
  createTask(inputTarefa.value);
  salvarTarefas();
  inputTarefa.focus();
});

inputTarefa.addEventListener("keypress", function (e) {
  if (e.keyCode === 13) {
    if (!inputTarefa.value) return;
    createTask(inputTarefa.value);
    salvarTarefas();
    inputTarefa.focus();
  }
});

function salvarTarefas() {
  const liTarefas = tarefas.querySelectorAll("li");
  const allTarefas = [];

  for (let tarefa of liTarefas) {
    let tarefaText = tarefa.innerText;
    tarefaText = tarefaText.replace("Apagar", "").trim();
    allTarefas.push(tarefaText);
  }

  const jsonTarefas = JSON.stringify(allTarefas);
  localStorage.setItem("tarefas", jsonTarefas);
}

function loadTarefas() {
  inputTarefa.focus();
  const tarefas = localStorage.getItem("tarefas");
  const allTarefas = JSON.parse(tarefas);

  for (let tarefa of allTarefas) {
    createTask(tarefa);
  }
}

loadTarefas();
