export type ProjectStatus = 'completed' | 'in-progress' | 'to-define';

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  completed: 'Completado',
  'in-progress': 'En desarrollo',
  'to-define': 'Estado por definir',
};

export interface ProjectImage {
  readonly src: string;
  readonly alt: string;
}

export interface Project {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly shortDescription: string;
  readonly description: string;
  readonly category: string;
  readonly technologies: readonly string[];
  readonly coverImage: string;
  readonly coverImageAlt: string;
  readonly gallery: readonly ProjectImage[];
  readonly featured: boolean;
  readonly displayOrder: number;
  readonly status: ProjectStatus;
  readonly role: string;
  readonly problem: string;
  readonly solution: string;
  readonly features: readonly string[];
  readonly outcomes: readonly string[];
  readonly demoUrl?: string;
  readonly repositoryUrl?: string;
}

export interface ProjectFilters {
  readonly query: string;
  readonly category: string;
  readonly technology: string;
}

export const EMPTY_FILTERS: ProjectFilters = { query: '', category: '', technology: '' };
