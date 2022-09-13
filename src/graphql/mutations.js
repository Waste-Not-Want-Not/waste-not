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
			id
			errors
		}
	}
`;

export const UPDATE_ITEM = gql`
	mutation updateForDonation($input: UpdateForDonationInput!) {
		updateForDonation(input: $input) {
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

export const DELETE_DONATION_ITEMS = gql`
	mutation deleteDonationItems($input: DeleteDonationItemsInput!) {
		deleteDonationItems(input: $input) {
			message
			errors
		}
	}
`;
