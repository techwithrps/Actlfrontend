/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        actl: {
          red: '#D8232A',
          redDark: '#B91C1C',
          redLight: '#FEE2E2',
          blue: '#008DD2',
          blueHover: '#007BB8',
          blueLight: '#E0F2FE',
          navy: '#0F172A',
          navyDark: '#0A0F1D',
          surface: '#ffffff',
          bg: '#F8FAFC',
          border: '#E2E8F0',
          borderDark: '#CBD5E1',
          textDark: '#0F172A',
          textMuted: '#64748B',
          textLight: '#94A3B8',
        },
        spj: {
          purpleDark: '#0F172A',
          purple: '#D8232A',
          purpleHover: '#B91C1C',
          purpleLight: '#FEE2E2',
          navy: '#0F172A',
          orange: '#008DD2',
          orangeHover: '#007BB8',
          orangeLight: '#E0F2FE',
          cyan: '#008DD2',
          cyanLight: '#E0F2FE',
          surface: '#ffffff',
          bg: '#F8FAFC',
          border: '#E2E8F0',
          borderDark: '#CBD5E1',
          textDark: '#0F172A',
          textMuted: '#64748B',
          textLight: '#94A3B8',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Avenir', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Outfit', 'Avenir', 'sans-serif'],
        heading: ['"Plus Jakarta Sans"', 'Avenir', 'sans-serif'],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.02)',
        'card': '0 4px 20px -2px rgba(216, 35, 42, 0.06)',
        'elevated': '0 10px 30px -5px rgba(15, 23, 42, 0.1)',
        'red-glow': '0 4px 20px -2px rgba(216, 35, 42, 0.35)',
        'blue-glow': '0 4px 20px -2px rgba(0, 141, 210, 0.35)',
      }
    },
  },
  plugins: [],
}
