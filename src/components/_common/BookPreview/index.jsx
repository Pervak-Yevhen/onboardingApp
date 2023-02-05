import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate, generatePath } from "react-router-dom";
import { ROUTER_BOOK } from "@/router";

import './index.css';

const BookPreview = ({ title, id, url }) => {
    const navigate = useNavigate();
    const onClick = () => navigate(generatePath(ROUTER_BOOK, { id }))
    return (
        <div className="BookPreview">
            <img className="BookPreview__img" src={url} alt={title} />
            <button
                className="BookPreview__button"
                type="button"
                onClick={onClick}
            >
                {title}
            </button>
        </div>
    );
};

BookPreview.propTypes = {
    id: PropTypes.string.isRequired,
    url: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
};

export default BookPreview;