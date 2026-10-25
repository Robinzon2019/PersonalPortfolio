import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

import { EmptyStateComponent } from '../../../../shared/ui/empty-state/empty-state.component';
import { IconComponent } from '../../../../shared/ui/icon/icon.component';
import { LoadingStateComponent } from '../../../../shared/ui/loading-state/loading-state.component';
import { SectionHeadingComponent } from '../../../../shared/ui/section-heading/section-heading.component';
import { LOADING, LoadState, toLoadState } from '../../../../shared/utils/load-state';
import { ProjectsService } from '../../data-access/projects.service';
import { Project } from '../../models/project.model';
import { ProjectGridComponent } from '../project-grid/project-grid.component';

@Component({
  selector: 'app-featured-projects',
  imports: [
    RouterLink,
    EmptyStateComponent,
    IconComponent,
    LoadingStateComponent,
    SectionHeadingComponent,
    ProjectGridComponent,
  ],
  templateUrl: './featured-projects.component.html',
  styleUrl: './featured-projects.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturedProjectsComponent {
  protected readonly state = toSignal(toLoadState(inject(ProjectsService).getFeatured()), {
    initialValue: LOADING as LoadState<Project[]>,
  });
}
