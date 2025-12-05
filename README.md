# MoneyGuard - Modern Money Management App

A beautiful, modern money management web application built with React, TypeScript, and Vite. Features elegant design with light/dark mode support and glassmorphism effects.

## ✨ Features

- 💰 **Financial Dashboard** - Track your balance, income, and expenses at a glance
- 📊 **Transaction Management** - Add, view, and delete transactions easily
- 🌓 **Light/Dark Mode** - Seamless theme switching with persistent preferences
- 🎨 **Modern Design** - Glassmorphism effects, smooth animations, and gradient accents
- 📱 **Responsive** - Works beautifully on desktop, tablet, and mobile devices
- ♿ **Accessible** - WCAG compliant with keyboard navigation and reduced motion support
- ⚡ **Fast** - Built with Vite for lightning-fast development and optimized builds

## 🎨 Design Highlights

### Color Palette (Fintech-inspired)
- **Primary**: Amber gradient (#F59E0B → #FBBF24)
- **Secondary**: Purple (#8B5CF6)
- **Success**: Green (#10B981)
- **Danger**: Red (#EF4444)

### Typography
- **Headings**: Poppins (Modern, Professional)
- **Body**: Open Sans (Clean, Readable)

### UI Features
- Glass morphism cards with backdrop blur
- Smooth micro-animations (200-300ms)
- Gradient text effects
- Hover state transitions
- Floating header with glass effect
- Responsive grid layouts

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd money_guard_ui
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5173
```

## 📦 Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist` directory.

## 🎯 Usage

### Adding a Transaction
1. Click the "Add Transaction" button in the dashboard
2. Select transaction type (Income or Expense)
3. Choose a category
4. Enter the amount and description
5. Click "Add Transaction"

### Switching Themes
Click the sun/moon icon in the header to toggle between light and dark modes. Your preference is automatically saved.

### Viewing Transactions
All transactions are listed below the dashboard with:
- Category icons
- Amount with color coding (green for income, red for expenses)
- Relative dates (Today, Yesterday, or specific date)
- Delete option (hover to reveal)

## 🏗️ Project Structure

```
money_guard_ui/
├── src/
│   ├── components/
│   │   ├── Header.tsx              # Navigation and theme toggle
│   │   ├── Header.css
│   │   ├── Dashboard.tsx           # Financial overview cards
│   │   ├── Dashboard.css
│   │   ├── TransactionList.tsx     # Transaction history
│   │   ├── TransactionList.css
│   │   ├── AddTransactionModal.tsx # Add transaction form
│   │   └── AddTransactionModal.css
│   ├── App.tsx                     # Main app component
│   ├── App.css
│   ├── main.tsx                    # React entry point
│   ├── index.css                   # Global styles & design system
│   └── vite-env.d.ts              # TypeScript declarations
├── index.html                      # HTML entry point
├── vite.config.ts                  # Vite configuration
├── tsconfig.json                   # TypeScript configuration
└── package.json                    # Dependencies and scripts

```

## 🎨 Design System

### CSS Custom Properties
All colors, spacing, typography, and effects are defined as CSS custom properties in `src/index.css`, making it easy to customize the theme.

### Key Variables:
- `--color-primary`: Primary brand color
- `--color-bg-primary`: Main background color
- `--color-text-primary`: Main text color
- `--spacing-md`: Medium spacing (1rem)
- `--radius-lg`: Large border radius
- `--transition-base`: Standard transition timing

### Utility Classes:
- `.glass-card`: Glassmorphism effect
- `.btn-primary`: Primary button style
- `.fade-in`: Fade in animation
- `.slide-in`: Slide in animation

## 🔧 Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **CSS3** - Styling with custom properties
- **Google Fonts** - Poppins & Open Sans

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## ♿ Accessibility Features

- Semantic HTML5 elements
- ARIA labels for icon buttons
- Keyboard navigation support
- Focus visible states
- Respects `prefers-reduced-motion`
- Sufficient color contrast (WCAG AA+)

## 🎯 Future Enhancements

- [ ] Data persistence (LocalStorage/Backend API)
- [ ] Charts and analytics
- [ ] Budget planning
- [ ] Category customization
- [ ] Export transactions (CSV/PDF)
- [ ] Multi-currency support
- [ ] Recurring transactions
- [ ] Search and filters

## 📄 License

MIT License - feel free to use this project for learning or personal use.

## 🙏 Acknowledgments

- Design inspired by modern fintech applications
- Icons: Custom SVG icons
- Fonts: Google Fonts (Poppins, Open Sans)
- UI/UX guidance from UI Pro Max workflow

---

Built with ❤️ using React + TypeScript + Vite
