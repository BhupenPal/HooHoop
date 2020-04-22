module.exports = {
  verificationMail: (NameTo, TokenCode) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <style>
        #verify_btn{
          margin: 50px auto; 
          width: 25%;
          min-width: 150px; 
          height: 50px; 
          border-radius: 50px; 
          border: none; 
          text-align: center; 
          background-color: #1EA1F3; 
          color: white;
          font-size: large; 
          cursor: pointer;
          transition: 0.2s;
          outline: 0;
        }
        #verify_btn:hover{
          background-color: white;
          border: 2px solid #1EA1F3;
          color: #1EA1F3;
        }
      </style>
    </head>
    <body>
      <table width="60%" cellspacing="0" cellpadding="0" style="background-color: #F0F2F5; padding: 80px; margin: 0 auto;">
        <tr>
          <td>
            <table width="100%" cellspacing="0" cellpadding="0" style="background-color: #fff; font-family: Arial; padding: 20px;">
              <!-- Header -->
              <tr>
                <td><img src="https://hoohoop.co.nz/assets/images/Logo.png" alt="HooHoop Logo" style="display: block; margin: 10px auto; padding: 0; width: 300px;"></td>
              </tr>
              <tr>
                <td>
                  <h1 style="margin: 3vh auto; width: 100%; text-align: center; font-size: 30px;">Verify your email address</h1>
                </td>
              </tr>
              <tr>
                <td>
                  <p style="margin: 0px auto; width: 100%; font-weight: bold; font-size: 20px; margin-bottom: 10px;">Hi ${NameTo},</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p style="margin: 0px auto; width: 100%;">Please confirm that you want to use this as your HooHoop account email address. Once it's done you will be able to use HooHoop.</p>
                </td>
              </tr>
              <tr>
                <td style="display: flex !important; justify-content: center !important; align-items: center !important;">
                  <a href="https://hoohoop.co.nz/user/verify?token=${TokenCode}" style="margin:0 auto"><button id="verify_btn">Verify my email</button></a>
                </td>
              </tr>
              <tr>
                <td><p style="margin: 0 auto; width: 100%; text-align: center;">or paste this link below into your browser: </p></td>
              </tr>
              <tr>
                <td style="display: flex; justify-content: center; align-items: center;"><p style="margin: 0 auto; width: 100%; text-align: center;">https://www.hoohoop.co.nz/user/verify?token=${TokenCode}</p></td>
              </tr>
              <tr>
                <td></td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>`;
  },

  resetMail: (NameTo, TokenCode) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <style>
        #verify_btn{
          margin: 50px auto; 
          width: 25%;
          min-width: 250px; 
          height: 50px; 
          border-radius: 50px; 
          border: none; 
          text-align: center; 
          background-color: #1EA1F3; 
          color: white;
          font-size: large; 
          cursor: pointer;
          transition: 0.2s;
          outline: 0;
        }
        #verify_btn:hover{
          background-color: white;
          border: 2px solid #1EA1F3;
          color: #1EA1F3;
        }
      </style>
    </head>
    <body>
      <table width="60%" cellspacing="0" cellpadding="0" style="background-color: #F0F2F5; padding: 80px; margin: 0 auto;">
        <tr>
          <td>
            <table width="100%" cellspacing="0" cellpadding="0" style="background-color: #fff; font-family: Arial; padding: 20px;">
              <!-- Header -->
              <tr>
                <td><img src="https://hoohoop.co.nz/assets/images/Logo.png" alt="HooHoop Logo" style="display: block; margin: 10px auto; padding: 0; width: 300px;"></td>
              </tr>
              <tr>
                <td>
                  <h1 style="margin: 3vh auto; width: 100%; text-align: center; font-size: 30px;">Reset your password</h1>
                </td>
              </tr>
              <tr>
                <td>
                  <p style="margin: 0px auto; width: 100%; font-weight: bold; font-size: 20px; margin-bottom: 10px;">Hi ${NameTo},</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p style="margin: 0px auto; width: 100%;">Need to reset your password? No problem! Just click the button below and you'll be on your way. If you did not make this request, please ignore this email.</p>
                </td>
              </tr>
              <tr>
                <td style="display: flex !important; justify-content: center !important; align-items: center !important;">
                  <a href="https://www.hoohoop.co.nz/user/reset-password?token=${TokenCode}" style="margin:0 auto"><button id="verify_btn">Reset my password</button></a>
                </td>
              </tr>
              <tr>
                <td><p style="margin: 0 auto; width: 100%; text-align: center;">or paste this link below into your browser: </p></td>
              </tr>
              <tr>
                <td style="display: flex; justify-content: center; align-items: center;"><p style="margin: 0 auto; width: 100%; text-align: center;">https://hoohoop.co.nz/user/reset-password?token=${TokenCode}</p></td>
              </tr>
              <tr>
                <td></td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>`;
  },

  discountMail: (
    CouponCar,
    deal,
    sellerName,
    SellerMail,
    sellerPhone,
    CouponCode
  ) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <style>
        #verify_btn{
          margin: 50px auto; 
          width: 25%;
          min-width: 250px; 
          height: 50px; 
          border-radius: 50px; 
          border: none; 
          text-align: center; 
          background-color: #1EA1F3; 
          color: white;
          font-size: large; 
          cursor: pointer;
          transition: 0.2s;
          outline: 0;
        }
        #verify_btn:hover{
          background-color: white;
          border: 2px solid #1EA1F3;
          color: #1EA1F3;
        }
      </style>
    </head>
    <body>
      <table width="60%" cellspacing="0" cellpadding="0" style="background-color: #F0F2F5; padding: 80px; margin: 0 auto;">
        <tr>
          <td>
            <table width="100%" cellspacing="0" cellpadding="0" style="background-color: #fff; font-family: Arial; padding: 20px;">
              <!-- Header -->
              <tr>
                <td><img src="https://hoohoop.co.nz/assets/images/Logo.png" alt="HooHoop Logo" style="display: block; margin: 10px auto; padding: 0; width: 300px;"></td>
              </tr>
              <tr>
                <td>
                  <h1 style="margin: 3vh auto 1vh auto; width: 100%; text-align: center; font-size: 30px;">Your coupon code</h1>
                  <h3 style="margin: 1vh auto 3vh auto; width: 100%; text-align: center; font-size: 18px;">for <span style="color: #1EA1F3;">${CouponCar}</span></h3>
                </td>
              </tr>
              <tr>
                <td>
                  <p style="margin: 0px auto; width: 100%; font-weight: bold; font-size: 20px; margin-bottom: 10px;">Hi there,</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p style="margin: 0px auto; width: 100%;">Here is your $${deal} discount coupoun code. This is valid for up
                  to 72 hours, or if someone else redeems it prior, so be quick! You can contact ${sellerName} on ${sellerPhone}, ${SellerMail}</p>
                </td>
              </tr>
              <tr>
                <td style="display: flex !important; justify-content: center !important; align-items: center !important;">
                  <a href="#" style="margin:0 auto"><button id="verify_btn">${CouponCode}</button></a>
                </td>
              </tr>
              <tr>
                <td><p style="margin: 0 auto; width: 100%; text-align: center;">Visit <a href="https://www.hoohoop.co.nz/" style="margin:0 auto">www.hoohoop.co.nz</a> for any further details.</p></td>
              </tr>
              <tr>
                <td style="display: flex; justify-content: center; align-items: center;"><p style="margin: 0 auto; width: 100%; text-align: center;">https://www.hoohoop.co.nz/</p></td>
              </tr>
              <tr>
                <td></td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>`;
  },

  contactMail: (custName, custEmail, custSub, custMsg) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <style>
        #verify_btn{
          margin: 50px auto; 
          width: 25%;
          min-width: 150px; 
          height: 50px; 
          border-radius: 50px; 
          border: none; 
          text-align: center; 
          background-color: #1EA1F3; 
          color: white;
          font-size: large; 
          cursor: pointer;
          transition: 0.2s;
          outline: 0;
        }
        #verify_btn:hover{
          background-color: white;
          border: 2px solid #1EA1F3;
          color: #1EA1F3;
        }
      </style>
    </head>
    <body>
      <table width="60%" cellspacing="0" cellpadding="0" style="background-color: #F0F2F5; padding: 80px; margin: 0 auto;">
        <tr>
          <td>
            <table width="100%" cellspacing="0" cellpadding="0" style="background-color: #fff; font-family: Arial; padding: 20px;">
              <!-- Header -->
              <tr>
                <td><img src="https://hoohoop.co.nz/assets/images/Logo.png" alt="HooHoop Logo" style="display: block; margin: 10px auto; padding: 0; width: 300px;"></td>
              </tr>
              <tr>
                <td>
                  <h1 style="margin: 3vh auto; width: 100%; text-align: center; font-size: 30px;">Query regarding hoohoop</h1>
                  <h3 style="margin: 1vh auto 3vh auto; width: 100%; text-align: center; font-size: 18px;"><span style="color: #1EA1F3;">${custName} - <a href="mailto:${custEmail}" style="text-decoration: none">${custEmail}</a></span></h3>
                </td>
              </tr>
              <tr>
                <td>
                  <p style="margin: 0px auto; width: 100%; font-weight: bold; font-size: 20px; margin-bottom: 10px;">Hi Mana,</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p style="margin: 0px auto; width: 100%; font-weight: bold; font-size: 20px; margin-bottom: 10px;">SUBJECT: <p style="margin: 0px auto; width: 100%;">${custSub}</p></p>
                </td>
              </tr>
              <tr>
              <td>
                <p style="margin: 0px auto; width: 100%; font-weight: bold; font-size: 20px; margin-bottom: 10px;">MESSAGE</p>
                <p style="margin: 0px auto; width: 100%;">${custMsg}</p>
              </td>
              </tr>
              <tr>
                <td></td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>`;
  },
};
