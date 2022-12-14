import React, { useState } from "react";
import { useCombobox } from "downshift";
import * as Styles from "./styles";

const DownshiftList = ({ teams, name, register, setValue, watch }) => {
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
        absolute="true"
        {...getInputProps({ ref: register(name), value: watch(name) })}
      />
      <Styles.ButtonDowshift
        aria-label="toggle menu"
        type="button"
        {...getToggleButtonProps()}
      >
        {isOpen ? <>&#8593;</> : <>&#8595;</>}
      </Styles.ButtonDowshift>
      <Styles.Ul {...getMenuProps()}>
        {isOpen &&
          items.map((item, index) => (
            <Styles.Li
              highlighted={highlightedIndex === index}
              selectedItem={watch("assigned_to") === item.username}
              key={`${item.value}${index}`}
              {...getItemProps({ item, index })}
            >
              <span>{item.username}</span>
            </Styles.Li>
          ))}
      </Styles.Ul>
    </Styles.InputWrapper>
  );
};
export default DownshiftList;
