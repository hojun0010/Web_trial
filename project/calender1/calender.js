
let calender = document.getElementById("calender");
let month_mex_date = [31,29,31,30,30,31,31,31,30,30,31,31] //월별 마지막 날짜 설정
let dayOfweek = ["sun","mon","tue","wen","thur","fri","sat"];
let dayOfweekNums = [1,2,3,4,5,6,7];

let first_day = new Date("2024-01-01");
let first_dayOfweek = "mon";

//페이지 온로드 시 first_day에 저장된 날짜를 wen로 하는 기준으로 1월 달력을 생성한다. 
window.onload = function(){
    //
    for(let i = 1; i < month_mex_date[first_day.getMonth()]; i++){
        if(first_dayOfweek != "sun"){
            //월의 1일이 sunday가 아니면 해당월의 1일에 해당하는 요일 이전날부터 그 주의 sunday까지의 날짜를 이전 달의 달력으로 채워야한다.
            //first_dayOfweek 의 요일의 위치(index)를 dayofweek에서 찾고
            let dayofweeknum = dayOfweek.findIndex(first_dayOfweek);
            //해당 인덱스보다 작은 인덱스에 위치한 요일들에 해당하는 div들을 생성하여 달력에 추가한다 24년 1월의 경우 23년 12월 31일 일요일이 필요
            for(let j = dayofweeknum-1; j >= 0; j--){
                
            }
        }
        let newDiv = document.createElement("div");
        let newText = document.createTextNode(i + "");
        newDiv.setAttribute("class","date");
        newDiv.appendChild(newText);
        calender.appendChild(newDiv);
    }
    
}