a.Chua Zheng Wei, Brian
b.A0278021L

c.Database Name: qaforum
npm install
node server.js

d. Extra Features plus Logic Checks
1.User Management

User Registration:
Client‑side and server‑side validation (including unique username/email checks - valid email, and error messages).
Error handling for duplicate entries and validation issues.

User Login & Logout:
Login form with validation and error messages for invalid credentials.
Hide or unhide password when typing.
Similar validation as with registration - valid email and password.
Session management with express‑session to persist login state.
Logout functionality that destroys the session.

User Profile & Public Profile:
Computed reputation based on the total votes on the user’s questions and answers.
Activity section displaying a history of questions and answers posted, with short snippets.
Public Profile view for any user, with a streamlined design and activity stats, when
clicked on in the User tab to view all users

Profile Editing:
Edit profile form allowing users to update their username, email, password, bio, and 
choose from a set of default profile pictures.

Users List
A page listing all users with their profile picture, email, and computed reputation.
“View Profile” links for each user to view more info.

2. Question Management

Posting Questions:
Client‑side validation (minimum title length, valid tag format) with inline error messages.
Must be logged in to post question.

Viewing Questions:
Filtering by tag (when a tag is selected, only questions including that tag are shown).
Added when question was posted.

Single Question View:
Buttons for editing and deleting the question/answer only available for the author.
Must be logged in to answer question or vote.

Voting on Questions:
Display of current vote count with dynamic icon changes (filled icons if already voted).
Check user logged in.

Question Stack on Home Page:
A “Highest Upvoted Questions” section on the home page using a “stack of cards” layout.
Rotating stack controls (up/down arrows) with smooth slide animations to cycle through top questions.

3. Answer Management

Posting Answers:
Form on the question page for logged‑in users to post answers with validation to prevent empty submissions.

Viewing Answers:
Answers are displayed beneath the question with vote counts and author information + date time.

Voting on Answers:
Checks user logged in.

Editing and Deleting Answers:
Allow only authors to edit or delete their own answers (buttons appear only for the answer’s author).

4. Tag Management / Filtering

Tags Page:
A dedicated tags page that aggregates all distinct tags from questions.
For each tag, it calculates the usage count and displays a short description.
Each tag card has “View Questions” button to filter the questions by that tag.

5. Blog (“The Overflow Blog”) Section

In‑Memory Blog Posts:
A simple blog route that uses an in‑memory array of sample blog posts.
A Blog Index view (BlogIndex.jsx) that lists all blog posts with title, snippet, and a “Read More” button.
A Blog Show view (BlogShow.jsx) that displays the full content of a selected blog post.
Links in the “The Overflow Blog” section that take users to the blog pages.

6. UI / Aesthetic Enhancements

Use of Bootstrap classes to ensure the site works well on mobile and desktop (sidebar dropdown on mobile, grid layouts for cards).
Fade‑in and slide animations for question cards and stacks.
Animated stack controls for rotating the top questions.

A custom navbar that shows “Login” and “Sign Up” when no user is logged in, and shows the user’s name plus “Ask Question” and “Logout” when logged in.
A header area has an animated snowflake effect.

7. Additional Integrations

Session Management:
Express‑session integration to maintain user login state across routes.

Middleware:
A requireLogin middleware to protect routes that require authentication.

Home page has twitter and github icons that link to my contact information.