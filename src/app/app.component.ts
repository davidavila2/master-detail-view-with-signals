import { CommonModule } from '@angular/common';
import { Component, OnInit, Signal, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProjectsFacade } from 'data-access/src/lib/core-state/projects.facade';
import { ProjectsEntity } from 'data-access/src/lib/core-state/projects.models';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Project } from '@training/data-access';

@Component({
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  selector: 'training-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  form: FormGroup = this.formBuilder.group({
    id: null,
    name: [
      '',
      Validators.compose([Validators.required, Validators.nullValidator]),
    ],
    description: [
      '',
      Validators.compose([Validators.required, Validators.nullValidator]),
    ],
  });

  projectsFacade: ProjectsFacade = inject(ProjectsFacade);
  projects: Signal<ProjectsEntity[] | undefined> = toSignal(
    this.projectsFacade.allProjects$
  );
  selectedProject: Signal<ProjectsEntity | undefined> = toSignal(
    this.projectsFacade.selectedProject$
  );
  isProjectSelected = toSignal(this.projectsFacade.isProjectSelected$);
  isLoaded = toSignal(this.projectsFacade.loaded$);

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.projectsFacade.loadProjects();
  }

  resetForm(): void {
    this.form.reset();

    Object.keys(this.form.controls).forEach((key) => {
      this.form.get(key)?.setErrors(null);
    });

    this.projectsFacade.resetProject();
  }

  selectProject(project: Project) {
    this.projectsFacade.selectProject(project);
    this.form.patchValue(project);
  }

  createProject(project: Project) {
    this.projectsFacade.createProject(project);
  }

  updateProject(project: Project) {
    this.projectsFacade.updateProject(project);
  }

  deleteProject(project: Project) {
    this.projectsFacade.deleteProject(project);
  }

  saveProject(project: Project) {
    if (project.id) {
      this.updateProject(project);
    } else {
      this.createProject(project);
    }

    this.resetForm();
  }
}
