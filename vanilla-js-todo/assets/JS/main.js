const inputTarefa = document.querySelector(".inputTarefa");
const btnTarefa = document.querySelector(".btnTarefa");
const tarefas = document.querySelector(".tarefas");

document.addEventListener("click", function deleteItem(e) {
  const el = e.target;

  if (el.classList.contains("checkBox")) {
    el.parentElement.classList.add("completed");

    setTimeout(() => {
      el.parentElement.remove();

      salvarTarefas();
    }, 500);
  }
  if (el.classList.contains("delete")) {
    el.parentElement.remove();

    inputTarefa.focus();
    salvarTarefas();
  }
});

function criaTarefa(textInput) {
  const li = document.createElement("li");

  li.textContent = textInput;
  tarefas.appendChild(li);

  const checkingBox = document.createElement("input");

  checkingBox.setAttribute("class", "checkBox");
  checkingBox.setAttribute("type", "checkbox");

  li.appendChild(checkingBox);

  inputTarefa.value = "";
  inputTarefa.focus();
}

btnTarefa.addEventListener("click", function () {
  if (!inputTarefa.value) return;
  criaTarefa(inputTarefa.value);
  salvarTarefas();
});

inputTarefa.addEventListener("keypress", function (e) {
  if (e.keyCode === 13) {
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
    salvarTarefas();
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
    criaTarefa(tarefa);
  }
}

loadTarefas();
