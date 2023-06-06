import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as ProjectsActions from './projects.actions';
import { ProjectsEntity } from './projects.models';

export const PROJECTS_FEATURE_KEY = 'projects';

export interface ProjectsState extends EntityState<ProjectsEntity> {
  selectedId?: string | number; // which Projects record has been selected
  loaded: boolean; // has the Projects list been loaded
  error?: string | null; // last known error (if any)
}

export interface ProjectsPartialState {
  readonly [PROJECTS_FEATURE_KEY]: ProjectsState;
}

export const projectsAdapter: EntityAdapter<ProjectsEntity> =
  createEntityAdapter<ProjectsEntity>();

export const initialProjectsState: ProjectsState =
  projectsAdapter.getInitialState({
    // set initial required properties
    loaded: false,
  });

const reducer = createReducer(
  initialProjectsState,
  on(
    ProjectsActions.loadProject,
    ProjectsActions.createProject,
    ProjectsActions.updateProject,
    ProjectsActions.deleteProject,
    ProjectsActions.loadProjects,
    (state) => ({
      ...state,
      loaded: false,
      error: null,
    })
  ),
  on(ProjectsActions.loadProjectsSuccess, (state, { projects }) =>
    projectsAdapter.setAll(projects, { ...state, loaded: true })
  ),
  on(ProjectsActions.loadProjectSuccess, (state, { project }) =>
    projectsAdapter.setOne(project, { ...state, loaded: true })
  ),
  on(ProjectsActions.createProjectSuccess, (state, { project }) =>
    projectsAdapter.addOne(project, { ...state, loaded: true })
  ),
  on(ProjectsActions.updateProjectSuccess, (state, { project }) =>
    projectsAdapter.upsertOne(project, { ...state, loaded: true })
  ),
  on(ProjectsActions.deleteProjectSuccess, (state, { project }) =>
    projectsAdapter.removeOne(project.id, { ...state, loaded: true })
  ),
  on(
    ProjectsActions.loadProjectsFailure,
    ProjectsActions.loadProjectFailure,
    ProjectsActions.createProjectFailure,
    ProjectsActions.updateProjectFailure,
    ProjectsActions.deleteProjectFailure,
    (state, { error }) => ({
      ...state,
      error,
    })
  )
);

export function projectsReducer(
  state: ProjectsState | undefined,
  action: Action
) {
  return reducer(state, action);
}
