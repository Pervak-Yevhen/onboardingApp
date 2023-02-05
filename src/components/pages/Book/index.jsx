import React from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { getBookInfo } from "@/utils/book-convertor";
import { GET_BOOK_PAGE } from "@/api/queries/book";
import Loader from "@/components/_common/Loader";
import { prepareImgURL } from "@/utils/images";
import { ROUTER_ROOT } from "@/router";
import BookCategories from "./Categories";
import BookAuthor from "./Author";
import BookRelated from "./Related";
import BookOverview from "./Overview";
import NavigationButton from "@/components/_common/NavigationButton";


import './index.css';




const Book = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { loading, data } = useQuery(GET_BOOK_PAGE, {
        variables: {  uid: id },
    });

    if (loading) return <Loader big />;

    const onClick = () => navigate(ROUTER_ROOT);
    const { book, author, relatedBooks, categories, overview } = getBookInfo(data);
    const src = prepareImgURL({ url: book.img, width: 250 })

    return (
        <div className="BaseSection Book">
            <span className="Book__backButton">
                <NavigationButton onClick={onClick} text="Back"/>
            </span>
            <h2 className="Book__title">{book.title}</h2>
            <div className="Book__content">
                <div className="Book__content-container">
                    <img className="Book__content-container-img" src={src} alt={book.title}/>
                </div>
                <div className="Book__content-info">
                    <div className="Book__content-info-book">
                        <span>Number of pages: {book.pages}</span>
                        <a href={book.shop.link} target="_blank" rel="noopener noreferrer">Check on {book.shop.title}</a>
                        <p><strong>Description</strong>: {book.description}</p>
                    </div>
                    {categories && <BookCategories categories={categories}/>}
                    <BookAuthor author={author}/>
                </div>
            </div>
            {overview && <BookOverview overview={overview}/>}
            {relatedBooks && <BookRelated related={relatedBooks}/>}
        </div>
    );
};

export default Book;