import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, DownshiftList, Field } from "components";
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
            <Field
              type="text"
              name="first_name"
              watchName="first_name"
              watch={watch}
              errors={errors}
              register={register}
              required
            />
            <Field
              type="text"
              name="last_name"
              watchName="last_name"
              watch={watch}
              errors={errors}
              register={register}
              required
            />
            <Field
              type="email"
              name="email"
              watchName="email"
              watch={watch}
              errors={errors}
              register={register}
              required
            />
            <Field
              type="number"
              name="phone"
              watchName="phone"
              watch={watch}
              errors={errors}
              register={register}
              required
            />
            <DownshiftList
              teams={teams}
              name="assigned_to"
              register={register}
              setValue={setValue}
              watch={watch}
            />
          </>
        ) : (
          <Field
            type="text"
            name="name"
            watchName="name"
            watch={watch}
            errors={errors}
            register={register}
            required
          />
        )}
        <Field
          type="text"
          name="description"
          watchName="description"
          watch={watch}
          errors={errors}
          register={register}
          required
          textarea
        />
        <Button>Submit</Button>
      </Styles.Form>
    </Styles.ModalWrapper>
  );
};

export default ModalFrom;
