import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, DownshiftList, Field } from "components";
import * as Styles from "./styles";
import { modalLeadandClientField, modalTeamField } from "constans";

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
    <Styles.ModalWrapper
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      ariaHideApp={false}
    >
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
        {header !== "Team" ? (
          <>
            {modalLeadandClientField.map((props) => (
              <Field
                {...props}
                watch={watch}
                errors={errors}
                register={register}
              />
            ))}
            <DownshiftList
              teams={teams}
              name="assigned_to"
              register={register}
              setValue={setValue}
              watch={watch}
            />
          </>
        ) : (
          modalTeamField.map((props) => (
            <Field
              {...props}
              watch={watch}
              errors={errors}
              register={register}
            />
          ))
        )}
        <Button>Submit</Button>
      </Styles.Form>
    </Styles.ModalWrapper>
  );
};

export default ModalFrom;
