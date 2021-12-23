import React,{ useEffect, useState }  from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../hooks/useAuth.js";
import { NavLink } from "react-router-dom";
import { TeamsWrapper,TeamTitle, TeamHeader, TeamLink, TeamWrapper, TeamModal, ModalButton, ModalWrapper, ModalTeamWrapper} from './Teams.styles.js';
import { useTeams } from "../../hooks/useTeams.js";
import { Button } from "../../components/atoms/Button/Button.js";


const Teams = () => {
 const auth = useAuth();
 const navigate = useNavigate();
 const [teams, setTeams] = useState([]);
 const [team, setTeam] = useState([]);
 const { getTeams,getTeamsById, deleteTeam } = useTeams();
 const [modalIsOpen, setIsOpen] = React.useState(false);
  const openModal=(id)=> {
    setIsOpen(true);
   (async () => {
      const teamsClient = await getTeamsById(id);
      setTeam(teamsClient);
    })();
  }

  const closeModal=()=>{
    setIsOpen(false);
  }

 useEffect(() => {
    (async () => {
      const teamsClient = await getTeams();
      setTeams(teamsClient);
    })();
  }, [getTeams, auth.teamid]);

  const handleDelete=(id)=>{
    (async () => {
      const teamsDelete = await deleteTeam(id);
      const teamsClient = await getTeams();
      setTeams(teamsClient);
      setIsOpen(false);
    })();
  }
  
  const handleChangeTeams=async(id)=>{
    const respone = await auth.changeTeams(id);
    navigate("/teams");
  }

  return (
    <TeamsWrapper>
      <TeamTitle>
        <TeamHeader>Team</TeamHeader>
        <TeamLink to="/add-team">Add Teams</TeamLink>
      </TeamTitle>
      <TeamWrapper title>
            <div>Name</div>
      </TeamWrapper>
      { teams &&( teams.map((team)=>(
          <TeamWrapper onClick={()=>openModal(team.id)}>
            <div>{team.name}</div>
            {String(auth.teamid) === String(team.id) ? <Button team red>Current</Button>:<Button team onClick={(e)=>{e.stopPropagation();handleChangeTeams(team.id);}}>Active</Button>}
        </TeamWrapper>
      )))}
          <TeamModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      > 
        <ModalButton>
          <Button to={`/edit-teams/${team.id}`} as={NavLink} lead>Edit</Button>
          <Button red onClick={()=>handleDelete(team.id)}>Delete</Button>
        </ModalButton>
        <ModalWrapper>
          <ModalTeamWrapper title>Name</ModalTeamWrapper><ModalTeamWrapper>{team.name}</ModalTeamWrapper>
          <ModalTeamWrapper title description>Description</ModalTeamWrapper><ModalTeamWrapper description>{team.description}</ModalTeamWrapper>
        </ModalWrapper>
      </TeamModal>
    </TeamsWrapper>
  );
};

export default Teams;
