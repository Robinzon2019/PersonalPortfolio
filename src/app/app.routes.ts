import { Routes } from '@angular/router';

import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import('./features/home/pages/home-page/home-page.component').then((m) => m.HomePageComponent),
      },
      {
        path: 'proyectos',
        loadComponent: () =>
          import('./features/projects/pages/projects-page/projects-page.component').then(
            (m) => m.ProjectsPageComponent,
          ),
      },
      {
        path: 'proyectos/:slug',
        loadComponent: () =>
          import('./features/projects/pages/project-detail-page/project-detail-page.component').then(
            (m) => m.ProjectDetailPageComponent,
          ),
      },
      {
        path: '**',
        loadComponent: () =>
          import('./core/pages/not-found-page/not-found-page.component').then((m) => m.NotFoundPageComponent),
      },
    ],
  },
];
