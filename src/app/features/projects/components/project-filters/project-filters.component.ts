import { ChangeDetectionStrategy, Component, DestroyRef, effect, inject, input, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { ProjectFilters } from '../../models/project.model';

@Component({
  selector: 'app-project-filters',
  imports: [ReactiveFormsModule, ButtonComponent],
  templateUrl: './project-filters.component.html',
  styleUrl: './project-filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectFiltersComponent {
  readonly filters = input.required<ProjectFilters>();
  readonly categories = input.required<readonly string[]>();
  readonly technologies = input.required<readonly string[]>();
  readonly filtersChange = output<ProjectFilters>();
  readonly cleared = output<void>();

  protected readonly form = new FormGroup({
    query: new FormControl('', { nonNullable: true }),
    category: new FormControl('', { nonNullable: true }),
    technology: new FormControl('', { nonNullable: true }),
  });

  constructor() {
    this.form.valueChanges
      .pipe(takeUntilDestroyed(inject(DestroyRef)))
      .subscribe(() => this.filtersChange.emit(this.form.getRawValue()));

    // Sincroniza el formulario cuando la página limpia o cambia los filtros.
    effect(() => this.form.setValue(this.filters(), { emitEvent: false }));
  }
}
