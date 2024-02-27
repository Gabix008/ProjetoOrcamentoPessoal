class Despesa{
    constructor(ano, mes, dia, tipo, descricao, valor){
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }
    validarDados(){
        for(let i in this){
            if(this[i] == undefined || this[i] == '' || this[i]== null){
                return false;
            }
        }
        return true
    }
}

class Bd{
    constructor(){
        let id = localStorage.getItem('id')
        
        if(id === null){
             localStorage.setItem('id', 0)
        } 
    }

    getProximoID(){
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId)+1
    }
    gravar(d){
        
        let id = this.getProximoID()
        localStorage.setItem(id, JSON.stringify(d))
        localStorage.setItem('id', id)
    }

    recuperarRegistros(){
        let id = localStorage.getItem('id')
        let despesas = Array()
        for(let i=1; i<=id;i++){
            let despesa = JSON.parse(localStorage.getItem(i))

            if(despesa==null){
                continue
            } 
            despesa.id = i
            despesas.push(despesa)
        }
       return despesas
    }

    pesquisar(despesa){
        let despesasFiltradas = Array()

        despesasFiltradas = this.recuperarRegistros()
        
        //console.log(despesa)
        console.log(despesasFiltradas)

        if(despesa.ano != ''){
            console.log('Filtro de ano')
            despesasFiltradas = despesasFiltradas.filter(d=> d.ano == despesa.ano)
        }

        if(despesa.mes != ''){
            console.log('Filtro de mes')
            despesasFiltradas = despesasFiltradas.filter(d=> d.mes == despesa.mes)
        }

        if(despesa.dia != ''){
            console.log('Filtro de dia')
            despesasFiltradas = despesasFiltradas.filter(d=> d.dia == despesa.dia)
        }

        if(despesa.tipo != ''){
            console.log('Filtro de tipo')
            despesasFiltradas = despesasFiltradas.filter(d=> d.tipo == despesa.tipo)
        }
        if(despesa.descricao != ''){
            console.log('Filtro de descricao')
            despesasFiltradas = despesasFiltradas.filter(d=> d.descricao == despesa.descricao)
        }
        if(despesa.valor != ''){
            console.log('Filtro de valor')
            despesasFiltradas = despesasFiltradas.filter(d=> d.valor == despesa.valor)
        }

        return despesasFiltradas

    }
    remover(id){
        localStorage.removeItem(id)
    }
}

let bd = new Bd()

function cadastrarDespesa(){
   let ano = document.getElementById('ano')
   let mes = document.getElementById('mes')
   let dia = document.getElementById('dia')
   let tipo = document.getElementById('tipo')
   let descricao = document.getElementById('descricao')
   let valor = document.getElementById('valor')

   let despesa = new Despesa(ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value)
  

   if(despesa.validarDados()){
    bd.gravar(despesa)
    document.getElementById('title').innerHTML = 'Registro inserido'
    document.getElementById('modal-title-div').className = 'modal-header text-success'
    document.getElementById('modal-conteudo').innerHTML = 'Despesa cadastrada com sucesso'
    document.getElementById('modal-btn').innerHTML = 'Voltar'
    document.getElementById('modal-btn').className = 'btn btn-success'
   
   } else{
    
     document.getElementById('title').innerHTML = 'Erro no cadastro'
     document.getElementById('modal-title-div').className = 'modal-header text-danger'
     document.getElementById('modal-conteudo').innerHTML = 'Erro na gravação, verifique se todos os campos foram preenchidos.'
     document.getElementById('modal-btn').innerHTML = 'Corrigir'
     document.getElementById('modal-btn').className = 'btn btn-danger'
   }
   $('#registraDespesa').modal('show')
   ano.value = ''
   mes.value = ''
   dia.value = ''
   tipo.value = ''
   descricao.value = ''
   valor.value = ''
   
}

function carregaListaDespesas(despesas = Array(), filtro = false){
    if(despesas.length == 0 && filtro == false){ //verifica se foi passado algum filtro pelo usuario
        despesas = bd.recuperarRegistros()//se nao tiver ele recupera todos os registros
    }


    let listaDespesas = document.getElementById('listaDespesas')
    listaDespesas.innerHTML = '' //se tiver ele deixa somente os  registros que fazem parte do filtro

    despesas.forEach (function(d) {
       let linhas = listaDespesas.insertRow()
       linhas.insertCell(0).innerHTML= `${d.dia}/${d.mes}/${d.ano}`

        switch(d.tipo){

            case '1': d.tipo = 'Alimentação'
                break
            case '2': d.tipo = 'Educação'
                break
            case '3': d.tipo = 'Lazer'
                break
            case '4': d.tipo = 'Saúde'
                break
            case '5': d.tipo = 'Transporte'
                break
        }
        linhas.insertCell(1).innerHTML = d.tipo
        linhas.insertCell(2).innerHTML = d.descricao
        linhas.insertCell(3).innerHTML = d.valor

        let btn = document.createElement('button')
        btn.className = 'btn btn-danger'
        btn.innerHTML = '<i class= "fas fa-times"></i>'
        btn.id = `id_despesa_${d.id}`
        btn.onclick = function(){
            let id = this.id.replace('id_despesa_', '')
            bd.remover(id)
            window.location.reload()
        }
        linhas.insertCell(4).append(btn)
        console.log(d)
    })
}
function pesquisarDespesa(){
    let ano = document.getElementById('ano').value
   let mes = document.getElementById('mes').value
   let dia = document.getElementById('dia').value
   let tipo = document.getElementById('tipo').value
   let descricao = document.getElementById('descricao').value
   let valor = document.getElementById('valor').value

   let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

   let despesas = bd.pesquisar(despesa)
   this.carregaListaDespesas(despesas, true)


   let listaDespesas = document.getElementById('listaDespesas')
   listaDespesas.innerHTML = ''

   despesas.forEach (function(d) {
      let linhas = listaDespesas.insertRow()
      linhas.insertCell(0).innerHTML= `${d.dia}/${d.mes}/${d.ano}`

       switch(d.tipo){

           case '1': d.tipo = 'Alimentação'
               break
           case '2': d.tipo = 'Educação'
               break
           case '3': d.tipo = 'Lazer'
               break
           case '4': d.tipo = 'Saúde'
               break
           case '5': d.tipo = 'Transporte'
               break
       }
       linhas.insertCell(1).innerHTML = d.tipo
       linhas.insertCell(2).innerHTML = d.descricao
       linhas.insertCell(3).innerHTML = d.valor
}

   )}


