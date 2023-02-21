import React, { useEffect } from "react";
import {
  useForm,
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  Path,
} from "react-hook-form";
import {
  defaultValuesTeam,
  defaultValueMember,
  defaultValuesLeadAndClient,
  modalLeadAndClientField,
  modalTeamField,
  modalTeamAddMemberField,
} from "constans";
import { Button, DownshiftList, Field, Modal } from "components";
import * as Styles from "./styles";
import { useAppDispatch } from "types/hooks";
import type { LeadAndClientValues, TeamValues, MemberValues } from "types";
import type { ModalFormProps } from "types/components/ModalForm";

export const ModalForm = <H, TFieldValues extends FieldValues>({
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
}: ModalFormProps<H, TFieldValues>) => {
  const dispatch = useAppDispatch();
  const defaultValue =
    header !== "Team"
      ? defaultValuesLeadAndClient
      : addMember
      ? defaultValueMember
      : defaultValuesTeam;
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
  } = useForm<LeadAndClientValues | TeamValues | MemberValues>({
    defaultValues: defaultValue,
  });

  useEffect(() => {
    if (list && !addMember) {
      const { id, created_by, members, ...otherData } = list;
      Object.entries(otherData).forEach(([key, value]) => {
        key === "assigned_to"
          ? setValue(key, value?.username ? value?.username : "")
          : setValue(
              key as H extends "T"
                ? "name" | "description"
                : "first_name" | "last_name" | "email" | "phone",
              value
            );
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
          if (teams?.currentTeam?.id) {
            list
              ? addMember && "handleAddMember" in hook && "username" in register
                ? await hook.handleAddMember(list.id, register)
                : await hook.handleEdit(
                    list.id,
                    teams.currentTeam.id,
                    register as TeamValues & LeadAndClientValues
                  )
              : await hook.handleAdd(
                  teams.currentTeam.id,
                  register as TeamValues & LeadAndClientValues
                );
          }
          endpoint && dispatch(endpoint.util.resetApiState());
          resetSearch &&
            resetSearch(`${header.toLowerCase()}-search` as Path<TFieldValues>);
          setPage && setPage(0);
          closeModal();
          closeDetails && closeDetails();
          reset();
        })}
      >
        {formData.map((props, index) => (
          <Field<LeadAndClientValues | TeamValues | MemberValues>
            {...props}
            key={index}
            watch={watch}
            errors={!!errors[props.name as keyof typeof errors]}
            register={register}
          />
        ))}
        {header !== "Team" && teams && (
          <DownshiftList<LeadAndClientValues>
            teams={teams}
            name="assigned_to"
            register={register as UseFormRegister<LeadAndClientValues>}
            setValue={setValue as UseFormSetValue<LeadAndClientValues>}
            watch={watch as UseFormWatch<LeadAndClientValues>}
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

export default Modal(ModalForm) as <H, TFieldValues extends FieldValues>(
  props: ModalFormProps<H, TFieldValues>
) => JSX.Element;
