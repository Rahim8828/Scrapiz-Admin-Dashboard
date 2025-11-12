# Green + White Theme Guide

## 🎨 Color Palette

### Primary Colors
- **Primary Green**: `hsl(142, 76%, 36%)` - #22c55e (Rich green)
- **Light Green**: `hsl(138, 40%, 96%)` - #f0fdf4 (Very light green)
- **White**: `hsl(0, 0%, 100%)` - #ffffff (Pure white)

### Shades of Green
- **Dark Green Text**: `hsl(140, 10%, 20%)` - For headings and important text
- **Medium Green**: `hsl(142, 60%, 50%)` - For accents and highlights
- **Light Green Background**: `hsl(138, 30%, 95%)` - For muted backgrounds
- **Green Border**: `hsl(138, 20%, 90%)` - For subtle borders

### Supporting Colors
- **Success**: Green (primary)
- **Warning**: Keep orange for alerts
- **Error**: Keep red for errors
- **Info**: Teal green `hsl(160, 50%, 50%)`

## 🎯 Where Colors Are Applied

### Global Theme (globals.css)
```css
--primary: 142 76% 36%;        /* Rich green */
--background: 0 0% 100%;       /* Pure white */
--secondary: 138 40% 96%;      /* Very light green */
--muted: 138 30% 95%;          /* Light green muted */
--border: 138 20% 90%;         /* Light green border */
```

### Dashboard Components

#### KPI Cards
- Background: White with green borders
- Icons: Green background circles
- Text: Dark green headings
- Trends: Green indicators

#### Navigation
- Active state: Green background
- Hover: Green text
- Logo: Green circle

#### Buttons
- Primary: Green background, white text
- Secondary: Light green background
- Outline: Green border

#### Charts
- Chart 1: Primary green
- Chart 2-5: Various green shades

## 🔧 Customization

### Adjusting Green Intensity

**Lighter Green** (More subtle):
```css
--primary: 142 60% 45%;  /* Lighter */
```

**Darker Green** (More bold):
```css
--primary: 142 80% 30%;  /* Darker */
```

### Adjusting Background

**More Green Tint**:
```css
--background: 138 40% 98%;  /* Slight green tint */
```

**Pure White** (Current):
```css
--background: 0 0% 100%;  /* Pure white */
```

## 📱 Component-Specific Colors

### Dashboard Page
- Card borders: `border-green-100`
- Card titles: `text-green-900`
- Card values: `text-green-900`
- Icons: `text-green-600`
- Icon backgrounds: `bg-green-100`
- Trend indicators: `text-green-600`

### Layout
- Background: `bg-green-50/30` (Very subtle green tint)

### Tables
- Hover: Uses theme colors automatically
- Badges: Green variants for status

## 🎨 Design Principles

### Contrast
- Dark green text on white: Excellent readability
- White text on green: Clear call-to-actions
- Light green backgrounds: Subtle differentiation

### Hierarchy
1. **Primary**: Rich green for main actions
2. **Secondary**: Light green for less important elements
3. **Tertiary**: White with green borders for cards

### Accessibility
- All color combinations meet WCAG AA standards
- Sufficient contrast ratios
- Color is not the only indicator (icons + text)

## 🌈 Color Psychology

**Green represents**:
- ♻️ Recycling and environmental awareness
- ✅ Success and completion
- 🌱 Growth and sustainability
- 💚 Health and freshness
- 🤝 Trust and reliability

Perfect for a scrap collection/recycling platform!

## 🔄 Switching Themes

### To Blue Theme
```css
--primary: 200 70% 50%;  /* Blue */
```

### To Orange Theme
```css
--primary: 25 95% 53%;  /* Orange */
```

### To Purple Theme
```css
--primary: 262 83% 58%;  /* Purple */
```

## 📊 Before & After

### Before (Blue Theme)
- Primary: Blue (#3b82f6)
- Background: Light gray
- Accent: Orange

### After (Green Theme)
- Primary: Green (#22c55e)
- Background: Pure white
- Accent: Green

## 🎯 Brand Alignment

The green + white theme aligns perfectly with:
- ♻️ Recycling industry
- 🌍 Environmental consciousness
- 🌱 Sustainability focus
- 💚 Eco-friendly values

## 🚀 Implementation

All changes are in:
1. `src/app/globals.css` - Global color variables
2. `src/app/dashboard/page.tsx` - Component-specific colors
3. `src/app/dashboard/layout.tsx` - Background color

The theme automatically applies to:
- All UI components (buttons, inputs, etc.)
- Navigation
- Charts
- Badges
- Borders
- Focus states

## 💡 Tips

1. **Consistency**: Use theme colors instead of hardcoded values
2. **Contrast**: Always check text readability
3. **Accessibility**: Test with color blindness simulators
4. **Branding**: Adjust green shade to match your brand
5. **Testing**: View on different screens and lighting conditions

## 🎨 Color Palette Reference

```
Green Scale:
50:  #f0fdf4  (Lightest - backgrounds)
100: #dcfce7  (Very light - borders)
200: #bbf7d0  (Light - hover states)
300: #86efac  (Medium light)
400: #4ade80  (Medium)
500: #22c55e  (Primary - main green)
600: #16a34a  (Medium dark - icons)
700: #15803d  (Dark)
800: #166534  (Darker)
900: #14532d  (Darkest - text)
```

Use these values for consistent green theming throughout the app!
