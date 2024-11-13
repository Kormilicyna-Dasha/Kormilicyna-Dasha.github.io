document.addEventListener('DOMContentLoaded', () => {
    const openFormBtn = document.getElementById('openFormBtn');
    const closeFormBtn = document.getElementById('closeFormBtn');
    const popupForm = document.getElementById('popupForm');
    const feedbackForm = document.getElementById('feedbackForm');
    const responseMessage = document.getElementById('responseMessage');

    openFormBtn.addEventListener('click', () => {
        popupForm.classList.remove('hidden');
        history.pushState(null, '', '?form=open');
        loadFormData();
    });

    closeFormBtn.addEventListener('click', closeForm);

    window.addEventListener('popstate', closeForm);

    feedbackForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(feedbackForm);
        const data = Object.fromEntries(formData);

        try {
            const response = await fetch('https://Kormilicyna-Dasha.github.io', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error('Ошибка при отправке данных');

            responseMessage.textContent = 'Данные успешно отправлены!';
            responseMessage.classList.remove('hidden');
            feedbackForm.reset();
            clearFormData();
        } catch (error) {
            responseMessage.textContent = error.message;
            responseMessage.classList.remove('hidden');
        }
    });

    function closeForm() {
        popupForm.classList.add('hidden');
        history.pushState(null, '', window.location.pathname);
        responseMessage.classList.add('hidden');
    }

    function loadFormData() {
        const formData = JSON.parse(localStorage.getItem('feedbackFormData')) || {};
        Object.keys(formData).forEach(key => {
            const input = document.getElementById(key);
            if (input) input.value =formData[key];
        });
    }

    function clearFormData() {
        localStorage.removeItem('feedbackFormData');
    }

    feedbackForm.addEventListener('input', () => {
        const formData = {};
        Array.from(feedbackForm.elements).forEach(input => {
            if (input.id) formData[input.id] = input.value;
        });
        localStorage.setItem('feedbackFormData', JSON.stringify(formData));
    });
});