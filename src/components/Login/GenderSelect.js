import React from 'react'
import { useMediaQuery } from 'react-responsive';

function GenderSelect({ handleRegisterChange, genderError }) {

    const view1 = useMediaQuery({
        query: "(min-width: 539px)", // return true if width of screen is larger than 850px, false otherwise
      });
      const view2 = useMediaQuery({
        query: "(min-width: 850px)", // return true if width of screen is larger than 850px, false otherwise
      });
      const view3 = useMediaQuery({
        query: "(min-width: 1170px)", // return true if width of screen is larger than 850px, false otherwise
      });
    return (
        <div className="reg_grid" 
        style={{marginBottom: `${genderError && !view3 && '70px'}`}}>
        <label htmlFor="male">
          Male{" "}
          <input
            type="radio"
            name="gender"
            id="male"
            value="male"
            onChange={handleRegisterChange}
          />
        </label>
        <label htmlFor="female">
          Female{" "}
          <input
            type="radio"
            name="gender"
            id="female"
            value="female"
            onChange={handleRegisterChange}
          />
        </label>
        <label htmlFor="custom">
          Custom{" "}
          <input
            type="radio"
            name="gender"
            id="custom"
            value="custom"
            onChange={handleRegisterChange}
          />
        </label>
        {genderError && (
          <div className="input_error">
            <div className="error_arrow_bottom"></div>
          {genderError}</div>
        )}
      </div>
    )
}

export default GenderSelect
