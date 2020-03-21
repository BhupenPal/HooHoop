function chatbotopener() {
  let x = document.getElementsByClassName("unOpened")[0];
  let y = document.getElementsByClassName("opened")[0];
  x.style.transform = "translateY(10vh)";
  x.style.opacity = "0";
  y.style.transform = "translateY(0vh)";
  y.style.opacity = "1";
  y.style.visibility = "visible";
}

function chatbotcloser() {
  let x = document.getElementsByClassName("unOpened")[0];
  let y = document.getElementsByClassName("opened")[0];
  x.style.transform = "translateY(0vh)";
  x.style.opacity = "1";
  y.style.transform = "translateY(10vh)";
  y.style.opacity = "0";
  y.style.visibility = "hidden";
}

function inputtrack() {
  let x = document.getElementById("inputContainer");
  x.addEventListener("input", function(evt) {
    var value = evt.target.value;

    if (value.length !== 0) {
      document.getElementById("sendButton").style.color = "orange";
      return;
    } else {
      document.getElementById("sendButton").style.color = "gray";
    }
  });
}

//Chatbot Functionality
let status = "GREETING";
let userEmail = null;
let userOffer = null;
let userPhone = null;
let userVIN = null;
let message = 2;
let minValue = parseInt(document.getElementById("minor").value);
let maxValue = parseInt(document.getElementById("major").value);
let margin = maxValue - minValue;
let deal = parseInt(margin / 10);
let firstDeal = deal;

let Botgreetings = [
  `Hi, I'am bargainator! Would you like a $${deal} discount?`,
  `Hello, I'am bargainator! Would you like a $${deal} discount?`,
  `Hi! Will you Take $${deal} cash discount on this vehicle right now?`
];

let BotRejected = [
  `Place an offer, I can’t refuse.`,
  `Make me an offer, I can't refuse.`,
  `Ok, fair enough, what’s your counter offer?`,
  `I understand. What do you offer, then?`,
  `What could make it work, then?`,
  `Hit me with your best offer!`
];

let WorseOffer = [
  `I’m sure you can do better, place an offer?`,
  `That’s a worse offer than the one you have made earlier… Please make a better one.`
];

let RejectedOffers = [];

let GreaterOffer = [`Stop playing with me, and hit me up with another offer`];

let AlreadyRejected = [
  `I have already refused that same offer. Please make a better one.`,
  `I already rejected this offer`
];

