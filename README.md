# WAYRY 🗣️🔄

Welcome to **WAYRY** (short for Why Are You Repeating Yourself), the app designed to track and analyze the repetitive speech patterns of your friends, colleagues, or anyone else you talk to! Whether you’re just curious or want to have some fun pointing out how often they repeat themselves, this app is your perfect tool. Not weird or useless at all, right?😉

## 📋 Table of Contents
- [Why Are You Repeating Yourself?](#-why-are-you-repeating-yourself)
- [Features](#-features)
- [Development Setup](#-development-setup)
- [Project Structure](#-project-structure)
- [Technologies Used](#-technologies-used)
- [Contributing](#-contributing)
- [Author](#-author)
- [Acknowledgments](#-acknowledgments)
- [Feedback](#-got-feedback-for-me)

## ✨ Why Are You Repeating Yourself?

### **Try the App Now!**  
Explore WAYRY at: [wayry.vercel.app](https://wayry.vercel.app)

- **Guest Mode**: Use the app without signing in, and enjoy the core features without any hassle.
- **Sign in**: Unlock extra features by logging in to save data, track multiple people, and analyze their speech patterns in your personal dashboard!

## 📱 Features

### 1. **Track Speech Patterns**
- Record and track how many times your "target" repeats certain sentences or words in a conversation.
- Collect data over time to analyze speech repetition habits.

### 2. **Guest & User Modes**
- Use the app freely as a guest, or sign in for advanced features like saving tracked data and managing multiple "targets."

### 3. **Personal Dashboard**
- **Logged-in users** can access a dashboard where they can view, edit, and track the sentences and people they are monitoring over time.

### 4. **Speech Data Analysis**
- Review speech repetition trends and patterns for each target in a simple and user-friendly interface.

### 5. **Simple UI**
- Designed for ease of use, with clean navigation and a fun user experience—perfect for analyzing speech in a non-intrusive, fun way!

## 💻 Development Setup

Want to explore the code or contribute to the project? Here’s how you can run it locally:

### 1. Clone the Repository

```bash
git clone https://github.com/farisfaikar/wayry.git
cd wayry
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

> **Note**: The project was initially using [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to optimize fonts, but due to some bugs, that feature was removed.

### 4. Open Your Local Development Site

Visit [http://localhost:3000](http://localhost:3000) in your browser to view and interact with the app.

Here’s the updated **Project Structure** section in the required format:

## 📂 Project Structure

```bash
.
├── app/                # Application core files
│   ├── components/     # Reusable UI components
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Library and utility functions
│   └── server/         # Backend server-side logic
├── public/             # Static assets (e.g., images, logos)
├── types/              # TypeScript types and interfaces
├── .env.example        # Example of environment variables
├── .eslintrc.js        # ESLint configuration file
├── .gitignore          # Git ignore file
├── .prettierrc.js      # Prettier configuration file
├── CODE_OF_CONDUCT.md  # Code of conduct for contributors
├── README.md           # Project README (this file)
├── drizzle.config.ts   # Drizzle ORM configuration
├── next.config.mjs     # Next.js configuration
├── postcss.config.mjs  # PostCSS configuration
├── tailwind.config.ts  # TailwindCSS configuration
├── tsconfig.json       # TypeScript configuration
├── package.json        # Project dependencies and scripts
└── package-lock.json   # Lockfile for project dependencies
```

## 🛠️ Technologies Used

| Tool / Technology         | Purpose                                        |
|---------------------------|------------------------------------------------|
| **Next.js**                | Framework for building the app's frontend      |
| **Typescript**             | Ensuring type safety and catching errors early |
| **TailwindCSS**            | Utility-first CSS framework for styling        |
| **NextAuth**               | Authentication for handling user sessions      |
| **Shadcn/UI**              | Accessible UI components for building the UI   |
| **NeonDB**                 | PostgreSQL database for efficient data storage |
| **Drizzle ORM**            | Lightweight ORM for database interactions      |
| **Vercel**                 | Hosting and deployment platform                |

## 🤝 Contributing

Contributions are always welcome! Feel free to open issues or submit pull requests on GitHub. 

But... if you're reading this around Hacktoberfest season, maybe wait until then for some extra perks? 🎃

## 👤 Author

**Sarthak Sachdev**  
- **Website**: [Faris Faikar](https://farisfaikar.vercel.app/)  
- **LinkedIn**: [@farisfaikar](https://www.linkedin.com/in/farisfaikar/)
- **Twitter**: [@farisfaikar_0](https://x.com/farisfaikar_0/)

## 💬 Got Feedback for Me?

I love receiving feedback! I’m always looking to improve my code and take up new innovative ideas to work on. So if you have any feedback, feel free to email me at:  
📧 farisfaikar.r[at]gmail[dot]com

## License

Copyright © 2021 [farisfaikar](https://github.com/farisfaikar). <br/>
[MIT](https://choosealicense.com/licenses/mit/)

## Support
Please ⭐️ this repository if this project ~~helped you~~ makes you laugh! 
**Happy coding!** ☺️🚀