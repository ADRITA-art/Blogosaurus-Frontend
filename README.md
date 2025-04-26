# Blogosaurus Frontend

> **A modern, interactive blogging platform built with React.**

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/yourusername/blogasaurus-frontend)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/yourusername/blogasaurus-frontend/releases)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/yourusername/blogasaurus-frontend/graphs/commit-activity)

---

## 🌐 Hosted Link

[Live Demo](#)
<!-- Replace # with your deployed frontend URL -->

---

## 📸 Screenshots

### Home Page
![Home Page](screenshots/home.png)
<!-- Add your screenshot here -->

### Dashboard
![Dashboard](screenshots/dashboard.png)
<!-- Add your screenshot here -->

### Create Blog
![Create Blog](screenshots/create-blog.png)
<!-- Add your screenshot here -->

### Blog Modal
![Blog Modal](screenshots/blog-modal.png)
<!-- Add your screenshot here -->

---

## 🚀 Features

- **Modern UI:** Beautiful dark/light theme with gradients and responsive design.
- **Authentication:** Secure login and signup with JWT token-based authentication.
- **Blog Management:** Create, view, edit, and delete blogs with a rich, interactive interface.
- **Dashboard:** Personalized dashboard showing only your blogs.
- **Live Preview:** See your blog as you type before publishing.
- **Modals:** Read full blogs in scrollable modals for a seamless experience.
- **Protected Routes:** Only authenticated users can create, edit, or delete blogs.
- **Reusable Components:** Clean code with reusable Navbar and API utilities.
- **Error Handling:** User-friendly error messages and redirects.

---

## 🏗️ Project Structure

```
src/
│
├── api/                # API utility functions for backend communication
│   ├── authApi.js
│   └── blogApi.js
│
├── components/         # Reusable React components
│   └── Navbar.jsx
│
├── pages/              # Main application pages
│   ├── Dashboard.jsx
│   ├── CreateBlog.jsx
│   ├── EditBlog.jsx
│   ├── Index.jsx
│   ├── Login.jsx
│   ├── Signup.jsx
│   └── ViewBlog.jsx
│
├── styles/             # Custom CSS styles
│   └── main.css
│
├── App.jsx             # Main app component with routes
└── index.js            # Entry point
```

---

## 🖥️ Main Pages

- **Home (`Index.jsx`):**  
  See all public blogs, open any blog in a modal, and navigate to create your own.

- **Login & Signup (`Login.jsx`, `Signup.jsx`):**  
  Secure authentication with JWT. User-friendly forms and error handling.

- **Dashboard (`Dashboard.jsx`):**  
  View only your blogs in a beautiful card layout. Click a card to read the full blog in a modal.

- **Create Blog (`CreateBlog.jsx`):**  
  Write and preview your blog in a modern editor. Only accessible when logged in.

- **Edit Blog (`EditBlog.jsx`):**  
  Update your existing blogs. Protected by authentication.

- **View Blog (`ViewBlog.jsx`):**  
  Read any blog in detail, with options to edit or delete if you are the author.

---

## 🔒 Authentication & Protected Routes

- JWT token is stored in `localStorage` after login.
- All protected API calls (dashboard, create, edit, delete) send the token in the `Authorization` header.
- If not authenticated, users are redirected to the login page.

---

## 🛠️ API Integration

- **API utilities** in `src/api/` handle all backend communication.
- Endpoints used:
  - `POST /login` and `POST /signup` for authentication.
  - `GET /` for all blogs.
  - `GET /dashboard` for user's blogs (requires JWT).
  - `POST /create`, `PUT /edit/:id`, `DELETE /delete/:id` for blog management (all require JWT).

---

## 🎨 Styling

- Uses custom CSS in `src/styles/main.css` for a modern, responsive look.
- Gradient backgrounds, card layouts, and modals for a professional feel.

---

## 🧑‍💻 How to Run Locally

1. **Clone the repo:**
   ```bash
   git clone <your-repo-url>
   cd <your-repo-folder>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Make sure your backend is running and accessible at `http://127.0.0.1:5000` (or update the API URLs in `src/api/`).**

---

## 📝 Customization

- **Change the theme:**  
  Edit `main.css` or use MUI's ThemeProvider for more advanced theming.

- **Add new features:**  
  Create new pages in `src/pages/` and add routes in `App.jsx`.

- **API endpoints:**  
  Update `src/api/authApi.js` and `src/api/blogApi.js` if your backend endpoints change.

- **Custom Components:**  
  Create new components in `src/components/` for reusability.

- **Styling Options:**  
  - Modify color schemes in `main.css`
  - Add animations for transitions
  - Customize card layouts and modals

---

## 🌍 Deployment

- Build the app for production:
  ```bash
  npm run build
  ```
- Deploy the `build/` folder to your favorite static hosting (Vercel, Netlify, GitHub Pages, etc.).

### Deployment Platforms

- **Vercel:**  
  Connect your GitHub repository and Vercel will automatically deploy your app.

- **Netlify:**  
  Drag and drop your `build` folder or connect your GitHub repository.

- **GitHub Pages:**  
  Add `"homepage": "https://ADRITA-art.github.io/blogasaurus-frontend"` to `package.json` and run:
  ```bash
  npm run deploy
  ```

---

## 📦 Dependencies

- React
- react-router-dom
- @mui/material (if using Material UI)
- Other dependencies as listed in `package.json`

### Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| React | 18.2.0 | UI Library |
| React Router | 6.x | Navigation |
| Material UI | 5.x | UI Components |
| Axios | 1.x | API Requests |

---

## 📣 Contributing

Pull requests and issues are welcome!  
Please open an issue to discuss your ideas or report bugs.

### How to Contribute

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 🔗 Hosted Link

[Live Demo](#)
<!-- Replace # with your deployed frontend URL -->

---

## 📧 Contact

For questions or support, open an issue or contact the maintainer.

### Contact Information

- **GitHub:** [@yourusername](https://github.com/ADRITA-art)
- **Email:** chakrabortyadrita04@gmail.com


---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 