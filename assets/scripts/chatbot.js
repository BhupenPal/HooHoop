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
let userEmail = null;
let userOffer = null;
let message = 2;
let minValue = parseInt(document.getElementById('minor').value);
let maxValue = parseInt(document.getElementById('major').value);
let margin = maxValue - minValue;
let deal = margin/10;

let Botgreetings = [`Hi, I'am bargainator! Would you like a $${deal} discount?`, `Hello, I'am bargainator! Would you like a $${deal} discount?`];

let BotRejected = [];

let RejectedOffers = [];

let BotHaggle = [`Hi ${name}`,"Do you think 10% work for you ?","what about 15% discount ?",
"Let's see whats in your mind",`Lets seal the deal on ${deal}`,"no can't do it, thats too less to be called an offer",
"I am not going to giveaway this vehicle","My boss will go bankrupt if you gives offers like that"
];

function createmessage(){

    if(status === "GREETING"){
        botReply(Botgreetings[Math.floor(Math.random()*Botgreetings.length)])

        document.getElementById('confirm').onclick = () => {
            userReply('YES')
            status = "DEAL_DONE"
            document.getElementById('reject').style.display = 'none';
            document.getElementById('confirm').style.display = 'none';
            document.getElementsByClassName('input-field')[0].style.display = 'flex'
            createmessage();
        }

        document.getElementById('reject').onclick = () => {
            userReply('NO')
            status = "PITCH_TO_GET_OFFER"
            document.getElementById('reject').style.display = 'none';
            document.getElementById('confirm').style.display = 'none';
            document.getElementsByClassName('input-field')[0].style.display = 'flex'
            createmessage();
        }
        return
    }

    if(status === "PITCH_TO_GET_OFFER"){
        botReply("Make me an offer, I can't refuse ")
        status = "GET_OFFER";
        return
    }

    if(status === "GET_OFFER"){
        userOffer = parseInt(document.getElementById('inputContainer').value);
        userReply(userOffer)
        status = "BARGAIN"
    }

    if(status === "BARGAIN"){
        // && userOffer < maxValue
        if(userOffer >= minValue){
            botReply("Great we have a deal, I'll send you a coupon code on your mail")
            status = "GET_EMAIL"
        }else{
            if(RejectedOffers.includes(userOffer)){
                botReply('I already rejected this offer')
            } else {
                if(deal <= margin){
                    if(message*deal <= margin){
                        deal = message*deal;
                        message++;
                    }
                }
                RejectedOffers.push(userOffer)
            }
            botReply("This is too low" + ` How about an $${deal} coupon`)
            document.getElementById('reject').style.display = 'block';
            document.getElementById('confirm').style.display = 'block';
            document.getElementsByClassName('input-field')[0].style.display = 'none'
        }
        return
    }

    if(status === "DEAL_DONE"){
        botReply("Great, I’ll create a discount code valid for you only and send it via mail, what's your eamil address?")
        status = "GET_EMAIL"
        return
    }

    if(status = "GET_EMAIL"){
        userEmail = document.getElementById('inputContainer').value;
        userReply(userEmail)
        status = "DONE"
    }

    if(status == "DONE"){
        botReply("Your coupon code has been send to your Email")
        document.getElementById('reject').style.display = 'none';
        document.getElementById('confirm').style.display = 'none';
        document.getElementsByClassName('input-field')[0].style.display = 'none'
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
    
    const couponDetails = `{"email": ${userEmail}, "CouponCode":  ${couponCode}, "carID": ${carID}}`
    xhr.send();
  }

createmessage();