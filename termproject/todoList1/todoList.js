
//todolist 추가
let btnAdd = document.getElementById("todoList_add");

btnAdd.addEventListener("click",function() {
    let input = document.getElementById("input_text").value;
    let todolist = document.getElementById("todolist");

    if(input != ""){
        const div = document.createElement("div");
        div.setAttribute("class","todolist_div");
        const checkbox = document.createElement("input");
        checkbox.setAttribute("type","checkbox");
        checkbox.setAttribute("value",input);
        checkbox.setAttribute("class","todolist_cb");

        const label = document.createElement("label");
        label.setAttribute("class","todolist_label");
        label.setAttribute("for",input);

        const textNode = document.createTextNode(input);
        label.appendChild(textNode);


        div.appendChild(checkbox);
        div.appendChild(label);
        todolist.appendChild(div);
    }
})

//todolist 삭제
let btnDel = document.getElementById("todoList_del");

btnDel.addEventListener("click",function(){
    let input = document.getElementById("input_text").value;
    let todolist = document.getElementById("todolist");
    let todolists = document.getElementsByClassName("todolist_label");
    let todolist_divs = document.getElementsByClassName("todolist_div");

    //input을 이용한 삭제 -> 1.똑같은 프로젝트 명 2.프로젝트 번호
    if(input != ""){
        let len = todolists.length;
        //삭제하면서 li의 개수가 바뀌기에 for문 과정중에 length의 크기가 변화함으로 따로 변수로 저장해놓는다
        for(let i = 0; i < len; i++){
            let value = todolists.item(i).innerHTML;
            if(value === input || i == input){
                const div = todolist_divs.item(i);
                todolist.removeChild(div);

                len--;
                i--;
            }
        }
    //체크박스를 이용한 프로젝트 삭제
    }else{
        let todolist_cbs = document.getElementsByClassName("todolist_cb");
        
        let len = todolists.length;
        for(let i = 0; i < len; i++){
            if(todolist_cbs.item(i).checked == true){
                const div = todolist_cbs.item(i).parentElement;
                todolist.removeChild(div);
                
                len--;
                i--;
            }
        }
    }
})

