
google.books.load();

function initialize(viewLink) {

    console.log(viewLink);
    var viewer = new google.books.DefaultViewer(document.getElementById('viewerCanvas'));
    if (typeof(viewLink) != "string")
        viewer.load('ISBN:0738531367');
    else{
        viewer.load(viewLink, failure);
    }
}

function failure(){
    alert("Error: No Preview Available.");
}
google.books.setOnLoadCallback(initialize);


function takeInput(){
    var inputString = document.getElementById("myInput").value;
    
    axios.get("https://www.googleapis.com/books/v1/volumes?q=" + inputString)
    .then(function (response){
        console.log(response);
        handleResponse(response);
        
    })
    .then(function() {
        console.log('Search complete');
    }) 
}


function handleResponse(response){

    var resultsArray = [];
    
    for (let i = 0; i < 10; i++){
        if('imageLinks' in response.data.items[i].volumeInfo){
            resultsArray.push({"title" : response.data.items[i].volumeInfo.title,
                "author" : response.data.items[i].volumeInfo.authors,
                "viewlink" : response.data.items[i].id,
                "thumbnail" : response.data.items[i].volumeInfo.imageLinks.smallThumbnail});
        }
        else{
            resultsArray.push({"title" : response.data.items[i].volumeInfo.title,
                         "author" : response.data.items[i].volumeInfo.authors,
                         "viewlink" : response.data.items[i].id,
                         "thumbnail" : "https://webmaster.ypsa.org/wp-content/uploads/2012/08/no_thumb.jpg"});
        }
    }
    
    var resultsList = document.getElementById('searchResults');
    resultsList.innerHTML = "";
    for(let i = 0; i < 10; i++){
        var liEle = document.createElement('li');
        liEle.className = 'searchelement';
        var titleText = document.createElement('p');
        titleText.innerHTML = resultsArray[i].title;
        titleText.className = 'titleText';
        var authorText = document.createElement('p');
        authorText.innerHTML = resultsArray[i].author;
        authorText.className = 'authorText';
        liEle.appendChild(titleText);
        var lineBreak = document.createElement('br');
        liEle.appendChild(lineBreak);
        liEle.appendChild(authorText);
        var thumbnail = document.createElement("img");
        thumbnail.className = 'thumbnail';
        thumbnail.src = resultsArray[i].thumbnail;
        liEle.appendChild(thumbnail);
        var addButton = document.createElement("button");
        addButton.className = 'Addbuttons';
        addButton.innerHTML = "Add to List";
        addButton.addEventListener("click", function(){ addBook(resultsArray[i].title + ", by " + resultsArray[i].author, resultsArray[i].viewlink) });
        liEle.appendChild(addButton);
        var lineBreak = document.createElement("br");
        liEle.appendChild(lineBreak);
        var decLine = document.createElement("hr");
        decLine.className = 'decLine';
        liEle.appendChild(decLine);
        resultsList.appendChild(liEle);
    } 
}


function addBook(titleAuthor, viewLink){

    var booksList = document.getElementById("booksList");
    var bookInfoLI = document.createElement("li");
    var bookInfo = document.createTextNode(titleAuthor + "  ");
    var deleteButton = document.createElement("button");
    deleteButton.className = 'buttons';
    deleteButton.innerHTML = "Delete";
    var viewButton = document.createElement("button");
    viewButton.className = 'buttons';
    viewButton.innerHTML = "Preview";
    bookInfoLI.appendChild(bookInfo);
    bookInfoLI.appendChild(deleteButton);
    bookInfoLI.appendChild(viewButton);
    bookInfoLI.className = "bookInListText";
    deleteButton.addEventListener("click", function(){ deleteBook(bookInfoLI) });
    viewButton.addEventListener("click", function(){ viewBook(viewLink) });
    booksList.appendChild(bookInfoLI);
}

function deleteBook(LI){
    var booksList = document.getElementById("booksList");
    booksList.removeChild(LI);
}

function viewBook(viewLink){
    initialize(viewLink);
}


document.onkeyup = function(e){
    if(e.keyCode == 13)
        takeInput();
}