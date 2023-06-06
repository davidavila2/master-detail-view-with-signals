import { CommonModule } from '@angular/common';
import { Component, Signal, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Project, ProjectsService } from '@training/data-access';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  standalone: true,
  imports: [RouterModule, CommonModule],
  selector: 'training-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  projectsService: ProjectsService = inject(ProjectsService);
  projects: Signal<Project[] | undefined> = toSignal(
    this.projectsService.getAll()
  );
}
