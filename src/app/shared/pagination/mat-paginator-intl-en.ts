import { MatPaginatorIntl } from '@angular/material/paginator';
import { Injectable } from "@angular/core";

// /https://stackoverflow.com/questions/46869616/how-to-use-matpaginatorintl

@Injectable()
export class MatPaginatorIntlEn extends MatPaginatorIntl {

  override itemsPerPageLabel = 'Items';
  override firstPageLabel = 'Move to the First Page';
  override lastPageLabel = 'Go to the Last Page';
  override nextPageLabel = 'Next Page';
  override previousPageLabel = 'Prev Page';

  override getRangeLabel = (page: number, pageSize: number, length: number): string => {

    if (length == 0 || pageSize == 0) { return `0 of ${length}`; }

    length = Math.max(length, 0);

    const startIndex = page * pageSize;

    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;

    return `${startIndex + 1} – ${endIndex} of ${length}`;

  };

}
