import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectionService {
  private selectionState = new BehaviorSubject<boolean>(false);
  selectionState$ = this.selectionState.asObservable();

  updateSelectionState(isSelected: boolean) {
    this.selectionState.next(isSelected);
  }
}
