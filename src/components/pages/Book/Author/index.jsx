import React from 'react';
import PropTypes from 'prop-types';
import { prepareImgURL } from "@/utils/images";

import './index.css';

const BookAuthor = ({ author }) => {
    const src = prepareImgURL({ url: author.avatar, width: 100 })

    return (
        <div className="BookAuthor">
            <div className="BookAuthor__image">
                <img className="BookAuthor__image-img" src={src} alt="authorName"/>
            </div>
            <div className="BookAuthor__data">
                <span className="BookAuthor__data-title">{author.name}</span>
                <p>{author.description}</p>
                <a className="BookAuthor__data-link" href={author.link.href} target="_blank" rel="noopener noreferrer">{author.link.text}</a>
            </div>
        </div>
    );
};

BookAuthor.propTypes = {
    author: PropTypes.shape({
            name: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            avatar: PropTypes.string.isRequired,
            link: PropTypes.shape({
                    href: PropTypes.string.isRequired,
                    text: PropTypes.string.isRequired,
                }
            )
        },
    )
};

export default BookAuthor;