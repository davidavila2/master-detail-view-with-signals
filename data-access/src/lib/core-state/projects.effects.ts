import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, map } from 'rxjs';
import * as ProjectsActions from './projects.actions';
import { ProjectsService } from '../core-data/projects/projects.service';

@Injectable()
export class ProjectsEffects {
  private actions$ = inject(Actions);
  private projectsService = inject(ProjectsService);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectsActions.loadProjects),
      switchMap(() => {
        return this.projectsService
          .getAll()
          .pipe(
            map((data) =>
              ProjectsActions.loadProjectsSuccess({ projects: data })
            )
          );
      }),
      catchError((error) => {
        return of(ProjectsActions.loadProjectsFailure({ error }));
      })
    )
  );

  createProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectsActions.createProject),
      switchMap(({ project }) => {
        return this.projectsService
          .createProject(project)
          .pipe(
            map((project) => ProjectsActions.createProjectSuccess({ project }))
          );
      }),
      catchError((error) => {
        return of(ProjectsActions.createProjectFailure({ error }));
      })
    )
  );

  updateProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectsActions.updateProject),
      switchMap(({ project }) => {
        return this.projectsService
          .updateProject(project)
          .pipe(
            map((project) => ProjectsActions.updateProjectSuccess({ project }))
          );
      }),
      catchError((error) => {
        return of(ProjectsActions.updateProjectFailure({ error }));
      })
    )
  );

  deleteProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectsActions.deleteProject),
      switchMap(({ project }) => {
        return this.projectsService
          .deleteProject(project)
          .pipe(map(() => ProjectsActions.deleteProjectSuccess({ project })));
      }),
      catchError((error) => {
        return of(ProjectsActions.deleteProjectFailure({ error }));
      })
    )
  );
}
