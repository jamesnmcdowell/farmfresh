import currentPositionReducer from "../reducers/currentPositionReducer";

const currentPositionConst = currentPositionReducer.toString();

let setPosition = (newLat, newLng) => {
  return {type:currentPositionConst,currentLat:newLat, currentLng:newLng };
};

export default setPosition;

setPosition.toString = () => currentPositionConst;