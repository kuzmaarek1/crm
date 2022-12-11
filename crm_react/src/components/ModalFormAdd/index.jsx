import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "components";
import * as Styles from "./styles";

const ModalFromAdd = ({ hook, header, teams, modalIsOpen, closeModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <Styles.ModalWrapper
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      ariaHideApp={false}
    >
      <Styles.Header>Add {header}</Styles.Header>
      <Styles.Form
        onSubmit={handleSubmit((register) => {
          hook.handleAdd(teams?.currentTeam?.id, register);
          closeModal();
        })}
      >
        {header !== "Team" ? (
          <>
            <Styles.InputWrapper>
              <Styles.Label htmlFor="first_name">First name</Styles.Label>
              <Styles.Input
                type="text"
                name="first_name"
                id="first_name"
                {...register("first_name", { required: true })}
              />
              {errors.first_name && (
                <Styles.Span>First name is required</Styles.Span>
              )}
            </Styles.InputWrapper>
            <Styles.InputWrapper>
              <Styles.Label htmlFor="last_name">Last name</Styles.Label>
              <Styles.Input
                type="text"
                name="last_name"
                id="last_name"
                {...register("last_name", { required: true })}
              />
              {errors.last_name && (
                <Styles.Span>Last name is required</Styles.Span>
              )}
            </Styles.InputWrapper>
            <Styles.InputWrapper>
              <Styles.Label htmlFor="email">Email</Styles.Label>
              <Styles.Input
                type="email"
                name="email"
                id="email"
                {...register("email", { required: true })}
              />
              {errors.email && <Styles.Span>Email is required</Styles.Span>}
            </Styles.InputWrapper>
            <Styles.InputWrapper>
              <Styles.Label htmlFor="phone">Phone</Styles.Label>
              <Styles.Input
                type="number"
                name="phone"
                id="phone"
                {...register("phone", { required: true })}
              />
              {errors.phone && <Styles.Span>Phone is required</Styles.Span>}
            </Styles.InputWrapper>
          </>
        ) : (
          <Styles.InputWrapper>
            <Styles.Label htmlFor="name">Name</Styles.Label>
            <Styles.Input
              type="text"
              name="name"
              id="name"
              {...register("name", { required: true })}
            />
            {errors.name && <Styles.Span> Name is required</Styles.Span>}
          </Styles.InputWrapper>
        )}

        <Styles.InputWrapper>
          <Styles.Label htmlFor="description">Description</Styles.Label>
          <Styles.Textarea
            type="description"
            name="description"
            id="description"
            {...register("description", { required: true })}
          />
          {errors.description && (
            <Styles.Span>Description is required</Styles.Span>
          )}
        </Styles.InputWrapper>
        <Button>Submit</Button>
      </Styles.Form>
    </Styles.ModalWrapper>
  );
};

export default ModalFromAdd;
