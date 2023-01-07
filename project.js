// const express = require("express");

var url = "http://localhost:2000/post";

// login page
function login(){
  
  var usern = document.getElementById("user").value
  var pass = document.getElementById("pass").value
  
  $.post(
    url+'?data='+JSON.stringify({

    'action':'Login',
    "user" : usern,
    "pass": pass

    }),
    response
);

}

function signup(){
  var usern = document.getElementById("user").value
  var pass = document.getElementById("pass").value
  
  $.post(
    url+'?data='+JSON.stringify({

    'action':'Signup',
    "user" : usern,
    "pass": pass

    }),
    response
);

}

// side bar

function openBar() {
  document.getElementById("myBar").style.width = "250px";
  document.getElementById("mainContent").style.marginLeft = "250px";
}

function closeBar() {
  document.getElementById("myBar").style.width = "0";
  document.getElementById("mainContent").style.marginLeft= "0";
}

// In the journal entry, you have nested lists, [Reflection title, Journal entry , Key points, Authors note, Readers note, color]

// Submit Journal into the data
function SubmitJ(){
   
    // check if the journal already exists   (do this later)
    var check = true
    
    // for (entry of journalentry){
    //     if ( entry[0] ==  document.getElementById("Reflection title").value){
    //         check = false
    //     }
    // }

    if (check){
        
        var journal =  []
        
        journal.push(document.getElementById("Reflectiontitle").value)
        journal.push(document.getElementById("journalentry").value)
        journal.push(document.getElementById("Keypoints").value) 
        journal.push(document.getElementById("authornote").value)
        
        journalentry += journal


        if (document.getElementById("red").checked == true){
            journal.push("Red")
          
            $.post(url+'?data='+JSON.stringify({
                "entry": journal,
                'action':'generateJournal'
            }), response)

            
        }

        else if (document.getElementById("blue").checked == true){
            journal.push("Blue")
            
            $.post(url+'?data='+JSON.stringify({
              "entry": journal,
              'action':'generateJournal'
          }))
        }

        else if (document.getElementById("yellow").checked == true){
          journal.push("Yellow")
          
          $.post(url+'?data='+JSON.stringify({
            "entry": journal,
            'action':'generateJournal'
        }))
      }

      else {
        journal.push("Green")
        
        $.post(url+'?data='+JSON.stringify({
          "entry": journal,
          'action':'generateJournal'
      }))


    }

    }

    

}

function uncheckbtns(obj) {
  var box = document.getElementsByClassName("chck");
  for (var i = 0; i < box.length; i++) {
    box[i].checked = false;
  }
  obj.checked = true;
}

// asks the server to send the info to create the books
function addjournaltopage(){
  $.post(
    url+'?data='+JSON.stringify({

    'action':'AddJournal',
    "trial" : "helloooo"

    }),
    response
);
}


// creates the buttons that lead to each journal
function createJbutton(journal){
    
    var btn = document.createElement("button")
    btn.id = "Journals"
    // btn.innerText =journal[0]
    
    if(journal[4] == "Red") {
      btn.id = "JournalsRED"
      btn.innerHTML =  journal[0]
    }
    else if(journal[4] == "Blue"){
      btn.id = "JournalsBLUE"
      btn.innerHTML =  journal[0]
    }
    else if(journal[4] == "Yellow"){
      btn.id = "JournalsYELLOW"
      btn.innerHTML =  journal[0]
    }
    else{
      btn.id = "JournalsGREEN"
      btn.innerHTML =  journal[0]
    } 

    var deletebtn = document.createElement("button")
    deletebtn.innerHTML = "delete"
    deletebtn.id = "deleteJournals"
    deletebtn.addEventListener("click", function(){
      deletejournal(journal[0])
      
    })

    // var deldiv = document.createElement("div")
    // deldiv.id = "dele"
    
    btn.addEventListener("click", function(){
      document.getElementById("Rtitle").innerHTML = journal[0]
      document.getElementById("JEntry").innerHTML = journal[1]
      document.getElementById("kpoint").innerHTML = journal[2]
      document.getElementById("anote").innerHTML = journal[3]
      document.getElementById("deletebtn").innerHTML = ""
      document.getElementById("deletebtn").append(deletebtn)
      // document.getElementById("deletebtn") = deldiv
      
      // document.getElementById("deletebtn").innerHTML = "<button onclick = " + deletejournal(journal[0]) + ">Btn " +
      //  "</button>"
    })
    
    document.getElementById("main").append(btn)
}

// function deletejournal(title){
//   $.post(
//     url+'?data='+JSON.stringify({

//     'action':'delete',
//     "journal" : title

//     })
    
// );
// alert("Journal deleted, refresh page to see")

// }

function deletejournal(title){
  $.post(
    url+'?data='+JSON.stringify({

    'action':'delete',
    "journal" : title

    })
    
);
alert("Journal deleted, refresh page to see")

}


// changes the settings of the user by sending to server
function settings(){
  var usern = document.getElementById("userset").value
  var pass = document.getElementById("passset").value
  var repass = document.getElementById("passreset").value

  if(pass != repass){
    // document.getElementById("setterr").innerhtml = "Passwords don't match"
    alert("passwords don't match")
  }
  else{
    $.post(
      url+'?data='+JSON.stringify({

      'action':'Sett',
      "user" : usern,
      "pass": pass,
    
      }),
      response)
    }  
}

