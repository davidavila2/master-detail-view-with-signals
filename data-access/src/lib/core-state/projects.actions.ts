import { createAction, props } from '@ngrx/store';
import { ProjectsEntity } from './projects.models';

// SELECT PROJECT
export const projectSelected = createAction(
  '[Projects Page] Select Project',
  props<{ project: ProjectsEntity }>()
);

export const resetSelectedProject = createAction(
  '[Projects Page] Reset Project',
)

// LOAD PROJECT
export const loadProject = createAction(
  '[Projects Page] Load Project',
  props<{ project: ProjectsEntity }>()
);

export const loadProjectSuccess = createAction(
  '[Projects/API] Load Project Success',
  props<{ project: ProjectsEntity }>()
);

export const loadProjectFailure = createAction(
  '[Projects/API] Load Project Failure',
  props<{ error: string }>()
);

// LOAD PROJECTS
export const loadProjects = createAction('[Projects Page] Load Projects');

export const loadProjectsSuccess = createAction(
  '[Projects/API] Load Projects Success',
  props<{ projects: ProjectsEntity[] }>()
);

export const loadProjectsFailure = createAction(
  '[Projects/API] Load Projects Failure',
  props<{ error: string }>()
);

// CREATE PROJECT
export const createProject = createAction(
  '[Projects Page] Create Project',
  props<{ project: ProjectsEntity }>()
);

export const createProjectSuccess = createAction(
  '[Projects/API] Create Project Success',
  props<{ project: ProjectsEntity }>()
);

export const createProjectFailure = createAction(
  '[Projects/API] Create Project Failure',
  props<{ error: string }>()
);

// UPDATE PROJECT
export const updateProject = createAction(
  '[Projects Page] Update Project',
  props<{ project: ProjectsEntity }>()
);

export const updateProjectSuccess = createAction(
  '[Projects/API] Update Project Success',
  props<{ project: ProjectsEntity }>()
);

export const updateProjectFailure = createAction(
  '[Projects/API] Update Project Failure',
  props<{ error: string }>()
);

// DELETE PROJECT
export const deleteProject = createAction(
  '[Projects Page] Delete Project',
  props<{ project: ProjectsEntity }>()
);

export const deleteProjectSuccess = createAction(
  '[Projects/API] Delete Project Success',
  props<{ project: ProjectsEntity }>()
);

export const deleteProjectFailure = createAction(
  '[Projects/API] Delete Project Failure',
  props<{ error: string }>()
);
