import React from "react";
import { useArgs } from "@storybook/client-api";
import { TableRow, ButtonTeamList } from "components";
import { persons, teams } from "./data";
import * as Styles from "components/List/styles.jsx";

export default {
  title: "List Page/Table",
  component: TableRow,
  argTypes: {
    onClick: { action: "OpenModal" },
    setPage: { action: "handleChangeTeam" },
  },
};

const Template = ({ ...args }) => {
  let { id, created_by, description, members, ...otherData } = args.results[0];
  let objectKey = otherData;
  const { onClick, setPage, ...otherArgs } = args;
  const [_, updateArgs] = useArgs();
  return (
    <Styles.ListWrapper team={args.header === "Team"}>
      {objectKey &&
        Object.entries(objectKey).map(([key], index) => {
          let description = `${key[0].toUpperCase()}${key
            .slice(1)
            .replace("_", " ")}`;
          return (
            <TableRow
              boldText={true}
              key={`${args.header}s-${key}`}
              description={description}
              index={index}
              onClick={() => {}}
              {...otherArgs}
            />
          );
        })}
      {args?.results?.map((props) => {
        const { id, members, created_by, description, ...otherProps } = props;
        return Object.entries(otherProps).map(([key, value], index) => {
          let valueData =
            value !== null
              ? key === "assigned_to"
                ? value.username
                : value
              : "None";
          return (
            <React.Fragment key={`${key}-${id}`}>
              <TableRow
                header={args.header}
                description={valueData}
                index={index}
                {...otherArgs}
                onClick={onClick}
              />
              {args.header === "Team" && (
                <ButtonTeamList
                  id={id}
                  hook={{
                    handleChangeTeams: () => {
                      updateArgs({
                        ...args,
                        teams: { currentTeam: { id: id } },
                      });
                    },
                  }}
                  teams={args.teams}
                  setPage={setPage}
                />
              )}
            </React.Fragment>
          );
        });
      })}
    </Styles.ListWrapper>
  );
};

export const Lead = Template.bind({});
Lead.args = { header: "Lead", results: persons };

export const Team = Template.bind({});
Team.args = {
  header: "Team",
  results: teams,
  teams: { currentTeam: { id: 1 } },
};

export const Client = Template.bind({});
Client.args = { header: "Client", results: persons };
