import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  theme: {
    extend: {
      colors: {
        'primary-bg': '#000',
        'secondary-bg': '#fbfaf9',
        'sidebar-selected': '#e8e8e8',
        searchbar: '#f8f8f7',
        main: '#272727',
        muted: '#999999',
        'btn-primary': '#284cff',
        'btn-secondary': '#d4dbff',
        'btn-primary-text': '#ffffff',
        'btn-secondary-text': '#284cff',
        // Status and priority
        'priority-high': '#FF5B5B',
        'priority-medium': '#FFC93C',
        'priority-low': '#00D097',
        'status-todo': '#335CFF',
        'status-progress': '#16A34A',
        'status-completed': '#6D28D9',
        'status-overdue': '#335CFF',
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
