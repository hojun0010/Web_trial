let calender = document.getElementById("calender_grid");
let month_max_date = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; //월별 마지막 날짜 설정
let dayOfweek = ["sun", "mon", "tue", "wen", "thur", "fri", "sat"];
let dayOfweekNums = [0, 1, 2, 3, 4, 5, 6];

//let today = new Date();
let today = new Date();
let todayOfweek = today.getDay(); //Date 객체의 요일정보를 가져옵니다(0~6)

function calenderCreate() { //한달 달력 생성 스크립트
  
  //let beforeDateToTodayCalenderCnt = 1;
  let todayMonthFirstDay = new Date(today.getFullYear(), today.getMonth(), 1); //이번달의 첫번째 날짜 date
  let beforeDateToTodayCalenderCnt = todayMonthFirstDay.getDay();
  //이번달 달력에서 저번달 달력의 날짜가 차지하는 칸의 갯수 -> 이번달의 1일의 요일값
  for (let i = 1; i < month_max_date[today.getMonth()] + 1; i++) {
    // 첫번째 주 일요일부터 날짜를 가져와서 이번달 날짜까지 추가하는 반복문
    // 이 for문에선 지난달의 일부 날짜 + 이번달의 모든 날짜에 해당하는 요소를 모두 추가한다.
    let newDiv = document.createElement("div");
    let newText = "";
    if (beforeDateToTodayCalenderCnt !== 0) {
      newText = month_max_date[today.getMonth()] - beforeDateToTodayCalenderCnt + 1;
      //저번달에서 가져올 날짜 값은 (저번달의 끝 날짜값 - 채워야할 칸 수 +1 ) ex) 31-1+1 = 31
      newDiv.setAttribute("class", "date date-other");
      let str = month_max_date[today.getMonth()] - beforeDateToTodayCalenderCnt + 1;
      newDiv.setAttribute("id","date-other"+str)
      beforeDateToTodayCalenderCnt--;
      i--;
      newDiv.innerText = newText;
    } else {
      newText = i + "";
      if (i == today.getDate()) {
        //오늘날짜는 다른 class로 관리하자
        newDiv.setAttribute("class", "date date-active");
        newDiv.setAttribute("id","date"+i);

        let newSecDiv = document.createElement("div");
        newSecDiv.setAttribute("id","date-active-text");
        newSecDiv.innerText = newText;
        
        newDiv.appendChild(newSecDiv);
      } else {
        newDiv.setAttribute("class", "date");
        newDiv.setAttribute("id","date"+i);
        newDiv.innerText = newText;
        
      }
    }
    calender.appendChild(newDiv);
  }
  let todayMonthFinalDay = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0
  );

  for (let i = 1; i <= 6 - todayMonthFinalDay.getDay(); i++) {
    //다음달에 날짜를 가져와서 빈칸 채우기
    let newDiv = document.createElement("div");
    newDiv.setAttribute("class", "date date-other");
    newDiv.setAttribute("id","other-date"+i);

    let newText = i;
    newDiv.innerText = newText;
    calender.appendChild(newDiv);
  }
}
function timeCreate() { //시간 생성 스크립트
  today = new Date();
  let IsAM = true;
  let hour = today.getHours();
  if (hour > 12) {
    IsAM = false;
    hour -= 12;
  }
  let min = zeroNumber(today.getMinutes());
  let sec = zeroNumber(today.getSeconds());

  if (IsAM) {
    document.getElementById("time").innerHTML =
      "오전 " + hour + ":" + min + ":" + sec;
  } else {
    document.getElementById("time").innerHTML =
      "오후 " + hour + ":" + min + ":" + sec;
  }
}
function zeroNumber(i) { //
  if (i < 10) {
    return "0" + i;
  } else {
    return i;
  }
}
function dateCreate() { //날짜 생성 스크립트
  today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let date = today.getDate();

  document.getElementById("today").innerHTML =
    year + "년 " + month + "월 " + date + "일";
}

