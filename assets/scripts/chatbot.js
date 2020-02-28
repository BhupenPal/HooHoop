function chatbotopener(){
    let x = document.getElementsByClassName('unOpened')[0]
    let y = document.getElementsByClassName('opened')[0]
    x.style.transform = "translateY(10vh)"
    x.style.opacity = "0"
    y.style.transform = "translateY(0vh)"
    y.style.opacity = "1"
}

function chatbotcloser(){
    let x = document.getElementsByClassName('unOpened')[0]
    let y = document.getElementsByClassName('opened')[0]
    x.style.transform = "translateY(0vh)"
    x.style.opacity = "1"
    y.style.transform = "translateY(10vh)"
    y.style.opacity = "0"
}

function inputtrack(){
    let x = document.getElementById("inputContainer")
    x.addEventListener('input',function(evt){
        var value = evt.target.value

        if (value.length !== 0) {
            document.getElementById('sendButton').style.color = 'orange';
            return
          }else{
              document.getElementById('sendButton').style.color = 'gray';
          }
    })
}

//Chatbot Functionality
let status = "GREETING";

let message = 0;
let userName = null;
let deal = null;

let Botgreetings = ["Hi, I am Bargain Bot of this Product. May I Know Your Name.",
"Hello, I am here to sell this Vehicle, Whats your name?",
"Hey there, my superior told me to sell this vehicle, may I know your name"
];

let BotHaggle = [`Hi ${name}`,"Do you think 10% work for you ?","what about 15% discount ?",
"Let's see whats in your mind",`Lets seal the deal on ${deal}`,"no can do,thats too less to be called an offer",
"I am not going to giveaway this vehicle","My boss will go bankrupt if you gives offers like that"
];

function createmessage(){
    if(status === "GREETING"){
        botReply(Botgreetings[Math.floor(Math.random()*Botgreetings.length)])
        status = "NAME_ASKED"
        return
    }

    if(status === "NAME_ASKED"){
        userName = document.getElementById('inputContainer').value;
        userReply(userName)
        status = "ASK_CONFIRMATION";            
        botReply(`Hey ${userName}, would you like me to give you an offer`)
    }

    if(status === "ASK_CONFIRMATION"){
        document.getElementById('confirm').onclick = () => {
            userReply('YES')
            botReply(BotHaggle[Math.floor(Math.random()*Botgreetings.length)])
        }

        document.getElementById('reject').onclick = () => {
            console.log('No')
        }
    }
    
    // else if(message == 1){
    //     name = usermessage.innerHTML;
    //     botmessage.innerHTML = Bothaggle[0];
    //     usermessage.innerHTML = document.getElementById("inputContainer").value 
    //     console.log(name)
    //     message++
    // }

    // else if(message == 2){
    //     botmessage.innerHTML = Bothaggle[1]
    //     message++
    // }

    // else if(message == 3){
    //     botmessage.innerHTML = Bothaggle[2]
    //     message++
    // }


    // let ucontain = document.createElement("div") // User-message inserted in container
    // ucontain.classList.add("form-user-box")
    
    // if(usermessage != ""){
    //     ucontain.append(usermessage)
    //     document.getElementById("toAppend").append(ucontain); //Both message inserted in chat body
    // }

    
    // if(botmessage != ""){
    //     bcontain.append(botimg);
    //     bcontain.append(botmessage);
    //     document.getElementById("toAppend").append(bcontain);
    // }

}

function botReply(msgToAdd){

    let botImg = document.createElement('img'); // Bot Image
    botImg.setAttribute("src","/assets/images/robot.png");

    let botMessage = document.createElement("div"); //Bot Message
    botMessage.classList.add("form-bot");

    botMessage.innerHTML = msgToAdd;

    let botBox = document.createElement("div"); // Bot message inserted in container
    botBox.classList.add("form-bot-box");

    botBox.append(botImg);
    botBox.append(botMessage);
    document.getElementById('toAppend').append(botBox);

}

function userReply(msgToAdd){
    
    let userMessage = document.createElement("div"); //User Mesaage
    userMessage.classList.add("form-user");
    userMessage.innerHTML = msgToAdd;

    let userMsgContain = document.createElement("div") // User-message inserted in container
    userMsgContain.classList.add("form-user-box")

    userMsgContain.append(userMessage);

    document.getElementById('toAppend').append(userMsgContain)
    document.getElementById("inputContainer").value = "";
}

createmessage();

document.getElementsByClassName("input-field")[0].addEventListener("submit", createmessage)