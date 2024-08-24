document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let currentInput = '';
    let previousInput = '';
    let operator = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');

            if (value) {
                if (operator === '' && currentInput.includes('.') && value === '.') {
                    return;
                }
                currentInput += value;
                display.textContent = currentInput;
            } else if (button.id === 'clear') {
                currentInput = '';
                previousInput = '';
                operator = '';
                display.textContent = '';
            } else if (button.id === 'equals') {
                if (previousInput !== '' && currentInput !== '') {
                    currentInput = evaluate(previousInput, currentInput, operator);
                    display.textContent = currentInput;
                    previousInput = '';
                    operator = '';
                }
            } else {
                if (currentInput === '') {
                    return;
                }
                if (previousInput === '') {
                    previousInput = currentInput;
                    currentInput = '';
                } else if (currentInput !== '') {
                    previousInput = evaluate(previousInput, currentInput, operator);
                    display.textContent = previousInput;
                    currentInput = '';
                }
                operator = button.id;
            }
        });
    });

    function evaluate(num1, num2, operator) {
        const a = parseFloat(num1);
        const b = parseFloat(num2);

        switch (operator) {
            case 'add':
                return (a + b).toString();
            case 'subtract':
                return (a - b).toString();
            case 'multiply':
                return (a * b).toString();
            case 'divide':
                return (a / b).toString();
            default:
                return '';
        }
    }
});
