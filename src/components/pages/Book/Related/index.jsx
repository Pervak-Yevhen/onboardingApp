import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

const BookRelated = ({ related }) => {
    return (
        <div className="BookRelated">
            <h4 className="BookRelated__title">{related.title}</h4>
            <ul className="BookRelated__list">
                {related.list.map(({ title, uid }) => <li key={uid}>-{title}</li>)}
            </ul>
        </div>
    );
};

BookRelated.propTypes = {
    related: PropTypes.shape({
        title: PropTypes.string,
        list: PropTypes.arrayOf(PropTypes.shape({})),
    })
};

export default BookRelated;