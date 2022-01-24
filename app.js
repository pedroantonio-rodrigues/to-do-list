const listaTarefas = [];
const localStorage = window.localStorage;

lerTarefasLocal();

function criarTarefas() {
    let textoTarefa = document.getElementById('descricaoTarefa').value;
    let conteudoTarefa = document.getElementById ('tarefa').value; 
    let tarefa = {
        descricao: textoTarefa,
        status: "aberto",
        conteudo: conteudoTarefa  
    }
    listaTarefas.push(tarefa);
    gravarTarefa()
    alert("Tarefa Criada!")
    limpaTarefa();
    renderLista();
}

function renderLista(){
    let divLista = document.getElementById('listaTarefas');
    let teamplate = '';

    for(let i = 0; i < listaTarefas.length; i++){
        let tarefaConcluida = 'checked';
        let classeTarefaConcluida = 'TarefaConcluida';

        if(listaTarefas[i].status == 'aberto'){
            tarefaConcluida = '';
            classeTarefaConcluida = '';
        }
        teamplate += ` 
        <div class="col py-3 px-md-5 border bg-light">
        <p class="Tarefa ${classeTarefaConcluida}">${listaTarefas[i].descricao}</p>
        <p class="Tarefa ${classeTarefaConcluida}">${listaTarefas[i].conteudo}</p>
        <p>
        <label>
        <input onclick="tarefaConcluida(${i})" type="checkbox" ${tarefaConcluida}/> Tarefa concluida
        <span></span>
        </label>
        </p>
        <button class="btn btn-danger" onclick="excluirTarefa(${i})">Excluir</button>
        </div>
`
    }
    divLista.innerHTML = teamplate; 
}
function excluirTarefa(indiceTarefa){
    if(confirm("deseja excluir a terefa?")) {
        listaTarefas.splice(indiceTarefa, 1);
        gravarTarefa();
        renderLista();
    }
}

function tarefaConcluida(indiceTarefa){
    if(listaTarefas[indiceTarefa].status == 'aberto'){
        listaTarefas[indiceTarefa].status = 'fechado';
    }else{
        listaTarefas[indiceTarefa].status = 'aberto';
    }
    gravarTarefa();
    renderLista();
}

function lerTarefasLocal(){
    let listaTarefasLocal = localStorage.getItem('listaTarefas');
    listaTarefasLocal = JSON.parse(listaTarefasLocal);
    if(listaTarefasLocal !== null) { 
        for (let i = 0; i < listaTarefasLocal.length; i++){
            listaTarefas.push(listaTarefasLocal[i]);
        }
    }
    renderLista();
}

function gravarTarefa(){
    localStorage.setItem('listaTarefas', JSON.stringify(listaTarefas));
}

function limpaTarefa(){
    document.getElementById('descricaoTarefa').value = '';
}