import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
});

export const sendLoginEmail = async (email: string): Promise<void> => {
    console.log(`[LOGIN_EMAIL_ATTEMPT] ${email}`);
    
    await transport.sendMail({
      from: process.env.USER_EMAIL,
      to: email,
      subject: "Successful Login",
      html: `
      <div style="
        font-family: Arial, sans-serif;
        background-color: #f4f6f8;
        padding: 40px 20px;
      ">
        <div style="
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 12px;
          padding: 40px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        ">

          <h1 style="
            color: #222222;
            margin-bottom: 10px;
          ">
            Welcome back to Hive! 🐝
          </h1>

          <p style="
            color: #555555;
            font-size: 16px;
            line-height: 1.6;
          ">
            You have successfully logged into your Hive account.
          </p>

          <div style="
            background-color: #f8f9fa;
            border-radius: 8px;
            padding: 20px;
            margin: 25px 0;
          ">
            <p style="
              margin: 0;
              color: #333333;
              font-size: 15px;
            ">
              <strong>Login Status:</strong>
              <span style="color: #28a745;">
                Successful ✓
              </span>
            </p>

            <p style="
              margin: 10px 0 0;
              color: #666666;
              font-size: 14px;
            ">
              <strong>Time:</strong>
              ${new Date().toLocaleString()}
            </p>
          </div>

          <p style="
            color: #555555;
            font-size: 15px;
            line-height: 1.6;
          ">
            If you recognize this login, no further action is required.
          </p>

          <div style="
            background-color: #fff4f4;
            border-left: 4px solid #dc3545;
            padding: 15px;
            margin-top: 25px;
          ">
            <p style="
              margin: 0;
              color: #555555;
              font-size: 14px;
              line-height: 1.6;
            ">
              <strong>Wasn't you?</strong><br>
              If you did not log into your Hive account,
              please change your password immediately and
              contact our support team.
            </p>
          </div>

          <hr style="
            border: none;
            border-top: 1px solid #eeeeee;
            margin: 30px 0;
          ">

          <p style="
            color: #999999;
            font-size: 12px;
            text-align: center;
            margin: 0;
          ">
            © ${new Date().getFullYear()} Hive. All rights reserved.
          </p>

        </div>
      </div>
    `,
    });

    console.log(`[LOGIN_EMAIL_SUCCESSFUL] ${email}`);
};

export const sendRegisterEmail = async (email: string): Promise<void> => {
  console.log(`[REGISTER_EMAIL_ATTEMPT] ${email}`);

  await transport.sendMail({
    from: process.env.USER_EMAIL,
    to: email,
    subject: "Successfully Registered",
    html: `
  <div style="
    font-family: Arial, sans-serif;
    background-color: #f4f6f8;
    padding: 40px 20px;
  ">
    <div style="
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 12px;
      padding: 40px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    ">

      <h1 style="
        color: #222222;
        margin-bottom: 10px;
      ">
        Welcome to Hive! 🐝
      </h1>

      <p style="
        color: #555555;
        font-size: 16px;
        line-height: 1.6;
      ">
        Your account has been successfully created.
        We're happy to have you with us!
      </p>

      <div style="
        background-color: #f8f9fa;
        border-radius: 8px;
        padding: 20px;
        margin: 25px 0;
      ">
        <p style="
          margin: 0;
          color: #333333;
          font-size: 15px;
        ">
          <strong>Registration Status:</strong>
          <span style="color: #28a745;">
            Successful ✓
          </span>
        </p>
      </div>

      <p style="
        color: #555555;
        font-size: 15px;
        line-height: 1.6;
      ">
        You can now log in and start using Hive.
      </p>

      <p style="
        color: #777777;
        font-size: 14px;
        line-height: 1.6;
        margin-top: 30px;
      ">
        If you did not create this account, please contact our
        support team immediately and secure your account.
      </p>

      <hr style="
        border: none;
        border-top: 1px solid #eeeeee;
        margin: 30px 0;
      ">

      <p style="
        color: #999999;
        font-size: 12px;
        text-align: center;
        margin: 0;
      ">
        © ${new Date().getFullYear()} Hive. All rights reserved.
      </p>

    </div>
  </div>
`
  });
  
  console.log(`[REGISTER_EMAIL_SUCCESSFUL] ${email}`);
}