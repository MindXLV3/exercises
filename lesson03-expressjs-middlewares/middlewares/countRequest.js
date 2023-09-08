import {users} from "../utils/usersMockData.js";

const countRequest = (req, res, next) => {
    const {apiKey} = req.body;
    let userIndex = users.findIndex(user => user.apiKey === apiKey);
    let user = users.find(user => user.apiKey === apiKey);
    console.log(req.body)
    if (userIndex === -1) {
        res.json({mess: 'User is not found!'});
    }

    const updatedUser = {
        ...users[userIndex],
        posts: user.posts ? user.posts + 1 : 1
    };

    users[userIndex] = updatedUser;
    console.log(updatedUser, users)
    next();
};
  
export default countRequest;
  