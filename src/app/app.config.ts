import { ApplicationConfig } from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { provideRouterStore } from '@ngrx/router-store';
import { appRoutes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { provideStore } from '@ngrx/store';
import * as fromProjects from 'data-access/src/lib/core-state/projects.reducer';
import { ProjectsEffects } from 'data-access/src/lib/core-state/projects.effects';
import { ProjectsFacade } from 'data-access/src/lib/core-state/projects.facade';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideHttpClient(),
    provideEffects(ProjectsEffects),
    provideState(
      fromProjects.PROJECTS_FEATURE_KEY,
      fromProjects.projectsReducer
    ),
    provideStore(),
    provideRouterStore(),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    }),
    ProjectsFacade,
  ],
};
