# CADevPlatforms
## Description
- Hosted on Render, API from Supabase
- Link to production API: https://cadevplatforms-erikhhj.onrender.com
## Endpoints
- API consists of two supabase tables, one called posts and one called comments.
- /api/posts -  Contains all posts, each post has a key for title, body, image, price, and author. Additionally, automatic keys are created for id, and created_at. These are automatically generated and must not be included in requests.
```ruby
{
title: "title",
body: "body",
image: "image link",
price: number,
author: "name of account"
}
```
- /api/comments - Contains all comments. Each comment has a key for comment and author. 
```ruby
{
comment: "comment",
author: "name of account"
}
```

- Get all posts: GET  /api/posts   - Can also get individual posts with "/api/posts/1" where 1 is the posts' id
- Get all comments GET   /api/comments   -Can also get individual comments with "/api/posts/1" where 1 is the comments' id
- Create new post: POST   /api/posts
- Create new comment: POST   /api/comments
- Delete post: DELETE   /api/posts/id
- Delete comment: DELETE   /api/comments/id
