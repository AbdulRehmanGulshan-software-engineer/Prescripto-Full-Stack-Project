Purpose of this folder :
Contains the logic that runs when an API is called.

Example:

User requests:
GET /users

Controller:
exports.getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};