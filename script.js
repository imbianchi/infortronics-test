// SORT NUMBERS
var numbers = [];

function addNumber() {
    var inputNumber = document.getElementById('number');
    var typedNumber = parseInt(inputNumber.value);

    // Verifica se é um número válido
    if (!isNaN(typedNumber)) {
        // Adiciona o número ao array
        numbers.push(typedNumber);

        // Ordena o array em ordem crescente
        numbers.sort(function (a, b) {
            return a - b;
        });

        // Atualiza a lista de números na tela
        updateNumbersList();

        // Limpa o campo de entrada
        inputNumber.value = '';
    } else {
        alert('Please, type a valid number.');
    }
}

function updateNumbersList() {
    var listNumbers = document.getElementById('sorted-numbers');
    listNumbers.innerHTML = '';

    // Adiciona os números ordenados à lista
    numbers.forEach(function (number) {
        var li = document.createElement('li');
        li.textContent = number;
        listNumbers.appendChild(li);
    });
}


// HIDE & SHOW PAGE CONTENT BASED ON MENU ITEMS
function showContent(sectionId) {
    // Hide all content divs
    var contentDivs = document.querySelectorAll('.content');
    contentDivs.forEach(function (div) {
        div.classList.add('hidden');
    });

    // Show the selected content div
    var selectedDiv = document.getElementById(sectionId);
    selectedDiv.classList.remove('hidden');
}