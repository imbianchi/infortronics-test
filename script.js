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


$(document).ready(function () {

    // CEP CONSULT
    $('#fetch-cep').on('click', function () {
        const cep = document.getElementById('cep');
        const trimmedCep = cep.value.replace('-', '').trim();

        $.ajax({
            url: "https://brasilapi.com.br/api/cep/v1/" + trimmedCep,
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                const content = document.getElementsByClassName('cep-content')[0];

                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        const p = document.createElement('p');
                        p.textContent = key + ': ' + data[key];
                        content.appendChild(p);
                    }
                }

            },
            error: function (error) {
                alert("Something went wrong: ", error);
            }
        });
    });


    // QUERY EXECUTION
    $('.sql-query-btn').on('click', function () {
        const result = document.getElementById('result-query');
        result.removeChild('p');
        var sqlQuery = $('#sql-query').val();

        $.ajax({
            url: "https://api.extendsclass.com/sql-server/query",
            method: 'POST',
            dataType: 'json',
            contentType: 'text/plain',
            data: sqlQuery,
            headers: {
                "Sql-Server-Id": "20231223123no6yiuelqi13lmn",
                "Sql-Server-Passwd": "3no6yiuelqi13lmoaA#",
            },
            success: function (data) {
                const el = document.createElement('p');

                if(data.rows.length == 0) {
                    el.textContent = "Query ran with success.";    
                } else {
                    el.textContent = JSON.stringify(data.rows[0]);
                }
                
                result.appendChild(el)
            },
            error: function (error) {
                alert("Something went wrong: ", error);
            }
        });
    });
});



// PERFECT NUMBER CHECK
function checkPerfectNumber() {
    let number = parseInt(document.getElementById('perfect-number-input').value);

    if (number == '' || isNaN(number)) {
        document.getElementById('perfect-number-result').textContent = 'Please enter at least one number.';
        return;
    }

    if (number <= 0) {
        document.getElementById('perfect-number-result').textContent = 'Please enter a positive number.';
        return;
    }

    let sum = 0;
    for (let i = 1; i < number; i++) {
        if (number % i === 0) {
            sum += i;
        }
    }

    if (sum === number) {
        document.getElementById('perfect-number-result').textContent = number + ' is a perfect number.';
    } else {
        document.getElementById('perfect-number-result').textContent = number + ' is not a perfect number.';
    }
}



// HIDE & SHOW PAGE CONTENT BASED ON MENU ITEMS
function showContent(sectionId) {
    const contentDivs = document.querySelectorAll('.content');
    contentDivs.forEach(function (div) {
        div.classList.add('hidden');
    });

    const selectedDiv = document.getElementById(sectionId);
    selectedDiv.classList.remove('hidden');
}


// MIULTIPLICATION TABLE
function generateMultiplicationTable() {
    var number = parseInt(document.getElementById('table-number-input').value);

    if (isNaN(number)) {
        alert('Please enter a valid number.');
        return;
    }

    var tableOutput = '<h3>Multiplication Table for ' + number + '</h3>';
    tableOutput += '<ul>';
    for (var i = 1; i <= 10; i++) {
        var result = number * i;
        tableOutput += '<li>' + number + ' x ' + i + ' = ' + result + '</li>';
    }
    tableOutput += '</ul>';

    document.getElementById('tableOutput').innerHTML = tableOutput;
}