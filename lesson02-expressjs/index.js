import express from "express";
import { v4 as uuidv4 } from "uuid";

const app = express();
const PORT = 3001;

// req.body => JS object
app.use(express.json());

let posts = [
  {
    id: "1",
    title: "Master ReactJS in 4 hours",
    description: "It's free",
    author: "Harry",
  },
  {
    id: "2",
    title: "Rap Viet mua 3",
    description: "Vong chung ket Rap Viet 3",
    author: "vieon",
  },
  {
    id: "3",
    title: "Rap Viet mua 4",
    description: "Vong chung ket Rap Viet 4",
    author: "VTV",
  },
];

/* 
    Method: GET -> param nằm trên url
    Get all posts
**/
app.get("/posts", (req, res) => {
  res.json({
    data: posts,
  });
});

// Endpoint: /posts/:id
// Get post by id
// Method: Get
app.get("/posts/:token", (req, res) => {
  // Request params
  const { token } = req.params;

  const filterdPosts = posts.filter((post) => {
    return post.id === token || post.title.search(token) > 0
  });

  res.json({ data: filterdPosts });
});

// Endpoint: /posts
// Create new post
// Method: POST
app.post("/posts", (req, res) => {
  const { data } = req.body;
  if (data && data.length > 0) {
    data.map(post => {
      console.log(post)
      posts = [...posts, post]

    })
  } else {
    res.status(400).json({
      message: "Post list is invalid!",
    });
  }

  res.json({
    "message": "success",
  });
});

// API Cập nhật thông tin 1 bài post thông qua id
// id -> để tìm post cần cập nhật
app.put("/posts/:id", (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    res.status(400).json({
      message: "Missing required keys",
    });
  }
  const { id } = req.params;

  const existingPost = posts.find((post) => post.id === id);

  if (!existingPost) {
    return res.json({
      message: "Post not found",
    });
  }

  posts = posts.map(post => post.id === id ? {id, title, description} : post);

  res.json({
    data: posts
  })
});

// API xoá 1 bài post thông qua id
app.delete("/posts/:id", (req, res) => {
  const { id } = req.params;

  const existingPost = posts.find((post) => post.id === id);

  if (!existingPost) {
    return res.json({
      message: "Post not found",
    });
  }

  posts = posts.filter(post => post.id !== id);

  res.json({
    data: posts
  })
});
// Bài tập 

// API thêm nhiều bài post

// API tìm bài post thông qua id hoặc title (title gần đúng) => dùng regex, contains, function find trong string/ chartAt

// http://localhost:3001
app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});

// HTTP method
// RESTFul API
/*
    HTTP Status code
        2xx: 200, 201, 204 => Successfully

        4xx: 400, 401, 403 , 404 => Client Error

        5xx: 500,... => Server error
*/

// // http://localhost:3001/
// // HTTP Method
// app.get("/", (req, res) => {
//     res.send("Hello world, welcome to programming world");
//   });

//   app.get("/test", (req, res) => {
//     // Logic => trả về kết quả cho users
//   });

//   app.get("/ket-qua-bong-da", (req, res) => {
//     res.send("Việt Nam thắng Indonesia");
//   });

//   app.get("/users", (req, res) => {
//     res.json([
//       {
//         id: 1,
//         name: "Hung",
//       },
//       {
//         id: 2,
//         name: "Bao",
//       },
//     ]);
//   });

//Ví dụ:
/**
 * API authen: login -> nhập form login -> submit form -> client gọi api authen 
 * - input: username, password, cookie
 * - output: url, cookie
 * 
 * => dùng method post thay cho get vì tính bảo mật
 * => 1 method post có thể dùng thay thế cho get, put, delete
 * 
 * CRUD
 */