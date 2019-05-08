import { combineReducers } from 'redux';

import standup, { StandupState } from './standup';
import teams, { TeamsState } from './teams';
import team, { TeamState } from './team';
import projects, { ProjectState } from './projects';

export type ApplicationState = {
    readonly projects: ProjectState;
    readonly teams: TeamsState;
    readonly team: TeamState;
    readonly standup: StandupState;
  };

const rootReducer = combineReducers<ApplicationState>({
    projects: projects,
    teams,
    team,
    standup,
});

export default rootReducer;
