import { CommonModule } from '@angular/common';
import { Component, OnInit, Signal, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProjectsFacade } from 'data-access/src/lib/core-state/projects.facade';
import { ProjectsEntity } from 'data-access/src/lib/core-state/projects.models';

@Component({
  standalone: true,
  imports: [RouterModule, CommonModule],
  selector: 'training-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  projectsFacade: ProjectsFacade = inject(ProjectsFacade);
  projects: Signal<ProjectsEntity[] | undefined> = toSignal(
    this.projectsFacade.allProjects$
  );

  ngOnInit(): void {
    this.projectsFacade.loadProjects();
  }

  createProject() {
    const project = {
      id: '2',
      name: 'testing',
      description: 'this is a description',
    };
    this.projectsFacade.createProject(project);
  }

  deleteProject() {
    const project = {
      id: '2',
      name: 'testing',
      description: 'this is a description',
    };
    this.projectsFacade.deleteProject(project);
  }
}
