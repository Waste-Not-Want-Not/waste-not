import './Donations.css';
import Donation from '../Donation/Donation';
import { useQuery, useMutation } from '@apollo/client';
import { GET_DONATION_ITEMS_QUERY } from '../../graphql/queries';
import { DELETE_DONATION_ITEMS } from '../../graphql/mutations'

const Donations = () => {

  const {loading, data, error, refetch} = useQuery( GET_DONATION_ITEMS_QUERY, {
    variables: {id: 1}
  })

  const [deleteItems, { deleteError } ] = useMutation( DELETE_DONATION_ITEMS)

  const getDonations = () => {
    const donations = data.getUserById.donationItems.map((item) => {
      return <Donation key={Math.random()} item={item} />
    })
    return donations
  }

  const handleClick = () => {
    deleteItems({
      variables: {
        input: {
          id:1 //refers to userId not item id
        }
      }
    })
    alert('Donations comfirmed!')
    refetch()
  }

  if (error || deleteError) return <h1 className='error'>Technical difficulties, please visit us later.</h1>

  if (loading) return <h2 className='loading'>LOADING...</h2>

  if (data) {
    return ( 
      <section className='donations-container'>
        <h2 className='donations-heading'>Donations</h2>
        {getDonations().length ? getDonations(): <h3>No Donations</h3>}
        <button className='confirm-donations-button' onClick={() => handleClick()}>Confirm All Donations</button>
      </section>
    )
  }
}

export default Donations;