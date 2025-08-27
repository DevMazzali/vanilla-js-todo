const inputTarefa = document.querySelector(".inputTarefa");
const btnTarefa = document.querySelector(".btnTarefa");
const tarefas = document.querySelector(".tarefas");

document.addEventListener("click", function (e) {
  const el = e.target;
  if (el.classList.contains("delete")) {
    el.parentElement.remove();
    salvarTarefas();
  }
});

function criaTarefa(textInput) {
  const li = document.createElement("li");
  li.innerText = textInput;
  tarefas.appendChild(li);

  const button = document.createElement("button");
  button.setAttribute("class", "delete");
  button.innerText = "Apagar";

  li.innerText += " ";
  li.appendChild(button);

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
