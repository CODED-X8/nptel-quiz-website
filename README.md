# Interactive Quiz Application

A modern, highly interactive quiz application built with **React**, **Three.js**, and **Tailwind CSS**. Designed to deliver a premium learning experience, this application features immersive 3D backgrounds, particle effects, and dynamic theme switching, ensuring users stay engaged while testing their knowledge.

## Features

- **Multi-Subject Support**: Choose between different subjects such as *Forests and their Management* and *Education for Sustainable Development*.
- **Dynamic Quiz Modes**: 
  - **Weekly Quizzes**: Filter and take quizzes based on specific weeks.
  - **Mixed Mode**: Test your knowledge across all available questions in a randomized order.
  - **Mock Examinations**: A strict exam environment generating a 50-question mock paper.
    - Features a persistent countdown timer (180 minutes).
    - Cheating deterrence via automatic browser fullscreen enforcement, tab-switch logging, and exit prompts.
    - Specialized grading mapping (S and A grades).
    - Generates a detailed exam report highlighting accurate breakdowns and correct answers.
  - **Smart Filtering**: Automatically filters out introductory "Week 0" questions from rigorous test modes.
- **Randomization Engine**: Questions and their multiple-choice options are dynamically shuffled using the Fisher-Yates algorithm every time a quiz is started to prevent memorization of answer positions.
- **Immersive UI/UX**:
  - Interactive **3D Backgrounds** powered by React Three Fiber.
  - Interactive **Particle Effects** powered by tsparticles.
  - Seamless **Dark / Light Mode** switching with smooth gradient transitions.
  - Glassmorphic card designs using Tailwind CSS.
- **Navigation Controls**: Includes a progress bar and the ability to go back and review previous questions without losing current answers.

## Tech Stack

- **Framework**: React 19 via Vite
- **Styling**: Tailwind CSS v4, clsx, tailwind-merge
- **UI Icons**: Lucide React
- **3D & Animations**: Three.js, @react-three/fiber, @react-three/drei, @tsparticles/react
- **Analytics**: Vercel Analytics

## Getting Started

### Prerequisites

You need [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository and navigate to the project folder:
   ```bash
   cd fm
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Data Management

Quiz questions are stored locally in the `src/assets/` directory as JSON files:
- `forest.json`
- `education.json`

You can update or add new questions by editing these JSON files.

## Scripts Context

`parseQuestions.cjs`: A utility script available in the project root to help parse and format raw question text into the required JSON structure.
