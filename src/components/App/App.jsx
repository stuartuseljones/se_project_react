// React Imports
import { useEffect, useState } from "react";
import "./App.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "../../vendor/fonts.css";

// Components
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import DeleteConfirmModal from "../DeleteConfirmModal/DeleteConfirmModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import ProtectedRoute from "../ProtectedRoutes/ProtectedRoutes";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

// Utils/API
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { fallbackCoords, apiKey } from "../../utils/constants";
import {
  getItems,
  addItem,
  getCurrentUser,
  removeItem,
  updateUserProfile,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import { registerUser, loginUser } from "../../utils/auth";
import { Routes, Route } from "react-router-dom";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [currentUser, setCurrentUser] = useState(null);

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  const handleAddItem = (inputValues, reset) => {
    const token = localStorage.getItem("jwt");
    const newCardData = {
      name: inputValues.name,
      imageUrl: inputValues.imageUrl,
      weather: inputValues.weather,
    };

    addItem(newCardData, token)
      .then((response) => {
        const data = response.data || response;
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

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleRegisterClick = () => {
    setActiveModal("register");
  };

  const handleRegistration = ({ name, email, password, avatarUrl }) => {
    registerUser({ name, avatar: avatarUrl, email, password })
      .then((response) => {
        // Auto-login after successful registration
        return loginUser({ email, password });
      })
      .then((loginResponse) => {
        // Store token in localStorage
        const token = loginResponse.token;
        if (token) {
          localStorage.setItem("jwt", token);
          // After login, get the current user data
          return getCurrentUser(token);
        } else {
          throw new Error("No token received");
        }
      })
      .then((userResponse) => {
        const user = userResponse.data || userResponse;
        setCurrentUser(user);
        setActiveModal(""); // Close any open modals
      })
      .catch((error) => {
        console.error("Registration error:", error);
        // You might want to show an error message to the user here
      });
  };

  const handleLogin = ({ email, password }) => {
    loginUser({ email, password })
      .then((loginResponse) => {
        // Store token in localStorage
        const token = loginResponse.token;
        if (token) {
          localStorage.setItem("jwt", token);
          // After login, get the current user data
          return getCurrentUser(token);
        } else {
          throw new Error("No token received");
        }
      })
      .then((userResponse) => {
        const user = userResponse.data || userResponse;
        setCurrentUser(user);
        setIsLoggedIn(true);
        setActiveModal(""); // Close any open modals
      })
      .catch((error) => {
        console.error("Login error:", error);
      });
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };
  const handleEditProfile = ({ name, avatarUrl }) => {
    const token = localStorage.getItem("jwt");
    updateUserProfile({ name, avatar: avatarUrl }, token)
      .then((updatedUser) => {
        // Update current user state with the response from server
        const user = updatedUser.data || updatedUser.user || updatedUser;
        setCurrentUser(user);
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Failed to update profile:", error);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      getCurrentUser(token)
        .then((userResponse) => {
          const user = userResponse.data || userResponse;
          setCurrentUser(user);
        })
        .catch((error) => {
          console.error("Failed to get current user:", error);
          // Token might be expired or invalid, remove it
          localStorage.removeItem("jwt");
        });
    }
  }, []);

  const deleteItemHandler = (cardID) => {
    const token = localStorage.getItem("jwt");
    removeItem(cardID, token)
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

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    // Check if this card is not currently liked
    !isLiked
      ? // if so, send a request to add the user's id to the card's likes array
        addCardLike(id, token)
          .then((updatedCard) => {
            const newCard = updatedCard.data || updatedCard;
            setClothingItems((cards) =>
              cards.map((item) =>
                (item._id || item.id) === id ? newCard : item
              )
            );
          })
          .catch((err) => console.log(err))
      : // if not, send a request to remove the user's id from the card's likes array
        removeCardLike(id, token)
          .then((updatedCard) => {
            const newCard = updatedCard.data || updatedCard;
            setClothingItems((cards) =>
              cards.map((item) =>
                (item._id || item.id) === id ? newCard : item
              )
            );
          })
          .catch((err) => console.log(err));
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
      .then(({ data }) => {
        setClothingItems(data.slice().reverse());
      })
      .catch(console.error);
  }, []);
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleLoginClick={handleLoginClick}
              handleRegisterClick={handleRegisterClick}
              handleAddClick={handleAddClick}
              weatherData={weatherData}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    onCardLike={handleCardLike}
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
                  <ProtectedRoute isLoggedIn={!!currentUser}>
                    <Profile
                      handleLogout={handleLogout}
                      handleEditProfileClick={handleEditProfileClick}
                      clothingItems={clothingItems}
                      handleCardClick={handleCardClick}
                      handleAddClick={handleAddClick}
                      onCardLike={handleCardLike}
                    />
                  </ProtectedRoute>
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
          <RegisterModal
            activeModal={activeModal}
            onSignUp={handleRegistration}
            onClose={closeActiveModal}
            isOpen={activeModal === "register"}
            onLoginClick={handleLoginClick}
          />
          <LoginModal
            activeModal={activeModal}
            onClose={closeActiveModal}
            isOpen={activeModal === "login"}
            onLogin={handleLogin}
            onRegisterClick={handleRegisterClick}
          />
          <EditProfileModal
            activeModal={activeModal}
            onClose={closeActiveModal}
            isOpen={activeModal === "edit-profile"}
            onSubmit={handleEditProfile}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
