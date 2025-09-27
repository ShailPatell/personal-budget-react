import axios from 'axios';

export const getBudgetData = async () => {
  try {
    const response = await axios.get('/budget_data.json'); // file in public/
    return response.data.myBudget;
  } catch (error) {
    console.error('Error fetching budget data:', error);
    return [];
  }
};
