import  { getOverviewElements } from "./json-convertor";

const getRelatedBooks = ({ related_books } = {}) => {
    if (related_books) {
        const { group_title, bookConnection: { edges } } = related_books || {};
        const relatedBooksList = edges.map(({ node: { title, system: { uid } } }) => ({ title, uid }));
        return {
            relatedBooks: {
                title: group_title,
                list: relatedBooksList,
            }
        }
    }

    return {
        relatedBooks: null
    }
}

const getCategories = ({ categoryConnection = null }) => ({
    categories: categoryConnection ? categoryConnection.edges.map(({ node: { title } }) => title) : null
});

const getBookOverview = ({ book_overview = null, rating = 0 }) => {
    if (!book_overview) return { overview: null };
    const { json: { children, uid } } = book_overview;
    const els = children.map((child) => getOverviewElements(child));

    return {
        overview: {
            uid,
            rating,
            list: els,
        }
    }
}

export const getBookInfo = ({ book }) => {
    const {
        title,
        pages,
        description,
        authorConnection,
        imageConnection,
        link_to_shop,
    } = book;

    // author
    const { short_info, title: authorName, wikipedia, photoConnection } = authorConnection.edges[0].node;
    const { url: avatar } = photoConnection.edges[0].node;

    //link
    const { href: shopLink, title: shopName } = link_to_shop;

    // book cover
    const { url: imgSrc } = imageConnection.edges[0].node;


    return {
        book: {
            title,
            pages,
            description,
            img: imgSrc,
            shop: {
                link: shopLink,
                title: shopName,
            }
        },
        author: {
            name: authorName,
            description: short_info,
            avatar,
            link: {
                href: wikipedia.href,
                text: wikipedia.title
            }
        },
        ...getRelatedBooks(book),
        ...getCategories(book),
        ...getBookOverview(book),
    }
};