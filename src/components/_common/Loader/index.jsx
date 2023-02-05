import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { BiLoaderAlt } from 'react-icons/bi';

import './index.css';

const Loader = ({ big, size }) => {
    return (
        <div className={cn('Loader', {
            "Loader--big": big
        })}>
            <BiLoaderAlt className="Loader__icon" size={big ? 50 : size }/>
        </div>
    );
};

Loader.defaultProps = {
    big: false,
    size: 25
};

Loader.propTypes = {
    big: PropTypes.bool,
};

export default Loader;