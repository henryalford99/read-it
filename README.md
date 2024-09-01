## Purpose
The purpose of this project is to create a dynamic and user-friendly Reddit browsing application using React and Redux, which enables users to search for, view, and manage subreddit content efficiently. The application features a responsive design that adapts to various screen sizes, enhancing accessibility across devices. Users can save and organize their favorite subreddits, view detailed posts with upvote and downvote functionality, and interact with media content such as images and videos within modals. By integrating with the Reddit API, the project aims to provide a seamless and engaging experience for Reddit enthusiasts. Ultimately, this project strives to streamline the process of discovering and managing subreddit content while offering an intuitive user interface.

## Technologies Used
- **React:** For building the user interface
- **Redux** For managing the application's state
- **JavaScript:** Core programming language for the app
- **CSS:** For styling the application
- **HTML:** Structure of the web application
- **Reddit JSON API:** For fetching song data and managing playlists

## Features
- **Subreddits**
    - ***Saved Subreddits Dropdown***: Users can save their favorite subreddits for quick access. The saved subreddits are objects that include the subreddit name and subreddit icon, enabling dynamic display. From the Subreddits dropdown menu, users can remove or add subreddits as needed.
    - ***Subreddit Search***: A search bar in the Subreddits Dropdown Menu allows users to find and explore subreddits. To limit API queries per minute, Subreddit Search is not conducted after the user has completed typing. Subreddit Search requests will return the top 5 subreddits corresponding to the Search Term. Results can be added to the search bar and to the saved subreddits list by the user.
 
- **Search Bar and Results**
    - ***Interactive Search***: User are able to search for Reddit content using specified subreddit tags and user-inputted keywords.
    - ***Initial Post View***: When a search is performed, the top 20 search results are initially displayed. The posts' date, author, subreddit, title, upvote count, comment number, and thumbnail preview are contained in a visually appealling layout. This allows users to survey posts before diving into a detailed views.

- **Modal Detailed View**
    - ***Upvoting***: Users can upvote or downvote posts directly from the detailed view modal. The voting buttons are styled for clear interaction and feedback.
    - ***Interactive Header***: The modal’s header includes interactive elements such as subreddit icons and close buttons, and links to the subreddit and author's Reddit pages. This makes navigation and dismissal of the modal intuitive and straightforward.
    - ***Content Display***: The modal presents detailed content, including media and text, in a structured, responsive layout. This ensures that users can easily view and interact with the full content of a post.
    - ***Comments***: Users can view and interact with comments on posts. The comments section is designed for readability and ease of use, with options to expand or collapse the view.

- **Responsive Design:** The application and its styles are designed to be responsive and work on mobile and desktop devices. Detailed Post View, Subreddits Dropdown Menu, and Search Bar are restructured to fit smaller screen sizes.

## Future Directions
- **Enhanced User Authentication:** Implement user authentication features to allow users to log in and manage their saved subreddits and posts across different devices. This could include integrating OAuth for secure logins with services like Google or Reddit.
- **Advanced Search Capabilities:** Expand the search functionality to include advanced filters such as post type, date range, or subreddit popularity. This would enhance the precision of search results and provide users with more control over their content discovery.
- **User Interaction Features:** Add features that allow users to comment on and engage with posts directly within the app. This could also include a notification system for new comments or replies to keep users informed and engaged.
- **Performance Optimization:** Optimize application performance to handle larger volumes of data more efficiently. This could involve implementing lazy loading for images and posts, improving state management with Redux, and optimizing API calls.
- **Mobile App Development:** Develop a dedicated mobile app version of the project to provide a native experience for iOS and Android users. This would leverage mobile-specific features and provide a more seamless experience on mobile devices.


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## Getting Started

1. **Clone the Repository**: Clone this repository to your local machine.
   ```sh
   git clone https://github.com/your-username/jammming.git
   ```
2. **Install Dependencies**: Navigate to the project directory and install the necessary dependencies.
   ```sh
   cd jammming
   npm install
   ```
3. **Run the Application**: Start the development server.
   ```sh
   npm start
   ```
4. **Run Tests**: Run the test suite to ensure everything is working correctly.
   ```sh
   npm test
   ```

## Project Structure

```
read-it/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── app/
|   |   └── App.css
|   |   └── App.js
|   |   └── App.test.js
|   |   └── store.js
│   ├── assets/
|   |   └── background.jpg
|   |   └── search-icon.svg
│   ├── components/
|   |   └── fetchSubredditIcon.js
|   |   └── Logo.css
|   |   └── Logo.js
|   |   └── TimeSince.js
│   ├── features/
│   │   ├── Comments/
|   |   |   └── Comments.css
|   |   |   └── Comments.js
|   |   |   └── CommentsSlice.js
│   │   ├── Posts/
│   │   │   ├── DetailedView/
|   |   |   |   └── DetailedView.css
|   |   |   |   └── DetailedView.js
│   │   │   ├── InitialView/
|   |   |   |   └── InitialView.css
|   |   |   |   └── InitialView.js
|   |   |   └── postsSlice.js
│   │   ├── SearchBar/
|   |   |   └── SearchBar.css
|   |   |   └── SearchBar.js
|   |   |   └── SearchBarSlice.js
│   │   ├── Subreddits/
|   |   |   └── Subreddits.css
|   |   |   └── Subreddits.js
|   |   |   └── SubredditsSlice.js
│   ├── reportWebVitals.js
│   ├── setupTests.js
│   ├── index.css
│   └── index.js
│   ├── sub-components
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
├── LICENSE
└── ...
```


## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request. Your contributions are always welcome!

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

---

Happy coding! If you have any questions or need further assistance, feel free to open an issue on the repository.
