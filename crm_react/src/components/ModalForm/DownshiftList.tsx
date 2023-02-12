import React, { useState } from "react";
import {
  UseFormWatch,
  UseFormRegister,
  UseFormSetValue,
  FieldValues,
  Path,
  PathValue,
} from "react-hook-form";
import { useCombobox } from "downshift";
import * as Styles from "./styles";
import * as StylesField from "components/Field/styles";
import type { CurrentTeamState, User } from "types";

type DownshiftListProps<TFieldValues extends FieldValues> = {
  teams: CurrentTeamState;
  name: Path<TFieldValues>;
  register: UseFormRegister<TFieldValues>;
  setValue: UseFormSetValue<TFieldValues>;
  watch: UseFormWatch<TFieldValues>;
};

const DownshiftList = <TFieldValues extends FieldValues>({
  teams,
  name,
  register,
  setValue,
  watch,
}: DownshiftListProps<TFieldValues>) => {
  const [items, setItems] = useState(teams?.currentTeam?.members);
  const getMembersFilter = (
    inputValue: PathValue<TFieldValues, Path<TFieldValues>>
  ) => {
    return function membersFilter(member: User) {
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
        teams?.currentTeam?.members.filter(
          getMembersFilter(
            inputValue as PathValue<TFieldValues, Path<TFieldValues>>
          )
        )
      );
      setValue(name, inputValue as PathValue<TFieldValues, Path<TFieldValues>>);
    },
    onSelectedItemChange: ({ inputValue }) => {
      setValue(name, inputValue as PathValue<TFieldValues, Path<TFieldValues>>);
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
        empty={!watch(name)}
        {...getInputProps({ ...register(name), value: watch(name) })}
      />
      <StylesField.Label
        empty={!watch(name)}
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
          items.map((item, index) => {
            return (
              <Styles.Li
                highlighted={highlightedIndex === index}
                selectedItem={watch(name) === item.username}
                key={`${item}${index}`}
                {...getItemProps({ item, index })}
              >
                <span>{item.username}</span>
              </Styles.Li>
            );
          })}
      </Styles.Ul>
    </StylesField.FieldWrapper>
  );
};
export default DownshiftList;
