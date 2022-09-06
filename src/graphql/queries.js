import { gql } from '@apollo/client';

export const GET_ITEMS_QUERY = gql`
query getUserById($id: ID!) {
  getUserById(id: $id) {
      name
      email
      items {
          id
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
          id
          name
          expirationDate
          location
          forDonation
      }
    }
  }
`;

export const GET_FOODBANKS_QUERY = gql`
query getFoodBank($location: String!) {
  getFoodBank(location: $location) {
      name
      address
      phoneNumber
      directions
    }
  }
`;
