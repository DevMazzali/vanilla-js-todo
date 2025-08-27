// Seleciona elementos do DOM para interação com a interface
const inputTarefa = document.querySelector(".inputTarefa"); // Captura o campo de texto onde o usuário insere a tarefa.
const btnTarefa = document.querySelector(".btnTarefa"); // Captura o botão que adiciona a tarefa à lista.
const tarefas = document.querySelector(".tarefas"); // Captura a lista (<ul> ou <ol>) onde as tarefas serão exibidas.

// Adiciona um listener para cliques em qualquer lugar do documento, permitindo detectar cliques em botões de exclusão.
document.addEventListener("click", function (e) {
   const el = e.target; // Captura o elemento clicado.
   if (el.classList.contains("delete")) { // Verifica se o elemento clicado tem a classe "delete".
      el.parentElement.remove(); // Remove o elemento pai (o <li> que contém a tarefa e o botão).
      salvarTarefas(); // Atualiza o localStorage após a remoção para manter a persistência dos dados.
      // Garante que a tarefa removida não reapareça ao recarregar a página.
   }
});

// Função para criar e adicionar uma tarefa à lista de forma dinâmica.
function criaTarefa(textInput) {
   const li = document.createElement("li"); // Cria um elemento <li> para representar a tarefa.
   li.innerText = textInput; // Define o texto da tarefa com base no input do usuário.
   tarefas.appendChild(li); // Adiciona o <li> à lista de tarefas no DOM.
   // O <li> organiza a tarefa visualmente na lista.

   const button = document.createElement("button"); // Cria um botão para excluir a tarefa.
   button.setAttribute("class", "delete"); // Adiciona a classe "delete" para identificar o botão de exclusão.
   button.innerText = "Apagar"; // Define o texto do botão como "Apagar".
   // O botão permite que o usuário remova a tarefa da lista.

   li.innerText += " "; // Adiciona um espaço entre o texto da tarefa e o botão.
   // Melhora a apresentação visual, evitando que o texto e o botão fiquem colados.
   li.appendChild(button); // Adiciona o botão ao <li> da tarefa.
   // Associa o botão à tarefa específica para exclusão.

   inputTarefa.value = ""; // Limpa o campo de input após adicionar a tarefa.
   // Prepara o campo para a próxima tarefa, melhorando a experiência do usuário.
   inputTarefa.focus(); // Coloca o foco no campo de input.
   // Facilita a adição de novas tarefas sem que o usuário precise clicar novamente no campo.
}

// Adiciona funcionalidade ao botão de adicionar tarefa.
btnTarefa.addEventListener("click", function () {
   if (!inputTarefa.value) return; // Verifica se o campo de input está vazio e interrompe a execução se estiver.
   // Evita adicionar tarefas vazias, que não fazem sentido no contexto.
   criaTarefa(inputTarefa.value); // Chama a função para criar a tarefa com o texto do input.
   salvarTarefas(); // Salva a lista atualizada no localStorage.
   // Garante que a nova tarefa seja persistida para recarregamentos futuros.
   // A ordem (criar tarefa, depois salvar) é importante porque a tarefa precisa estar no DOM antes de ser salva.
});

// Permite adicionar tarefas pressionando a tecla Enter, melhorando a usabilidade.
inputTarefa.addEventListener("keypress", function (e) {
   if (e.keyCode === 13) { // Verifica se a tecla pressionada é Enter (código 13).
      if (!inputTarefa.value) return; // Impede a adição de tarefas vazias.
      // Evita poluir a lista com entradas inválidas.
      criaTarefa(inputTarefa.value); // Chama a função para criar a tarefa.
      salvarTarefas(); // Persiste a lista atualizada no localStorage.
      // Mantém a consistência dos dados entre sessões.
   }
   // A ordem (verificar tecla, verificar input, criar tarefa, salvar) segue a lógica de validação antes de ação.
});

// Função para salvar a lista de tarefas no localStorage, garantindo persistência.
function salvarTarefas() {
   const liTarefas = tarefas.querySelectorAll("li"); // Seleciona todos os elementos <li> da lista.
   const allTarefas = []; // Cria um array para armazenar o texto das tarefas.
   
   for (let tarefa of liTarefas) { // Itera sobre cada <li> na lista.
      let tarefaText = tarefa.innerText; // Obtém o texto da tarefa.
      tarefaText = tarefaText.replace("Apagar", "").trim(); // Remove o texto "Apagar" do botão e espaços extras.
      // Garante que apenas o texto da tarefa seja salvo, sem o texto do botão.
      allTarefas.push(tarefaText); // Adiciona o texto limpo ao array.
   }
   
   const jsonTarefas = JSON.stringify(allTarefas); // Converte o array em uma string JSON.
   // O localStorage só armazena strings, então a conversão é necessária.
   localStorage.setItem("tarefas", jsonTarefas); // Salva o JSON no localStorage com a chave "tarefas".
   // Permite recuperar as tarefas em sessões futuras.
}

// Função para carregar as tarefas salvas no localStorage ao iniciar a página.
function loadTarefas() {
   const tarefas = localStorage.getItem("tarefas"); // Recupera a string JSON do localStorage.
   // Verifica se há tarefas salvas para restaurar o estado anterior.
   const allTarefas = JSON.parse(tarefas); // Converte a string JSON de volta para um array.
   // Trata o caso em que não há tarefas salvas (null) implicitamente, pois o loop não executará.

   for (let tarefa of allTarefas) { // Itera sobre cada tarefa salva.
      criaTarefa(tarefa); // Reutiliza a função criaTarefa para recriar cada tarefa no DOM.
      // Garante que as tarefas sejam exibidas da mesma forma que as recém-adicionadas.
   }
   // A função é chamada ao carregar a página para restaurar o estado.
   // A ordem (recuperar, parsear, criar) é necessária para processar os dados corretamente.
   // Reutilizar criaTarefa mantém a consistência no comportamento e evita duplicação de código.
}

// Chama a função ao carregar a página para restaurar as tarefas salvas.
loadTarefas();
// Garante que as tarefas persistidas sejam exibidas imediatamente ao abrir a página.
// Se o localStorage contiver dados corrompidos, o JSON.parse pode falhar.
// Não há tratamento explícito de erros; adicionar try-catch no JSON.parse seria uma melhoria.
// Operações no DOM (como appendChild) são otimizadas ao evitar manipulações desnecessárias.
// Uso de innerText pode permitir injeção de conteúdo indesejado; textContent seria mais seguro.