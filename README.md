# Zone01 Student Dashboard

A modern, interactive dashboard for Zone01 students to track their progress and statistics.

## 🚀 Getting Started

### Prerequisites

- Valid Zone01 student account
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Usage

1. **Access the Dashboard**

   - Open `index.html` in your web browser
   - Or serve using a local server: `python -m http.server 8000`

2. **Login**
   - Enter your Zone01 username or email
   - Enter your password
   - Click "Login" to access your dashboard

## 📊 Dashboard Features

### Profile Overview

- **Basic Information**: Name, ID, campus, GitHub profile
- **Contact Details**: Email, phone, address (expandable section)
- **Professional Info**: Company, position, situation
- **Emergency Contacts**: Emergency contact information

### Statistics Cards

- **Total XP**: Combined experience points from all paths
- **Piscine Go XP**: Experience from Go piscine projects
- **Piscine JS XP**: Experience from JavaScript piscine projects
- **Cursus XP**: Experience from main curriculum projects
- **Projects Completed**: Number of successfully finished projects
- **Audit Ratio**: Success rate in peer evaluations

### Interactive Charts

- **Cumulative XP Chart**: Shows XP progress over time
- **Project Success Rate**: Visual representation of audit performance
- **XP Distribution**: Breakdown of XP by different learning paths

### Navigation Tabs

- **Total**: View combined statistics from all learning paths
- **Cursus**: Main curriculum progress and statistics
- **Piscine Go**: Go piscine specific data
- **Piscine JS**: JavaScript piscine specific data

## 🎨 Visual Features

### Animated Background

- Dynamic chiaroscuro lighting effects
- Smooth particle animations
- Responsive to screen size

### Interactive Elements

- **Hover Effects**: Enhanced tooltips on charts
- **Expandable Sections**: Click "More Info" to view additional details
- **Responsive Design**: Adapts to different screen sizes

## 🔧 Technical Features

### Authentication

- Secure token-based login
- Automatic session validation
- Secure logout functionality

### Data Management

- Real-time GraphQL API integration
- Efficient data filtering by learning path
- Automatic XP calculations and statistics

### Performance

- Optimized chart rendering
- Lazy loading of extended data
- Responsive SVG graphics

## 📱 Mobile Support

The dashboard is fully responsive and works on:

- Desktop computers
- Tablets
- Mobile phones
- All modern browsers

## 🔒 Privacy & Security

- **No Data Caching**: User data is not stored locally for privacy
- **Secure Authentication**: Uses Zone01's official authentication system
- **Token Management**: Automatic token validation and refresh

## 💡 Tips for Best Experience

1. **Charts**: Hover over data points for detailed information
2. **Navigation**: Use the top navigation to switch between different learning paths
3. **Additional Info**: Click "More Info" to expand contact and professional details
4. **Mobile**: Swipe on mobile devices for better chart interaction

## 🛠️ Troubleshooting

### Login Issues

- Verify your Zone01 credentials
- Check internet connection
- Clear browser cache if needed

### Display Problems

- Ensure JavaScript is enabled
- Try refreshing the page
- Check browser compatibility

### Data Not Loading

- Verify you're connected to the internet
- Ensure you have access to Zone01 API
- Try logging out and back in

## 📈 What the Data Shows

- **XP (Experience Points)**: Points earned from completed projects
- **Audit Ratio**: Ratio of points given vs received in peer evaluations
- **Progress Tracking**: Visual representation of learning journey
- **Path Separation**: Clear distinction between different learning tracks

## 🎯 Project Structure

```
Zone01 Dashboard/
├── index.html          # Main application page
├── src/
│   ├── css/
│   │   └── style.css   # Styling and animations
│   └── js/
│       ├── main.js     # Application entry point
│       ├── api.js      # Zone01 API integration
│       ├── auth/       # Authentication modules
│       ├── charts/     # Chart rendering
│       ├── ui/         # User interface components
│       └── handlers/   # Event handlers
└── README.md          # This file
```

Enjoy tracking your Zone01 progress! 🎓
