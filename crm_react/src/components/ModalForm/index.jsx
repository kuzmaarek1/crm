import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Button, DownshiftList, Field, Modal } from "components";
import {
  modalLeadAndClientField,
  modalTeamField,
  modalTeamAddMemberField,
} from "constans";
import * as Styles from "./styles";

const ModalForm = ({
  hook,
  header,
  teams,
  modalIsOpen,
  closeModal,
  closeDetails,
  list,
  addMember,
  setPage,
  endpoint,
  resetSearch,
}) => {
  const dispatch = useDispatch();
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
        onSubmit={handleSubmit(async (register) => {
          list
            ? addMember
              ? await hook.handleAddMember(list.id, register)
              : await hook.handleEdit(list.id, teams?.currentTeam?.id, register)
            : await hook.handleAdd(teams?.currentTeam?.id, register);
          dispatch(endpoint.util.resetApiState());
          resetSearch(`${header.toLowerCase()}-search`);
          setPage(0);
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

export default Modal(ModalForm);
