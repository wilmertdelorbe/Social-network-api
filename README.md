# Social-Media Network API

## Description

Idea Network API is a robust backend service designed to facilitate the sharing and collaboration of innovative ideas. It provides a platform for users to create profiles, share ideas, and provide feedback, fostering a community of creativity and innovation.

## Features

- User profile management
- Idea creation and sharing
- Feedback system for ideas
- Connection management between users
- Custom timestamp formatting

## Installation

1. Clone the repository
   ```
   git clone https://github.com/wilmertdelorbe/idea-network-api.git
   ```
2. Install dependencies
   ```
   npm install
   ```
3. Set up your MongoDB database and update the connection string in `config/connection.js`
4. Start the server
   ```
   npm start
   ```

## Usage

The API provides various endpoints for managing profiles, ideas, and feedback. Here are some key routes:

- Profiles: `/api/profiles`
- Ideas: `/api/ideas`
- Feedback: `/api/ideas/:ideaId/feedback`

For a full demonstration of the API's capabilities, check out this video:
[Idea Network API Demo](https://youtu.be/eYE89nFB3LA?si=cv_Rqaerm59B9Yqd)

## API Routes

### Profiles
typescript:routes/api/profile-routes.js
startLine: 13
endLine: 47
### Ideas
typescript:routes/api/idea-routes.js
startLine: 13
endLine: 50

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Questions

If you have any questions about the repo, open an issue or contact me directly at wilmertdelorbe21@gmail.com. You can find more of my work at [wilmertdelorbe](https://github.com/wilmertdelorbe).

## License

This project is licensed under the MIT License.