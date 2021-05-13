# Today - Task Managing App
#### Video Demo: https://youtu.be/1sIy7DJ8hvQ
#### Description:
Today is a task managing app. In it you can store your tasks, sort them by category and never forget to do something again!

It is made using TypeScript, React Native and Expo for the Frontend. The project's idea was inspered by [this post on dribbble](https://dribbble.com/shots/14100356-ToDo-App-UI).
The project's backend is also written in TypeScript. It is an express server that uses Prisma to query a PostgreSQL databse and serves JSON responses. The communciation between
frontend and backend is done using Json Web Tokens (JWT), making the whole server stateless and so, easily scalable.


The backend code can be found here: https://github.com/kimon0202/today-todo-app-backend


The focus of this project was to develop a app with great user experience. This means that managing tasks and categories should be as easy as possible. At first, that was a challenge because the application was making a lot of request to the API.
This is not such good UX. To fix taht, I created special react hooks that provide a cache for storing task and categories in memory, making the in-app actions more fluid and dynamic.


#### Frontend Project Structure

The `src` directory contains all the projects main code and it is divided in the following way:
* components -> All UI part's that are used more than once
  - Button
  - Category
  - Floating Action Button
  - Screen Headers
  - Input
  - Spacing
  - Task
* contexts -> Global data that is served for the app using React's Context API and state management hooks
  - Authentication Context -> functions for signing in, signing out and singing up a user
  - Theme Context -> provides a unique theme for the entire project. In it there are definitions for colors and font sizes
* hooks -> custom react hooks for fetching and managing categoires and tasks
* models -> TypeScript interfaces for representing the API's models responses
* routes -> React Navigation configuration files and all project routes
* screens -> Project Screens (Signup, Login, Task, CreateTask, Home)
* services -> functions that makes communicating with the API easier
* styles -> functions that handle the entire app styling, including its theme
* utils -> functions that are used by other functions and have a general purpose
  - compare.ts -> function that compares two objects and returns true if they are deeply equal
  - date.ts -> functions to fromat dates
  - keys.ts -> object that contains strings that are used as keys in other parts of the project
* App.tsx -> Application amin entry point


#### Backend Prject Structure

The `src` and `prisma` directories constains the project's main files:
* prisma -> files related to the Primsa library that is used to communciate with the databse. Also includes the db's migrations.
* src
  * config -> stores config files for useful libraries, such as Multer for file uploading
  * controllers -> functions that handle the API's requests
    - CategoriesController -> Hanldes the Cateogry resource
    - TasksController -> Hanldes the Task resource
    - UsersController -> Handles the User resource
    - SessionsController -> Handles everything related to a session (mainly login)
  * middlewares -> functions that change the request state and are used more than once. It includes checking the validity of the user's JWT and checking if the user accessing a resource has the right privileges
  * routes -> includes all API routes, separated by resource type
  * services -> functions that handle the creation of JWT's, Password Encryption and Database connection
  * validators -> functions to validate the body of POST / PUT requests that uses Yup as a schema validator
  * views -> functions that chnage the response state and formats all API's responses, so they all conform to a similar format
  * App.ts -> Basic wrapper around an express server and a PrismaClient
  ( index.ts -> project entry point
