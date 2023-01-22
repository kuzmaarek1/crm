import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, DownshiftList, Field, Modal } from "components";
import {
  modalLeadAndClientField,
  modalTeamField,
  modalTeamAddMemberField,
} from "constans";
import * as Styles from "./styles";

const ModalFrom = ({
  hook,
  header,
  teams,
  modalIsOpen,
  closeModal,
  closeDetails,
  list,
  addMember,
  setPage,
}) => {
  const defaultValue = header === "Team" ? "" : { assigned_to: "" };
  const formData =
    header !== "Team"
      ? modalLeadAndClientField
      : addMember
      ? modalTeamAddMemberField
      : modalTeamField;
  const headerData = addMember ? "member" : header;
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValue,
  });

  useEffect(() => {
    if (list && !addMember) {
      const { id, created_by, members, ...otherData } = list;
      Object.entries(otherData).forEach(([key, value]) => {
        key === "assigned_to"
          ? setValue(key, value?.username ? value?.username : "")
          : setValue(key, value);
      });
    }
  }, [list?.id]);

  return (
    <>
      <Styles.Header>
        {list && !addMember ? "Edit" : "Add"} {headerData}
      </Styles.Header>
      <Styles.Form
        onSubmit={handleSubmit((register) => {
          setPage(1);
          list
            ? addMember
              ? hook.handleAddMember(list.id, register)
              : hook.handleEdit(list.id, teams?.currentTeam?.id, register)
            : hook.handleAdd(teams?.currentTeam?.id, register);
          closeModal();
          list && closeDetails();
          reset();
        })}
      >
        {formData.map((props, index) => (
          <Field
            {...props}
            key={index}
            watch={watch}
            errors={errors}
            register={register}
          />
        ))}
        {header !== "Team" && (
          <DownshiftList
            teams={teams}
            name="assigned_to"
            register={register}
            setValue={setValue}
            watch={watch}
            errors={errors}
          />
        )}
        <Styles.ButtonWrapper>
          <Button height="40px" aria-label="submit">
            Submit
          </Button>
        </Styles.ButtonWrapper>
      </Styles.Form>
    </>
  );
};

export default Modal(ModalFrom);
