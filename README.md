# Mini Seller Console 🚀

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

A lightweight console built with React and TypeScript for triaging and converting Leads into Opportunities. This project was developed as a frontend challenge, focusing on code structure, componentization, and client-side state management.

## Features

* **Lead Listing**: Loads and displays a list of leads from a local JSON file.
* **Search and Filters**:
    * Dynamic search by lead name or company name.
    * Filter by lead status (`New`, `Contacted`, `Qualified`, `Lost`).
    * Automatic sorting of the list by `score` (descending).
* **Add Leads**: Opens a modal with a form to add new leads to the list.
* **Details Panel**: Clicking on a lead displays a slide-over panel, allowing the editing of information such as email and status.
* **Lead Conversion**: A lead can be converted into an "Opportunity," moving it from the leads list to a new opportunities table.
* **Pagination**: Both the Leads and Opportunities tables have pagination controls to efficiently handle large volumes of data.
* **UI States**: The interface handles loading, empty, and error states.

## 💻 Tech Stack

* **Framework**: [React](https://react.dev/) (with [Vite](https://vitejs.dev/))
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **Package Manager**: [npm](https://www.npmjs.com/)

## 📂 Project Structure

The project is organized with a focus on separation of concerns and component reusability.

```
/src
|-- /components    # Reusable components (Tables, Modal, Panel, etc.)
|-- /data          # Local leads.json file
|-- /types         # Type definitions (Lead, Opportunity)
|-- App.tsx        # Main component that manages the application state
|-- index.css      # Global styles and Tailwind directives
|-- main.tsx       # React application entry point
```

## 🚀 Getting Started

Follow the steps below to run the project in your local environment.

**Prerequisites:**
* [Node.js](https://nodejs.org/en) (LTS version recommended)
* [npm](https://www.npmjs.com/)

**Steps:**

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/mini-seller-console.git](https://github.com/your-username/mini-seller-console.git)
    ```

2.  **Navigate to the project folder:**
    ```bash
    cd mini-seller-console
    ```

3.  **Install the dependencies:**
    ```bash
    npm install
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

After running the last command, Vite will start a local development server. Open your browser and navigate to `http://localhost:5173` (or the port indicated in your terminal) to see the application running.

### Other Scripts

* **Production Build**: To create an optimized version of the application for deployment.
    ```bash
    npm run build
    ```
* **Preview Build**: To test the production build locally.
    ```bash
    npm run preview
    ```

## ✒️ Author

Made with ❤️ by **Rônero**.
