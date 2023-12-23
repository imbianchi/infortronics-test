// SORT NUMBERS
const sortNumbers = {
    numbers: [],
    inputNumber: document.getElementById('number'),
    btnsJSON: document.querySelectorAll('.btn-download-json'),
    listNumbers: document.getElementById('sorted-numbers'),

    addNumber: function () {
        if (this.inputNumber.value === '') {
            return alert('Please, type a valid number.');
        }

        this.btnsJSON.forEach(btn => btn.classList.toggle('hidden', this.inputNumber.value === ''));

        if (!isNaN(parseInt(this.inputNumber.value))) {
            this.numbers.push(this.inputNumber.value);
            this.numbers.sort((a, b) => a - b);
            this.updateNumbersList();
            this.inputNumber.value = '';
        }
    },

    updateNumbersList: function () {
        this.listNumbers.innerHTML = '';

        this.numbers.forEach(number => {
            const li = document.createElement('li');
            li.classList.add('list-group-item');
            li.classList.add('list-group-item-action');
            li.textContent = number;
            this.listNumbers.appendChild(li);
        });
    },

    downloadNumbersJSON: function () {
        const jsonContent = JSON.stringify(this.numbers, null, 2);
        const blob = new Blob([jsonContent], { type: 'application/json' });

        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'ordered_numbers.json';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    },

    clearAllOrderedNumbers: function () {
        this.numbers = [];
        this.inputNumber.value = '';
        this.btnsJSON.forEach(function (btn) { btn.classList.add('hidden') });
        this.listNumbers.innerHTML = '';
    }
}



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

                if (data.rows.length == 0) {
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
    const menuItems = document.querySelectorAll('.nav-link');
    menuItems.forEach(function (item) {
        item.classList.remove('active');
    })

    const contentDivs = document.querySelectorAll('.content');
    contentDivs.forEach(function (div) {
        div.classList.add('hidden');
    });

    const selectedDiv = document.getElementById(sectionId);
    const selectedItem = document.getElementsByClassName('nav-link ' + sectionId)[0];

    selectedItem.classList.add('active');
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