function createmessage() {
  document.getElementById("inputContainer").focus();
  if (status === "GREETING") {
    botReply(Botgreetings[Math.floor(Math.random() * Botgreetings.length)]);

    document.getElementById("confirm").onclick = () => {
      userReply("YES");
      status = "DEAL_DONE";
      document.getElementById("reject").style.display = "none";
      document.getElementById("confirm").style.display = "none";
      document.getElementsByClassName("input-field")[0].style.display = "flex";
      createmessage();
    };

    document.getElementById("reject").onclick = () => {
      userReply("NO");
      status = "PITCH_TO_GET_OFFER";
      document.getElementById("reject").style.display = "none";
      document.getElementById("confirm").style.display = "none";
      document.getElementsByClassName("input-field")[0].style.display = "flex";
      createmessage();
    };
    return;
  }

  if (status === "PITCH_TO_GET_OFFER") {
    botReply(BotRejected[Math.floor(Math.random() * BotRejected.length)]);
    status = "GET_OFFER";
    return;
  }

  if (status === "GET_OFFER") {
    userOffer = parseInt(document.getElementById("inputContainer").value);
    userReply(userOffer);
    status = "BARGAIN";
  }

  if (status === "BARGAIN") {
    if (userOffer >= minValue && userOffer < maxValue) {
      botReply(
        "Great we have a deal, I'll send you a coupon code on your mail"
      );
      status = "GET_EMAIL";
    } else if (userOffer >= maxValue) {
      botReply(GreaterOffer[Math.floor(Math.random() * GreaterOffer.length)]);
      status = "GET_OFFER";
      return;
    } else {
      if (RejectedOffers.includes(userOffer)) {
        botReply(
          AlreadyRejected[Math.floor(Math.random() * AlreadyRejected.length)]
        );
      } else if (userOffer < Math.max(...RejectedOffers)) {
        botReply(WorseOffer[Math.floor(Math.random() * WorseOffer.length)]);
        status = "GET_OFFER";
        return;
      } else {
        if (deal <= margin) {
          if (deal + firstDeal * 0.5 <= margin) {
            deal = parseInt(deal + firstDeal * 0.5);
            message++;
            RejectedOffers.push(userOffer);
            let BotHaggle = [
              `This is too low, how about a $${deal} coupon`,
              `Sorry, I can’t make a deal. How about $${deal} cash discount right now?`,
              `Sorry, will you Take $${deal} cash discount on this vehicle right now?`,
              `Sorry, not possible. How about $${deal} cash discount?`,
              `Will you Take $${deal} cash discount on this vehicle right now?`
            ];
            botReply(BotHaggle[Math.floor(Math.random() * BotHaggle.length)]);
            document.getElementById("reject").style.display = "block";
            document.getElementById("confirm").style.display = "block";
            document.getElementsByClassName("input-field")[0].style.display = "none";
          } else {
            let NoDeal = [
                `This was my last offer, give me yours and I’ll see with my manager.`,
                `We couldn’t reach an agreement today, but don’t worry, my Manager will get back to you ASAP.`
              ];
            botReply(NoDeal[Math.floor(Math.random() * NoDeal.length)]);
            status = "GET_EMAIL"
            return
          }
        }
      }
    }
    return;
  }

  if(status === "TRADE_VEHICLE"){
    botReply("Do you want to ")
  }

  if (status === "DEAL_DONE") {
    botReply("Great, I’ll create a discount code valid for you only and send it via mail, what's your eamil address?");
    status = "GET_EMAIL";
    return;
  }

  if (status == "GET_EMAIL") {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    userEmail = document.getElementById("inputContainer").value;
    if(userEmail.match(mailformat)){
        userReply(userEmail);
        status = "DONE";
    } else {
        userReply(userEmail)
        botReply('Please enter a valid E-mail address')
        status = 'GET_EMAIL'
    }
  }

  if(status == "GET_PHONE"){
    userPhone = document.getElementById("inputContainer").value;
    userReply(userPhone);
    status == "DONE"
  }

  if (status == "DONE") {
    botReply("Your coupon code has been send to your Email");
    document.getElementById("reject").style.display = "none";
    document.getElementById("confirm").style.display = "none";
    document.getElementsByClassName("input-field")[0].style.display = "none";
  }
}

function botReply(msgToAdd) {
  let botImg = document.createElement("img"); // Bot Image
  botImg.setAttribute("src", "/assets/images/robot.png");

  let botMessage = document.createElement("div"); //Bot Message
  botMessage.classList.add("form-bot");

  botMessage.innerHTML = msgToAdd;

  let botBox = document.createElement("div"); // Bot message inserted in container
  botBox.classList.add("form-bot-box");

  botBox.append(botImg);
  botBox.append(botMessage);
  document.getElementById("toAppend").append(botBox);
  document.getElementById("toAppend").scrollTop = document.getElementById(
    "toAppend"
  ).scrollHeight;
}

function userReply(msgToAdd) {
  let userMessage = document.createElement("div"); //User Mesaage
  userMessage.classList.add("form-user");
  userMessage.innerHTML = msgToAdd;

  let userMsgContain = document.createElement("div"); // User-message inserted in container
  userMsgContain.classList.add("form-user-box");

  userMsgContain.append(userMessage);

  document.getElementById("toAppend").append(userMsgContain);
  document.getElementById("inputContainer").value = "";
  document.getElementById("toAppend").scrollTop = document.getElementById(
    "toAppend"
  ).scrollHeight;
}

function sendChatDetails() {
  const xhr = new XMLHttpRequest();

  xhr.open("POST", `/chatbot/submit`, true);
  xhr.getResponseHeader("content-type", "application/json");

  xhr.onprogress = function() {
    console.log("On progress");
  };

  xhr.onload = function() {
    if (this.status === 200) {
      console.log("Successfull");
    } else {
      console.log("Some error occured");
    }
  };

  const couponDetails = `{"email": ${userEmail}, "CouponCode":  ${couponCode}, "carID": ${carID}}`;
  xhr.send();
}

createmessage();
