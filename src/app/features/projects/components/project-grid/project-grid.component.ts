import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Project } from '../../models/project.model';
import { ProjectCardComponent } from '../project-card/project-card.component';

@Component({
  selector: 'app-project-grid',
  imports: [ProjectCardComponent],
  templateUrl: './project-grid.component.html',
  styleUrl: './project-grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectGridComponent {
  readonly projects = input.required<readonly Project[]>();
}
