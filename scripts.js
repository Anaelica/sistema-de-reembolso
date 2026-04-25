//Seleciona os elementos do formulário.
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

//Seleciona os elementos da Lista.
const expenseList = document.querySelector("ul")

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

        //Adiciona as informações no item 
        expense.append(expenseIcon, expenseInfo)
        
        //Adiciona o item na lista.
        expenseList.append(expenseIcon)
    } catch (error) {

    }
}