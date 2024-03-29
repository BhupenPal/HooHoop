let chatForm = document.getElementById("chat-form");
let userInput = document.getElementById("user-input");

userInput.addEventListener("input", function () {
  let value = userInput.value;
  if (value.length !== 0) {
    document.querySelector("#send-air > i").style.color = "#f5bf2b";
  } else {
    document.querySelector("#send-air > i").style.color = "#999999";
  }
});

function showseller(){
  let d = document.querySelector(".sell_hdet")
  let e = document.querySelector(".seldet_btn")

  d.classList.remove("vanish")
  e.classList.add("vanish")

  const xhr = new XMLHttpRequest;
  xhr.open("PATCH", `/click/${window.location.href.split('/')[4]}`, true);
  xhr.send();
}

chatForm.addEventListener("submit", createMessage);

let status = "GREETING",
  userEmail = null,
  userOffer = null,
  userPhone = null,
  userVIN = false,
  NoDealBool = false;
let minValue = parseInt(document.getElementById("minor").value);
let maxValue = parseInt(document.getElementById("major").value);
let discountFor = document.getElementById("vinObjId").value;
let count = 1;
let margin = maxValue - minValue;
let deal = parseInt(margin * 0.55);
let bargainCount = 2;
let firstDeal = deal;
let coupon = null;

let Botgreetings = [
  `Hello there, I’m Albot! If you would like to purchase this vehicle right now, we will offer you a $${deal} discount. Are you happy to accept this?`,
  `Hi I’m Albot, how’s it going? If you are looking at purchasing this vehicle right now, we will offer you a $${deal} discount. Do you accept this offer?`,
  `Howdy, hope you are well! Can I offer you a $${deal} saving on this vehicle if you purchase this vehicle right now?`,
  `Kia Ora, I am Albot! If you would like to purchase this vehicle right now, we will offer you a $${deal} discount. Are you happy to accept this?`,
];

let botpop = [
  `Howdy, I'm Albot! Interested in this vehicle? We will offer you a $${deal} discount, or bargain more...`,
];

let BotRejected = [
  `Okay no worries. Hit me with your best price offer for this vehicle!`,
  `I hear you. How about you try placing me an offer price I cannot refuse….`,
  `No problem! Go ahead and state me a purchase price that I can seriously consider!`,
  `Okay fair enough, what’s your counter-offer price for the vehicle?`,
  `I understand. What would you like to offer for the vehicle?`,
  `Okay, you tell me an offer price for the vehicle that you believe will make it work!`,
  `Let’s try this! Hit me with your best offer for the vehicle!`,
];

let RejectedOffers = [];

let TradeStrings = [
  `Fantastic! \u{1F44D} Are you interested in trading your vehicle in?`,
  `Excellent! \u{1F44D} Are you looking to trade your vehicle?`,
  `Kapai!” \u{1F44D} Are you looking to trade your vehicle?`,
];

let WorseOffer = [
  `I’m sure you can do a little better than that? Please try another offer price for the vehicle.`,
  `That’s a worse offer price than the one you have made earlier… Please make a better one 😊`,
];

let GreaterOffer = [
  `Stop playing with me 😂. Hit me up with another offer price for the vehicle`,
];

let AlreadyRejected = [
  `I have already refused that same price offer. Please make a better one`,
  `I’ve already rejected this price offer” Propose another price offer.`,
];

