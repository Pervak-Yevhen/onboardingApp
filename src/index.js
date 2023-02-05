import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from '@/components/pages/Home';
import Layout from "@/components/Layout";
import PageNotFound from "@/components/pages/NotFound";
import Book from "@/components/pages/Book";
import { ROUTER_ROOT, ROUTER_BOOK } from '@/router';

import client from "@/api";

import 'normalize.css';
import './index.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <ApolloProvider client={client}>
              <Layout>
                  <Routes>
                      <Route path={ROUTER_ROOT} element={<Home />}/>
                      <Route path="*" element={<PageNotFound />}/>
                      <Route path={ROUTER_BOOK} element={<Book />}/>
                  </Routes>
              </Layout>
          </ApolloProvider>
      </BrowserRouter>
  </React.StrictMode>
);
