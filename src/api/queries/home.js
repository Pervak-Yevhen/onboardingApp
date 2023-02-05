import { gql, useQuery } from "@apollo/client";

export const HOME_PAGE_UID = process.env.REACT_APP_HOME_PAGE_UID;

export const GET_HOME_PAGE = gql`
    query GetHomePage($uid: String!) {
        home_page(uid: $uid) {
            title
            page_components {
                ... on HomePagePageComponentsOverview {
                    __typename
                    overview {
                        title
                        overview {
                            json
                        }
                        fileConnection {
                            edges {
                                node {
                                    url
                                }
                            }
                        }
                    }
                }
                ... on HomePagePageComponentsBooksRating {
                    __typename
                    books_rating {
                        top_3_books {
                            referenceConnection {
                                edges {
                                    node {
                                        ... on Book {
                                            title
                                            system {
                                                uid
                                            }
                                            imageConnection {
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
                        }
                        title
                    }
                }
            }
        }
    }

`;