function createMessage() {
  if (event) {
    event.preventDefault();
    document.querySelector("#send-air > i").style.color = "#999999";
  }

  if (status === "GREETING") {
    botReply(Botgreetings[Math.floor(Math.random() * Botgreetings.length)]);
    document.getElementById("accept").onclick = () => {
      userReply("YES");
      showPreferredInputDisplay(false, true, true);
      DisableInputs(true);
      setTimeout(() => {
        DisableInputs(false);
        botReply(TradeStrings[Math.floor(Math.random() * TradeStrings.length)]);
        showPreferredInputDisplay(false, true, false);
        status = "TRADE_VEHICLE";
        createMessage();
      }, 700);
      return;
    };

    document.getElementById("reject").onclick = () => {
      userReply("NO");
      showPreferredInputDisplay(false, true, true);
      DisableInputs(true);
      setTimeout(() => {
        DisableInputs(false);
        botReply(BotRejected[Math.floor(Math.random() * BotRejected.length)]);
        showPreferredInputDisplay(true, false, false);
        status = "GET_OFFER";
      }, 700);
      return;
    };
  }

  if (status === "GET_OFFER") {
    userOffer = userInput.value;
    userReply(userOffer);
    if (parseInt(userOffer) % 1 == 0) {
      status = "BARGAIN";
    } else {
      if (userOffer.includes("$") && userOffer.split("$")[1] % 1 == 0) {
        userOffer = parseInt(userOffer.split("$")[1]);
        status = "BARGAIN";
      } else {
        showPreferredInputDisplay(true, false, true);
        DisableInputs(true);
        setTimeout(() => {
          DisableInputs(false);
          botReply("Please enter a valid response");
          showPreferredInputDisplay(true, false, false);
          status = "GET_OFFER";
        }, 700);
        return;
      }
    }
  }

  if (status === "BARGAIN") {
    if (userOffer >= minValue && userOffer < maxValue) {
      showPreferredInputDisplay(true, false, true);
      DisableInputs(true);
      setTimeout(() => {
        DisableInputs(false);
        botReply(
          "Great! I’ll create a personalised discount code for you and send it via email. Would you also like to trade your vehicle?"
        );
        deal = maxValue - userOffer;
        showPreferredInputDisplay(false, true, false);
      }, 700);
      status = "TRADE_VEHICLE";
    } else if (userOffer >= maxValue) {
      showPreferredInputDisplay(true, false, true);
      DisableInputs(true);
      setTimeout(() => {
        DisableInputs(false);
        showPreferredInputDisplay(true, false, false);
        botReply(GreaterOffer[Math.floor(Math.random() * GreaterOffer.length)]);
        status = "GET_OFFER";
      }, 700);
      return;
    } else {
      if (RejectedOffers.includes(userOffer)) {
        showPreferredInputDisplay(false, true, true);
        DisableInputs(true);
        setTimeout(() => {
          DisableInputs(false);
          showPreferredInputDisplay(false, true, false);
          botReply(
            AlreadyRejected[Math.floor(Math.random() * AlreadyRejected.length)]
          );
        }, 700);
      } else if (userOffer < Math.max(...RejectedOffers)) {
        showPreferredInputDisplay(false, true, true);
        DisableInputs(true);
        setTimeout(() => {
          DisableInputs(false);
          botReply(WorseOffer[Math.floor(Math.random() * WorseOffer.length)]);
          showPreferredInputDisplay(true, false, false);
          status = "GET_OFFER";
        }, 700);
      } else {
        if (bargainCount <= 4) {
          if (bargainCount == 4) {
            bargainCount++;
            deal = parseInt(margin);
          }

          if(bargainCount == 3) {
            bargainCount++;
            deal = parseInt(margin * 0.8);
          }

          if (bargainCount == 2) {
            bargainCount++;
            deal = parseInt(margin * 0.65);
          } 

          showPreferredInputDisplay(false, true, true);
          RejectedOffers.push(userOffer);
          let BotHaggle = [
            `This is too low, how about a $${deal} discount coupon?`,
            `Sorry, I can’t make a deal currently. How about a $${deal}cash discount right now?`,
            `Sorry, will you take a $${deal}cash discount on this vehicle right now?`,
            `Sorry, unfortunately that is not possible. How about a $${deal}cash discount?`,
            `Will you accept a $${deal}cash discount on this vehicle right now?`,
          ];
          DisableInputs(true);
          setTimeout(() => {
            DisableInputs(false);
            botReply(BotHaggle[Math.floor(Math.random() * BotHaggle.length)]);
            showPreferredInputDisplay(false, true, false);
          }, 700);
        } else {
          let NoDeal = [
            `$${deal} was my last offer, but don’t worry! My Manager will get back to you ASAP. Can I please have your best contact email?`,
            `We couldn’t reach an agreement today, but don’t worry! My Manager will get back to you ASAP. Can I please have your best contact email?`,
          ];
          botReply(NoDeal[Math.floor(Math.random() * NoDeal.length)]);
          NoDealBool = true;
          status = "GET_EMAIL";
          return;
        }
      }
    }
  }

  if (status === "TRADE_VEHICLE") {
    document.getElementById("accept").onclick = () => {
      userReply("YES");
      showPreferredInputDisplay(false, true, true);
      DisableInputs(true);
      setTimeout(() => {
        DisableInputs(false);
        botReply("Can I please get your vehicle plate number?");
        showPreferredInputDisplay(true, false, false);
      }, 700);
      status = "GET_VIN_NUM";
      return;
    };

    document.getElementById("reject").onclick = () => {
      userReply("NO");
      showPreferredInputDisplay(false, true, true);
      DisableInputs(true);
      setTimeout(() => {
        DisableInputs(false);
        botReply("Sweet! What is the best contact email to reach you?");
        showPreferredInputDisplay(true, false, false);
        status = "GET_EMAIL";
      }, 700);
      return;
    };
  }

  if (status == "GET_VIN_NUM") {
    userVIN = userInput.value;
    userReply(userVIN);
    status = "COMMITMENT";
  }

  if (status === "COMMITMENT") {
    showPreferredInputDisplay(false, true, true);
    DisableInputs(true);
    setTimeout(() => {
      DisableInputs(false);
      botReply(
        "We're committed to giving you the fairest price possible for your existing vehicle."
      );
      botReply("What is the best contact email to reach you?");
      showPreferredInputDisplay(true, false, false);
    }, 700);
    status = "GET_EMAIL";
    return;
  }

  if (status == "GET_EMAIL") {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    userEmail = userInput.value.replace(/\s/g, "");
    if (userEmail.match(mailformat)) {
      userReply(userEmail);
      showPreferredInputDisplay(false, true, true);
      DisableInputs(true);
      setTimeout(() => {
        DisableInputs(false);
        botReply("And your phone number please?");
        showPreferredInputDisplay(true, false, false);
      }, 700);
      status = "GET_PHONE";
    } else {
      userReply(userEmail);
      botReply("Please enter a valid Email address");
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
      if (NoDealBool) {
        showPreferredInputDisplay(true, false, true);
        DisableInputs(true);
        setTimeout(() => {
          DisableInputs(false);
          botReply(
            `Sit back and relax until our executive reaches out to you.`
          );
          showPreferredInputDisplay(false, false, false);
        }, 1400);
        sendChatDetails();
        return;
      } else {
        status = "GENERATE_COUPON";
        count = 1;
      }
    }
  }

  if (status == "GENERATE_COUPON") {
    coupon = coupongenerator();
    showPreferredInputDisplay(true, false, true);
    DisableInputs(true);
    setTimeout(() => {
      DisableInputs(false);
      botReply(
        `This is your discount code: ${coupon} Please note this offer expires in 72 hours.`
      );
      showPreferredInputDisplay(false, false, false);
    }, 1400);
    sendChatDetails();
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

function resizer() {
  let chatter = document.getElementById("chatter");
  let toAppend = document.getElementById("toAppend");

  chatter.style.height = `${window.innerHeight - 85}px`;
  toAppend.style.height = `${parseInt(chatter.style.height) - 85}px`;
  document.getElementById("toAppend").scrollTop = document.getElementById(
    "toAppend"
  ).scrollHeight;
}

if (window.matchMedia("(max-width: 480px)").matches) {
  window.addEventListener("resize", resizer);
  resizer();
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

function DisableInputs(val) {
  document.getElementById("user-input").disabled = val;
  document.getElementById("accept").disabled = val;
  document.getElementById("reject").disabled = val;
  document.getElementById("send-air").disabled = val;
}

function botReply(msgToAdd) {
  let botMessage = document.createElement("div"); //Bot Message
  botMessage.classList.add("form-bot");
  botMessage.style.textAlign = "left";

  botMessage.innerHTML = msgToAdd;

  let botimage = document.createElement("img");
  botimage.setAttribute("src", "/assets/images/robot.png");
  botimage.style.height = "25px";
  botimage.style.width = "25px";
  botimage.style.marginRight = "5px";

  let botall = document.createElement("div");
  botall.append(botimage);
  botall.append(botMessage);
  botall.style.display = "flex";
  botall.style.margin = "10px 0";

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
  xhr.open("POST", `/user/chatbot/submit`, true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onprogress = function () {
  };

  var tod = new Date();
  var tom = new Date();
  tom.setDate(tod.getDate() + 3);
  tod = tod.toUTCString();
  tom = tom.toUTCString();
  tod = tod.split(" ").slice(0, 4).join(" ");
  tom = tom.split(" ").slice(0, 4).join(" ");

  var discountDetails = {
    email: `${userEmail}`,
    phoneNo: `${userPhone}`,
    discount: `${deal}`,
    CouponCode: `${coupon}`,
    carID: userVIN,
    tod: `${tod}`,
    tom: `${tom}`,
    carPrice: `${maxValue}`,
    discountFor: `${discountFor}`,
  };

  xhr.send(JSON.stringify(discountDetails));
}

createMessage();

let openbot = document.querySelector(".chatbox_closed");
let closebot = document.querySelector(".chatbox_opened");
let botcloser = document.querySelector(".botcloser");
let botencloser = document.querySelector(".chatbot_encloser");

function chatbotOpen() {
  document.querySelector(".ch_msg").style.display = "none";
  openbot.style.transform = "translateY(10vh)";
  openbot.style.visibility = "hidden";
  openbot.style.opacity = "0";
  clearTimeout(Popuptimer);
  botencloser.style.zIndex = "9999";
  closebot.style.display = "flex";
}

function chatbotClose() {
  botencloser.removeAttribute("style");
  closebot.style.display = "none";
  openbot.style.transform = "translateY(0vh)";
  openbot.style.visibility = "visible";
  openbot.style.opacity = "1";
}

let Popuptimer = setTimeout(function () {
  document.querySelector(".ch_msg").style.display = "block";
  document.querySelector(
    ".fchatmsg"
  ).innerHTML = `<span onclick="chatbotOpen()">${botpop}</span> <a class="popanc" onclick='popupclose()'>Close</a>`;
  document.querySelector("audio").play();
  document.querySelector(".chatbox_closed").style.cssText =
    "  animation: shake 0.8s; animation-iteration-count: 2;";
}, 45000);

function popupclose() {
  document.querySelector(".ch_msg").style.display = "none";
}
