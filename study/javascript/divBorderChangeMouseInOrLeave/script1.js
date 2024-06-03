// script.js
document.querySelectorAll('.box').forEach(box => {
    const canvas = document.createElement('canvas');
    canvas.classList.add('canvas-border');
    box.appendChild(canvas);
    box.addEventListener('mousemove', handleMouseMove);
    box.addEventListener('mouseleave', handleMouseLeave);
});

const radius = 100; // 반지름 설정

function handleMouseMove(event) { //event는 mouseEvent
    const box = event.target; //해당 박스
    // console.log(event);
    // console.log(event.clientX); //

    const canvas = box.querySelector('canvas');
    // const ctx = canvas.getContext('2d');
    const rect = box.getBoundingClientRect();
    // console.log(rect);
    const mouseX = event.clientX - rect.left; //마우스의 X좌표를 해당 박스의 왼쪽 끝점의 x좌표로 뺀다, 즉 왼쪽 끝점과 마우스와의 x좌표 거리값
    const mouseY = event.clientY - rect.top;
    // console.log(mouseX, mouseY);
    resetCanvasBorders();
    //모든 점에 대해 가능한가? 안될듯 그럼 원을 캔버스로 그리되 div 자체는 그린 원보다 앞에 오도록하면? 

    document.querySelectorAll('.box').forEach(targetBox => {
        const targetCanvas = targetBox.querySelector('canvas');
        // console.log(targetCanvas);
        const targetCtx = targetCanvas.getContext('2d');
        const targetRect = targetBox.getBoundingClientRect();

        const targetMouseX = mouseX + (targetRect.left - rect.left);
        const targetMouseY = mouseY + (targetRect.top - rect.top);
        // 각 div 영역의 4변의 길이 영역을 구해 그 영역에 포함되면 그 점부터 원에 중심에 최대한 가까울때까지 칠한다.

        // const distance = Math.sqrt(
        //     Math.pow(targetMouseX - mouseX, 2) + 
        //     Math.pow(targetMouseY - mouseY, 2)
        // );

        // if (distance <= radius) {
        //     targetCtx.clearRect(0, 0, targetCanvas.width, targetCanvas.height);
        //     targetCtx.beginPath();
        //     targetCtx.arc(targetMouseX, targetMouseY, radius, 0, 2 * Math.PI);
        //     targetCtx.strokeStyle = 'orange';
        //     targetCtx.lineWidth = 4;
        //     targetCtx.stroke();
        // }
        targetCtx.clearRect(0, 0, targetCanvas.width, targetCanvas.height);
        targetCtx.beginPath();
        targetCtx.arc(targetMouseX, targetMouseY, radius, 0, 2 * Math.PI);
        targetCtx.strokeStyle = 'orange';
        targetCtx.lineWidth = 4;
        targetCtx.stroke();
    });
}
function IsInCircle(x,y,middle_x,middle_y, r){
    return Math.pow(x-middle_x,2)+Math.pow(y-middle_y,2) <= r ? true : false;
}

function handleMouseLeave(event) {
    resetCanvasBorders();
}

function resetCanvasBorders() {
    document.querySelectorAll('.canvas-border').forEach(canvas => {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
}
