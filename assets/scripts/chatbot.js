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
let current = 0;
let minor = document.getElementById('major').value - document.getElementById('minor').value
let disc = (minor / document.getElementById('major').value)*100;

let Botgreetings = ["Hi, I'am bargainator! Would you like a 10% discount", "Hello, I'am bargainator would you like a 10% discount"];

let BotRejected = [];

let BotDiscount = [];

let BotHaggle = [`Hi ${name}`,"Do you think 10% work for you ?","what about 15% discount ?",
"Let's see whats in your mind",`Lets seal the deal on ${deal}`,"no can't do it, thats too less to be called an offer",
"I am not going to giveaway this vehicle","My boss will go bankrupt if you gives offers like that"
];

function createmessage(){

    if(status === "GREETING"){
        botReply(Botgreetings[Math.floor(Math.random()*Botgreetings.length)])
        document.getElementById('opt-buttons').style.display = 'none'
        status = "BARGAIN"

        document.getElementById('opt-buttons').style.display = 'block';
        document.getElementsByClassName('input-field')[0].style.display = 'none';
        return
    }

    // if(status === "ASK_CONFIRMATION"){
    //     document.getElementById('confirm').onclick = () => {
    //         userReply('YES')
    //         status = "BARGAIN"
    //         createmessage();
    //     }

    //     document.getElementById('reject').onclick = () => {
    //         userReply('NO')
    //         botReply('Just let me know if you change your mind')
    //         status = "MINDCHANGE_CHECK"
    //         document.getElementById('confirm').innerHTML = "I changed my mind, give me an offer"
    //         document.getElementById('reject').style.display = 'none';
    //         createmessage();
    //     }
    // }

    if(status === "BARGAIN"){
        if(message <= 5){
            botReply(message)
            message++
        }
    }

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

function sendChatDetails(){
    
    const xhr = new XMLHttpRequest();
  
    xhr.open("POST", `http://localhost:8080/chatbot/submit`, true);
    xhr.getResponseHeader("content-type", "application/json")
  
    xhr.onprogress = function() {
      console.log("On progress");
    };
  
    xhr.onload = function() {
      if (this.status === 200) {
        console.log('Successfull');
      } else {
        console.log("Some error occured");
      }
    };
    
    const couponDetails = `{"Name": ${userName}, "email": ${userEmail}, "userPhone": ${userPhone}, "CouponCode":  ${couponCode}, "carID": ${carID}}`
    xhr.send();
  }

createmessage();

document.getElementsByClassName("input-field")[0].addEventListener("submit", createmessage)