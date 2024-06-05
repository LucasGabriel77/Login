let res_gravar = document.getElementById('res_gravar')
let gravar = document.getElementById('gravar')

gravar.addEventListener('click',() =>{
    const nome = document.getElementById('nome').value
    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value
    
    const valor ={
        nome: nome,
        email: email,
        senha: senha
    }

fetch('http://localhost:3000/cadastrar',{
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(valor)
})

.then(resp => resp.json())
.then(dados =>{
    console.log(dados)
    res_gravar.innerHTML = "Cadastro realizado com sucesso!"
})
.catch((err)=>{
    console.error("Erro ao cadastrar os dados",err)

})

})