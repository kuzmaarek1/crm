import React,{ useEffect, useState }  from "react";
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth.js";
import { NavLink } from "react-router-dom";
import { TeamsWrapper,TeamTitle, TeamHeader, TeamLink, TeamWrapper, TeamModal, ModalButton, ModalWrapper, ModalTeamWrapper, TeamForm, TeamInput, TeamLinkDiv } from './Teams.styles.js';
import { useTeams } from "../../hooks/useTeams.js";
import { Button } from "../../components/atoms/Button/Button.js";


const Teams = () => {
 const auth = useAuth();
 const navigate = useNavigate();
 const [teams, setTeams] = useState([]);
 const [team, setTeam] = useState([]);
 const {members} = team;
 const { getTeams,getTeamsById, deleteTeam, searchTeam } = useTeams();
 const [modalIsOpen, setIsOpen] = React.useState(false);
 const {
  register,
  setValue,
  handleSubmit,
  formState: { errors },
} = useForm();
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
  const handleSearch=(name)=>{
    (async () => {
      const teamsClient = await searchTeam(name);
      setTeams(teamsClient);
    })();
  }
  return (
    <TeamsWrapper>
      <TeamTitle>
        <TeamHeader>Team</TeamHeader>
        <TeamForm onSubmit={handleSubmit((register)=>{handleSearch(register.name)})}>
        <TeamInput type="serach" placeholder="Search by name" {...register("name", { required: true , onChange:(e)=>{handleSearch(e.target.value)}})} />
        </TeamForm>
        <TeamLinkDiv>
          <TeamLink to="/add-team">Add Teams</TeamLink>
        </TeamLinkDiv>
      </TeamTitle>
      <TeamWrapper title>
            <div>Name</div>
      </TeamWrapper>
      {teams &&(teams.map((team)=>(
          <TeamWrapper onClick={()=>openModal(team.id)}>
            <div>{team.name}</div>
            {String(auth.teamid) === String(team.id) ? <Button team red>Current</Button>:<Button team onClick={(e)=>{e.stopPropagation();handleChangeTeams(team.id);}}>Active</Button>}
        </TeamWrapper>
      )))}
      <TeamModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      > 
      {team.members &&(String(team.members[0].id)===String(auth.userid) &&(
        <ModalButton>
          <Button to={`/add-member/${team.id}`} as={NavLink} lead>Add member</Button>
          <Button red onClick={()=>handleDelete(team.id)}>Delete</Button>
        </ModalButton>))}
        <ModalWrapper>
          <ModalTeamWrapper title>Name</ModalTeamWrapper><ModalTeamWrapper>{team.name}</ModalTeamWrapper>
          <ModalTeamWrapper title description>Description</ModalTeamWrapper><ModalTeamWrapper description>{team.description}</ModalTeamWrapper>
          {team.members && (members.map((member)=>(<><ModalTeamWrapper title>Member</ModalTeamWrapper><ModalTeamWrapper >{member.username}</ModalTeamWrapper></>)))}
        </ModalWrapper>
      </TeamModal>
    </TeamsWrapper>
  );
};

export default Teams;
