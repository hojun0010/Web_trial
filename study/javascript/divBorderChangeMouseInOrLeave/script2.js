// script.js
const circle = document.getElementById('circle');

document.addEventListener('mousemove', (event) => {
    const { clientX, clientY } = event;

    // 원의 위치를 마우스 위치로 설정
    circle.style.left = `${clientX - circle.offsetWidth / 2}px`;
    circle.style.top = `${clientY - circle.offsetHeight / 2}px`;
});
