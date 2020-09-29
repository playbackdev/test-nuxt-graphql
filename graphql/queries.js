import gql from 'graphql-tag';

export const getProducts = gql`
  query Products($limit: Int!, $offset: Int!) {
    products(limit:$limit, offset:$offset) {
      id
      name
      vendor_code
      series
      prices {
        price
      }
    }
  }`;

export const updateProduct = gql`
  mutation UpdateProduct($id: String!, $name: String!, $vendor_code: String!) {
    update_products(where: {id: {_eq: $id}}, _set: {name: $name, vendor_code: $vendor_code}) {
      returning {
        id
        name
        series
        vendor_code
      }
    }
  }`;
