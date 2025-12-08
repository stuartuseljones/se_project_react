import { useContext } from "react";
import "./ToggleSwitch.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

export default function ToggleSwitch() {
  const { handleToggleSwitchChange, currentTemperatureUnit } = useContext(
    CurrentTemperatureUnitContext
  );

  return (
    <label htmlFor="units" className="toggle-switch">
      <input
        checked={currentTemperatureUnit === "C"}
        onChange={handleToggleSwitchChange}
        id="units"
        type="checkbox"
        className="toggle-switch__checkbox"
      />
      <span
        className="toggle-switch__text toggle-switch__text-f"
        style={{
          color: `${
            currentTemperatureUnit === "F" ? "white" : "rgba(0, 0, 0, 0.5)"
          }`,
        }}
      >
        F
      </span>
      <span
        className="toggle-switch__text toggle-switch__text-c"
        style={{ color: `${currentTemperatureUnit === "C" ? "white" : ""}` }}
      >
        C
      </span>
      <span className="toggle-switch__circle"></span>
    </label>
  );
}
