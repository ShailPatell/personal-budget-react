import axios from 'axios';

export const getBudgetData = async () => {
  try {
    const response = await axios.get('http://localhost:5000/budget');
    return response.data.myBudget; // D3 expects an array of objects
  } catch (error) {
    console.error('Error fetching budget data:', error);
    return [];
  }
};