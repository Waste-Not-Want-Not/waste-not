import { gql } from '@apollo/client';

export const CREATE_ITEM = gql`
  mutation createItem($input: CreateItemInput!) {
    createItem(input: $input) {
      item {
        name
        location
        expirationDate
        userId
        image
        id
        forDonation
      }
      errors
    }
  }
`;

export const DELETE_ITEM = gql`
  mutation deleteItem($input: DeleteItemInput!) {
    deleteItem(input: $input) {
      message
    }
  }
`