import { ApolloClient, InMemoryCache } from '@apollo/client';

const {
    REACT_APP_STACK_URL,
    REACT_APP_STACK_ENV,
    REACT_APP_STACK_API_KEY,
    REACT_APP_DELIVERY_TOKEN,
} = process.env;

const uri = new URL(`${REACT_APP_STACK_URL}/${REACT_APP_STACK_API_KEY}`);
uri.searchParams.set('environment', REACT_APP_STACK_ENV)

export const cache = new InMemoryCache();
const client = new ApolloClient({
    uri,
    headers: {
        access_token: REACT_APP_DELIVERY_TOKEN,
    },
    cache,
});

export default client;