import './FoodBankForm.css';

const FoodBankForm = () => {


  
  return (
    <section>
      <h3>Food Banks</h3>
      <form>
        <input 
          type='text'
          placeholder='City, State'

        />
        <button>Submit</button>
      </form>
    </section>
  )

}

export default FoodBankForm;