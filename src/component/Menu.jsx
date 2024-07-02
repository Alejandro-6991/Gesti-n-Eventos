import { Link } from 'react-router-dom';
import React from 'react';

const Menu = () => {
    return (
        <nav className="menu-navbar">
            <ul className="menu-list">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/create">Create</Link></li>
                <li><Link to="/events">List</Link></li>
            </ul>
        </nav>
    );
};

export default Menu;
