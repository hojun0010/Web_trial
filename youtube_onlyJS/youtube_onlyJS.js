var yt_mark = document.getElementById("yt_mark");
yt_mark.onclick = function(){
  location.reload();
}

var user_sidebar = document.getElementById("user_sidebar");
var user_sidebar_sonCount = user_sidebar.childElementCount;

var user_sidebar_more_btn = document.getElementById("user_sidebar_more_btn");
user_sidebar_more_btn.onclick = function(){ //재생목록 더보기
  let user_sidebar_more = document.getElementById("user_sidebar_more");
  if(user_sidebar_more.style.display == "none"){
    user_sidebar_more.style.display = "block";
  } else{
    user_sidebar_more.style.display = "none";
  }
}

var subscribe_sidebar = document.getElementById("subscribe_sidebar");
var subscribe_sidebar_sonCount = subscribe_sidebar.childElementCount;

var subscribe_sidebar_more_btn = document.getElementById("subscribe_sidebar_more_btn");
subscribe_sidebar_more_btn.onclick = function(){ //구독목록 더보기
  let subscribe_sidebar_more = document.getElementById("subscribe_sidebar_more");
  if(subscribe_sidebar_more.style.display == "none"){
    subscribe_sidebar_more.style.display = "block";
  } else{
    subscribe_sidebar_more.style.display = "none";
  }
}
