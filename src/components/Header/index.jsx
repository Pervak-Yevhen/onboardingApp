import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { ROUTER_ROOT } from '@/router';

import './index.css';

const Header = ({ title }) => {
    return (
        <header className="Header">
            <Link className="Base_link" to={ROUTER_ROOT} >{title}</Link>
        </header>
    );
};

Header.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Header;