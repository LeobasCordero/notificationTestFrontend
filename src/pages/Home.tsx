import React from 'react';
import Form from '../components/form/Form';
import LogHistory from '../components/logHistory/LogHistory';//<ThemeSwitcher />
import ThemeSwitcher from '../components/themeSwitcher/ThemeSwitcher';

const Home = () => (
    <div>
        <Form />
        <LogHistory />
    </div>
);

export default Home;
