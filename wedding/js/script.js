let loading_screen = document.querySelector('.loading-screen');
loading_screen.addEventListener('click', function (e) {
    this.classList.add('active');

    this._hideTimer = setTimeout(() => {
        this.style.display = 'none';
        // Опционально: удаляем класс после скрытия (чистота)
        this.classList.remove('active');
        // Опционально: удаляем обработчик (если элемент может быть показан снова)
        // this.removeEventListener('click', arguments.callee);
    }, 1000);
})


document.addEventListener("DOMContentLoaded", function () {

    const weddingDate = new Date(2026, 6, 18, 15, 0, 0);
    // 6 = июль (месяцы считаются с 0)

    function updateTimer() {
        const now = new Date();
        const diff = weddingDate - now;

        if (diff <= 0) {
            clearInterval(timerInterval);
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const mins = Math.floor((diff / (1000 * 60)) % 60);
        const secs = Math.floor((diff / 1000) % 60);

        setValue("._days", days, 3);   // дни — минимум 3 цифры
        setValue("._hours", hours, 2);
        setValue("._mins", mins, 2);
        setValue("._secs", secs, 2);
    }

    function setValue(selector, value, minDigits) {
        const container = document.querySelector(selector + " .count");
        let formatted = String(value);

        // Добавляем ведущие нули
        if (formatted.length < minDigits) {
            formatted = formatted.padStart(minDigits, "0");
        }

        // Если цифр больше, чем есть div — создаём новые
        while (container.children.length < formatted.length) {
            const newDiv = document.createElement("div");
            container.appendChild(newDiv);
        }

        // Если div больше, чем нужно — удаляем лишние
        while (container.children.length > formatted.length) {
            container.removeChild(container.lastChild);
        }

        // Записываем цифры
        [...container.children].forEach((digit, index) => {
            digit.textContent = formatted[index];
        });
    }

    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);

});

var swiper = new Swiper(".mySwiper", {
    effect: "cube",
    grabCursor: true,
    cubeEffect: {
        shadow: false,
        slideShadows: false,
    },
    navigation: {
        nextEl: ".next",
        prevEl: ".prev",
    },

    pagination: {
        el: ".pagination",
        type: "fraction",
        formatFractionCurrent: function (number) {
            return number;
        },
        formatFractionTotal: function (number) {
            return number;
        }
    }
});