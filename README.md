# Inklet - Cross-Platform Ebook Reader

Inklet is a modern, cross-platform ebook reader built with React Native. It provides a clean and intuitive interface for reading various ebook formats on both Android and iOS devices.

## Features

- Support for multiple ebook formats (ePub, PDF, TXT)
- Dark mode support
- Customizable font size and reading preferences
- Local storage for books and reading progress
- Bookmarking functionality
- Reading progress tracking
- Clean and intuitive user interface
- Cross-platform compatibility (iOS & Android)

## Tech Stack

- React Native
- TypeScript
- Zustand (State Management)
- React Navigation
- NativeWind (Tailwind CSS for React Native)
- React Native Vector Icons
- AsyncStorage for local data persistence

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- React Native development environment set up
- Xcode (for iOS development)
- Android Studio (for Android development)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/inklet.git
cd inklet
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Install iOS dependencies:
```bash
cd ios && pod install && cd ..
```

4. Start the development server:
```bash
npm start
# or
yarn start
```

5. Run the app:
```bash
# For iOS
npm run ios
# or
yarn ios

# For Android
npm run android
# or
yarn android
```

## Project Structure

```
src/
├── assets/         # Images, fonts, and other static assets
├── components/     # Reusable UI components
├── constants/      # App constants and configuration
├── hooks/          # Custom React hooks
├── screens/        # Screen components
├── services/       # Business logic and API services
├── store/          # State management (Zustand)
└── utils/          # Utility functions and helpers
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- React Native community
- All contributors and supporters of the project 