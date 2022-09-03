import './DonationsPage.css';
import FoodBankForm from '../FoodBankForm/FoodBankForm';
import Donations from '../Donations/Donations';

const DonationsPage = () => {

  return (
    <section className='donations-page'>
      <FoodBankForm />
      <Donations />
    </section>
  )
}

export default DonationsPage;