import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoaderService} from '../../services/loader.service';
import {takeWhile} from 'rxjs/operators';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {
  isAlive = true;
  color = 'primary';
  isModal = false;
  isLoading = false;

  constructor(private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.loaderService.isLoading.pipe(
      takeWhile(() => this.isAlive)
    ).subscribe(state => this.isLoading = state);
  }

  ngOnDestroy(): void {
    this.isAlive = false;
  }

}
