
let calender = document.getElementById("calender");
let month_max_date = [31,29,31,30,31,30,31,31,30,31,30,31] //월별 마지막 날짜 설정
let dayOfweek = ["sun","mon","tue","wen","thur","fri","sat"];
let dayOfweekNums = [0,1,2,3,4,5,6];

//let today = new Date();
let today = new Date();
let todayOfweek = today.getDay(); //Date 객체의 요일정보를 가져옵니다(0~6)

function calenderCreate(){ //한달 달력 생성 스크립트 완성
    //let beforeDateToTodayCalenderCnt = 1;
    let todayMonthFirstDay = new Date(today.getFullYear(),today.getMonth(),1); //이번달의 첫번째 날짜 date
    let beforeDateToTodayCalenderCnt = todayMonthFirstDay.getDay(); 
    //이번달 달력에서 저번달 달력의 날짜가 차지하는 칸의 갯수 -> 이번달의 1일의 요일값
    for(let i = 1; i < month_max_date[today.getMonth()]+1; i++){ 
        // 첫번째 주 일요일부터 날짜를 가져와서 이번달 날짜까지 추가하는 반복문
        // 이 for문에선 지난달의 일부 날짜 + 이번달의 모든 날짜에 해당하는 요소를 모두 추가한다.
        let newDiv = document.createElement("div");     
        let newTextDiv = document.createElement("div");
        newTextDiv.setAttribute("class","text");
        let newText = "";
        if(beforeDateToTodayCalenderCnt !== 0){
            newText = document.createTextNode(month_max_date[today.getMonth()]-beforeDateToTodayCalenderCnt+1); 
            //저번달에서 가져올 날짜 값은 (저번달의 끝 날짜값 - 채워야할 칸 수 +1 ) ex) 31-1+1 = 31
            newDiv.setAttribute("class","other date");
            beforeDateToTodayCalenderCnt--;
            i--;
        }
        else{
            newText = document.createTextNode(i + "");
            if(i == today.getDate()){ //오늘날짜는 다른 class로 관리하자
                newDiv.setAttribute("class","today date");
            }
            else{
                newDiv.setAttribute("class","date");
            }
        }
        newTextDiv.appendChild(newText);
        newDiv.appendChild(newTextDiv);
        calender.appendChild(newDiv);
    }
    let todayMonthFinalDay = new Date(today.getFullYear(), today.getMonth()+1, 0);

    for(let i = 1; i <= 6-todayMonthFinalDay.getDay(); i++){ //다음달에 날짜를 가져와서 빈칸 채우기
        let newDiv = document.createElement("div");     
        newDiv.setAttribute("class","other date");

        let newTextDiv = document.createElement("div");
        newTextDiv.setAttribute("class","text");

        let newText = document.createTextNode(i);
        newTextDiv.appendChild(newText);
        newDiv.appendChild(newTextDiv);
        calender.appendChild(newDiv);
    }
}
function timeCreate(){
    today = new Date();
    let IsAM = true;
    let hour = today.getHours();
    if(hour > 12) {
        IsAM = false;
        hour -= 12;
    }
    let min = zeroNumber(today.getMinutes());
    let sec = zeroNumber(today.getSeconds());

    if(IsAM){
        document.getElementById("time").innerHTML = "오전 " + hour + ":" + min + ":" + sec;
    }else{
        document.getElementById("time").innerHTML = "오후 " + hour + ":" + min + ":" + sec;
    }
}
function zeroNumber(i){
    if(i < 10){
        return "0"+i;
    }
    else{
        return i;
    }
}
function dateCreate(){
    today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth()+1;
    let date = today.getDate();

    document.getElementById("today").innerHTML = year+"년 "+month+"월 "+date+"일";
}


function dateComponentMouseEvent(){ //각 date 요소에 마우스로 실행되는 모든 event를 처리
    
}

//페이지 온로드 시 today에 저장된 날짜를 wen로 하는 기준으로 1월 달력을 생성한다. 
window.onload = function(){
    timeCreate();
    setInterval(timeCreate,1000);
    dateCreate();
    calenderCreate();

}