import { Component, OnInit } from '@angular/core';
import {LoaderService} from '../../services/loader.service';
import {from, Subject, timer} from 'rxjs';
import {mergeMap} from 'rxjs/operators';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  color = 'normal';
  isModal = false;
  isLoading = false;

  constructor(private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.loaderService.isLoading.subscribe(state => this.isLoading = state);
  }

}
