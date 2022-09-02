import { gql } from '@apollo/client';

export const GET_ITEMS_QUERY = gql`
query getUserById($id: ID!) {
  getUserById(id: $id) {
      name
      email
      items {
          name
          expirationDate
          location
      }
    }
  }
`;

export const GET_DONATION_ITEMS_QUERY = gql`
query getUserById($id: ID!) {
  getUserById(id: $id) {
      name
      email
      donationItems {
          name
          expirationDate
          location
          forDonation
      }
    }
  }
`;