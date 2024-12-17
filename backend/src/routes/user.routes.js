import { Router } from "express";
import passport from "passport";

const router = Router();

// Twitter OAuth
router.get("/twitter", passport.authenticate("twitter"));

router.get(
    "/twitter/callback",
    passport.authenticate("twitter", { failureRedirect: "http://localhost:5713/login" }),
    (req, res) => {
        // Redirect to frontend dashboard on successful login
        res.redirect("http://localhost:5713/dashboard");
    }
);

// Logout Route
router.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) return next(err);
        res.status(500).json({ error: "Logout failed" });
    });
    res.redirect("http://localhost:5713/login");
});

// Current User Route
router.get("/current_user", (req, res) => {
    if (req.user) {
        res.json({
            id: req.user.twitterId,
            username: req.user.username,
            avatar: req.user.avatar,
        });
    } else {
        res.status(401).json({ error: "Not authenticated" });
    }
});

export default router;
