import './Overview.css';
import { NavLink } from 'react-router-dom';
import Kitchen from '../../assets/kitchen-icon.png';

const Overview = () => {
	return (
		<article className='overview'>
			<p>
				Have you ever bought food that ends up sitting in your freezer too long,
				expires, or goes to waste because you didn't eat it in time? Of course
				you have, we all do sometimes. However, what can we do with this food
				that we don't end up eating? Welcome to Waste Not, Want Not.
			</p>
			<p>
				You can use Waste Not, Want Not to track the food that you purchase,
				expiration dates, and get connected to local food banks to donate your
				unwanted food. Upon the purchase of food items, you can upload the
				details (Name, Location, and Expiration Date) to your virtual kitchen.
				On the My Kitchen page fill out the information, and click the ADD NEW
				FOOD button to add it to your virtual Pantry, Fridge, or Freezer. After
				food has been added to these locations, you can visit each by clicking
				them to see the food that you currently have in stock.
			</p>
			<p>
				To see expired or soon to expire food, click the SHOW POSSIBLE DONATIONS
				button. If you have eaten a food, click the ATE button on a food item.
				If you have decided that you no longer want a food item, click the
				DONATE button on a food item. To visit the donation page click on the
				DONATION PAGE button. Once here, you can enter your city and state to
				see the nearest local food bank for your donations. You will be given
				information about the food bank including directions to said food bank.
				After dropping off your food at the food bank, you can click the CONFIRM
				DONATIONS button on the donation page. This will update your virtual
				kitchen for you. Should you need to see these instructions again, just
				click the OVERVIEW button right under the application title.
			</p>
			<h1>Let's work together to mitigate food waste!</h1>
			<NavLink to='/mykitchen'>
				<div className='nav-container'>
					<img src={Kitchen} alt='kitchen logo' className='nav-button' />
					<label>Continue To Your Kitchen</label>
				</div>
			</NavLink>
		</article>
	);
};

export default Overview;
