function add(){
    var newItem = document.createElement("li");
    var data = document.querySelector("#input");
    var newList = document.createTextNode(data.value);
    
    newItem.appendChild(newList);
    var itemList = document.querySelector("#itemList");
    itemList.appendChild(newItem);

    data.value="";
}