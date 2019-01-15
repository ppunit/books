//to store book data
var booksJsonObject = "";
//to store the user name
var username = "";
//to display the books in the book section

$(document).ready(function(){
    $('#fixedcontainer').hide();
    $('#login-popup').show();
    $('#search').keyup(function (event) {
        var searchText = document.getElementById('search').value;
        console.log(searchText);
        getbooks(searchText);
    })
    $('.register-button').on('click',function(event){
        $('#register-popup').show();
        $('#login-popup').hide();
    
    })
    $('.login-button').on('click',function(event){
        $('#login-popup').show();
        $('#register-popup').hide();
    
    })
})

function getbooks(title) {
    console.log(title);
    var url = 'http://localhost:7777/books/api/bookstore?search=' + title;
    var request = new Request(url, {
        headers: {
            "Content-Type": "application/json",
            // "Accept": "application/json",

        },

        method: 'GET',
    })
    fetch(request)
        .then(res => res.json())
        .then(json => {
            console.log(json)
            var output = "";
            booksJsonObject = json;
            if (json == "409") {
                $('#books').empty();
                output += `<p>"No Books Found"</p> `

            } else {
                $('#books').empty();
                $.each(json, function (i) {


                    
                     output += `<div>
                     <img src=${json[i].image} />
                      <select id=${json[i].isbn} class="bookselect">
                      <option>Add to list</option>
                      <option   value="0" >wantToRead</option>
                      <option  value="1">reading</option>
                      <option  value="2" >read</option>
                      </select>
                      </div>`


                });
            }
            $('#books').append(output);

           
                $('.bookselect').on('change', function (event) {
                    console.log(event.target.value)
                    var isbn = event.target.id;
                    console.log(event.target.id)
                    if (event.target.value == 0) {
                        deletebookFromTheSection(isbn,username,"reading");
                        deletebookFromTheSection(isbn,username,"read");
                        postBookTOSection(isbn, "wantToRead");


                    }
                    if (event.target.value == 1) {
                        deletebookFromTheSection(isbn,username,"wantToRead");
                        deletebookFromTheSection(isbn,username,"read");
                        postBookTOSection(isbn, "reading");

                        getUserData(username, "reading")
                    }
                    if (event.target.value == 2) {
                        deletebookFromTheSection(isbn,username,"reading")
                        deletebookFromTheSection(isbn,username,"wantToRead");
                        postBookTOSection(isbn, "read");

                        getUserData(username, "read")

                    }

                })


            



        }).catch(error => console.error(error))

}


//to get the book id from book section and posting to the particular user section
function postBookTOSection(isbn, listType) {
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
            if (json == 200)
                getUserData(username, `${listType}`)
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
            var listArray=[];
            for(let i in booksJsonObject){
                if(json.includes(booksJsonObject[i].isbn)){
                    listArray.push(booksJsonObject[i]);
                    output += `<div>
                    <img src=${booksJsonObject[i].image} />
                     <button id=${booksJsonObject[i].title}   data-book-isbn=${booksJsonObject[i].isbn} class="deletebook">DELETE</button>
                    </div>`
                }
            }
            console.log(listArray);
            /*for (let isbn in json) {

                for (let book in booksJsonObject) {

                    if (json[isbn] == booksJsonObject[book].isbn) {
                        
                        output += `<div>
                     <img src=${booksJsonObject[book].image} />
                      <button id=${booksJsonObject[book].title}   data-book-isbn=${booksJsonObject[book].isbn} class="deletebook">DELETE</button>
                     </div>`
                    }
                };*/
            //};
            $(`#${listType}`).append(output);
            
                $('.deletebook ').on('click', function (event) {
                    var isbn=$(this).attr('data-book-isbn');

                    deletebookFromTheSection(isbn, username, listType)
                    //console.log(event.target.id)


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
            if (json == "200") {
                $('#fixedcontainer').show();
                getbooks("");
                // searchbook();
                getUserData(userName, "wantToRead");
                getUserData(userName, "reading");
                getUserData(userName, "read");
                $('#login-popup').hide();
                $('.logout-button').show();
                $('.login-button').hide();
                $('.register-button').hide();
                $('.searchbar input').show();
            } else {
                {
                    $('#user-not-exist').show();


                }
            }

        })
        .catch(error => console.error(error))
}


//USER REGISTRATION PART IF IT IS PRESENT IT SHOWS EROR ELSE IT WILL UPDATE THE DATABASE
function userRegister() {

    var userName = document.getElementById('loginid2').value;


    var url = 'http://localhost:7777/user-register/api/register';

    var request = new Request(url, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            
        }, 
        body: JSON.stringify({
            'username': userName
        }),
        method: 'POST',
    })
    fetch(request)
        .then(res => res.json())
        .then(json => {
            console.log(json)
            if (json == "409") {


                $('#register-unsuccessful').show();
                $('#register-successful').hide();

            } else {
                $('#register-unsuccessful').hide();
                $('#register-successful').show();
            }

        })
        .catch(error => console.error(error))
}

function logout() {
    //location.reload();
     booksJsonObject = "";
//to store the user name
     username = "";
     $('#fixedcontainer').hide();
     $('#login-popup').show();
     $('#search').hide();
     $('.logout-button').hide();

}