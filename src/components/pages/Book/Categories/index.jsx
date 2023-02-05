import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

const BookCategories = ({ categories }) => {
    return (
        <div className="BookCategories">
            <strong>Categories</strong>: {categories.join(', ')}
        </div>
    );
};

BookCategories.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default BookCategories;