import React, { useEffect, useReducer } from "react";

const initialState = { loading: false, selectedPet: "", petData: null };

function petsReducer(state, action) {
  switch (action.type) {
    case "PET_SELECTED": {
      return {
        ...state,
        selectedPet: action.payload
      };
    }
    case "FETCH_PET": {
      return {
        ...state,
        loading: true,
        petData: null
      };
    }
    case "FETCH_PET_SUCCESS": {
      return {
        ...state,
        loading: false,
        petData: action.payload
      };
    }

    case "RESET": {
      return initialState;
    }

    default:
      throw new Error(`Not supported action ${action.type}`);
  }
}

function Pets(props) {
  const [pets, dispatch] = useReducer(petsReducer, initialState);

  const choose = (value) => {
    dispatch({ type: "PET_SELECTED", payload: value });
  };

  useEffect(() => {
    if (pets.selectedPet) {
      dispatch({ type: "FETCH_PET" });
      setTimeout(() => {
        dispatch({ type: "FETCH_PET_SUCCESS", payload: {name: 'coba'} });
      }, 3000);
    } else {
      dispatch({ type: "RESET" });
    }
  }, [pets.selectedPet]);

  return (
    <div>
      <div className="form-group row">
            <div className="col-sm-6">
                <label>Jumlah Orang yang Bertanda Tangan</label>
                <div className="form-radio">
                    <div className="radio radio-inline">
                        <label>
                            <input type="radio" name="person" ref={props.register} defaultValue="1" onChange={() => choose(1)} defaultChecked />
                            <i className="helper" />1 Orang
                        </label>
                    </div>
                    <div className="radio radio-inline">
                        <label>
                            <input type="radio" name="person" ref={props.register} defaultValue="3" onChange={() => choose(3)} />
                            <i className="helper" />3 Orang
                        </label>
                    </div>
                </div>
            </div>
        </div>
      {pets.loading && <div>Loading...</div>}
      {pets.petData && <h1>Data</h1>}
    </div>
  );
}

export default Pets;