import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

const BookOverview = ({ overview }) => {
    return (
        <div className="BookOverview">
            <h4 className="BookOverview__title">Book overview</h4>
            <p className="BookOverview__description">{overview.list}</p>
            <strong className="BookOverview__rating">Rating: {overview.rating}/5</strong>
        </div>
    );
};

BookOverview.propTypes = {
    overview: PropTypes.shape({
        list: PropTypes.node,
        rating: PropTypes.number,
    })
};

export default BookOverview;