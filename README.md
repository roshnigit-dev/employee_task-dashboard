
FlowBoard - Employee Task Dashboard

FlowBoard is a modern, clean task management dashboard for employees built with React, TypeScript and Tailwind CSS. Track total tasks, completed work, pending items, and manage priorities - all in one place.

FlowBoard Dashboard](./public/dashboard.png)
[Create Task Page](./public/create-task.png)
✨ Key Features

- **Dashboard Analytics**: View Total Tasks, Completed Tasks, and Pending Tasks at a glance
- **Task Management**: Create, edit, delete tasks with title, description, priority, and due date
- **Smart Filters**: Filter tasks by All, Pending, Completed, or High Priority
- **Search Functionality**: Search tasks instantly by title
- **Priority Levels**: Set Low, Medium, or High Priority for better task organization
- **Due Date Tracking**: Add deadlines to tasks to stay on schedule
- **One-Click Actions**: Mark tasks complete, edit, or delete directly from the card
- **Intuitive Forms**: Clean "Create New Task" page with validation
- **Responsive UI**: Clean, minimal design that works on all devices
- **Fast Performance**: Built with Vite for instant HMR and lightning-fast builds

🛠 Tech Stack

| Layer | Technology |
| --- | --- |
| **Framework** | React 18 + Vite |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Routing** | React Router DOM |
| **Icons** | Lucide React |
| **Build Tool** | Vite |
| **Linting** | ESLint |

📁 Project Structure

employee_task-dashboard/
├── public/
│   ├── http://dashboard.png       # Dashboard screenshot
│   └── http://create-task.png     # Create task screenshot
├── src/
│   ├── components/         # TaskCard, StatsCard, FilterTabs, etc.
│   ├── pages/
│   │   ├── http://Dashboard.tsx   # Main dashboard view
│   │   └── http://AddTask.tsx     # Create new task page
│   ├── types/              # http://Task.ts interface
│   ├── http://App.tsx             # Routes setup
│   └── http://main.tsx            # Entry point
├── .gitignore
├── http://index.html
├── http://package.json
├── http://tailwind.config.js
├── http://tsconfig.json
├── http://tsconfig.app.json
├── http://tsconfig.node.json
└── http://vite.config.ts

🚀 Getting Started

Prerequisites

- Node.js v18+
- npm or yarn

Installation

1. **Clone the repo**
```bash
git clone https://github.com/roshnigit-dev/employee_task-dashboard.git
cd employee_task-dashboard
2. *Install dependencies*
npm install
3. *Add environment variables*
Create `.env` in root:
VITE_API_URL=http://localhost:5000/api
4. *Run the app*
npm run dev
Open `http://localhost:5173` to view FlowBoard.

📦 Available Scripts
Command	Description
`npm run dev`	Start development server
`npm run build`	Build for production
`npm run preview`	Preview production build
`npm run lint`	Run ESLint checks
📝 Task Creation

Navigate to `/add` or click `+ Add` button to create a new task. Each task includes:
Field	Type	Required	Description
**Task Title**	Text	Yes	Short, descriptive title
**Description**	Textarea	Yes	Detailed info about what needs to be done
**Priority Level**	Dropdown	No	Low, Medium, or High Priority
**Due Date**	Date Picker	Yes	Task deadline in MM/DD/YYYY format
🎯 App Flow

1. *Dashboard `/`*: View all tasks, stats cards, search & filter
2. *Create Task `/add`*: Fill the form → Click `Create Task` → Redirect to dashboard
3. *Edit Task*: Click edit icon on task card → Update details → Save
4. *Complete Task*: Click `Mark complete` → Status updates to Completed

📌 Screenshots

1. Main Dashboard
Shows total, completed, pending stats + task list with filters
`./public/dashboard.png`

2. Create New Task Page
Clean form with Task Title, Description, Priority Level, Due Date
`./public/create-task.png`

🔮 Roadmap

- [ ] Backend API with http://Node.js + Express
- [ ] User authentication & login
- [ ] MongoDB/PostgreSQL for data persistence
- [ ] Drag & drop to reorder tasks
- [ ] Due date reminders & notifications
- [ ] Dark mode toggle
- [ ] Export tasks to CSV/PDF

🤝 Contributing

Contributions are welcome! Fork the repo and submit a PR.

📄 License

MIT License - feel free to use this project for learning or commercial purposes.

*FlowBoard* - Manage tasks, flow better.
