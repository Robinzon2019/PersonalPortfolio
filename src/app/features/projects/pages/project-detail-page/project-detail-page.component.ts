import { ChangeDetectionStrategy, Component, computed, effect, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';

import { PageMetaService } from '../../../../core/seo/page-meta.service';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { EmptyStateComponent } from '../../../../shared/ui/empty-state/empty-state.component';
import { IconComponent } from '../../../../shared/ui/icon/icon.component';
import { LoadingStateComponent } from '../../../../shared/ui/loading-state/loading-state.component';
import { TechnologyBadgeComponent } from '../../../../shared/ui/technology-badge/technology-badge.component';
import { LOADING, LoadState, toLoadState } from '../../../../shared/utils/load-state';
import { toHttpUrl } from '../../../../shared/utils/url';
import { ProjectGalleryComponent } from '../../components/project-gallery/project-gallery.component';
import { ProjectsService } from '../../data-access/projects.service';
import { PROJECT_STATUS_LABELS, Project } from '../../models/project.model';

@Component({
  selector: 'app-project-detail-page',
  imports: [
    RouterLink,
    ButtonComponent,
    EmptyStateComponent,
    IconComponent,
    LoadingStateComponent,
    TechnologyBadgeComponent,
    ProjectGalleryComponent,
  ],
  templateUrl: './project-detail-page.component.html',
  styleUrl: './project-detail-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDetailPageComponent {
  readonly slug = input.required<string>();

  private readonly projects = inject(ProjectsService);
  private readonly pageMeta = inject(PageMetaService);

  protected readonly state = toSignal(
    toObservable(this.slug).pipe(switchMap((slug) => toLoadState(this.projects.getBySlug(slug)))),
    { initialValue: LOADING as LoadState<Project | undefined> },
  );

  protected readonly project = computed(() => {
    const state = this.state();
    return state.status === 'ready' ? state.data : undefined;
  });

  protected readonly demoUrl = computed(() => toHttpUrl(this.project()?.demoUrl));
  protected readonly repositoryUrl = computed(() => toHttpUrl(this.project()?.repositoryUrl));
  protected readonly statusLabel = computed(() => {
    const project = this.project();
    return project ? PROJECT_STATUS_LABELS[project.status] : '';
  });

  constructor() {
    effect(() => {
      const project = this.project();
      const state = this.state();
      if (project) {
        this.pageMeta.set(`${project.title} · Robinson Montero`, project.shortDescription);
      } else if (state.status === 'ready') {
        this.pageMeta.set('Proyecto no encontrado · Robinson Montero', 'El proyecto solicitado no existe.');
      }
    });
  }
}
