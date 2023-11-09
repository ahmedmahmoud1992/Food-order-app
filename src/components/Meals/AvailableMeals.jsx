import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import useHttp from '../../hooks/use-http';
import { useEffect, useState } from 'react';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const { isLoading, isError, httpRequestHandler: fetchMeals } = useHttp();

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  useEffect(() => {
    const transformedMeals = (data) => {
      const transformedData = [];
      for (const key in data) {
        transformedData.push({ id: key, ...data[key] });
      }
      setMeals(transformedData)
    }

    fetchMeals({ url: "https://food-order-app-18796-default-rtdb.firebaseio.com/meals.json" }, transformedMeals);

  }, [fetchMeals]);
  
  let mealsElement = <p>Loading meals ...</p>;
  if (isError) {
    mealsElement = <p>An error occured ...</p>;
  } else if (!isLoading) {
    mealsElement = <ul>{mealsList}</ul>;
  }

  return (
    <section className={classes.meals}>
      <Card>
        {mealsElement}
      </Card>
    </section>
  );
};

export default AvailableMeals;
