// Centralized styles for consistent appearance across components

// Text colors
export const textStyles = {
  primary: 'text-gray-800',   // Main text color
  secondary: 'text-gray-700', // Secondary/supporting text (slightly darker for better readability)
  highlight: 'text-blue-600', // Highlighted/accent text
  muted: 'text-gray-500',     // Less prominent text
};

// Section headings
export const headingStyles = {
  main: `text-2xl font-bold ${textStyles.primary} mb-4`,
  section: `text-xl font-bold ${textStyles.primary} mb-4`,
  subsection: `text-lg font-semibold ${textStyles.primary} mb-2`,
  item: `text-base font-medium ${textStyles.primary}`,
};

// Table styles
export const tableStyles = {
  headerCell: 'py-3 px-4 text-left font-semibold text-gray-700 border-b',
  headerCellCenter: 'py-3 px-4 text-center font-semibold text-gray-700 border-b',
  cell: `py-3 px-4 border-b ${textStyles.primary}`,
  cellCenter: `py-3 px-4 border-b text-center ${textStyles.primary}`,
  rowHover: 'hover:bg-gray-50',
  stickyCell: 'sticky left-0 bg-white',
  content: `${textStyles.primary}`, // Content inside cells
};

// Card and container styles
export const containerStyles = {
  card: 'bg-white p-6 rounded-lg shadow-md',
  section: 'mb-8',
  grid2col: 'grid grid-cols-1 md:grid-cols-2 gap-6',
  grid3col: 'grid grid-cols-1 md:grid-cols-3 gap-6',
  grid4col: 'grid grid-cols-1 md:grid-cols-4 gap-4',
};

// Icon styles
export const iconStyles = {
  base: `${textStyles.highlight} mr-2`,
  action: `${textStyles.highlight} hover:text-blue-800 cursor-pointer`,
};

// Button styles
export const buttonStyles = {
  primary: `bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded`,
  secondary: `bg-gray-200 hover:bg-gray-300 ${textStyles.primary} font-medium py-2 px-4 rounded`,
  link: `${textStyles.highlight} hover:text-blue-800 transition-colors cursor-pointer`,
};

// Category styles
export const categoryStyles = {
  frontier: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    full: 'bg-blue-50 border-blue-200'
  },
  open: { 
    bg: 'bg-green-50',
    border: 'border-green-200',
    full: 'bg-green-50 border-green-200'
  },
  enterprise: { 
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    full: 'bg-purple-50 border-purple-200'
  },
  image: { 
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    full: 'bg-yellow-50 border-yellow-200'
  },
  video: { 
    bg: 'bg-red-50',
    border: 'border-red-200',
    full: 'bg-red-50 border-red-200'
  },
  music: { 
    bg: 'bg-pink-50',
    border: 'border-pink-200',
    full: 'bg-pink-50 border-pink-200'
  },
  other: { 
    bg: 'bg-gray-50',
    border: 'border-gray-200',
    full: 'bg-gray-50 border-gray-200'
  },
};