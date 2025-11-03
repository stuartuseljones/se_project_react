// React Imports
import { useEffect, useState } from "react";
import "./App.css";

// Components
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";

// Utils/API
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import {
  coordinates,
  apiKey,
  defaultClothingItems,
} from "../../utils/constants";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filterData = filterWeatherData(data);
        setWeatherData(filterData);
      })
      .catch(console.error);
  }),
    [];
  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <Main
          weatherData={weatherData}
          handleCardClick={handleCardClick}
          clothingItems={clothingItems}
          setClothingItems={setClothingItems}
        />
        <Footer />
      </div>
      <ModalWithForm
        name="add-garment"
        isOpen={activeModal === "add-garment"}
        activeModal={activeModal}
        buttonText="Add garment"
        title="New garment"
        onClose={closeActiveModal}
      >
        <label className="modal__label" htmlFor="name">
          Name
          <input
            type="text"
            className="modal__input"
            id="name"
            placeholder="Name"
          />
        </label>
        <label className="modal__label" htmlFor="imageURL">
          Image URL
          <input
            type="url"
            className="modal__input"
            id="imageURL"
            placeholder="Image URL"
          />
        </label>
        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type:</legend>
          <label htmlFor="hot" className="modal__label_type_radio">
            <input
              id="hot"
              name="weather"
              type="radio"
              value="hot"
              className="modal__radio-input"
            />
            Hot
          </label>
          <label htmlFor="warm" className="modal__label_type_radio">
            <input
              id="warm"
              name="weather"
              type="radio"
              value="warm"
              className="modal__radio-input"
            />
            Warm
          </label>
          <label htmlFor="cold" className="modal__label_type_radio">
            <input
              id="cold"
              name="weather"
              type="radio"
              value="cold"
              className="modal__radio-input"
            />
            Cold
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        onClose={closeActiveModal}
        isOpen={activeModal === "preview"}
      />
    </div>
  );
}

export default App;
