# World Population Dashboard

A modern, interactive dashboard for visualizing global population data by regions and countries. Built as a technical challenge for SDG Group.

## 🚀 Features

- Global population overview with interactive visualizations
- Region/continent-specific population data
- Population filtering capabilities
- Interactive data visualization using treemap charts
- Smooth animations and transitions
- Data table view option

## 🛠️ Tech Stack

- **Framework:** Next.js
- **UI Libraries:**
  - React
  - Tailwind CSS
  - Shadcn UI
  - Framer Motion
- **State Management:** Zustand
- **Data Visualization:** Recharts
- **Data Fetching:** SWR
- **Type Safety:** TypeScript, Zod
- **Testing:** Vitest, React Testing Library
- **Code Quality:** ESLint, Prettier

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/tandemresistentia/sdg-group-test.git
cd sdg-group-test
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests

## 🏗️ Project Structure

```
src/
├── app/                   # Next.js pages and routes
├── components/            
│   ├── features/          # Feature-specific components
│   ├── shared/            # Reusable components
│   └── ui/                # Base UI components
├── config/                # Configuration files
├── constants/             # Application constants
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities and functions
├── store/                 # Global state management
├── styles/                # Application styles
├── test/                  # Initialization of tests
└── types/                 # TypeScript definitions
```

## 🌐 API Integration

The application uses the [REST Countries API](https://restcountries.com/) to fetch country data. The data is then processed and transformed for visualization purposes.

## 🧪 Testing

Tests are written using Vitest and React Testing Library. Run the test suite with:

```bash
npm test
```

## 📱 Responsive Design

The dashboard is fully responsive and works across:
- Desktop displays
- Tablets
- Mobile devices

## 🔐 Environment Variables

None required for basic setup. The application uses public APIs.

## 👥 Author

Luis Miguel Vargas Garrido (SDG Group Technical Test)

## 🙏 Acknowledgements

- [REST Countries API](https://restcountries.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Recharts](https://recharts.org/)
