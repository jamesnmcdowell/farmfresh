

let setPosition = (state, action) => {
  let {currentLng, currentLat} = action;
  return {...state, currentLat, currentLng};
};

setPosition.toString = () => "POSITION_SET";

export default setPosition;