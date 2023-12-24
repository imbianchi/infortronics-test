// Common functions
function showAlert(message, className) {
    const alertElement = document.createElement('div');
    alertElement.className = `alert ${className} w-50 m-auto mb-1`;
    alertElement.textContent = message;
    document.body.appendChild(alertElement);
    setTimeout(() => alertElement.remove(), 3000);
}

function showLoadingIndicators() {
    $('.fetch-btn').find('.spinner').removeClass('hidden')
        .end().find('.visually-hidden').removeClass('visually-hidden')
        .end().find('.content-placeholder').addClass('hidden');
}

function hideLoadingIndicators() {
    $('.fetch-btn').find('.spinner').addClass('hidden')
        .end().find('.visually-hidden').addClass('visually-hidden')
        .end().find('.content-placeholder').removeClass('hidden');
}

const fetchBtn = document.getElementsByClassName('fetch-btn');
function startLoading() {
    [].forEach.call(fetchBtn, function (btn) {
        btn.childNodes[1].classList.remove('hidden');
        btn.childNodes[3].classList.remove('visually-hidden');
        btn.childNodes[5].classList.add('hidden');
    });
}

function stopLoading() {
    [].forEach.call(fetchBtn, function (btn) {
        btn.childNodes[1].classList.add('hidden');
        btn.childNodes[3].classList.add('visually-hidden');
        btn.childNodes[5].classList.remove('hidden');
    });
}

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

// Numbers validation
function isValidNumber(number) {
    if (number === '' || isNaN(number) || number <= 0) {
        showAlert('Please enter a valid positive number.', 'alert-danger');
        return false;
    }

    return true;
}

//  ORDERED NUMBERS
const sortNumbers = {
    numbers: [],
    inputNumber: document.getElementById('number'),
    btnsJSON: document.querySelectorAll('.btn-download-json'),
    listNumbers: document.getElementById('sorted-numbers'),

    addNumber: function () {
        if (this.inputNumber.value === '') {
            return showAlert('Please, type a valid number.', 'text-bg-danger')
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

// JQUERY BASED FUNCTIONS
$(document).ready(function () {

    // CEP CONSULT
    $('#fetch-cep').on('click', function () {
        const table = document.getElementsByClassName('table-cep')[0];
        table.innerHTML = '';

        const cep = document.getElementById('cep');
        if (cep.value == '') {
            return showAlert('Please, provide a CEP number.', 'alert-warning');
        }

        startLoading();

        const trimmedCep = cep.value.replace('-', '').trim();

        $.ajax({
            url: "https://brasilapi.com.br/api/cep/v1/" + trimmedCep,
            method: 'GET',
            dataType: 'json',
            success: function (data) {

                const tableHead = document.createElement('thead');
                const trHead = document.createElement('tr');
                tableHead.appendChild(trHead);
                table.appendChild(tableHead);

                const tableBody = document.createElement('tbody');
                const trBody = document.createElement('tr');
                tableBody.appendChild(trBody);
                table.appendChild(tableBody);

                const wrapper = document.getElementsByClassName('div-cep')[0];
                wrapper.classList.add('p-3', 'border', 'rounded-2', 'border-grey');

                for (var key in data) {
                    const th = document.createElement('th');
                    const td = document.createElement('td');

                    trHead.appendChild(th);

                    if (data.hasOwnProperty(key)) {
                        th.innerText = key.toUpperCase();
                        trHead.appendChild(th);

                        td.innerText = data[key];
                        trBody.appendChild(td);
                    }
                }

                stopLoading();

            },
            error: function (error) {
                stopLoading();

                return showAlert(error.responseJSON.errors[0].message, 'alert-danger');
            }
        });
    });

    // QUERY EXECUTION
    $('.sql-query-btn').on('click', function () {
        startLoading();

        const result = document.getElementById('result-query');
        const e = document.createElement('p');
        result.innerHTML = '';

        var sqlQuery = $('#sql-query').val().trim();

        if (sqlQuery == '') {
            e.classList.add('text-bg-danger', 'p-3');
            e.innerText = 'You must provide a valid SQL query.'
            result.appendChild(e);
            return stopLoading();
        }

        $.ajax({
            url: "https://api.extendsclass.com/sql-server/query",
            method: 'POST',
            dataType: 'json',
            contentType: 'text/plain',
            data: sqlQuery,
            headers: {
                "Sql-Server-Id": "20231224133no6yi39ulqjjy2cg",
                "Sql-Server-Passwd": "3no6yi39ulqjjy2chaA#",
            },
            success: function (data) {
                e.classList.add('text-bg-success', 'p-3', 'text-center');

                if (data.rows.length == 0) {
                    e.innerText = "Query ran with success.";
                } else {
                    e.innerText = JSON.stringify(data.rows[0]);
                }

                result.appendChild(e)
                stopLoading();
            },
            error: function (error) {
                e.classList.add('text-bg-danger', 'p-3', 'text-center');
                e.innerText = 'Something went wrong: ' + error.responseText;
                result.appendChild(e);
                stopLoading();
            }
        });

    });

    //PERFECT NUMBER CHECK
    const $watchedInput = $('#perfect-number-input');
    $watchedInput.on('input', function () {
        let number = $(this).val();
        const divResult = document.getElementById('perfect-number-result');

        if (isValidNumber(number)) {
            let sum = 0;
            for (let i = 1; i < number; i++) {
                if (number % i === 0) {
                    sum += i;
                }
            }

            const resultEl = document.createElement('span');
            divResult.innerHTML = '';

            if (sum == number) {
                resultEl.classList.add('text-bg-success', 'p-3');
                resultEl.innerText = number + ' is a perfect number :)';
            } else {
                resultEl.classList.add('text-bg-danger', 'p-3');
                resultEl.innerText = number + ' is not perfect number :(';
            }

            divResult.appendChild(resultEl);
        };

    });

    // MULTIPLICATION TABLE
    const $multTable = $('#mult-input');
    $multTable.on('input', function () {
        let number = $(this).val();

        if (isValidNumber(number)) {
            const table = document.getElementById('mult-result');
            table.innerHTML = '';

            for (let i = 1; i <= 10; i++) {
                let result = number * i;

                const li = document.createElement('li');
                li.classList.add('list-group-item');
                li.classList.add('list-group-item-action');
                li.textContent = number + ' x ' + i + ' = ' + result;
                table.appendChild(li);
            }
        }
    })
});