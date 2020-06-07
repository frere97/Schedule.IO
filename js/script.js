// Botão Personalizar

function append(){
    let oculto = document.getElementById("oculto");
    oculto.classList.toggle("d-none");
}

// Formulários

function pegarElemento(id){
    return document.getElementById(id);
}

var totalUsuarios = []
var adicionarContato = []
var listaEmails = []
var listaUsernames = []

let formGeral = pegarElemento('formulario');

let nome = pegarElemento('nome');
let senha = pegarElemento('senha');
let email = pegarElemento('email');
let username = pegarElemento('username');
let avatar = pegarElemento('avatar');
let userLogin = pegarElemento('user-login');
let senhaLogin = pegarElemento('senha-login');

formGeral.addEventListener('submit', function(e){
    e.preventDefault()
})

function verificarCadastro(){

    if (listaEmails.includes(email.value)) {
        Swal.fire({
            heightAuto: false,
            title: 'Parece que você já tem uma conta!',
            icon: 'warning',
            confirmButtonColor: '#17A2B8',
            confirmButtonText:
            '<a href="login.html">Fazer login</a>',
            footer: '<a href="recuperar.html" class="text-muted">Esqueci minha senha</a>'
        })

    } else if (username.value != "" && listaUsernames.includes(username.value)) {
        Swal.fire({ 
            heightAuto: false,
            icon: 'error',
            title: 'Oops...',
            text: 'Usuário já existente!',
            showConfirmButton: false,
            footer: '<a href="login.html" class="text-muted">Já tem uma conta? Faça login!</a>'
        })   

    } else {
        adicionarContato = []
        adicionarContato.push(nome.value, senha.value, email.value, username.value, avatar.value)
        totalUsuarios.push(adicionarContato)
        listaEmails.push(email.value)
        listaUsernames.push(username.value)
    }
}

function verificarLogin(){

    if (listaEmails.includes(userLogin.value) == false || listaUsernames.includes(userLogin.value) == false){
        Swal.fire({
            heightAuto: false,
            icon: 'warning',
            title: 'Oops...',
            text: 'Usuário não encontrado',
            showConfirmButton: false,
            footer: '<a href="cadastro.html" class="text-muted">Novo por aqui? Crie uma conta!</a>'
        })
    }
/*
    if (senhaLogin incorreta){
        Swal.fire({
            heightAuto: false,
            icon: 'error',
            title: 'Oops...',
            text: 'Senha inválida',
            showConfirmButton: false,
            footer: '<a href="cadastro.html" class="text-muted">Esqueceu a senha?</a>'
        })
    }*/
}

function verificarRecuperar(){
    
    if (listaEmails.includes(email.value) == false){
        Swal.fire({
            heightAuto: false,
            icon: 'warning',
            title: 'Oops...',
            text: 'Usuário não encontrado',
            showConfirmButton: false,
            footer: '<a href="cadastro.html" class="text-muted">Novo por aqui? Crie uma conta!</a>'
        })

    }else{
        Swal.fire({
            heightAuto: false,
            icon: 'success',
            title: 'Email enviado!',
            text: 'Cheque sua caixa de entrada ou spam em alguns minutos!',
            showConfirmButton: false,
            footer: '<a href="login.html" class="text-muted">Já tem uma conta? Faça login!</a>'
        })
    }
}

