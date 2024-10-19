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

        const selectedType = document.querySelector('input[name="serviceType"]:checked').value;
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