let loading_screen = document.querySelector('.loading-screen');
loading_screen.addEventListener('click', function (e) {
    this.classList.add('active');

    this._hideTimer = setTimeout(() => {
        this.style.display = 'none';
        // Опционально: удаляем класс после скрытия (чистота)
        this.classList.remove('active');
        // Опционально: удаляем обработчик (если элемент может быть показан снова)
        // this.removeEventListener('click', arguments.callee);
    }, 3000);
}) 