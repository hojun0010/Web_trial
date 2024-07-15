const offset = 69;
const borderWidth = 3;
const angles = []; //in  rad
for (let i = 0; i <= 2; i += 0.25) { //원에서 각 8개의 점에 대한 각을 저장, 원의 가장 윗점을 시작으로 45도씩,1/4파이만큼 시계방향으로 이동하여 저장
  angles.push(Math.PI * i);
}
let nearBy = []; //접하는 div를 저장
let activeBtn = document.querySelector(".box-active");
let lastClicked = null;

document.querySelectorAll(".box").forEach((btn) => { //버튼을 클릭할때 작동
  btn.onclick = (e) => {
    //clear effects from last clicked date and set lastClicked to current item
    if (lastClicked) {  //클릭된 적이 있다면 lastClicked
      lastClicked.classList.remove("box-selected"); //element.classList = 해당 요소의 class로 구성된 list
    } //
    lastClicked = e.currentTarget;

    activeBtn.classList.toggle( //activeBtn에 classlist에 box-unselected가 있으면 삭제, 없으면 추가한다(하나의 인수만 있을때),
    // 2번째 parameter있다면 parameter가 true면 추가,false면 제거한다.
      "box-unselected",
      e.currentTarget.id !== activeBtn.id //activeBtn = 오늘 날짜
    );
    e.currentTarget.classList.add("box-selected"); //클릭된 요소에 selected class를 추가
  };
});

function clearNearBy() {
  nearBy.splice(0).forEach((e) => (e.style.borderImage = null));
  //Array.splice(start, [deleteCounts, [item1, [item2, ...]]])
  //start는 연산을 시작할 index 위치
  //deleteCounts는 삭제할 요소의 개수
  //start index 위치로부터 deleteCounts 만큼의 요소를 삭제하고 그 이후의 파라미터 값을 추가한다.
}

const body = document.querySelectorAll(".box"); //예시에선 querySelector로 한 요소만 선택했다. -> 이게 작동하나?

body.forEach(element => {
  element.addEventListener("mousemove", (e) => {
    //mouse가 움직일때 eventListener
  let x = e.clientX; //x position of cursor.
  let y = e.clientY; //y position of cursor

  clearNearBy(); 
  //마우스 위치에서 원 영역 안에 있는 div를 판단하기 위한 angle을 가지고 연산
  nearBy = angles.reduce((acc, rad, index, arr) => { 
    //Array.reduce(callback[, initialValue]) callback : 배열의 각 요소에 대해 실행할 함수, 인수 4개를 가진다
    //accumulator =  acc : 누산기, 콜백의 반환값을 보유. 콜백의 이전반환값, 단 콜백의 첫번째 호출이면서 initialValue가 주어진다면 initialVlaue의 값을 가진다
    //currendValue = rad : 처리할 현재 요소(배열의 각 요소를 뜻함, 현재 함수를 적용하는 배열의 요소)
    //currentIndex(Optional) = index : 처리할 현재 요소의 인덱스, initialValue를 제공한 경우 0, 아니면 1부터 시작한다
    //array(Optional) = arr : reduce를 호출한 배열 = angles
    const offsets = [offset * 0.35, offset * 1.105]; 
    //TODO:
    //offset의 값은 2개, offset의 크기가 div의 크기보다 크다면 원 안에 div가 완전히 속하는 경우가 발생, 이 경우 border에 영향을 줄 수 없다. 따라서
    // 작은 원과 큰 원 2개에 대해 둘 중 하나라도 접한다면 접하는 것으로 판단할 수 있다.

    const elements = offsets.reduce((elementAccumulator, o, i, offsetArray) => {
      if (index % 2 === 0 && i === 0) return elementAccumulator; //이전 반환값을 그대로, 
      const cx = Math.floor(x + Math.cos(rad) * o);
      const cy = Math.floor(y + Math.sin(rad) * o);
      const element = document.elementFromPoint(cx, cy);
      // console.log("element at", x, y, cx, cy, offsets, (rad * 180) / Math.PI);
      if (
        element &&
        element.classList.contains("box") &&
        !element.classList.contains("box-active") &&
        !element.classList.contains("box-selected") &&
        elementAccumulator.findIndex((ae) => ae.id === element.id) < 0
      ) {
        const brect = element.getBoundingClientRect();
        const bx = x - brect.left; //x position within the element.
        const by = y - brect.top; //y position within the element.
        const gr = Math.floor(offset * 1.7);
        if (!element.style.borderImage)
          element.style.borderImage = `radial-gradient(${gr}px ${gr}px at ${bx}px ${by}px ,rgba(255,255,255,0.3),rgba(255,255,255,0.1),transparent ) 9 / ${borderWidth}px / 0px stretch `;
        console.log("element at", offsets, (rad * 180) / Math.PI, element);

        return [...elementAccumulator, element];
      }
      return elementAccumulator;
    }, []);

    return acc.concat(elements);
  }, []);
  });
});

body.onmouseleave = (e) => {
  clearNearBy();
};