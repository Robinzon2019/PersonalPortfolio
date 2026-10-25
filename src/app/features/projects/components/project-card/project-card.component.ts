import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { IconComponent } from '../../../../shared/ui/icon/icon.component';
import { TechnologyBadgeComponent } from '../../../../shared/ui/technology-badge/technology-badge.component';
import { toHttpUrl } from '../../../../shared/utils/url';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-project-card',
  imports: [RouterLink, ButtonComponent, IconComponent, TechnologyBadgeComponent],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCardComponent {
  readonly project = input.required<Project>();

  protected readonly demoUrl = computed(() => toHttpUrl(this.project().demoUrl));
  protected readonly repositoryUrl = computed(() => toHttpUrl(this.project().repositoryUrl));
}
