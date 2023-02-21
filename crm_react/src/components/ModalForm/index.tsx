import React, { useEffect } from "react";
import {
  useForm,
  FieldValues,
  UseFormResetField,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  Path,
} from "react-hook-form";
import { useAppDispatch } from "types/hooks";
import { Button, DownshiftList, Field, Modal } from "components";
import {
  defaultValuesTeam,
  defaultValueMember,
  defaultValuesLeadAndClient,
} from "constans";
import {
  modalLeadAndClientField,
  modalTeamField,
  modalTeamAddMemberField,
} from "constans";
import type {
  HookTeam,
  HookLead,
  HookClient,
  LeadAndClient,
  Team,
  LeadAndClientValues,
  TeamValues,
  MemberValues,
  CurrentTeamState,
} from "types";
import * as Styles from "./styles";

type RegisterProps<H> = H extends HookClient ? LeadAndClientValues : TeamValues;

export type ModalFormProps<H, TFieldValues extends FieldValues> = {
  hook: H extends "C" ? HookClient : H extends "L" ? HookLead : HookTeam;
  header: H extends "C" ? "Client" : H extends "L" ? "Lead" : "Team";
  teams?: CurrentTeamState;
  modalIsOpen: boolean;
  closeModal: () => void;
  closeDetails?: () => void;
  list?: H extends "T" ? Team : LeadAndClient;
  addMember?: boolean;
  setPage?: React.Dispatch<React.SetStateAction<number>>;
  endpoint?: {
    endpoints: H extends "C"
      ? { getClients: any } & { searchClient: any }
      : H extends "L"
      ? { getLeads: any } & { searchLead: any }
      : { getTeams: any } & { searchTeam: any };
    util: any;
  };
  resetSearch?: UseFormResetField<TFieldValues>;
};

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
              ? addMember && "handleAddMember" in hook
                ? await hook.handleAddMember(list.id, register)
                : await hook.handleEdit(
                    list.id,
                    teams.currentTeam.id,
                    register as RegisterProps<typeof hook>
                  )
              : await hook.handleAdd(
                  teams.currentTeam.id,
                  register as RegisterProps<typeof hook>
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
