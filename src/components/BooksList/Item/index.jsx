import React from 'react';
import PropTypes from 'prop-types';
import { prepareImgURL } from "@/utils/images";

import './index.css';

const BooksListItem = ({ url, title, onClick }) => {
    const src = prepareImgURL({ url, width: 150 });
    return (
        <li className="BooksListItem">
            <figure className="BooksListItem__container">
                <img className="BooksListItem__container-img" src={src} alt={title} />
                <figcaption className="BooksListItem__container-caption">{title}</figcaption>
            </figure>
        </li>
    );
};

BooksListItem.propTypes = {
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};

export default BooksListItem;