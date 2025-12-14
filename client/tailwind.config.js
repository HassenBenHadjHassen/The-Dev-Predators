/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px'
            }
        },
        extend: {
            colors: {
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))'
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))'
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))'
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))'
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))'
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))'
                },
                sidebar: {
                    DEFAULT: 'hsl(var(--sidebar-background))',
                    foreground: 'hsl(var(--sidebar-foreground))',
                    primary: 'hsl(var(--sidebar-primary))',
                    'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
                    accent: 'hsl(var(--sidebar-accent))',
                    'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
                    border: 'hsl(var(--sidebar-border))',
                    ring: 'hsl(var(--sidebar-ring))'
                },
                // Liquid Colors
                'liquid-red': '#E74C3C',
                'liquid-blue': '#3498DB',
                'liquid-green': '#2ECC71',
                'liquid-yellow': '#F1C40F',
                'liquid-purple': '#9B59B6',
                'liquid-orange': '#E67E22',
                'liquid-teal': '#1ABC9C',
                'liquid-pink': '#FF80AB',
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' }
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' }
                },
                'pour': {
                    '0%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                    '100%': { transform: 'translateY(100%)' }
                },
                'fill': {
                    '0%': { height: '0%' },
                    '100%': { height: '100%' }
                },
                'bubble': {
                    '0%': { opacity: '0', transform: 'scale(0.8) translateY(0px)' },
                    '50%': { opacity: '1', transform: 'scale(1) translateY(-10px)' },
                    '100%': { opacity: '0', transform: 'scale(0.8) translateY(-20px)' }
                },
                'float-in': {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' }
                },
                'scale-in': {
                    '0%': { opacity: '0', transform: 'scale(0.9)' },
                    '100%': { opacity: '1', transform: 'scale(1)' }
                },
                'slide-up': {
                    '0%': { transform: 'translateY(100%)' },
                    '100%': { transform: 'translateY(0)' }
                },
                'slide-down': {
                    '0%': { transform: 'translateY(-100%)' },
                    '100%': { transform: 'translateY(0)' }
                },
                'shimmer': {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' }
                },
                'pulse-soft': {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.8' }
                }
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'pour': 'pour 0.5s ease-in-out',
                'fill': 'fill 0.5s ease-in-out',
                'bubble': 'bubble 2s ease-in-out infinite',
                'float-in': 'float-in 0.6s ease-out',
                'scale-in': 'scale-in 0.4s ease-out',
                'slide-up': 'slide-up 0.4s ease-out',
                'slide-down': 'slide-down 0.4s ease-out',
                'shimmer': 'shimmer 2s infinite linear',
                'pulse-soft': 'pulse-soft 2s ease-in-out infinite'
            },
            backgroundImage: {
                'gradient-glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                'pattern-dots': 'radial-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px)',
                'shimmer': 'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0) 100%)',
            },
            backdropFilter: {
                'sm': 'blur(4px)',
                'md': 'blur(8px)',
                'lg': 'blur(16px)',
            },
            boxShadow: {
                'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
                'glass-sm': '0 2px 10px rgba(0, 0, 0, 0.05)',
                'glass-lg': '0 10px 30px rgba(0, 0, 0, 0.15)',
                'inner-sm': 'inset 0 2px 4px rgba(0, 0, 0, 0.06)',
                'inner-md': 'inset 0 4px 8px rgba(0, 0, 0, 0.06)',
                'elevation-1': '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
                'elevation-2': '0 3px 6px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.12)',
                'elevation-3': '0 10px 20px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.1)',
                'tube': '0 4px 10px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
            }
        }
    },
    plugins: [require("tailwindcss-animate")],
}
