// SORT NUMBERS
var numbers = [];

function addNumber() {
    var inputNumber = document.getElementById('number');
    const btn = document.getElementsByClassName('btn-download-json')[0];

    
    var typedNumber = parseInt(inputNumber.value);
    
    if (inputNumber.length == 0) {
        btn.classList.add('hidden');
    } else {
        btn.classList.remove('hidden');
    }

    if (!isNaN(typedNumber)) {
        numbers.push(typedNumber);
        numbers.sort(function (a, b) {
            return a - b;
        });

        updateNumbersList();
        inputNumber.value = '';
    } else {
        alert('Please, type a valid number.');
    }
}

function updateNumbersList() {
    var listNumbers = document.getElementById('sorted-numbers');
    listNumbers.innerHTML = '';

    numbers.forEach(function (number) {
        var li = document.createElement('li');
        li.textContent = number;
        listNumbers.appendChild(li);
    });
}

function downloadJSON() {
    if (numbers.length == 0) {
        return;
    }

    var jsonContent = JSON.stringify(numbers, null, 2);

    var blob = new Blob([jsonContent], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var link = document.createElement('a');

    link.href = url;
    link.download = 'ordered_numbers.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

const orderedNumbersList = document.getElementById('orderedNumbersList');
numbers.forEach(function (number) {
    var listItem = document.createElement('li');
    listItem.textContent = number;
    orderedNumbersList.appendChild(listItem);
});


// CEP CONSULT
const cepAPI = "https://apps.correios.com.br/SigepMasterJPA/AtendeClienteService/AtendeCliente?wsdl";

$(document).ready(function () {
    $('#fetch-cep').on('click', function () {
        $.ajax({
            url: 'https://jsonplaceholder.typicode.com/posts/1',
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                console.log('Data received:', data);
            },
            error: function (error) {
                console.error('Error:', error);
            }
        });
    });
});



// HIDE & SHOW PAGE CONTENT BASED ON MENU ITEMS
function showContent(sectionId) {
    const contentDivs = document.querySelectorAll('.content');
    contentDivs.forEach(function (div) {
        div.classList.add('hidden');
    });

    const selectedDiv = document.getElementById(sectionId);
    selectedDiv.classList.remove('hidden');
}