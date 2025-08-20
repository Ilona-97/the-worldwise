import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";


function CountryList() {
  const {cities, isLoading} = useCities();
  if (!cities.length) return <Message message="Add your first city by clicking the city on the map"/>;
  if (isLoading) return <Spinner/>;

  const countries = cities.reduce((arr, city)=>{
    if(!arr.map((el)=>el.country).includes(city.country))
      return [...arr, {country: city.country, emoji: "🌎"}];
    else return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map(country => (<CountryItem country={country} key={country.country}/>))}
    </ul>
  );
}


export default CountryList;