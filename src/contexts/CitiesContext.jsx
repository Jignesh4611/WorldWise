import { useReducer, createContext, useEffect, useContext, } from "react";

const BASE_URL = "http://localhost:8000";

const CitiesContext = createContext();

const intialState = {
  cities: [],
  currentCity: {},
  isLoading: false,
  error: "",

}
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state, isLoading: true
      }
    case 'cities/loaded':
      return {
        ...state,
        isLoading: false,
        cities: action.payload,

      }
    case 'city/loaded':
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload
      }
    case 'city/created':
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities,
        action.payload],
        currentCity: action.payload
      }
    case 'city/deleted':
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
        cities: state.cities.filter((city) => city.id !== action.payload)
      }
    case 'rejected':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }

    default: throw new Error('Unknown action type')
  }
}

function CitiesProvider({ children }) {

  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(reducer, intialState)

  // const [cities, setCities] = useState([])
  // const [isLoading, setIsLoading] = useState(false)
  // const [currentCity, setCurrentCity] = useState({})

  useEffect(function () {
    async function fetchCities() {
      try {
        dispatch({ type: "loading" })
        const res = await fetch(`${BASE_URL}/cities/`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data })
        console.log(data);
      }
      catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading data cities..."

        })
      }

    }

    fetchCities();
  }
    , [])

  async function getCity(id) {
    if (Number(id) === currentCity.id) return;
    try {
      dispatch({ type: "loading" })
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "city/loaded", payload: data })
    }
    catch {
      dispatch({
        type: "rejected",
        payload: "There was an error loading data city..."

      })
    }

  }
  async function createCity(newCity) {
    try {
      dispatch({ type: "loading" })
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers:
        {
          "Content-Type": "application/json"
        }
      });
      const data = await res.json();
      console.log(data);
      dispatch({ type: 'city/created', payload: data })
    }
    catch {
      alert('There was an error loading data..')
    }

  }
  async function deleteCity(id) {
    try {
      dispatch({ type: "loading" })
      const res = await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE"
      });
      const data = await res.json();
      dispatch({ type: 'city/deleted', payload: id })
    }
    catch {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting data..."

      })
    }

  }

  return <CitiesContext.Provider value={{
    cities, isLoading, currentCity, getCity, createCity, deleteCity
  }}>
    {children}
  </CitiesContext.Provider>

}
function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) throw new Error("Cities was used outside then CitiesProvider")
  return context;
}
export { CitiesProvider, useCities };