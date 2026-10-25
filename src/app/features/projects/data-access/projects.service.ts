import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';

import { Project } from '../models/project.model';

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  private readonly http = inject(HttpClient);

  // La caché en memoria evita solicitudes duplicadas.
  private readonly projects$ = this.http.get<Project[]>('data/projects.json').pipe(
    map((projects) => [...projects].sort((a, b) => a.displayOrder - b.displayOrder)),
    shareReplay({ bufferSize: 1, refCount: false }),
  );

  getAll(): Observable<Project[]> {
    return this.projects$;
  }

  getFeatured(): Observable<Project[]> {
    return this.projects$.pipe(map((projects) => projects.filter((project) => project.featured)));
  }

  getBySlug(slug: string): Observable<Project | undefined> {
    return this.projects$.pipe(map((projects) => projects.find((project) => project.slug === slug)));
  }
}
