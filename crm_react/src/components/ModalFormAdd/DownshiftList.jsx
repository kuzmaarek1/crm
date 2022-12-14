import React, { useState } from "react";
import { useCombobox } from "downshift";
import * as Styles from "./styles";

const DownshiftList = ({ teams, name, register, setValue }) => {
  const [items, setItems] = useState(teams?.currentTeam?.members);

  const getMembersFilter = (inputValue) => {
    return function membersFilter(member) {
      return (
        !inputValue ||
        member.username.toLowerCase().includes(inputValue.toLowerCase())
      );
    };
  };

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    onInputValueChange({ inputValue }) {
      setItems(
        teams?.currentTeam?.members.filter(getMembersFilter(inputValue))
      );
      setValue(name, inputValue);
    },
    onSelectedItemChange: ({ inputValue }) => {
      setValue(name, inputValue);
    },
    items,
    itemToString(item) {
      return item ? item.username : "";
    },
  });
  return (
    <Styles.InputWrapper>
      <Styles.Label htmlFor="description" {...getLabelProps()}>
        Assigned to
      </Styles.Label>
      <Styles.Input
        placeholder="Select members"
        name={name}
        {...getInputProps({ ref: register(name) })}
      />
      <button
        aria-label="toggle menu"
        type="button"
        {...getToggleButtonProps()}
      ></button>
      {isOpen ? <>&#8593;</> : <>&#8595;</>}
      <ul {...getMenuProps()}>
        {isOpen &&
          items.map((item, index) => (
            <li
              key={`${item.value}${index}`}
              {...getItemProps({ item, index })}
            >
              <span>{item.username}</span>
            </li>
          ))}
      </ul>
    </Styles.InputWrapper>
  );
};
export default DownshiftList;
