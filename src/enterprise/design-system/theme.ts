/**
 * Enterprise Design System - Theme Configuration
 * Light Mode: Ivory + Gunmetal + Gold Glow
 * Dark Mode: Obsidian + Electric Blue + Gold Glow
 */

export const designTokens = {
    light: {
        // Primary Colors
        background: '#F5F3F0',      // Ivory
        foreground: '#2C3E50',      // Gunmetal
        surface: '#FFFFFF',

        // Accents
        primary: '#D4AF37',         // Gold
        primaryGlow: 'rgba(212, 175, 55, 0.6)',
        secondary: '#2C3E50',

        // Semantic Colors
        success: '#4CAF50',
        warning: '#FFC107',
        error: '#F44336',
        info: '#2196F3',

        // Text
        text: {
            primary: '#2C3E50',
            secondary: '#546E7A',
            tertiary: '#90A4AE',
        },

        // Borders & Shadows
        border: 'rgba(212, 175, 55, 0.3)',
        borderGold: 'rgba(212, 175, 55, 0.6)',
        shadow: 'rgba(0, 0, 0, 0.08)',
        shadowGold: '0 0 20px rgba(212, 175, 55, 0.4)',
    },

    dark: {
        // Primary Colors
        background: '#0A0E27',      // Obsidian Black
        foreground: '#00D9FF',      // Electric Blue
        surface: '#1A1F3A',

        // Accents
        primary: '#D4AF37',         // Gold
        primaryGlow: 'rgba(212, 175, 55, 0.8)',
        secondary: '#00D9FF',

        // Semantic Colors
        success: '#66BB6A',
        warning: '#FFB74D',
        error: '#EF5350',
        info: '#42A5F5',

        // Text
        text: {
            primary: '#FFFFFF',
            secondary: '#B0BEC5',
            tertiary: '#90A4AE',
        },

        // Borders & Shadows
        border: 'rgba(0, 217, 255, 0.3)',
        borderElectric: 'rgba(0, 217, 255, 0.6)',
        borderGold: 'rgba(212, 175, 55, 0.5)',
        shadow: 'rgba(0, 0, 0, 0.3)',
        shadowGold: '0 0 30px rgba(212, 175, 55, 0.5)',
        shadowElectric: '0 0 30px rgba(0, 217, 255, 0.3)',
    },
};

export const typography = {
    font: {
        primary: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        mono: '"Fira Code", "Courier New", monospace',
    },

    sizes: {
        xs: '0.75rem',      // 12px
        sm: '0.875rem',     // 14px
        base: '1rem',       // 16px
        lg: '1.125rem',     // 18px
        xl: '1.25rem',      // 20px
        '2xl': '1.5rem',    // 24px
        '3xl': '1.875rem',  // 30px
        '4xl': '2.25rem',   // 36px
        '5xl': '3rem',      // 48px
    },

    weights: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
    },
};

export const spacing = {
    0: '0',
    1: '0.25rem',    // 4px
    2: '0.5rem',     // 8px
    3: '0.75rem',    // 12px
    4: '1rem',       // 16px
    5: '1.25rem',    // 20px
    6: '1.5rem',     // 24px
    8: '2rem',       // 32px
    10: '2.5rem',    // 40px
    12: '3rem',      // 48px
    16: '4rem',      // 64px
    20: '5rem',      // 80px
    24: '6rem',      // 96px
};

export const borderRadius = {
    none: '0',
    sm: '0.25rem',
    base: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
    full: '9999px',
};

export const shadows = {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
};

export const animations = {
    duration: {
        fast: '150ms',
        base: '300ms',
        slow: '500ms',
        slower: '800ms',
    },

    easing: {
        linear: 'linear',
        ease: 'ease',
        easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
        easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
        easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        circIn: 'cubic-bezier(0.6, 0.04, 0.98, 0.335)',
        circOut: 'cubic-bezier(0.075, 0.82, 0.165, 1)',
    },
};

export type ThemeMode = 'light' | 'dark';
export type Theme = typeof designTokens.light;
