import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from './project';

const BASE_URL = '../../../../../db.json';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor(private httpClient: HttpClient) {}

  getUrl(): string {
    return `${BASE_URL}`;
  }

  getUrlWithId(id: string): string {
    return `${this.getUrl()}/${id}`;
  }

  getAll(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(this.getUrl());
  }

  getOne(id: string): Observable<Project> {
    return this.httpClient.get<Project>(this.getUrlWithId(id));
  }

  createProject(project: Project): Observable<Project> {
    return this.httpClient.post<Project>(this.getUrl(), project);
  }

  updateProject(project: Project): Observable<Project> {
    return this.httpClient.patch<Project>(
      this.getUrlWithId(project.id),
      project
    );
  }

  deleteProject(project: Project): Observable<Project> {
    return this.httpClient.delete<Project>(this.getUrlWithId(project.id));
  }
}
