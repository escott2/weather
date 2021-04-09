import React from 'react';

function StoredLocations({savedLocations}) {
  return (
    <div>
      {savedLocations.map((location, index) => (<p key={index}>{location.city}</p>))}
    </div>


  );
}

export default StoredLocations;