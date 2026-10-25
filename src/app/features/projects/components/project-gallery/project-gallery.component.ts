import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { ProjectImage } from '../../models/project.model';

@Component({
  selector: 'app-project-gallery',
  templateUrl: './project-gallery.component.html',
  styleUrl: './project-gallery.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectGalleryComponent {
  readonly images = input.required<readonly ProjectImage[]>();
}
