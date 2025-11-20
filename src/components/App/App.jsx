// React Imports
import { useEffect, useState } from "react";
import "./App.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import "../../vendor/fonts.css";

// Components
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import DeleteConfirmModal from "../DeleteConfirmModal/DeleteConfirmModal";

// Utils/API
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { apiKey, getItems, addItem } from "../../utils/api";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { removeItem } from "../../utils/api";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  const handleAddItem = (inputValues, reset) => {
    const newCardData = {
      name: inputValues.name,
      imageUrl: inputValues.imageUrl,
      weather: inputValues.weather,
    };

    addItem(newCardData)
      .then((data) => {
        setClothingItems((prevItems) => [data, ...prevItems]);
        closeActiveModal();
        reset();
      })
      .catch(console.error);
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleDeleteButton = () => {
    setActiveModal("delete");
  };

  const deleteItemHandler = (cardID) => {
    removeItem(cardID)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => (item.id ?? item._id) !== cardID)
        );
        closeActiveModal();
      })
      .catch(console.error);
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    // helper to fetch weather for given coordinates
    const fetchWeatherFor = (coords) => {
      getWeather(coords, apiKey)
        .then((data) => {
          const filteredData = filterWeatherData(data);
          setWeatherData(filteredData);
        })
        .catch(console.error);
    };

    // Try browser Geolocation API first, fall back to a default location
    const fallbackCoords = { latitude: 42.1973611, longitude: -122.7130278 };

    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherFor({ latitude, longitude });
        },
        (err) => {
          console.warn("Geolocation failed, using fallback coords:", err);
          fetchWeatherFor(fallbackCoords);
        },
        { enableHighAccuracy: false, timeout: 5000, maximumAge: 0 }
      );
    } else {
      // Browser doesn't support geolocation
      fetchWeatherFor(fallbackCoords);
    }
    getItems()
      .then((data) => {
        setClothingItems(data.slice().reverse());
      })
      .catch(console.error);
  }, []);
  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  setClothingItems={setClothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  clothingItems={clothingItems}
                  handleCardClick={handleCardClick}
                  handleAddClick={handleAddClick}
                />
              }
            />
          </Routes>

          <Footer />
        </div>
        <AddItemModal
          isOpen={activeModal === "add-garment"}
          activeModal={activeModal}
          onClose={closeActiveModal}
          onAddItem={handleAddItem}
          buttonText="Add garment"
        />
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={closeActiveModal}
          isOpen={activeModal === "preview"}
          handleDeleteButton={handleDeleteButton}
        />
        <DeleteConfirmModal
          activeModal={activeModal}
          card={selectedCard}
          deleteItemHandler={deleteItemHandler}
          onClose={closeActiveModal}
          isOpen={activeModal === "delete"}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
