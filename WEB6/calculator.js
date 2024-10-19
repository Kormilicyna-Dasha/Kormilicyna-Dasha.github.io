
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Калькуляторы стоимости</title>
    <script defer src="calculator.js"></script>
</head>
<body>
    <h1>Калькулятор стоимости заказа</h1>
    <label for="product">Выберите товар:</label>
    <select id="product">
        <option value="10">Товар 1 - 10 рублей</option>
        <option value="20">Товар 2 - 20 рублей</option>
        <option value="30">Товар 3 - 30 рублей</option>
    </select>
    <br>
    <label for="quantity">Количество:</label>
    <input type="number" id="quantity" />
    <br>
    <button id="calculateOrder">Подсчитать стоимость заказа</button>
    <div id="orderResult"></div>

    <h1>Калькулятор стоимости услуги</h1>
    <label for="serviceType">Выберите тип услуги:</label>
    <div>
        <input type="radio" name="serviceType" value="1" id="service1" checked> Тип 1
        <input type="radio" name="serviceType" value="2" id="service2"> Тип 2
        <input type="radio" name="serviceType" value="3" id="service3"> Тип 3
    </div>
    <br>
    <label for="serviceQuantity">Количество:</label>
    <input type="number" id="serviceQuantity" />
    <br>
    <select id="serviceOption" style="display: none;"></select>
    <br>
    <input type="checkbox" id="serviceProperty" style="display: none;"> Свойство услуги
    <br>
    <div id="serviceResult"></div>
</body>
</html>
```

**calculator.js**
```javascript
document.addEventListener('DOMContentLoaded', () => {
    const orderResultDiv = document.getElementById('orderResult');
    const productSelect = document.getElementById('product');
    const quantityInput = document.getElementById('quantity');
    const calculateOrderButton = document.getElementById('calculateOrder');

    const serviceResultDiv = document.getElementById('serviceResult');
    const serviceQuantityInput = document.getElementById('serviceQuantity');
    const serviceOptionSelect = document.getElementById('serviceOption');
    const servicePropertyCheckbox = document.getElementById('serviceProperty');
    const serviceTypeRadios = document.querySelectorAll('input[name="serviceType"]');

    // Калькулятор стоимости заказа
    function calculateOrder() {
        const quantity = parseInt(quantityInput.value) || 0;
        const productPrice = parseFloat(productSelect.value);
        const totalCost = productPrice * quantity;
        orderResultDiv.textContent = `Стоимость заказа: ${totalCost} рублей`;
    }

    calculateOrderButton.addEventListener('click', calculateOrder);
    quantityInput.addEventListener('input', calculateOrder);
    productSelect.addEventListener('change', calculateOrder);

    // Калькулятор стоимости услуги
    function updateServiceOptions() {
        serviceOptionSelect.style.display = 'none';
        servicePropertyCheckbox.style.display = 'none';
        serviceOptionSelect.innerHTML = ''; // Очищаем предыдущие опции

        const selectedType = document.querySelector('input[name="serviceType"]:checked').value;
        if (selectedType === '1') {
            // Тип 1: никаких опций
        } else if (selectedType === '2') {
            // Тип 2: только опции
            serviceOptionSelect.style.display = 'block';
            serviceOptionSelect.innerHTML = `
                <option value="5">Опция 1 - 5 рублей</option>
                <option value="10">Опция 2 - 10 рублей</option>
                <option value="15">Опция 3 - 15 рублей</option>
            `;
        } else if (selectedType === '3') {
            // Тип 3: только свойство
            servicePropertyCheckbox.style.display = 'block';
        }
        calculateService();
    }

    function calculateService() {
        const quantity = parseInt(serviceQuantityInput.value) || 0;
        let serviceCost = quantity * 10; // Базовая цена услуги 10 рублей за единицу

        const selectedType = docum

PulseGPT - AI Assistant, [19.10.2024 8:03]
ent.querySelector('input[name="serviceType"]:checked').value;
        if (selectedType === '2') {
            const optionPrice = parseFloat(serviceOptionSelect.value) || 0;
            serviceCost += optionPrice; // Добавляем цену выбранной опции
        } else if (selectedType === '3' && servicePropertyCheckbox.checked) {
            serviceCost += 5; // Добавляем цену свойства, если чекбокс отмечен
        }

        serviceResultDiv.textContent = `Стоимость услуги: ${serviceCost} рублей`;
    }

    serviceQuantityInput.addEventListener('input', calculateService);
    serviceTypeRadios.forEach(radio => radio.addEventListener('change', () => {
        updateServiceOptions();
        calculateService();
    }));
    serviceOptionSelect.addEventListener('change', calculateService);
    servicePropertyCheckbox.addEventListener('change', calculateService);
    
    // Инициализация опций при загрузке
    updateServiceOptions();
});
