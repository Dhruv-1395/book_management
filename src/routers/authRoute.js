import express from 'express'
import { verifyUser } from '../auth/verifyUser.js';
import { userRegistration,loginUser } from '../controller/user.controller.js';
import { validateLoginUser, validateUser } from '../utils/validation.js';
import limiter from '../middleware/rateLimiter.js';
import passport from 'passport';
import session from 'express-session';
const { Strategy: GoogleStrategy } = await import("passport-google-oauth20");

const router = express.Router();

// router.use(
//     session({
//       secret: "demo@123",
//       resave: false,
//       saveUninitialized: true,
//     })
//   );

router.use(passport.initialize());
router.use(passport.session());

passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:5001/api/auth/google/callback", // Must match Google Console
      },
      (accessToken, refreshToken, profile, done) => {
        console.log("Access Token: ", accessToken);
        console.log("Refresh Token: ", refreshToken);
        console.log("Profile: ", profile);
        return done(null, profile);
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });
  
  // Route to Start Authentication
  router.get(
    "/google",
    passport.authenticate("google", { 
        scope: [
            "profile",
            "email",
            "https://www.googleapis.com/auth/gmail.readonly",
            "https://www.googleapis.com/auth/gmail.modify",
            "https://www.googleapis.com/auth/gmail.labels",
          ]
     })
  );
  
  // **OAuth Callback Route**
  router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
      res.send("Login Successful!"); // Replace with your frontend redirect
    }
  );

  router.post("/webhook/gmail", (req, res) => {
    console.log("Gmail Webhook Received");
    res.status(200).send("ok");
  
    console.log(req.body);
  
    const { message } = req.body;
  
    if (!message || !message.data) {
      console.log("No message data found");
      return;
    }
  
    // Decode the Base64 encoded message data
    const encodedMessage = message.data;
    const decodedMessage = JSON.parse(
      Buffer.from(encodedMessage, "base64").toString("utf-8")
    );
    console.log("Decoded Message: ", decodedMessage);
  });
  

router.get('/verify',verifyUser);
router.post('/register',validateUser,userRegistration);
router.post('/login',validateLoginUser,loginUser);

export default router;