

function getData(){
    let get=document.getElementById("data");
    fetch("http://localhost:3000/users")
    .then(response=>response.json())
    .then((data)=>{
        
        for(let temp of data){
            
            var row=document.createElement('tr');
            let c1 = document.createElement("td")
            let c2 = document.createElement("td")
            let c3 = document.createElement("td")
            c1.innerText=temp.id;
            c2.innerText=temp.name;
            c3.innerHTML=`<button onclick=updateData(${temp.id})>EDIT</button><button onclick=deleteData(${temp.id})>DELETE</button>`
            row.appendChild(c1);
            row.appendChild(c2);
            row.appendChild(c3);
            get.appendChild(row);
        }
       
    });
}


function addData(){
    var id=document.getElementById("ID").value
    var name=document.getElementById("NAME").value

    fetch("http://localhost:3000/users",
        {
            method:'POST',
            body:JSON.stringify(
                {
                    "id":id,
                    "name":name
                }
            )
        }
    )
    .then(response=>console.log(response))
    .catch(err=>console.log(err));
    getData();
}


function deleteData(id){
    fetch(`http://localhost:3000/users/${id}`,{
        method:'DELETE'
    })
    .then(response=>response.json())
    .then((data)=>console.log(data));
}

async function updateData(tid){
   
     var name=document.getElementById("NAME").value
     alert(`enter the new values of ${tid}`);
     document.getElementById("ID").value=tid;
     
    await fetch(`http://localhost:3000/users/${tid}`,
        {
            method:'PATCH',
            headers: {
      "Content-Type" : "application/json"
    },
            body:JSON.stringify(
                {
                    "name":name
                }
            )
        }
    )
    .then(response=>console.log(response))
    .catch(err=>console.log(err));
}
