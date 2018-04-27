
var slideCount = 0;
var bookListVar = null;

function mobileV(mobile){
	//if(mobile.matches){
		//document.getElementById("input-info-id").flexDirection = "column";
	//}
}

function newRequest() {

	var mobile = window.matchMedia("max-width: 495px");
	mobileV(mobile);

	var title = document.getElementById("title").value;
	title = title.trim();
	title = title.replace(" ","+");

	var author = document.getElementById("author").value;
	author = author.trim();
	author = author.replace(" ","+");

	var isbn = document.getElementById("isbn").value;
	isbn = isbn.trim();
	isbn = isbn.replace("-","");


	var query = ["",title,author,isbn].join("+");
	if (query != "") {

		// remove old script
		var oldScript = document.getElementById("jsonpCall");
		if (oldScript != null) {
			document.body.removeChild(oldScript);
		}
		// make a new script element
		var script = document.createElement('script');

		// build up complicated request URL
		var beginning = "https://www.googleapis.com/books/v1/volumes?q="
		var callback = "&callback=handleResponse"

		script.src = beginning+query+callback	
		script.id = "jsonpCall";

		// put new script into DOM at bottom of body
		document.body.appendChild(script);	
		}


}	
	

function handleResponse(bookListObj) {
	var bookList = bookListObj.items;

	console.log(bookListObj);

	var bookDisplay = document.getElementById("bookDisplay");

	if (bookList == null) {
		var err = document.createElement("div");
		err="The book TITLE by AUTHOR or ISBN number 000-0-00-000000-0 Could not be found. Try another search";
		err.id = "noResults";
		bookDisplay.append(err);
	}
	
	for (i=0; i<bookList.length; i++) {
		var book = bookList[i];
		var title = book.volumeInfo.title;
		var author = book.volumeInfo.authors;
		var titlePgh = document.createElement("div");
		titlePgh.className = "titleClass";
		titlePgh.append(title);
		var descPgh = document.createElement("div");
		descPgh.className = "descClass";

		var authPgh = document.createElement("div");
		authPgh.className = "authClass";
		if (author ==null) {               			
			author='';
			authPgh.append(author);
		}
		else{
			authPgh.append("by " + author);
		}
		
		

		var image = book.volumeInfo.imageLinks.smallThumbnail;
		var img = new Image();
		img.id = "bookImg";
		img.src = image;

		var imgPgh = document.createElement("div");
		imgPgh.className = "imgClass";
		imgPgh.append(img);

		var description = book.volumeInfo.description;
		if (description ==null) {               			
			description='';
			descPgh.append(description);
		}
    	else{
    		description = description.split(" ").slice(0,30).join(" ");
    		descPgh.append(description + "...");
    	}
    	

    	// var oneTile = document.createElement("div");
    	// oneTile.id = "oneTile" + i;
    	// bookDisplay.append(oneTile);

		var bookDiv = document.createElement("div");
    	bookDiv.id = "book" + i;
    	bookDiv.className = "individual-book";
    	bookDisplay.append(bookDiv);

    	var bookTile = document.createElement("div");
    	bookTile.id = "tileL" + i;
    	bookDiv.append(bookTile);
    	var imgTile = document.getElementById //poop toot
    	bookTile.append(imgPgh);
    	
    	var bookTile2 = document.createElement("div");
    	bookTile2.id = "tileR" + i;
    	bookDiv.append(bookTile2);
    	

    	document.getElementById("tileL" + i).append(imgPgh);
    	document.getElementById("tileR" + i).append(titlePgh);
    	document.getElementById("tileR" + i).append(authPgh);
    	document.getElementById("tileR" + i).append(descPgh); //"book" + i
    	 //CHANGED

    	// var keepButton = document.createElement("button"); 
    	// keepButton.id = "keepButton"; 
    	// keepButton.onclick = saveTile;

  //   	var t = document.createTextNode("Keep");
		// keepButton.appendChild(t); 
  //   	document.getElementById("book" + i).append(keepButton); 
    	

    	if(i != 0)
    		document.getElementById("book" + i).style.display = "none";

	}	

}

	function deleteTile(){
		var tile = document.getElementById("clone" + (slideCount-1)); 
		tile.style.display = "none";
		slideCount--;
	}

