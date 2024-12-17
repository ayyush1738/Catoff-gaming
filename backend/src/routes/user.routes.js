import { Router } from "express";
import passport from "passport";

const router = Router();


// Twitter OAuth
router.get("/twitter", passport.authenticate("twitter"));
router.get(
    "/twitter/callback",
    passport.authenticate("twitter", { failureRedirect: "/login" }),
    (req, res) => res.redirect("/dashboard")
);

// Logout Route
router.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect("/");
    });
});

// Current User Route
router.get("/current_user", (req, res) => {
    res.send(req.user);
});

export default router;
