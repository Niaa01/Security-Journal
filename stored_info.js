var express = require('express');
var app = express();

var users = {
    "user1" : {
        "Username" : "user1" ,
        "Password" : "1234",
        "Journal_Entrys" : [],
        "Reminders": [],
        "Settings" : ["lightgray", "#CE7777", "#2B3A55"],
        "Profilepic" : "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png"
    }
              
}
//Normally this is empty and it gets replaced by the user logging in , but for now we populate it
var user = users.user1



app.use(express.static("Combine"))

app.post('/post', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    var z = JSON.parse(req.query['data'])

    // take the create Journal action and put the journal into the user
    if(z["action"] == 'generateJournal'){
        
            
            
            // user.Journal_Entrys.push(z["entry"])
            
            // console.log(user["Journal_Entrys"])

            var flag = true

            for(var n in user["Journal_Entrys"]){
            
                if(user["Journal_Entrys"][n][0] == z["entry"][0]){
                    
                    flag = false                    
                }
            }

            if(flag){
                user.Journal_Entrys.push(z["entry"])
            
            }

            var jsontext = JSON.stringify({
                'action': z['action'],
                'flag': flag
            });
    
            res.send(jsontext)


            
      
    }
    else if(z["action"] == 'AddJournal'){
        
        var jsontext = JSON.stringify({
            'action': z['action'],
            'journals': user.Journal_Entrys,
        });

        console.log(JSON.parse(jsontext)["action"])
        res.send(jsontext)
    }
    
    else if(z["action"] == 'Login'){
        var usern = z["user"]
        var pass = z["pass"]

        var flag = false

        for (var use in users){
            
            if (users[use]["Username"] == usern){
                console.log(users[use]["Username"])
                if(users[use]["Password"] == pass){
                    flag = true
                    user = users[use]
                }
            }
        }
        var jsontext = JSON.stringify({
            'action': z['action'],
            'flag': flag,
        });
        
        res.send(jsontext)

    }
    
    else if(z["action"] == 'Signup'){
        var usern = z["user"]
        var pass = z["pass"]

        var flag = true

        for (var use in users){
            
            if (users[use]["Username"] == usern){
                    flag = false
                }
            }
        

        if (flag){
            users[usern] = {
                "Username" : usern ,
                "Password" : pass,
                "Journal_Entrys" : [],
                "Reminders": [],
                "Settings" : ["lightgray", "#CE7777", "#2B3A55"],
                "Profilepic" : "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png"
            }

            console.log(users[usern])
        }
        var jsontext = JSON.stringify({
            'action': z['action'],
            'flag': flag,
        });
        
        res.send(jsontext)

    }

    else if(z["action"] == 'Sett'){
        var userset = z["user"]
        var passet = z["pass"]
    
        var flag = true

        
        for (var use in users){

            if (users[use]["Username"] == userset){
                    flag = false
                }
            }
        
        if(flag){
            
            user["Password"] = passet
            if(userset != ""){
                user["Username"] = userset 
                console.log(user["Username"])
            }
        }

        var jsontext = JSON.stringify({
            'action': z['action'],
            'flag': flag,
        });
        
        res.send(jsontext)
    
    }

    else if(z["action"] == 'Customize'){
        
        var num = z["theme"]
        
        if(num == 0){
            user["Settings"] = ["lightgray", "#CE7777", "#2B3A55"]
        }
        else if(num == 1){
            user["Settings"] = ["#E8C4C4", "#8EACD0", "#B0C1DB"]
            
        }
        else if(num == 2){
            user["Settings"] = ["#FCDDB0", "#FF9F9F", "#E97777"]
        }
        else if(num == 3){
            user["Settings"] = ["#FBF7F0", "#D9E400", "#CDC9C3"]
        }



        console.log(user["Settings"])
    }
    
    else if(z["action"] == 'CustomizePage'){
        
        var jsontext = JSON.stringify({
        
            'action': z['action'],
            "back" : user["Settings"][0],
            "top": user["Settings"][1],
            "myBar":user["Settings"][2]
        });
    
        res.send(jsontext)
    }

    else if(z["action"] == 'Profile'){
        user["Profilepic"] = z["theme"]
        // console.log(user["Profilepic"])
    }

    else if(z["action"] == 'Ppic'){
        
        var jsontext = JSON.stringify({
        
            'action': z['action'],
            'url': user["Profilepic"]
        });
        console.log(user["Profilepic"])
        
        res.send(jsontext)
    }

    else if(z["action"] == 'reminder'){
        var min = z["time"]
        var message = z["title"] + ": " + z["notes"]

        setTimeout(function(){
           
            var jsontext = JSON.stringify({
        
                'action': 'reminder',
                'message': message
            });
            console.log(message)
            
            res.send(jsontext)

        },min * 10000)
        

    }

    else if(z["action"]=='delete'){
        for(var n in user["Journal_Entrys"]){
            console.log(user["Journal_Entrys"][n][0])
            if(user["Journal_Entrys"][n][0] == z["journal"]){
                var tr =user["Journal_Entrys"][n][0] == z["journal"]
                
                console.log(tr)

                user["Journal_Entrys"].splice(n,1)
                
                
            }
        } console.log(user["Journal_Entrys"])
    }


}).listen(2000)
console.log("Server is running! (listening on port " +  ")")
// console.log(users["user1"]["Username"])
// console.log(user)




// user.action = 'AddJournal'
// var snduser = JSON.stringify(user)
// res.send(snduser)
    // console.log(snduser)

    console.log(user["Settings"][0])
        console.log(user["Settings"][1])
        console.log(user["Settings"][2])


