import './Donations.css';
import Donation from '../Donation/Donation';
import { useQuery } from '@apollo/client';
import { GET_DONATION_ITEMS_QUERY } from '../../graphql/queries';

const Donations = () => {

  const {loading, data, error} = useQuery( GET_DONATION_ITEMS_QUERY, {
    variables: {id: 1}
  })

  const getDonations = () => {
    const donations = data.getUserById.donationItems.map((item) => {
      return <Donation key={Math.random()} item={item} />
    })
    return donations
  }

  if (error) return <h1>Technical difficulties, please visit us later.</h1>

  if (loading) return <h2>LOADING...</h2>

  if (data) {
    return ( 
      <section>
        <h3 className='donations-heading'>Donations</h3>
        {getDonations()}
      </section>
    )
  }
}

export default Donations;