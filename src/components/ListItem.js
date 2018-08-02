import React from "react";

const ListItem = props => {
  return (
    <li
      className="list-item"
      onClick={props.onListItemClick}
      aria-label={props.name}
      onKeyDown={props.clickListItem}
      role="button"
      tabIndex="0"
    >
      {props.name}
    </li>
  );
};

export default ListItem;
