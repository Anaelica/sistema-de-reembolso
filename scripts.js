//Seleciona os elementos do formulário.
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

//Seleciona os elementos da Lista.
const expenseList = document.querySelector("ul")
const expenseQuantity = document.querySelector("aside header p span")
const expenseTotal = document.querySelector("aside header h2")

//captura o evento de input para formatar o valor. 
amount.oninput = () => {
    //Obtém o valor atual do input e remove os caracteres não númericos.
    let value = amount.value.replace(/\D/g, "")

    //Transforma o valor em centavos.
    value = Number(value) / 100

    //atualiza o valor do input.
    amount.value = formatCurrencyBRL(value)
}

function formatCurrencyBRL(value){
    //Formata o valor no padrão BRL (Real brasileiro).
    value = value.toLocaleString("pt-BR", {
        style: "currency", 
        currency: "BRL"
    })

    //Retorna o valor formatado.
    return value
}

//Captura o evento de subbmit do formulário para obter os valores
form.onsubmit = (e) => {
    //Previne o comportamente padrão
    e.preventDefault()

    //cria um objeto com os detalhes da nova despesa
    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value, 
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date(),
    }

    //chama a função que vai adicionar o item na lista.
    expenseAdd(newExpense)
}

//Adiciona um novo item na lista. 
function expenseAdd(newExpense){
    try {
        //Cria o elemento de li para adicionar o item na lista.
        const expenseItem = document.createElement("li")
        expenseItem.classList.add("expense")

        //Cria o icone de categoria 
        const expenseIcon = document.createElement("img")
        expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
        expenseIcon.setAttribute("alt", newExpense.category_name)

        //Cria a info da despesa 
        const expenseInfo = document.createElement("div")
        expenseInfo.classList.add("expense-info")

        //Cria o nome da despesa
        const expenseName = document.createElement("strong")
        expenseName.textContent = newExpense.expense

        //Cria a categoria da despesa
        const expenseCategory = document.createElement("span")
        expenseCategory.textContent = newExpense.category_name

        //Adiciona name de category em expense info 
        expenseInfo.append(expenseName, expenseCategory)

        //Cria o valor da despesa. 
        const expenseAmount = document.createElement("span")
        expenseAmount.classList.add("expense-amount")
        expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}`

        //Cria o Icone de remover.
        const removeIcon = document.createElement("img")
        removeIcon.classList.add("remove-icon")
        removeIcon.setAttribute("src", "img/remove.svg")
        removeIcon.setAttribute("alt", "Remover")

        //Adiciona as informações no item 
        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)
        
        //Adiciona o item na lista.
        expenseList.append(expenseItem)

        //atualiza o total
        updateTotals()
    } catch (error) {
        alert("Não foi possivel adicionar o item na lista")
        console.log("Não foi possivel adicionar o item na lista")
    }
}

//atualiza o total
function updateTotals(){
    try {
        //Recupera todos os Itens da lista
        const items = expenseList.children

        expenseQuantity.textContent = `${items.length} 
        ${items.length > 1 ? "Despesas" : "Despesa"}`

        //Variavel que incrementa o total. 
        let total = 0 

        //Percorre e faz a soma 
        for(let item = 0; item < items.length; item++){
            const itemAmount = items[item].querySelector(".expense-amount")

            //Remove formatação e pega apenas números
            let value = itemAmount.textContent.replace(/[^\d]/g, "").replace(",", ".")

            //Converte o valor pra número 
            value = Number(value) 

            //Verifica se é um numero 
            if(isNaN(value)){
                return alert("O valor não é um numero")
            }

            total += value
        }

        expenseTotal.textContent = total
    } catch (error) {
        console.log("Não foi possivel atualizar os totais.")
    }
}