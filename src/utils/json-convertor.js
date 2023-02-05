import { createElement } from "react";
import BookPreview from "@/components/_common/BookPreview";

import { prepareImgURL } from "./images";

const TYPE_OVERVIEW = "HomePagePageComponentsOverview";
const TYPE_RATING = "HomePagePageComponentsBooksRating";


const getBold = (text, props = null) => createElement('strong', props, text);

const getUnderline = (text, props = null) => createElement('u', props, text);

const getItalic = (text, props = null) => createElement('em', props, text);

const toStylize = ({ text, bold, underline, italic }, key) => {
    let newLine = text;
    if (bold) newLine = getBold(newLine);
    if (underline) newLine = getUnderline(newLine);
    if (italic) newLine = getItalic(newLine);

    return createElement('p', { key }, newLine);
};

export const getOverviewElements = ({ attrs, uid, children, type} = {}) => {
    const chld = children.reduce((acc, child, i) => {
            if (child.children) acc.push(getOverviewElements(child));
            else if (child.text.trim()) acc.push(toStylize(child, `${uid}-${i}`));
            return acc;
        }, []);

    if (!chld.length) return null;

    return createElement(type, { key: uid }, chld)
}

const getOverviewImg = ({ fileConnection }) => fileConnection.edges?.[0]?.node?.url || '';

const getOverview = ({ overview }) => {
    const { title, overview: { json: { children, uid } } } = overview;
    const image = prepareImgURL({ url: getOverviewImg(overview), width: 200 });

    const els = children.map((child) => getOverviewElements(child));

    return <section
        key={uid}
        className="BaseSection BaseOverview"
    >
        {image && <img className="BaseOverview__img" src={image} alt="" />}
        <div className="BaseOverview__description">
            {title && <h4 className="BaseOverview__description-title">{title}</h4>}
            {els.length && <p className="BaseOverview__description-text">{els}</p>}
        </div>
    </section>
}

const getBookInfo = (book) => {
    const { title, system: { uid }, imageConnection} = book.referenceConnection.edges[0].node;
    const { url } = imageConnection.edges[0].node;
    return { title, uid, url };
};

const getTop = ({ books_rating: { top_3_books: books, title } }) => {
    const els = books.map((book) => {
        const { title, uid, url } = getBookInfo(book);
        const src = prepareImgURL({ url, width: 200 })
        return <BookPreview key={uid} title={title} id={uid} url={src} />;
    });

    //TODO: fix key
    return <section
        key={title}
        className="BaseSection BaseRating"
    >
        {title && <h3 className="BaseRating__title">{title}</h3>}
        {<div className="BaseRating__elements">{els}</div>}
    </section>;
};

export const getChildren = (data) => {
    return data.reduce((acc, item) => {
        const { __typename } = item;
        if (TYPE_OVERVIEW === __typename) acc.push(getOverview(item));
        if (TYPE_RATING === __typename) acc.push(getTop(item));
        return acc;
    }, []);
}