import React, { useState } from "react";
import { useCombobox } from "downshift";
import * as Styles from "./styles";
import * as StylesField from "components/Field/styles";

const DownshiftList = ({ teams, name, register, setValue, watch, errors }) => {
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
    <StylesField.FieldWrapper>
      <StylesField.Input
        name={name}
        empty={watch(name)}
        error={errors[name]}
        absolute="true"
        {...getInputProps({ ref: register(name), value: watch(name) })}
      />
      <StylesField.Label
        empty={watch(name) === undefined || watch(name) === ""}
        htmlFor="assigned_to"
        {...getLabelProps()}
      >
        Assigned to
      </StylesField.Label>
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
    </StylesField.FieldWrapper>
  );
};
export default DownshiftList;
