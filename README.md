# Cardiff University Open Day Planner

A modern, responsive, and data-driven web application built for prospective students to explore and plan their Open Day experience at Cardiff University.

## Live Demo
** (https://jomanaImam.github.io/CUOpenDay/) **

## Project Overview
This project was developed as a technical placement exercise. The goal is to take raw Open Day JSON data and build a highly engaging, accessible, and user friendly interface that aligns with Cardiff University. 

For a detailed breakdown of the exact features and technical enhancements I implemented, please see the (REQUIREMENTS.md) file included in this repository.

## Key Features
* Dynamic Theming: OS detection for Dark/Light mode, with a manual override toggle (saved to localStorage).
* Advanced Search & Filtering: A custom search engine that cross references event names, departments, postcodes, and building locations.
* Interactive 3D UI: Custom CSS animations including glowing hover states, 3D flip cards for event details, and a responsive accordion mobile menu.
* Google Maps Integration: Dynamically generates map routing links using API coordinate and postcode data.

## Tech Stack
* Core: HTML5, TypeScript
* Styling: Tailwind CSS
* Build Tool: Vite

## How to Run Locally
To run this project on your local machine:

1. Clone the repository:
   git clone https://github.com/jomanaImam/CUOpenDay.git

2. Navigate to the project directory:
   cd CUOpenDayTest
   
3. Install the dependencies:
   npm install

4. Start the development server:
   npm run dev

   *Note: The application will run at `http://localhost:5173/CUOpenDay/`*