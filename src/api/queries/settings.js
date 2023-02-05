import { gql } from "@apollo/client";

export const SETTINGS_UID = process.env.REACT_APP_SETTINGS_UID;

export const GET_SETTINGS = gql`
    query GetSettings($uid: String!) {
        settings(uid: $uid) {
            title
            seo {
                meta_keywords
                meta_title
            }
        }
    }
`;