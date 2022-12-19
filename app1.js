let form=document.getElementById("book-form")
let tbody=document.getElementById("book-list");
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    let title=document.getElementById("title").value;
    let author=document.getElementById("author").value;
    let isbn=document.getElementById("isbn").value;
    if(title==""||author==""||isbn==""){
        showalert("danger","Add all the details regarding to the book.");
        return;
    }
    let book={title,author,isbn}
    showbook(book);
    showalert("success","Book added succesfully.");
    clearallfeilds();

   
});
function getbooks(){
    let books;
    if(localStorage.getItem("mybooks")==null){
        books=[];
    }
    else{
        books=JSON.parse(localStorage.getItem("mybooks"));
    }
    return books;
    
}
function storebook(book){
    let books=getbooks();
    books.push(book);
    localStorage.setItem("mybooks",JSON.stringify(books));
    
}

function showbook(book){
    let tr=document.createElement('tr');
    tr.innerHTML=`
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="btn btn-danger float-right delete">X</a></td>
    `
    tbody.appendChild(tr);
    
}
function clearallfeilds(){
    document.getElementById("title").value="";
    document.getElementById("author").value="";
    document.getElementById("isbn").value="";
}
function showalert(className,msg){
    let div=document.createElement("div");
    div.className=`alert alert-${className}`;
    div.appendChild(document.createTextNode(msg));
    let container=document.querySelector(".container");
    let form=document.querySelector("#book-form");
   container.insertBefore(div,form);
   setTimeout(function(){
    document.querySelector(".alert").remove();
   },2000)
   
}
function cutrow(e){
    if(e.target.classList.contains("delete")){
        if(confirm("Are you sure want to delete it")){
            e.target.parentElement.parentElement.remove();
        }
    }
}
function showallbook(){
    let books=getbooks();
    books.forEach(function(book){
        showbook(book);
    })
}
tbody.addEventListener("click",cutrow);
window.addEventListener("DOMContentLoaded",showallbook);