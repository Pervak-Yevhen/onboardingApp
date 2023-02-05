import { gql } from "@apollo/client";

export const GET_BOOK_PAGE = gql`
    query GetBook($uid: String!) {
        book(uid: $uid) {
            title
            pages
            rating
            description
            authorConnection {
                edges {
                    node {
                        ... on Author {
                            title
                            short_info
                            wikipedia {
                                href
                                title
                            }
                            photoConnection {
                                edges {
                                    node {
                                        url
                                    }
                                }
                            }
                        }
                    }
                }
            }
            categoryConnection {
                edges {
                    node {
                        ... on Categories {
                            title
                        }
                    }
                }
            }
            imageConnection {
                edges {
                    node {
                        url
                    }
                }
            }
            book_overview {
                json
            }
            related_books {
                group_title
                bookConnection {
                    edges {
                        node {
                            ... on Book {
                                title
                                system {
                                    uid
                                }
                            }
                        }
                    }
                }
            }
            link_to_shop {
                href
                title
            }
        }
    }

`;


export const GET_BOOKS_LIST = gql`
    query GetBooksList($limit: Int!, $skip: Int!) {
        all_book(limit: $limit, skip: $skip) {
            items {
                title
                imageConnection {
                    edges {
                        node {
                            url
                        }
                    }
                }
                system {
                    uid
                }
            }
            total
        }
    }

`;