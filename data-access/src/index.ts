export * from './lib/data-access.module';

// SERVICES
export { ProjectsService } from './lib/core-data/projects/projects.service';

// INTERFACES
export { Project, emptyProject } from './lib/core-data/projects/project';

// STATE
export * as ProjectActions from './lib/core-state/projects.actions';
export * as ProjectSelectors from './lib/core-state/projects.selectors';
export * as ProjectFacade from './lib/core-state/projects.facade';
export { projectsReducer } from './lib/core-state/projects.reducer';
