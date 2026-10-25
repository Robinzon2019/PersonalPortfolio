import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { shareReplay } from 'rxjs';

import { LOADING, LoadState, toLoadState } from '../../shared/utils/load-state';
import { PortfolioConfig } from './portfolio.model';

@Injectable({ providedIn: 'root' })
export class PortfolioConfigService {
  private readonly http = inject(HttpClient);
  private readonly config$ = this.http
    .get<PortfolioConfig>('data/portfolio.json')
    .pipe(shareReplay({ bufferSize: 1, refCount: false }));

  readonly state = toSignal(toLoadState(this.config$), {
    initialValue: LOADING as LoadState<PortfolioConfig>,
  });

  readonly config = computed(() => {
    const state = this.state();
    return state.status === 'ready' ? state.data : null;
  });
}
