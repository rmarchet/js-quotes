# JS Quotes

A modern React application that displays inspirational quotes with a retro 80s aesthetic. The app features an interactive animated background with geometric shapes that respond to user mouse movements, and displays quotes with author images.

## Features

- Retro 80s-style UI with neon colors and geometric patterns
- Interactive animated background with shapes that enlarge on mouse hover
- Display of quotes with author images
- Automatic fallback to colorful initials when images fail to load
- Loading indicators for a smooth user experience
- Responsive design that works on desktop and mobile devices

## Project Structure

```
js-quotes/ 
├── src/ 
│ ├── components/ 
│ │ ├── App.jsx # Main React application component 
│ │ ├── Background.jsx # Animated background component 
│ │ ├── Quote.jsx # Quote display component 
│ │ └── Image.jsx # Author image component with loading/error states 
│ ├── hooks/ 
│ │ └── useBackground.js # Custom hook for background animation logic 
│ ├── data/ 
│ │ └── quotes.js # Collection of quotes with author info 
│ ├── styles/ 
│ │ ├── App.css # Main application styles 
│ │ ├── Background.css # Styles for the animated background 
│ │ ├── Quote.css # Styles for quote display 
│ │ └── Image.css # Styles for author images 
│ ├── index.html # Main HTML file 
│ └── index.jsx # Application entry point 
├── rollup.config.js # Rollup configuration 
├── package.json # Project dependencies and scripts 
└── README.md # Project documentation
```



## Getting Started

To get started with this project, follow these steps:

1. **Clone the repository:**

```
git clone https://github.com/rmarchet/js-quotes.git cd js-quotes
```

1. **Install dependencies:**
```
yarn install
```

3. **Run the development server:**

```
yarn start
```

This will start the development server with hot reload functionality. You can view the application in your browser at `http://localhost:3000`.

## Building for Production

To build the application for production, run:
```
yarn build
```

This will create a production-ready bundle in the `dist` directory.

## Technical Highlights

- **Canvas Animation**: Custom-built reactive animations using HTML5 Canvas
- **React Hooks**: Extensive use of React hooks for state management and custom logic
- **Responsive Design**: Adapts to different screen sizes while maintaining the visual appeal
- **Optimized Performance**: Uses caching techniques to maintain smooth animations
- **Image Error Handling**: Graceful fallback when author images fail to load

## How It Works

The app uses a custom hook `useBackground` to create and manage the animated background with geometric shapes. The shapes respond to mouse movement, enlarging when the cursor is nearby. The main content area displays quotes from famous authors along with their images, which are loaded asynchronously with a loading indicator.

If an author's image fails to load, the app automatically generates a colorful placeholder with the author's initials, matching the overall aesthetic of the application.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
