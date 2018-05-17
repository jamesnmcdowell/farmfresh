import _ from 'lodash';

export const getMatchingLibraries =  (term, library) =>
    library.filter((c) => c.name.toLowerCase().includes(term.toLowerCase()));

export const findClosestLocation = (userLoc, locations) => {
    console.log('james is cool');
    let myCord = new window.google.maps.LatLng(userLoc.lat, userLoc.lng);
    console.log(userLoc.lat);
    console.log('YOOOdsdsddg');
    if (locations.length === 0) {
        return 'no locations'
    }
    else {
        let distanceArray = locations.map((val) => {
            console.log('YOOO'); console.log(val.lat); return ({
                ...val,
                distanceFrom: calcDistance(
                    new window.google.maps.LatLng(val.lat, val.lng),
                    myCord
                )
            })
        }
        );
        console.log(distanceArray);
        let lodashResult = _.sortBy(distanceArray, [function (o) { return o.distanceFrom; }]);
        console.log('lodash');
        console.log(lodashResult[0]);

        return (lodashResult[0]);
        // .distanceFrom.toFixed(2)) + ' miles'
    }
}

export const calcDistance = (otherCord, myCord) => {
    return (window.google.maps.geometry.spherical.computeDistanceBetween(otherCord, myCord) / 1000);
}
