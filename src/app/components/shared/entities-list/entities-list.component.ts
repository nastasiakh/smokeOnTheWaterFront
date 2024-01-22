import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {MatTableModule} from "@angular/material/table";
import {Router} from "@angular/router";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-entities-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    NgForOf
  ],
  templateUrl: './entities-list.component.html',
  styleUrl: './entities-list.component.css'
})
export class EntitiesListComponent implements AfterViewInit{
  @Input() displayedColumns: string[] = [];
  @Input() dataSource: any[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;


  ngAfterViewInit() {
    if (this.dataSource && 'paginator' in this.dataSource) {
      this.dataSource.paginator = this.paginator;
    }
  }

  constructor(private router: Router) {}

  navigateToEntityDetails(rowId: number): void {
    this.router.navigate([`${this.router.url}`, rowId])
  }
}
