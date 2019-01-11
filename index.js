var booksJsonObject = "";

var username="";
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
                $('.bookselect').on('change',function(event){
                    console.log(event.target.value)
                    var isbn=event.target.id;
                    console.log(event.target.id)
                    if(event.target.value==0)
                    {
                        
                       postwantToRead(isbn,"wantToRead");  
                    }
                    if(event.target.value==1)
                    {
                       postwantToRead(isbn,"reading");  
                    }
                    if(event.target.value==2)
                    {
                       postwantToRead(isbn,"read");  
                    }
                   
                })
               
                 
            })
            
            
           
        }).catch(error => console.error(error))
        
}
function postwantToRead(isbn,listType) {
    //console.log(isbn+" "+listType);
    
   var url = `http://localhost:7777/userbooks/list/${listType}`;
    console.log(url);

    var request = new Request(url, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "username":username
        },
        body: JSON.stringify({
            "isbn":isbn
        }),
        method: 'POST',
    })
   // console.log(username);
    fetch(request)
        .then(res => console.log(res))
        // .then(json => {
        //     //json=json[0];
        //      console.log(JSON.stringify(json));
            
            
           
        .catch(error => console.error(error))
        
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
                        output += '<div><img src= "' + booksJsonObject[book].image + '" ><button id="' + booksJsonObject[book].isbn + '" class=\"deletebook\">DELETE</button></div>'
                }};
            };
            $('#wantToRead').append(output);
            $(document).ready(function () {
                $('.deletebook').on('click',function(event){
                 
                    var isbn=event.target.id;
                    //console.log(event.target.id)
                    deletebookFromTheSection(isbn,username,'wantToRead',1)
                   
                })
            })
               


        }).catch(error => console.error(error))
}


//DELETE BOOK FROM THE SECTION
function deletebookFromTheSection(isbn,username,listType,value){
   var url = `http://localhost:7777/userbooks/list/${listType}`;
    var output = "";
    var request = new Request(url, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "username": username
        },
        body: JSON.stringify({
            "isbn":isbn
        }),
        method: 'DELETE',
    })
    fetch(request)
        .then(res => res.json())
        .then(json => {
            $(`#${listType}`).empty();
           if(value==1)
            wantToRead(username);
            if(value==2)
            reading(username);
            if(value==3) 
            read(username);
            
            
            
            

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
                        output += '<div><img src= "' + booksJsonObject[book].image + '" ><button id="' + booksJsonObject[book].isbn + '" class=\"deletebook\">DELETE</button></div>'
                }};
            };
            $('#reading').append(output);
            $(document).ready(function () {
                $('.deletebook').on('click',function(event){
                 
                    var isbn=event.target.id;
                    //console.log(event.target.id)
                    deletebookFromTheSection(isbn,username,'reading',2)
                   
                })
            })


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
                        output += '<div><img src= "' + booksJsonObject[book].image + '" ><button id="' + booksJsonObject[book].isbn + '" class=\"deletebook\">DELETE</button></div>'
                }};
            };
            $('#read').append(output);
            $(document).ready(function () {
                $('.deletebook').on('click',function(event){
                 
                    var isbn=event.target.id;
                    //console.log(event.target.id)
                    deletebookFromTheSection(isbn,username,'read',3)
                   
                })
            })


        }).catch(error => console.error(error))
}





function userLogin() {
    
    var userName = document.getElementById('loginid1').value;
    username=userName;

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