// responds to the requests made to the server
function response(data, status){
  var response = JSON.parse(data);
  
  
  if (response['action'] == "AddJournal"){

    var books = response["journals"]

    var len = books.length
    var i = 0

    while(i < len){

      var bk = books[i]
      // alert(bk)
      createJbutton(bk)

      i += 1
    }
    
  }

  else if (response['action'] == 'generateJournal'){

    if(response['flag']){
      alert("Journal added")
    }
    else{
      alert("Journal title already exists")
    }
  }

  else if (response['action'] == 'Login'){
    
    var ff = response["flag"]
    
    if (ff){
        window.location.href="Project.html";

      }

    else{
      document.getElementById("loginfail").innerHTML = "Wrong username or password, try again"
    }
  }
  else if (response['action'] == 'Signup'){
    
    var ff = response["flag"]
    
    if (ff){
        document.getElementById("success").innerHTML = "Success! You may now log in!";

      }
    else{
      document.getElementById("success").innerHTML = "This username is take, try another username";
    }
  }

  else if(response['action'] == 'Sett'){
      var ff = response["flag"]

        if (ff){
          alert("username and password have been changed")
        }
        else{
          alert("Username is taken by another user")
        }
  }

  else if(response['action'] == 'CustomizePage'){
    
    var b = response['back']
    var t = response['top']
    var mb = response['myBar']
    
    document.body.style.background = b
    document.getElementById("top").style.backgroundColor= t
    document.getElementById("myBar").style.backgroundColor= mb
    
  }
  
  else if (response['action'] == 'Ppic'){
    document.getElementById("profilepic").src = response["url"]
  }
  else if (response['action'] == 'reminder'){
      // alert(response['message'])

      alertremider(response['message'])
  }


}

// profile picture 
function profilePicture(num){
	var im = document.getElementById("pfp");
	switch (num) {
		case 0:
			im.src="https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png";
      
      $.post(
        url+'?data='+JSON.stringify({

          'action':'Profile',
          "theme" : "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png"
        })
        
        ) 
			break;
		case 1:
			im.src="https://cdn.pixabay.com/photo/2022/01/11/19/43/avocado-6931344_1280.jpg";
      $.post(
        url+'?data='+JSON.stringify({

          'action':'Profile',
          "theme" : "https://cdn.pixabay.com/photo/2022/01/11/19/43/avocado-6931344_1280.jpg"
        })
        
        ) 
			break;
		case 2:
			im.src="https://cdn.pixabay.com/photo/2018/05/26/18/06/dog-3431913_1280.jpg";
      $.post(
        url+'?data='+JSON.stringify({

          'action':'Profile',
          "theme" : "https://cdn.pixabay.com/photo/2018/05/26/18/06/dog-3431913_1280.jpg"
        })
        
        ) 
			break;
		case 3:
			im.src="https://cdn.pixabay.com/photo/2017/11/06/18/30/eggplant-2924511_1280.png";
      $.post(
        url+'?data='+JSON.stringify({

          'action':'Profile',
          "theme" : "https://cdn.pixabay.com/photo/2017/11/06/18/30/eggplant-2924511_1280.png"
        })
        
        ) 
			break;
	}
}

function placePpic(){
  $.post(
    url+'?data='+JSON.stringify({

    'action':'Ppic',

    }),
    response
  );

}

// Customization
function theme(num){
  
  if(num == 0){
        
    (document.body.style.background = "lightgray",
      document.getElementById("top").style.backgroundColor= "#CE7777",
      document.getElementById("myBar").style.backgroundColor= "#2B3A55")
    
          $.post(
          url+'?data='+JSON.stringify({

            'action':'Customize',
            "theme" :  0
          })
          
          ) 
  }

  else if(num == 1){
    ( document.body.style.background = "#E8C4C4",
        document.getElementById("top").style.backgroundColor = "#8EACD0",
        document.getElementById("myBar").style.backgroundColor= "#B0C1DB")


        $.post(
          url+'?data='+JSON.stringify({
      
            'action':'Customize',
            "theme" :  1
          })
          
              )
  }

  else if(num == 2){
    ( document.body.style.background = "#FCDDB0",
        document.getElementById("top").style.backgroundColor = "#FF9F9F",
        document.getElementById("myBar").style.backgroundColor= "#E97777")


        $.post(
          url+'?data='+JSON.stringify({
      
            'action':'Customize',
            "theme" :  2
          })
          
              )
  }

  else if(num == 3){
    ( document.body.style.background = "#FBF7F0",
        document.getElementById("top").style.backgroundColor = "#D9E400",
        document.getElementById("myBar").style.backgroundColor= "#CDC9C3")


        $.post(
          url+'?data='+JSON.stringify({
      
            'action':'Customize',
            "theme" :  3
          })
          
              )
  }
}


function customizepage(){
  $.post(
    url+'?data='+JSON.stringify({

    'action':'CustomizePage',

    }),
    response
  );

}

// add reminder buttons

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}





function alertremider(m){
  // var alrt = title + ":" + notes
  // var title = document.getElementById("remtitle").value
  
  // var notes = document.getElementById("remnotes").value

  
  prompt(m)
  
}


function reminder(){

  var title = document.getElementById("remtitle").value
  var time = document.getElementById("remtime").value
  var notes = document.getElementById("remnotes").value

  // setTimeout(function(){
  //   var title = document.getElementById("remtitle").value
  //   alert(title + ": " + notes ) 
  // }, (time *1000)
  // )

  $.post(
    url+'?data='+JSON.stringify({

    'action':'reminder',
    "title" : title,
    "time": time,
    "notes": notes

    }),
    response)


}





window.onload = function() {
    
  addjournaltopage()

  customizepage()

  placePpic()
     
  }

  