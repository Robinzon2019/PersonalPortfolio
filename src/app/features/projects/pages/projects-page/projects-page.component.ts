import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { PageMetaService } from '../../../../core/seo/page-meta.service';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { EmptyStateComponent } from '../../../../shared/ui/empty-state/empty-state.component';
import { LoadingStateComponent } from '../../../../shared/ui/loading-state/loading-state.component';
import { LOADING, LoadState, toLoadState } from '../../../../shared/utils/load-state';
import { ProjectFiltersComponent } from '../../components/project-filters/project-filters.component';
import { ProjectGridComponent } from '../../components/project-grid/project-grid.component';
import { ProjectsService } from '../../data-access/projects.service';
import { EMPTY_FILTERS, Project, ProjectFilters } from '../../models/project.model';

const normalize = (value: string): string =>
  value.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().trim();

const unique = (values: readonly string[]): string[] =>
  [...new Set(values)].sort((a, b) => a.localeCompare(b, 'es'));

@Component({
  selector: 'app-projects-page',
  imports: [
    ButtonComponent,
    EmptyStateComponent,
    LoadingStateComponent,
    ProjectFiltersComponent,
    ProjectGridComponent,
  ],
  templateUrl: './projects-page.component.html',
  styleUrl: './projects-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsPageComponent {
  protected readonly state = toSignal(toLoadState(inject(ProjectsService).getAll()), {
    initialValue: LOADING as LoadState<Project[]>,
  });
  protected readonly filters = signal<ProjectFilters>(EMPTY_FILTERS);

  private readonly projects = computed(() => {
    const state = this.state();
    return state.status === 'ready' ? state.data : [];
  });

  protected readonly categories = computed(() => unique(this.projects().map((p) => p.category)));
  protected readonly technologies = computed(() => unique(this.projects().flatMap((p) => p.technologies)));

  protected readonly filtered = computed(() => {
    const { query, category, technology } = this.filters();
    const needle = normalize(query);
    return this.projects().filter(
      (project) =>
        (!needle || normalize(`${project.title} ${project.shortDescription} ${project.description}`).includes(needle)) &&
        (!category || project.category === category) &&
        (!technology || project.technologies.includes(technology)),
    );
  });

  protected readonly hasActiveFilters = computed(() => {
    const { query, category, technology } = this.filters();
    return Boolean(query.trim() || category || technology);
  });

  constructor() {
    inject(PageMetaService).set(
      'Proyectos · Robinson Montero',
      'Proyectos de desarrollo de software, automatización de procesos y analítica con Power BI.',
    );
  }

  protected clearFilters(): void {
    this.filters.set(EMPTY_FILTERS);
  }
}
