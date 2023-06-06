import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  PROJECTS_FEATURE_KEY,
  ProjectsState,
  projectsAdapter,
} from './projects.reducer';

// Lookup the 'Projects' feature state managed by NgRx
export const selectProjectsState =
  createFeatureSelector<ProjectsState>(PROJECTS_FEATURE_KEY);

const { selectAll, selectEntities } = projectsAdapter.getSelectors();

export const selectProjectsLoaded = createSelector(
  selectProjectsState,
  (state: ProjectsState) => state.loaded
);

export const selectIsProjectSelected = createSelector(
  selectProjectsState,
  (state: ProjectsState) =>
    state.selectedId === null || state.selectedId === undefined
);

export const selectProjectsError = createSelector(
  selectProjectsState,
  (state: ProjectsState) => state.error
);

export const selectAllProjects = createSelector(
  selectProjectsState,
  (state: ProjectsState) => selectAll(state)
);

export const selectProjectsEntities = createSelector(
  selectProjectsState,
  (state: ProjectsState) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectProjectsState,
  (state: ProjectsState) => state.selectedId
);

export const selectEntity = createSelector(
  selectProjectsEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
