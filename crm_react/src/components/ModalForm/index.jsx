import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, DownshiftList, Field, Modal } from "components";
import { modalLeadandClientField, modalTeamField } from "constans";
import * as Styles from "./styles";

const ModalFrom = ({
  hook,
  header,
  teams,
  modalIsOpen,
  closeModal,
  closeDetails,
  list,
}) => {
  const defaultValue = header === "Team" ? "" : { assigned_to: "" };
  const formData = header !== "Team" ? modalLeadandClientField : modalTeamField;
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
    if (list) {
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
        {list ? "Edit" : "Add"} {header}
      </Styles.Header>
      <Styles.Form
        onSubmit={handleSubmit((register) => {
          list
            ? hook.handleEdit(list.id, teams?.currentTeam?.id, register)
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
          <Button height="40px">Submit</Button>
        </Styles.ButtonWrapper>
      </Styles.Form>
    </>
  );
};

export default Modal(ModalFrom);
