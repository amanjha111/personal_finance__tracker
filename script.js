document.getElementById('add-btn').addEventListener('click', addTransaction);

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function addTransaction() {
    const description = document.getElementById('description').value;
    const amount = document.getElementById('amount').value;

    if (description === '' || amount === '') return;

    const transaction = {
        id: generateID(),
        description,
        amount: +amount
    };

    transactions.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));
    updateUI();
    document.getElementById('description').value = '';
    document.getElementById('amount').value = '';
}

function generateID() {
    return Math.floor(Math.random() * 1000000);
}

function updateUI() {
    const transactionsList = document.getElementById('transactions');
    transactionsList.innerHTML = '';
    transactions.forEach(transaction => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${transaction.description} <span>${transaction.amount > 0 ? '+' : ''}${transaction.amount}</span>
        `;
        transactionsList.appendChild(li);
    });

    const total = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
    document.getElementById('total').textContent = `Total: ${total}`;
}

updateUI();
