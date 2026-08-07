Purpose Of This Folder:
Runs before the controller.

Used for:
* Authentication
* Authorization
* Logging
* Validation
* Error handling

Example:
const auth = (req, res, next) => {
    if (!req.user)
        return res.status(401).send("Unauthorized");

    next();
};

Flow:
Request
   ↓
Middleware
   ↓
Controller