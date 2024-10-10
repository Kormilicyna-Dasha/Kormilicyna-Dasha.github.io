document.addEventListener('DOMContentLoaded', () => {
    const calculateButton = document.getElementById('calculate');
    const resultDiv = document.getElementById('result');
    const quantityInput = document.getElementById('quantity');
    const productSelect = document.getElementById('product');

    calculateButton.addEventListener('click', () => {
        const quantity = quantityInput.value;
        const productPrice = parseFloat(productSelect.value);
        
        if (!/^\d+$/.test(quantity)) {
            resultDiv.textContent = 'Ошибка: введите корректное количество.';
            return;
        }

        const totalCost = productPrice * parseInt(quantity);
        resultDiv.textContent = `Стоимость заказа: ${totalCost} рублей`;
    });
});