function dateComponentMouseEvent() {
  //각 date 요소에 마우스로 실행되는 모든 event를 처리
  const offset = 40;
  const borderWidth = 3;
  const angles = []; //in  rad
  for (let i = 0; i <= 2; i += 0.25) {
    //원에서 각 8개의 점에 대한 각을 저장, 원의 가장 윗점을 시작으로 45도씩,1/4파이만큼 시계방향으로 이동하여 저장
    angles.push(Math.PI * i);
  }
  let nearBy = []; //접하는 div를 저장
  let activeBtn = document.querySelector(".date-active");
  let lastClicked = null;

  document.querySelectorAll(".date").forEach((btn) => {
    //버튼을 클릭할때 작동
    btn.onclick = (e) => {
      //clear effects from last clicked date and set lastClicked to current item
      if (lastClicked) {
        //클릭된 적이 있다면 lastClicked = true
        lastClicked.classList.remove("date-selected"); //element.classList = 해당 요소의 class로 구성된 list
      } //
      lastClicked = e.currentTarget;

      activeBtn.classList.toggle(
        //activeBtn에 classlist에 box-unselected가 있으면 삭제, 없으면 추가한다(하나의 인수만 있을때),
        // 2번째 parameter -> 있다면 parameter가 true면 추가,false면 제거한다.
        "date-active-unselected",
        e.currentTarget.id !== activeBtn.id //activeBtn = 오늘 날짜
      );
      e.currentTarget.classList.add("date-selected"); //클릭된 요소에 selected class를 추가
    };
  });

  function clearNearBy() {
    nearBy.splice(0).forEach((e) => (e.style.borderImage = null));
    //Array.splice(start, [deleteCounts, [item1, [item2, ...]]])
    //start는 연산을 시작할 index 위치
    //deleteCounts는 삭제할 요소의 개수
    //start index 위치로부터 deleteCounts 만큼의 요소를 삭제하고 그 이후의 파라미터 값을 추가한다.
  }

  const body = document.querySelectorAll(".date"); //예시에선 querySelector로 한 요소만 선택했다. -> 이게 작동하나?

  body.forEach((element) => {
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

        const elements = offsets.reduce(
          (elementAccumulator, o, i, offsetArray) => {
            if (index % 2 === 0 && i === 0) return elementAccumulator; //이전 반환값을 그대로,
            const cx = Math.floor(x + Math.cos(rad) * o);
            const cy = Math.floor(y + Math.sin(rad) * o);
            const element = document.elementFromPoint(cx, cy);
            // console.log("element at", x, y, cx, cy, offsets, (rad * 180) / Math.PI);
            if (
              element &&
              element.classList.contains("date") &&
              !element.classList.contains("date-active") &&
              !element.classList.contains("date-selected") &&
              elementAccumulator.findIndex((ae) => ae.id === element.id) < 0
            ) {
              const brect = element.getBoundingClientRect();
              const bx = x - brect.left; //x position within the element.
              const by = y - brect.top; //y position within the element.
              const gr = Math.floor(offset * 1.7);
              if (!element.style.borderImage)
                element.style.borderImage = `radial-gradient(${gr}px ${gr}px at ${bx}px ${by}px ,rgba(255,255,255,0.3),rgba(255,255,255,0.1),transparent ) 9 / ${borderWidth}px / 0px stretch `;
              console.log(
                "element at",
                offsets,
                (rad * 180) / Math.PI,
                element
              );

              return [...elementAccumulator, element];
            }
            return elementAccumulator;
          },
          []
        );

        return acc.concat(elements);
      }, []);
    });
  });

  body.onmouseleave = (e) => {
    clearNearBy();
  };
}

//페이지 온로드 시 today에 저장된 날짜를 기준으로 달력 생성
window.onload = function () {
  timeCreate();
  setInterval(timeCreate, 1000);
  dateCreate();
  calenderCreate();
  dateComponentMouseEvent();
};
