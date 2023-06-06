import { Injectable, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as ProjectsActions from './projects.actions';
import * as ProjectsSelectors from './projects.selectors';
import { Project } from '../core-data/projects/project';

@Injectable()
export class ProjectsFacade {
  private readonly store = inject(Store);

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(ProjectsSelectors.selectProjectsLoaded));
  allProjects$ = this.store.pipe(select(ProjectsSelectors.selectAllProjects));
  selectedProjects$ = this.store.pipe(select(ProjectsSelectors.selectEntity));

  loadProject(project: Project) {
    this.store.dispatch(ProjectsActions.loadProject({ project }));
  }

  loadProjects() {
    this.store.dispatch(ProjectsActions.loadProjects());
  }

  createProject(project: Project) {
    this.store.dispatch(ProjectsActions.createProject({ project }));
  }

  updateProject(project: Project) {
    this.store.dispatch(ProjectsActions.updateProject({ project }));
  }

  deleteProject(project: Project) {
    this.store.dispatch(ProjectsActions.deleteProject({ project }));
  }
}
