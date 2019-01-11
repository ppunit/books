//to store book data
var booksJsonObject = "";
//to store the user name
var username = "";
//to display the books in the book section
function getbooks() {
    var url = 'http://localhost:7777/books/api/bookstore';

    var request = new Request(url, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",

        },
        method: 'GET',
    })
    fetch(request)
        .then(res => res.json())
        .then(json => {
            // console.log(json)
            var output = "";
            booksJsonObject = json;

            $('#book').empty();
            $.each(json, function (i, val) {


                output += '<div><img src= "' + json[i].image + '" ><select id= "' + json[i].isbn + '" class=\'bookselect\'><option>option</option><option   value="' + 0 + '" >wanttoread</option><option  value="' + 1 + '">reading</option><option  value="' + 2 + '" >read</option></select></div>'


            });
            $('#book').append(output);

            $(document).ready(function () {
                $('.bookselect').on('change', function (event) {
                    console.log(event.target.value)
                    var isbn = event.target.id;
                    console.log(event.target.id)
                    if (event.target.value == 0) {

                        postwantToRead(isbn, "wantToRead");
                        

                    }
                    if (event.target.value == 1) {
                        postwantToRead(isbn, "reading");
                       
                        getUserData(username, "reading")
                    }
                    if (event.target.value == 2) {
                        postwantToRead(isbn, "read");
                        
                        getUserData(username, "read")

                    }

                })


            })



        }).catch(error => console.error(error))

}
function handler() {
    return new Promise((resolve,reject)=>function() {
        
    })
}
//to get the book id from book section and posting to the particular user section
function postwantToRead(isbn, listType) {
    //console.log(isbn+" "+listType);

    var url = `http://localhost:7777/userbooks/list/${listType}`;
    console.log(url);

    var request = new Request(url, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "username": username
        },
        body: JSON.stringify({
            "isbn": isbn
        }),
        method: 'POST',
    })
    // console.log(username);
    fetch(request)
        .then(res => res.json())
        
        .then(json => {
            if(json==200)
            getUserData(username,`${listType}`)
        })

        
        

        .catch(error => console.error(error))

}


function getUserData(username, listType) {
    console.log("Called");
    var url = `http://localhost:7777/userbooks/list/${listType}`;
    var output = "";
    var request = new Request(url, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "username": username
        },
        method: 'GET',
    })
    fetch(request)
        .then(res => res.json())
        .then(json => {

            json = json[[listType]];
            $(`#${listType}`).empty();
            for (let isbn in json) {

                for (let book in booksJsonObject) {

                    if (json[isbn] == booksJsonObject[book].isbn) {
                        //console.log()
                        output += '<div><img src= "' + booksJsonObject[book].image + '" ><button id="' + booksJsonObject[book].isbn + '" class=\"deletebook\">DELETE</button></div>'
                    }
                };
            };
            $(`#${listType}`).append(output);
            $(document).ready(function () {
                $('.deletebook').on('click', function (event) {
                    var isbn = event.target.id;
                    
                    deletebookFromTheSection(isbn, username, listType)
                    //console.log(event.target.id)
                    

                })
            })



        }).catch(error => console.error(error))
}


//DELETE BOOK FROM THE PARTICULAR USER SECTION
function deletebookFromTheSection(isbn, username, listType) {
  
                    
    var url = `http://localhost:7777/userbooks/list/${listType}`;
    var request = new Request(url, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "username": username
        },
        body: JSON.stringify({
            "isbn": isbn
        }),
        method: 'DELETE',
    })
    fetch(request)
        .then(res => res.json())
        .then(json => {
            $(`#${listType}`).empty();
            if (listType === "wantToRead")
                getUserData(username, "wantToRead");
             if (listType === "reading")
                getUserData(username, "reading");
            if (listType === "read")
                getUserData(username, "read");
        }).catch(error => console.error(error))

}
//USER LOGIN AND GETTING THE USER DATA IF IT HAS
function userLogin() {

    var userName = document.getElementById('loginid1').value;
    username = userName;

    var url = 'http://localhost:7777/api/login';

    var request = new Request(url, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            'username': userName
        },
        method: 'POST',
    })
    fetch(request)
        .then(res => res.json())
        .then(json => {
            console.log(json)


            getbooks()
            getUserData(userName, "wantToRead");
            getUserData(userName, "reading");
            getUserData(userName, "read");

        })
        .catch(error => console.error(error))
}


//USER REGISTRATION PART IF IT IS PRESENT IT SHOWS EROR ELSE IT WILL UPDATE THE DATABASE
function userRegister() {
    var userName = document.getElementById('loginid2').value;
    alert(userName);

    var url = 'http://localhost:7777/user-register/api/register';

    var request = new Request(url, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            'username': userName
        },
        method: 'POST',
    })
    fetch(request)
        .then(res => res.json())
        .then(json => console.log(json))
        .catch(error => console.error(error))
}