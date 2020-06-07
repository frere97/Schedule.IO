document.addEventListener("DOMContentLoaded", function(event) {

    CarregaTs();


});


var linhas = 3;
var matrix = [];
for (let i = 0; i < linhas; i++) {
    matrix[i] = new Array(7);
}
var ListaDetarefas = [];
var TodasAsColunas = document.getElementsByClassName("coluna");
var timesheet = document.getElementById("tabelaTimesheet")
if (localStorage.getItem("listaDetarefas") != null) {
    ListaDetarefas = JSON.parse(localStorage.getItem("listaDetarefas"))

} else { console.log("n tem nada aqui") }


//função q carrega os dados do TS quando o mesmo é iniciado
function CarregaTs() {

    if (ListaDetarefas.length > 0) {
        for (let i = 0; i < ListaDetarefas.length; i++) {

            PreencheColuna(ListaDetarefas[i][0], ListaDetarefas[i][1], ListaDetarefas[i][2], ListaDetarefas[i][3], ListaDetarefas[i][4], checaLinha(ListaDetarefas[i][0], ListaDetarefas[i][1]), ListaDetarefas[i][5]);
        }
    }
}

function checaColunas(linha, ondeComeca, ondetermina) {
    // checa se as colunas de certa linha estão ocupadas

    let linhaAtual = matrix[linha];

    for (let i = ondeComeca; i <= ondetermina; i++) {

        if (linhaAtual[i] != undefined) {
            return false;
        }
    }
    return true;
}

//checa se a linha atual está preenchida na parte que precisa
function checaLinha(ondeComeca, ondetermina) {

    for (let i = 0; i < matrix.length; i++) {

        if (checaColunas(i, ondeComeca, ondetermina) == true) {

            return i;

        }

    }
    //criar nova linha caso todas estejam ocupadas
    criaLinha()

    return matrix.length - 1;

}


function criaLinha() {



    matrix.push(new Array(7));

    let linha = document.createElement("div");

    let temp = "" + matrix.length - 1

    linha.classList.add("linha", "l" + temp);

    for (let i = 0; i < 7; i++) {
        let tempC = "" + i;
        let coluna = document.createElement("div");
        coluna.classList.add("coluna", "c" + tempC);
        linha.appendChild(coluna);


    }

    timesheet.appendChild(linha);
}

function PreencheColuna(ondeComeca, ondetermina, colorName, titulo, descricao, linha, ID) {

    for (let i = ondeComeca; i <= ondetermina; i++) {
        matrix[linha][i] = 1;

        let c = document.getElementsByClassName("coluna c" + i);

        c[linha].classList.add(colorName);
        c[linha].setAttribute("data-identificacao", ID);
        c[linha].setAttribute("data-toggle", "modal")
        c[linha].setAttribute("data-target", "#exampleModalCenter")

        if (i == ondeComeca) {
            c[linha].classList.add("borderRadiusLeft");
            c[linha].textContent = titulo
        }
        if (i == ondetermina) {
            c[linha].classList.add("borderRadiusRight");
        }

    }

}

//estou recebendo e armazenando os dados aqui
function RecebeDados(ondeComeca, ondetermina, cor, titulo, descricao, categoria) {

    let linha = checaLinha(ondeComeca, ondetermina);
    let ID = (ListaDetarefas.length + 1) * Math.random() * 100 / Math.random() * 3 * Math.random();
    let tarefa = [ondeComeca, ondetermina, cor, titulo, descricao, ID, categoria];


    if (ondeComeca > ondetermina) {
        PreencheColuna(tarefa[0], 6, tarefa[2], tarefa[3], tarefa[4], checaLinha(tarefa[0], 6), tarefa[5])
        ListaDetarefas.push([tarefa[0], 6, tarefa[2], tarefa[3], tarefa[4], tarefa[5], categoria])

        PreencheColuna(0, tarefa[1], tarefa[2], tarefa[3], tarefa[4], checaLinha(0, tarefa[1]), tarefa[5])
        ListaDetarefas.push([0, tarefa[1], tarefa[2], tarefa[3], tarefa[4], tarefa[5], categoria])
    } else {
        PreencheColuna(tarefa[0], tarefa[1], tarefa[2], tarefa[3], tarefa[4], linha, tarefa[5])
        ListaDetarefas.push(tarefa)
    }
    localStorage.setItem("listaDetarefas", JSON.stringify(ListaDetarefas));
}

var todasAsDivsClicadas = [];

window.onclick = e => {

    InsereInfoNoModal(SeparaAsDivsQueForamClicadas(IDdivClicada(e.target)))

}

function IDdivClicada(ID) {

    if (ID.getAttribute("data-identificacao")) {
        console.log(ID.getAttribute("data-identificacao"))
        return ID.getAttribute("data-identificacao");
    }

}

function SeparaAsDivsQueForamClicadas(ID) {
    //IDDIV = ID

    let todosOsItensComMsmID = [];


    for (let i = 0; i < ListaDetarefas.length; i++) {
        if (ID == ListaDetarefas[i][5]) {

            todosOsItensComMsmID.push(ListaDetarefas[i])

        }
    }

    // console.log(todosOsItensComMsmID);
    IDDIV = null;
    return todosOsItensComMsmID;


}

function InsereInfoNoModal(DivClicada) {

    if (DivClicada.length > 0) {
        //  console.log("oioi");

        let nome = document.getElementById("nome") //divClicada[0][3]
        let Descricao = document.getElementById("descrição") //divClicada[0][4]
        let categoria = document.getElementById("categoria") //divClicada[0][6]
            // console.log(DivClicada);
        nome.innerHTML = DivClicada[0][3]
        Descricao.innerHTML = DivClicada[0][4]
        categoria.innerHTML = DivClicada[0][6]

        let botaoDel = document.getElementById("DeletaTarefa");

        botaoDel.addEventListener("click", () => {

            let listaDetarefas1 = [];

            for (let i = 0; i < ListaDetarefas.length; i++) {

                if (DivClicada[0][5] != ListaDetarefas[i][5]) {
                    listaDetarefas1.push(ListaDetarefas[i])

                }
            }
            ListaDetarefas = listaDetarefas1
            localStorage.setItem("listaDetarefas", JSON.stringify(ListaDetarefas));
            location.reload();
        })
    }
}