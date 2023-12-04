let yt_mark = document.getElementById("yt_mark");
yt_mark.onclick = function(){
  location.reload();
}

let scroll_main = document.getElementById("scroll_main"); // 영상을 보여줄 영역을 갖고옴
let videos = document.getElementsByClassName("video"); // 첫 화면 당시 비디오 크기를 설정하기 위함

let scroll_main_width = scroll_main.getBoundingClientRect().width; //현재 scroll_main의 width
let scroll_main_hegiht = scroll_main.getBoundingClientRect().height;

window.onload = function(){

  // html 로드 시점의 화면 크기에 따라 video의 크기 조절 시도
  // try 1)
  // videos.forEach(element => { //미작동 => HTMLCollection is not array / forEach => array에만 작동한다.
  //   element.width = scroll_main_width-10;
  //   element.height = scroll_main_hegiht-10;
  // });

  // try2) -> 크기 조절이 안됨
  videos.item(0).width = scroll_main_width-10;
  videos.item(0).height = scroll_main_hegiht-10;
}




let user_sidebar = document.getElementById("user_sidebar");
let user_sidebar_sonCount = user_sidebar.childElementCount;

let user_sidebar_more_btn = document.getElementById("user_sidebar_more_btn");
user_sidebar_more_btn.onclick = function(){ //재생목록 더보기
  let user_sidebar_more = document.getElementById("user_sidebar_more");
  if(user_sidebar_more.style.display == "none"){
    user_sidebar_more.style.display = "block";
  } else{
    user_sidebar_more.style.display = "none";
  }
}

let subscribe_sidebar = document.getElementById("subscribe_sidebar");
let subscribe_sidebar_sonCount = subscribe_sidebar.childElementCount;

let subscribe_sidebar_more_btn = document.getElementById("subscribe_sidebar_more_btn");
subscribe_sidebar_more_btn.onclick = function(){ //구독목록 더보기
  let subscribe_sidebar_more = document.getElementById("subscribe_sidebar_more");
  if(subscribe_sidebar_more.style.display == "none"){
    subscribe_sidebar_more.style.display = "block";
  } else{
    subscribe_sidebar_more.style.display = "none";
  }
}

//화면 크기에 따른 화면상의 동영상 숫자를 변화시킨다.
//확대 축소는 일단 제외, 

//document.querySelector vs document.getElementById 
//-> getElementById나 ByClassName()은 구체적인 정보가 필요 getElementById("name") 등
//-> querySelector("#userFoem .name") 등 class > id 등 복합적인 정보를 사용할 수 있다.
//-> querySelecotrAll() -> 단순한 NodeList를 리턴 -> 인덱스로만 접근 가능
//-> getElementByClassName() -> HTMLCollection을 리턴 -> name, id의 속성을 이용하여 접근 가능


window.addEventListener("resize", function() {
  // window resize시 처리
  //video group 당 영상은 6개 -> 화면 크기에 따라 1개 2개 3개 4개 6개로 변화
  // HTMLElement.getBoundingClientRect() => DOMRect를 리턴
  // results.item(0).innerHTML = scroll_main.getBoundingClientRect().width; //scroll_main dom의 크기
  // results.item(1).innerHTML = scroll_main.getBoundingClientRect().height; //scroll_main dom의 크기
  
  //위의 코드에선 시작할때 값이 저장 안됨 -> onload 시작할때 작동하도록하면 된다.

  // if(width > 100 && width < 400){
  //   scroll_main.style.gridTemplateColumns = width;
  // }
  //너비 400 ~ 1 너비 401 ~ 2()
})