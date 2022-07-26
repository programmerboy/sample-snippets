import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, filter } from "rxjs/operators";
import { Grid_Images } from 'src/app/shared/data/grid-images';

@Component({
  selector: 'app-image-grid',
  templateUrl: './image-grid.component.html',
  styleUrls: ['./image-grid.component.scss']
})
export class ImageGridComponent implements OnInit, AfterViewInit {

  images = Grid_Images;

  customwidthCtrl = new FormControl();
  columnGapCtrl = new FormControl();
  itemsPerRowCtrl = new FormControl();

  customwidth = 200;
  columnGap = 10;
  itemsPerRow = 3;

  containerWidth: number = 0;
  itemsPerRowStyle: string = "";
  columnGapStyle: string = "";

  constructor(private _elementRef: ElementRef) {

  }

  ngAfterViewInit(): void {
    this.customwidthCtrl.setValue(this.customwidth);
    this.columnGapCtrl.setValue(this.columnGap);
    this.itemsPerRowCtrl.setValue(this.itemsPerRow);
  }

  ngOnInit(): void {

    let element = this._elementRef.nativeElement as HTMLElement;

    this.containerWidth = element.offsetWidth;

    this.images = this.images.reverse();

    this.processObservable(this.customwidthCtrl.valueChanges);
    this.processObservable(this.columnGapCtrl.valueChanges);
    this.processObservable(this.itemsPerRowCtrl.valueChanges);
  }

  private refreshGrid() {

    let itemWidth = parseInt(this.customwidthCtrl.value);
    let columnGap = parseInt(this.columnGapCtrl.value);
    let itemsCount = parseInt(this.itemsPerRowCtrl.value);

    let itemWidthWithGap = itemWidth + columnGap;

    let totalWidth = itemWidthWithGap * itemsCount;

    if (totalWidth > this.containerWidth) {
      itemWidth = Math.floor((this.containerWidth / itemsCount) - columnGap); // small image size
      this.customwidthCtrl.setValue(itemWidth);
    }
    else {
      this.customwidth = itemWidth;
      this.itemsPerRowStyle = new Array(itemsCount).fill("auto").join(" ");
    }

    this.columnGapStyle = `${columnGap}px`;

  }

  private processObservable($obs: Observable<any>) {
    $obs.pipe(debounceTime(500), distinctUntilChanged(), switchMap((value: string) => of(value))).subscribe(r => this.refreshGrid());
  }

}
