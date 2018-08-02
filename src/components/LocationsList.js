import React from "react";
import ListItem from "./ListItem";

const LocationsList = props => {
  return (
    <ul className="locations-list">
      {props.filteredLocations.map(item => (
        <ListItem
          name={item.venue.name}
          key={item.venue.id}
          onListItemClick={props.onListItemClick}
          clickListItem={props.clickListItem}
        />
      ))}
    </ul>
  );
};

export default LocationsList;
