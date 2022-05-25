import axios from 'axios';
import { useEffect, useState } from 'react';

export function restApi() {
  const [recipeData, setData] = useState();

  const getRecipe = async () => {
    try {
      let apiUrl = 'http://wacenter.local.com/api/sample/articles';
      const response = await axios.get(apiUrl, {
        params: {
          category: 'recipe',
          secure_key: '7dDxlT1jP9ft398kSh1H4JaCqhKABk',
        },
        headers: {
          'Content-Type': 'Application/json',
        },
      });
      setData(response.data.recipe);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRecipe();
  }, []);

  return recipeData;
}
