let res_login = document.getElementById('res_login')
let login = document.getElementById('login')

login.addEventListener('click',() =>{
    const nome = document.getElementById('nome').value 
    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value
    
    const valor ={
        nome: nome,
        email: email,
        senha: senha
    }

fetch('http://localhost:3000/logar',{
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(valor)
})

.then(resposta => resposta.json())
.then(dados =>{
    console.log(valor)
    res_login.innerHTML = 'Login realizado com sucesso', dados

})
.catch((err)=>{
    console.error("Erro ao consultar os dados",err)

})

})