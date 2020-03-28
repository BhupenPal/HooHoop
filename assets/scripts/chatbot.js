let chatForm = document.getElementById("chat-form");
let userInput = document.getElementById("user-input");

userInput.addEventListener("input",function(){
  let value = userInput.value

  if(value.length !== 0){
    document.getElementById("Capa_1").setAttribute("fill","#f5bf2b")
  }
  else{
    document.getElementById("Capa_1").setAttribute("fill","#999999")
  }
})
chatForm.addEventListener("submit", createMessage);

let status = "GREETING",
  userEmail = null,
  userOffer = null,
  userPhone = null,
  userVIN = null;
let minValue = parseInt(document.getElementById("minor").value);
let maxValue = parseInt(document.getElementById("major").value);
let count = 1;
let margin = maxValue - minValue;
let deal = parseInt(margin / 10);
let firstDeal = deal;
let coupon = null;

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

let RejectedOffers = [];

let WorseOffer = [
  `I’m sure you can do better, place an offer?`,
  `That’s a worse offer than the one you have made earlier… Please make a better one.`
];

let GreaterOffer = [`Stop playing with me, and hit me up with another offer`];

let AlreadyRejected = [
  `I have already refused that same offer. Please make a better one.`,
  `I already rejected this offer`
];

function createMessage() {

  if (event) {
    event.preventDefault();
  }

  if (status === "GREETING") {
    botReply(Botgreetings[Math.floor(Math.random() * Botgreetings.length)]);
    document.getElementById("accept").onclick = () => {
      userReply("YES");
      showPreferredInputDisplay(false, true, true);
      setTimeout(() => {
        botReply("Are you looking to trade your vehicle?");
        showPreferredInputDisplay(false, true, false);
      }, 700);
      status = "TRADE_VEHICLE";
      return;
    };

    document.getElementById("reject").onclick = () => {
      userReply("NO");
      status = "PITCH_TO_GET_OFFER";
      createMessage();
    };
  }

  if (status === "PITCH_TO_GET_OFFER") {
    showPreferredInputDisplay(false, true, true);
    setTimeout(() => {
      botReply(BotRejected[Math.floor(Math.random() * BotRejected.length)]);
      showPreferredInputDisplay(true, false, false);
      status = "GET_OFFER";
    }, 700);
    return;
  }

  if (status == "GET_OFFER") {
    userOffer = parseInt(userInput.value);
    userReply(userOffer);
    status = "BARGAIN";
  }

  if (status == "BARGAIN") {
    if (userOffer >= minValue && userOffer < maxValue) {
      showPreferredInputDisplay(true, false, true);
      setTimeout(() => {
        botReply(
          "Great, I’ll create a discount code valid for you only and send it via mail, what's your eamil address?"
        );
        deal = userOffer;
        showPreferredInputDisplay(true, false, false);
        status = "GET_EMAIL";
      }, 700);
      return;
    } else if (userOffer >= maxValue) {
      showPreferredInputDisplay(true, false, true);
      setTimeout(() => {
        showPreferredInputDisplay(true, false, false);
        botReply(GreaterOffer[Math.floor(Math.random() * GreaterOffer.length)]);
        status = "GET_OFFER";
      }, 700);
      return;
    } else {
      if(RejectedOffers.includes(userOffer)){
        showPreferredInputDisplay(false, true, true)
        setTimeout(()=>{
          showPreferredInputDisplay(false, true, false)
          botReply(
            AlreadyRejected[Math.floor(Math.random() * AlreadyRejected.length)]
          );
        }, 700)
      } else if(userOffer < Math.max(...RejectedOffers)){
        showPreferredInputDisplay(false, true, true)
        setTimeout(()=>{
          botReply(WorseOffer[Math.floor(Math.random() * WorseOffer.length)]);
          showPreferredInputDisplay(true, false, false)
          status = "GET_OFFER";
        }, 700)
      } else {
        if (deal <= margin) {
          if (deal + firstDeal * 0.5 <= margin) {
            showPreferredInputDisplay(false, true, true)
            deal = parseInt(deal + firstDeal * 0.5);
            RejectedOffers.push(userOffer);
            let BotHaggle = [
              `This is too low, how about a $${deal} coupon`,
              `Sorry, I can’t make a deal. How about $${deal} cash discount right now?`,
              `Sorry, will you Take $${deal} cash discount on this vehicle right now?`,
              `Sorry, not possible. How about $${deal} cash discount?`,
              `Will you Take $${deal} cash discount on this vehicle right now?`
            ];
            setTimeout(()=>{
              botReply(BotHaggle[Math.floor(Math.random() * BotHaggle.length)]);
              showPreferredInputDisplay(false, true, false)
            },700)
          } else {
            let NoDeal = [
                `$${deal} was my last offer, give me yours and I’ll see with my manager.`,
                `We couldn’t reach an agreement today, but don’t worry, my Manager will get back to you ASAP.`
              ];
            botReply(NoDeal[Math.floor(Math.random() * NoDeal.length)]);
            status = "GET_EMAIL"
            return
          }
        }
      }
    }
  }

  if (status == "TRADE_VEHICLE") {
    document.getElementById("accept").onclick = () => {
      userReply("YES");
      showPreferredInputDisplay(false, true, true);
      setTimeout(() => {
        botReply("Can I get your Plate number?");
        showPreferredInputDisplay(true, false, false);
      }, 700);
      status = "GET_VIN_NUM";
      return;
    };

    document.getElementById("reject").onclick = () => {
      userReply("NO");
      showPreferredInputDisplay(false, true, true);
      setTimeout(() => {
        botReply("Sweet, What’s the valid email to reach you?");
        showPreferredInputDisplay(true, false, false);
        status = "GET_EMAIL";
      }, 700);
      return;
    };
  }

  if (status == "GET_VIN_NUM") {
    if (count == 1 || 2) {
      userVIN = userInput.value;
      userReply(userVIN);
      count++;
    }
    if (count == 3) {
      status = "COMMITMENT";
      count = 1;
    }
  }

  if (status === "COMMITMENT") {
    showPreferredInputDisplay(false, true, true);
    setTimeout(() => {
      botReply(
        "We're committed to giving you the fairest price possible for your existing vehicle."
      );
      botReply("What’s the valid email to reach you?");
      showPreferredInputDisplay(true, false, false);
    }, 700);
    status = "GET_EMAIL";
    return;
  }

  if (status == "GET_EMAIL") {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    userEmail = userInput.value;
    if (userEmail.match(mailformat)) {
      userReply(userEmail);
      showPreferredInputDisplay(false, true, true);
      setTimeout(() => {
        botReply("And your phone number please?");
        showPreferredInputDisplay(true, false, false);
      }, 700);
      status = "GET_PHONE";
    } else {
      userReply(userEmail);
      botReply("Please enter a valid E-mail address");
      status = "GET_EMAIL";
    }
  }

  if (status == "GET_PHONE") {
    if (count == 1 || 2) {
      userPhone = userInput.value;
      userReply(userPhone);
      count++;
    }
    if (count == 3) {
      status = "GENERATE_COUPON";
      count = 1;
    }
  }

  if (status == "GENERATE_COUPON") {
    coupon = coupongenerator();
    sendChatDetails();
    botReply(
      `This is your discount code: ${coupon} <br> Offer expires in 24hours.`
    );
    showPreferredInputDisplay(false, false, false);
  }

  return;
}

