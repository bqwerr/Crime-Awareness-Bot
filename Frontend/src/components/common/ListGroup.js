import React from "react";
import { ListGroup } from "react-bootstrap";

const MyListGroup = ({ types, selectedType, onTypeSelect }) => {
  return (
    <ListGroup className={"border border-dark bg-dark"}>
      {types.map((type) => (
        <ListGroup.Item
          onClick={() => onTypeSelect(type)}
          key={type._id}
          className={type === selectedType ? "active" : "bg-dark text-white"}
        >
          {type.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default MyListGroup;
