module.exports = {
  GenerateRandom: () => {
    var RandomString = "";
    var possible =
      "YU3IOAT1a8NM6qSKt1yuszxc6HJ2bXCVBERwe9rklL5Zv4dfghj5DFG27iopWnm3QP4";
    for (var i = 0; i < 32; i++) {
      RandomString += possible.charAt(
        Math.floor(Math.random() * possible.length)
      );
    }
    return RandomString;
  },

  PassCheck: (passcode, cpasscode, errors) => {
    //Check passwords match
    if (passcode !== cpasscode) {
      errors.push({ msg: "Passwords do not match" });
      return;
    }

    //Check password length
    if (passcode.length < 6) {
      errors.push({ msg: "Password should be atleast 6 characters" });
    }

    if (passcode.length > 14) {
      errors.push({ msg: "Password length should not exceed 14 characters" });
    }

    //Check password strength
    if (!passcode.match(/[a-z]/)) {
      errors.push({ msg: "Password must contain a Lowercase Letter." });
    }

    if (!passcode.match(/[A-Z]/)) {
      errors.push({ msg: "Password must contain a Uppercase Letter." });
    }

    if (!passcode.match(/[0-9]/)) {
      errors.push({ msg: "Password must contain a Numeric Digit." });
    }

    if (!passcode.match(/[\W]/)) {
      errors.push({ msg: "Password must contain a Special Character." });
    }

    return;
  }
};
