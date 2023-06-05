import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProjectsService } from '@training/data-access';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  standalone: true,
  imports: [RouterModule, CommonModule],
  selector: 'training-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  projectsService = inject(ProjectsService);
  projects = toSignal(this.projectsService.getAll());
}
