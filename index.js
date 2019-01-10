var booksJsonObject = "";

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


                output += '<div><img src= "' + json[i].image + '" ><select id="post"><option id= "' + json[i].isbn + '" value="' + 0 + '" >wanttoread</option><option id= "' + json[i].isbn + '" value="' + 1 + '">reading</option><option id= "' + json[i].isbn + '" value="' + 2 + '" >read</option></select></div>'
              
           
            });
            $('#book').append(output);
            let id = post;
            $(document).ready(function () {
                $(id).on("onchange",function() {
                    //console.log('option:selected').attr("id")
                    //alert($(this).data('id'));
                    alert("hii");
                })
                
            })
            
            
           
        }).catch(error => console.error(error))
        
}

function wantToRead(username) {
    var url = 'http://localhost:7777/userbooks/list/wantToRead';
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
        
            json=json.wantToRead;
            $('#wantToRead').empty();
            for(let isbn in json) {
                
                for(let book in booksJsonObject)
               {
                    
                    if (json[isbn] == booksJsonObject[book].isbn){
                        //console.log()
                        output += '<div><img src= "' + booksJsonObject[book].image + '" ><select><option >wanttoread</option><option >reading</option><option >read</option></select></div>'
                }};
            };
            $('#wantToRead').append(output);


        }).catch(error => console.error(error))
}
function reading(username) {
    var url = 'http://localhost:7777/userbooks/list/reading';
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
            $('#reading').empty();
            json=json.reading;
            for(let isbn in json) {
                
                for(let book in booksJsonObject)
               {
                    
                    if (json[isbn] == booksJsonObject[book].isbn){
                        //console.log()
                        output += '<div><img src= "' + booksJsonObject[book].image + '" ><select><option >wanttoread</option><option >reading</option><option >read</option></select></div>'
                }};
            };
            $('#reading').append(output);


        }).catch(error => console.error(error))
}
function read(username) {
    var url = 'http://localhost:7777/userbooks/list/read';
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
            $('#read').empty();
            json=json.read;
            for(let isbn in json) {
                
                for(let book in booksJsonObject)
               {
                    
                    if (json[isbn] == booksJsonObject[book].isbn){
                        //console.log()
                        output += '<div><img src= "' + booksJsonObject[book].image + '" ><select><option >wanttoread</option><option >reading</option><option >read</option></select></div>'
                }};
            };
            $('#read').append(output);


        }).catch(error => console.error(error))
}





function userLogin() {
    var userName = document.getElementById('loginid1').value;
    

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
            wantToRead(userName)
            reading(userName)
            read(userName)

        })
        .catch(error => console.error(error))
}

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