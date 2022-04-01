import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

export default new ApolloClient({
  // Provide the URL to the API server.
  link: new HttpLink({ uri: 'http://127.0.0.1:5000/graphql' }),
  onError: (e) => { console.log(e) },
  // Using a cache for blazingly
  // fast subsequent queries.
  cache: new InMemoryCache(),
});