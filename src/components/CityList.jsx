import CityItem from "./CityItem";
import Message from "./Message";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import { useCities } from "../contexts/CitiesContext";

function CityList() {
  const {cities, isLoading} = useCities();
  if (!cities.length) return <Message message="Add your first city by clicking the city on the map"/>;
  if (isLoading) return <Spinner/>;
  return (
    <ul className={styles.cityList}>
      {cities.map(city => (<CityItem city={city} key={city.id}/>))}
    </ul>
  );
}


export default CityList;