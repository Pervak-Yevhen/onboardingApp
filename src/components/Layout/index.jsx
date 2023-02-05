import React from 'react';
import { useQuery } from "@apollo/client";
import { Helmet } from 'react-helmet';

import Header from '@/components/Header';
import Loader from "@/components/_common/Loader";
import { GET_SETTINGS, SETTINGS_UID } from "@/api/queries/settings";

import './index.css';

const Layout = ({children}) => {
    const { loading, data } = useQuery(GET_SETTINGS, { variables: { uid: SETTINGS_UID }});

    if (loading) return <Loader big />

    const { settings: { seo: { meta_keywords, meta_title }, title } } = data;
    return (
        <>
            <Helmet>
                <title>{meta_title}</title>
                <meta name="keywords" content={meta_keywords} />
            </Helmet>
            <Header title={title} />
            <main className="Layout__body">
                <div className="Layout__body-container">
                    {children}
                </div>
            </main>
        </>
    );
};

export default Layout;