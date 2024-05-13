# GitHub Repository Manager

GitHub Repository Manager is a React application that allows users to browse, search, filter, and manage GitHub repositories. Users can view a paginated list of repositories, see detailed information about each repository, create new repositories, update repository details, and delete repositories.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd github-repo-manager
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Usage

1. Start the development server:

   ```bash
   npm start
   ```

2. Open your browser and navigate to `http://localhost:3000` to view the application.

## Features

- View a paginated list of GitHub repositories.
- Search and filter repositories based on various criteria.
- View detailed information about a single repository.
- Create new repositories using a modal dialog.
- Update repository details.
- Delete repositories.

## Technologies Used

- React: Frontend library for building user interfaces.
- React Router: Library for routing and nested routes in React applications.
- Axios: Promise-based HTTP client for making requests to the GitHub API.
- ErrorBoundary: Component from React for error handling.
- CSS: CSS and Tailwind css was used to in styling the application.
- Modal component: headlessui Library was use in creating modal dialogs for adding new repo.