// function deleteTile(){
// 	document.getElementById("book" + currentBook).style.display = "none";
// }

// function deleteTile() {
// 	// var parent = document.getElementById("tilesBigBox");
// 	// var child = document.getElementById("individual-book");
// 	// parent.removeChild(child);
	
// 	var clone = getElementById("individual-book");
// 	clone.style.display = "none";
// };

// function disappear() {
// 	var bookDiv = document.getElementById("clone" + currentBook);
// 	bookDiv.style.display = "none";
// }


function saveTile(){

	document.getElementById("search-field").style.padding = "0px 0px 0px 0px";
	document.getElementById("header-title").style.height = "120px"

	var book = document.getElementById("book" + currentBook); 
	var books = document.getElementById("tilesBigBox");

    var clone = book.cloneNode(true); 
  	clone.id = "clone" + slideCount;
  	

  	document.getElementById("backgroundColor").style.backgroundColor = "#DCDCDC";
  	
  	var keepButton = document.createElement("button"); 
    keepButton.id = currentBook; 
    keepButton.className = "deleteTileButt";
    keepButton.onclick = deleteTile; //slideCount clone

    var t = document.createTextNode("X");
	keepButton.appendChild(t); 
    clone.append(keepButton); 

    slideCount++;


    // delButton.onclick = function() {
    // 	document.getElementById("clone"+currentBook).style.display = "none";
    // }

 //    var delButton = document.createElement("button"); 
 //    delButton.id = "delButton";

 //    var t = document.createTextNode("Remove from my Books");
	// delButton.appendChild(t); 
 //    document.getElementById("book" + currentBook).append(delButton); 

	books.appendChild(clone);
	HideOverlay();
    //delButton.onclick = disappear;

}


function ShowOverlay() {
    document.getElementById("overlay").style.display = "flex";

}


function HideOverlay() {
	var removeMe = document.getElementById("bookDisplay");
	while (removeMe.hasChildNodes()) {
    	removeMe.removeChild(removeMe.lastChild);
	}
    document.getElementById("overlay").style.display = "none";
    currentBook = 0;
}

var currentBook = 0;

function overlayDialogRight() {
	var bookDisplay = document.getElementById("bookDisplay");
	if (bookDisplay.childElementCount - 1 > currentBook) {
		document.getElementById("book" + currentBook).style.display = "none";
		document.getElementById("book" + (currentBook + 1)).style.display = "flex";
		currentBook ++;
	} else {
		document.getElementById("book" + currentBook).style.display = "none";
		currentBook = 0;
		document.getElementById("book" + currentBook).style.display = "flex";
	}
}

function overlayDialogLeft() {
	var bookDisplay = document.getElementById("bookDisplay");

	if (currentBook == 0) {
		document.getElementById("book" + currentBook).style.display = "none";
		currentBook = bookDisplay.childElementCount - 1;
		document.getElementById("book" + currentBook).style.display = "flex";
	} else {
		document.getElementById("book" + currentBook).style.display = "none";
		currentBook--;
		document.getElementById("book" + currentBook).style.display = "flex";
	}
}

function changeHeader(){

	var w = parseInt(window.innerWidth);

    if(w <= 500) {
    	return;
    }

	document.getElementById("search-field").style.padding = "0px 0px 0px 0px";
	document.getElementById("header-title").style.height = "120px"


	document.getElementById("search-title").style.display = "none";
	var headerT = document.getElementById("header-title");
	var searcherT = document.getElementById("input-info-id");
	var searchT = document.getElementById("searchButton");
	headerT.append(searcherT);
	headerT.append(searchT);
	document.getElementById("header-title").style.display = "flex";
	document.getElementById("header-title").style.justifyContent = "space-between";
	document.getElementById("input-info-id").style.justifyContent = "space-between";
	//document.getElementById("input-info-id").style.align = "right"; //doesnt work
	document.getElementById("button").style.fontSize="70%";
	document.getElementById("button").style.width="100%";
	document.getElementById("button").style.height="50%";
	document.getElementById("button").style.postition="absolute";
	document.getElementById("button").style.bottom="-5%";
	document.getElementById("searchButton").style.width="13%";
	//document.getElementById("searchButton").style.height="30%";

}