function coupongenerator() {
  var coupon = "";
  var possible =
    "ASKt1yuiopW2ERTYU3IO1as4dfghj5DFG2zxc6HJklL5Zv7bXCVB8NM6qwe9rnm3QP4";
  for (var i = 0; i < 6; i++) {
    coupon += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return coupon;
}

function airChange() {
  if (userInput.value) {
    document.getElementById("send-air").style.backgroundColor = "yellow";
  } else {
    document.getElementById("send-air").style.backgroundColor = "voilet";
  }
}

function showPreferredInputDisplay(input, buttons, wave) {
  document.getElementById("text-input").style.display = "none";
  document.getElementById("click-input").style.display = "none";
  document.getElementById("wave").style.visibility = "hidden";

  if (input == true) {
    document.getElementById("text-input").style.display = "flex";
    userInput.focus();
  }

  if (buttons == true) {
    document.getElementById("click-input").style.display = "flex";
  }

  if (wave == true) {
    document.getElementById("wave").style.visibility = "visible";
  }
}

function botReply(msgToAdd) {
  let botMessage = document.createElement("div"); //Bot Message
  botMessage.classList.add("form-bot"); 
  botMessage.style.textAlign = "left"

  botMessage.innerHTML = msgToAdd;

  let botimage = document.createElement("img")
  botimage.setAttribute("src","/assets/images/robot.png")
  botimage.style.height = "25px"
  botimage.style.width = "25px"
  botimage.style.marginRight = "5px"

  let botall = document.createElement("div");
  botall.append(botimage)
  botall.append(botMessage)
  botall.style.display = "flex"
  botall.style.margin = "10px 0"

  document.getElementById("toAppend").append(botall);

  document.getElementById("toAppend").scrollTop = document.getElementById(
    "toAppend"
  ).scrollHeight;
}

function userReply(msgToAdd) {
  if (msgToAdd != "") {
    let userMessage = document.createElement("div"); //Bot Message
    userMessage.classList.add("form-user");

    userMessage.innerHTML = msgToAdd;

    document.getElementById("toAppend").append(userMessage);

    document.getElementById("toAppend").scrollTop = document.getElementById(
      "toAppend"
    ).scrollHeight;

    chatForm.reset();
  }
}

function sendChatDetails() {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", `/chatbot/submit`, true);
  xhr.setRequestHeader("Content-Type", "application/json");

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

  var tod = new Date();
  var tom = new Date(tod.getTime() + (24 * 60 * 60 * 1000)).toUTCString();
  tod = tod.toUTCString();
  tod = tod.split(' ').slice(0, 4).join(' ');
  tom = tod.split(' ').slice(0, 4).join(' ');

  var discountDetails = { "email": `${userEmail}`, 
                          "phoneNo": `${userPhone}`, 
                          "discount": `${deal}`, 
                          "CouponCode":  `${coupon}`, 
                          "carID": `${userVIN}`, 
                          "tod": `${tod}`, 
                          "tom": `${tom}`
                        };

  xhr.send(JSON.stringify(discountDetails));
}

createMessage();



  let openbot = document.querySelector(".chatbox_closed")
  let closebot = document.querySelector(".chatbox_opened")
  let botcloser = document.querySelector(".botcloser")
  let botencloser = document.querySelector(".chatbot_encloser")

  openbot.onclick = function(){
    openbot.style.transform = "translateY(10vh)"
    openbot.style.visibility = "hidden"
    openbot.style.opacity = "0"

    botencloser.style.zIndex = "9999"
    closebot.style.display = "flex"

    document.getElementsByTagName("html")[0].style.overflow = "hidden"
  }

  botcloser.onclick = function(){
    
    botencloser.removeAttribute("style")
    closebot.style.display = "none"

    openbot.style.transform = "translateY(0vh)"
    openbot.style.visibility = "visible"
    openbot.style.opacity = "1"

    document.getElementsByTagName("html")[0].removeAttribute("style")
  }

