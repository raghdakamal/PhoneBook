var userName=document.getElementById("userName");
var phone=document.getElementById("userphone");
var Email=document.getElementById("usermail");
var tableBody=document.getElementById("table-body");

var users=[];

//first function called on load of window(when i refresh browser)
window.onload=function(){
    //get data from local storage
    //using parse to convert from string to array
    users=JSON.parse(localStorage.getItem('users'));//first time will be null
    
    if(users!==null)
	{
        displayData();
    }
    else{
        users=[];
    }
   // console.log(users)
}

function addUser(){
    var user={
        name:userName.value,phone:phone.value,Email:Email.value
    }
    users.push(user);
    //using stringfy to convert array to string 
    localStorage.setItem("users",JSON.stringify(users));//set users array as string in local storage 
    displayData();
    clearForm()
}

function deleteUser(id){
    // remove from user array
    users.splice(id, 1); 
    //using stringfy to convert array to string 
    localStorage.setItem("users",JSON.stringify(users));//set users array as string in local storage 
    displayData();
    clearForm()
}

function displayData()
{
    var trs="";
    for(var i=0;i<users.length;i++){
    trs+="<tr><td>"+users[i].name+"</td><td>"+users[i].phone+"</td><td>"+users[i].Email+"</td><td><button class='btn btn-danger my-3' onclick='deleteUser("+i+")'>Delete user</button></td></tr>";
}
    tableBody.innerHTML=trs;

}

/*how to clear form data after adding to table*/
function clearForm(){
    var inputs=document.getElementsByTagName("input");
    for(var i=0;i<inputs.length;i++){
      inputs[i].value=""
    }
}


function searchContact()
{
	var search = document.getElementById("search").value;
	var searchInput = search.split("",search.length);
	var searchResult=[];
	users=JSON.parse(localStorage.getItem('users'));
	for(var x=0;x<searchInput.length;x++)
	{
		searchResult=[];
		for(var y=0;y<users.length;y++)
		{
			var sliceUser=users[y].name.split("",x+1);
			var sliceUserString=sliceUser.join("");
			var searchInputString=searchInput.join("");
			if(sliceUserString==searchInputString)
			{
			   	searchResult.push(y);
			}
		}
	}
	if(searchResult=="" && search=="")
	{
		displayData();
	}
	else if(searchResult=="" && search!="")
	{
		tableBody.innerHTML="NoData";
	}
	else
	{
		displaySearch(searchResult);
	}
}


function displaySearch(searchResult)
{
    var trs="";
    for(var i=0;i<searchResult.length;i++)
	{
		var z=searchResult[i];
		trs+="<tr><td>"+users[z].name+"</td><td>"+users[z].phone+"</td><td>"+users[z].Email+"</td><td><button class='btn btn-danger my-3' onclick='deleteUser("+z+")'>Delete user</button></td></tr>";
	}
    tableBody.innerHTML=trs;
}




















