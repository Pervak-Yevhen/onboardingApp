import React, { useState } from 'react';
import { useQuery } from "@apollo/client";
import { generatePath, Link } from "react-router-dom";
import { MdFilterList } from "react-icons/md";
import InfiniteScroll from "react-infinite-scroll-component";
import cn from 'classnames';

import Loader from "@/components/_common/Loader";
import { GET_BOOKS_LIST } from "@/api/queries/book";
import NavigationButton from "@/components/_common/NavigationButton";
import { getImageURL } from "@/utils/images";
import { ROUTER_BOOK } from "@/router";
import BooksListItem from "./Item";


import './index.css';

const PAGE_SIZE = 5;

const BooksList = () => {
    const [page, setPage] = useState(0);
    const [loadingStyle, changeLoading] = useState(false);
    const { loading, data, fetchMore } = useQuery(GET_BOOKS_LIST, {
        variables: {
            skip: PAGE_SIZE * page,
            limit: PAGE_SIZE,
        },
    });

    if (loading) return <Loader big />

    const onLeftClick = () => setPage((prevState) => prevState - 1);
    const onRightClick = () => setPage((prevState) => prevState + 1);
    const changeListLoading = () => changeLoading((l) => !l);

    const onLoadMore = () => {
        fetchMore({
            variables: {
                skip:  data.all_book.items.length,
                limit: PAGE_SIZE,
            },
            updateQuery(prevRes, { fetchMoreResult }) {
                if (!prevRes.all_book?.items) return fetchMoreResult;

                return { all_book: { ...fetchMoreResult.all_book, items: [...prevRes.all_book.items, ...fetchMoreResult.all_book.items] }}
            },
        });
    };

    const isLeftDisabled = page === 0;
    const isRightDisabled = (data.all_book.total <= ((page + 1) * PAGE_SIZE));


    const renderList = () => (
        data.all_book.items.map(({ title, system: { uid }, imageConnection })=> (
            <Link key={uid} className="Base_link" to={generatePath(ROUTER_BOOK, { id: uid })}>
                <BooksListItem url={getImageURL(imageConnection)} title={title} />
            </Link>
        ))
    );
    
// TODO: there is bug when changing infinity loading to pagination, didn't figure out how to reset data between them
    return (
        <div className="BaseSection BooksList">
            <div className="BooksList__navigation">
                {
                    !loadingStyle && <>
                        <NavigationButton disabled={isLeftDisabled} text="Back" onClick={onLeftClick} />
                        <NavigationButton disabled={isRightDisabled} text="Next" onClick={onRightClick} right />
                    </>
                }
                <MdFilterList className="BooksList__viewButton" onClick={changeListLoading} />
            </div>
            <ul className={cn("BooksList__list", {
                "BooksList__list--infinityScroll": loadingStyle,
            })}
                id="scrollableDiv">
                { loadingStyle ?
                    <InfiniteScroll
                        scrollableTarget="scrollableDiv"
                        dataLength={data.all_book.items.length}
                        next={onLoadMore}
                        hasMore={data.all_book.items.length < data.all_book.total}
                        loader={<Loader big />}
                    >
                        {renderList()}
                    </InfiniteScroll>
                    : renderList()
                }
            </ul>
        </div>
    );
};

BooksList.propTypes = {
    
};

export default BooksList;