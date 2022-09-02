import 'DonationsPage.css';
import { useQuery } from '@apollo/client';
import { GET_DONATION_ITEMS_QUERY } from '../../graphql/queries';

const DonationsPage = () => {

  const {loading, data, error} = useQuery( GET_DONATION_ITEMS_QUERY, {
    variables: {id: 1}
  })








  return (
    <FoodBankForm />
    // {list of donations}
  )

}

export default DonationsPage;