import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import {ApolloLink} from 'apollo-boost'

// export default new ApolloClient({
//   // Provide the URL to the API server.
//   link: new HttpLink({ uri: 'http://127.0.0.1:5000/graphql' }),
//   onError: (e) => { console.log(e) },
//   // Using a cache for blazingly
//   // fast subsequent queries.
//   cache: new InMemoryCache(),
// });
const httpLink = new HttpLink({ uri: 'https://ecohortbackend.herokuapp.com/graphql'});

const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authorization token from local storage.
  const token = localStorage.getItem('token');

  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      authorization: token ? JSON.stringify(token) : ''
    }
  });

  // Call the next link in the middleware chain.
  return forward(operation);
});

export default  new ApolloClient({
  link: authLink.concat(httpLink), // Chain it with the HttpLink
  onError: (e) => { console.log(e) },
  cache: new InMemoryCache()
});