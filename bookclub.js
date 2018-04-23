function newRequest() {

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

	/* where to put the data on the Web page */ 
	var bookDisplay = document.getElementById("bookDisplay");

	/* write each title as a new paragraph */
	for (i=0; i<bookList.length; i++) {
		var book = bookList[i];
		var title = book.volumeInfo.title;
		var author = book.volumeInfo.authors;
		var titlePgh = document.createElement("p");
		var descPgh = document.createElement("p");
		var authPgh = document.createElement("p");
		/* ALWAYS AVOID using the innerHTML property */
		var image = book.volumeInfo.imageLinks.smallThumbnail;
		var img = new Image();
		img.src = image;
		bookDisplay.append(img);

		var description = book.volumeInfo.description;
		if (description ==null) {               			//THIS IS BROKEN
			description='No description found';
		}
    	
    	description = description.split(" ").slice(0,30).join(" ");
    	

		titlePgh.textContent = title;
		authPgh.textContent = author;
		descPgh.textContent = description;
		bookDisplay.append(titlePgh);
		bookDisplay.append(authPgh);
		bookDisplay.append(descPgh);

	}	


}