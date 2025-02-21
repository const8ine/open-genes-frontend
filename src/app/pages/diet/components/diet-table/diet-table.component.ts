import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Diet } from '../../../../core/models/open-genes-api/diet.model';
import { PageEvent } from '@angular/material/paginator';
import { Pagination } from '../../../../core/models/settings.model';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-diet-table',
  templateUrl: './diet-table.component.html',
  styleUrls: ['./diet-table.component.scss'],
})
export class DietTableComponent {
  @Input() set confirmedGenesList(genes: Diet[]) {
    if (genes) {
      this.genesList = genes;
    }
  }

  @Input() pagination: Pagination;
  @Input() isLoading: boolean;
  @Input() totalGenesLength: number;

  @Output() paginationChange: EventEmitter<Pagination> = new EventEmitter<Pagination>();
  @Output() isLoaded: EventEmitter<boolean> = new EventEmitter<boolean>();

  public genesList: Diet[];
  public pageSizeOptions: number[] = [5, 10, 20];
  public displayedColumns: string[] = [
    'main_page_table_name',
    'expression_change_log_fc',
    'p_value',
    'cr_result',
    'measurement_method',
    'researches_expression_evaluation',
    'restriction_percent',
    'restriction_time',
    'age',
    'researches_model_organism',
    'researches_line',
    'researches_sex',
    'researches_l_tissue_specificity',
    'experiment_number',
    'researches_reference',
    'expression_change_percent',
    'isoform',
  ];

  constructor() {}

  public pageEventHandler(event: PageEvent): void {
    this.pagination.page = event.pageIndex + 1;
    this.pagination.pageSize = event.pageSize;
    this.paginationChange.emit(this.pagination);
  }
  public sortData(sort: Sort): void {
    const data = this.genesList.slice();
    if (!sort.active || sort.direction === '') {
      this.genesList = data;
      return;
    }

    this.genesList = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return this.compare(a.name, b.name, isAsc);
        default:
          return 0;
      }
    });
  }

  private compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
