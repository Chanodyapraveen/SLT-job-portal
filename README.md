# SLT Job Portal

Welcome to the SLT Job Portal project! This is a web application built using Next.js that allows users to browse and apply for jobs. Below are the details on how to set up and run the project.

## Features

- User authentication (login and registration)
- Job listings with detailed views
- Responsive design
- Easy navigation

## Folder Structure

```
slt-job-portal
├── public
│   └── favicon.ico
├── src
│   ├── components
│   │   ├── JobCard.tsx
│   │   ├── JobList.tsx
│   │   └── Header.tsx
│   ├── pages
│   │   ├── index.tsx
│   │   ├── jobs.tsx
│   │   ├── job
│   │   │   └── [id].tsx
│   │   ├── login.tsx
│   │   └── register.tsx
│   ├── styles
│   │   └── globals.css
│   ├── utils
│   │   └── api.ts
│   └── types
│       └── job.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Getting Started

To get started with the SLT Job Portal, follow these steps:

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd slt-job-portal
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Run the development server:**
   ```
   npm run dev
   ```

4. **Open your browser and navigate to:**
   ```
   http://localhost:3000
   ```

## Usage

- **Homepage:** Displays featured jobs and an introduction to the portal.
- **Job Listings:** Navigate to the jobs page to view all available job postings.
- **Job Details:** Click on a job to view detailed information.
- **Authentication:** Users can log in or register to apply for jobs.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.