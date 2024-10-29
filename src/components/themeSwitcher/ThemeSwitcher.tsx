import React, { useState } from 'react';

const ThemeSwitcher = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    return (
        <button onClick={toggleTheme}>
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
        </button>
    );
};

export default ThemeSwitcher;
