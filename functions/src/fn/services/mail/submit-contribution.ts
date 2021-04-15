import * as functions from "firebase-functions";
import * as nodemailer from "nodemailer";
import * as smtpTransport from "nodemailer-smtp-transport";

const cors = require("cors")({
  origin: true,
});

export default async (
  req: functions.https.Request,
  res: functions.Response
): Promise<any> => {
  console.log(`/submitContribution`);
  
  const { 
    input: { name,email, magazine, id } 
  } = req.body.input;

  try {
    return cors(req, res, () => {
      
      var text = `<div>
      <h4>${name} just submit a contribution in ${magazine} </h4>
      <ul>
        <li>
          Name - ${name || ""}
        </li>
        <li>
          View contribution - <a href='http://localhost:3000/contribution/${id}/edit'>Link</a>
        </li>
      </ul>
      <h4>Magazine</h4>
      <p>${magazine || ""}</p>
    </div>`;
      var sesAccessKey = "team4mco@outlook.com";
      var sesSecretKey = "200421team4";

      var transporter = nodemailer.createTransport(
        smtpTransport({
          host: "smtp-mail.outlook.com", // hostname
          // port for secure SMTP
          port: 587, 
          tls: {
            ciphers: "SSLv3",
          },
          auth: {
            user: sesAccessKey,
            pass: sesSecretKey,
          },
        })
      );
      const mailOptions = {
        to: email,
        from: sesAccessKey,
        subject: `${name} submit contribution`,
        text: text,
        html: text,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error.message);
        }
        res.status(200).json({
          status: "success",
          statusCode: 200,
          message: "Ok",
        });
      });
    });
  } catch (error) {
    console.log(`/submitContribution end with error`);
    console.error(error);
    return res
      .status(500)
      .json({ status: "fail", statusCode: 500, message: error });
  }
};
