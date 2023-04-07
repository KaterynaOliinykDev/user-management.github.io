import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter-widget',
  templateUrl: './filter-widget.component.html',
  styleUrls: ['./filter-widget.component.css']
})
export class FilterWidgetComponent implements OnInit{
  @Output() filter = new EventEmitter<any[]>();
  users: any[] = [];

  filters: any = {
    gender: true,
    city: true,
    street: true,
    email: true,
    phone: true
  };

  constructor() {}

  ngOnInit() {
    const filtersFromStorage = localStorage.getItem('filters');
    if (filtersFromStorage)
      this.filters = JSON.parse(filtersFromStorage);
    else
      localStorage.setItem('filters', JSON.stringify(this.filters));
  }

  updateFilter() {
    localStorage.setItem('filters', JSON.stringify(this.filters));
    this.filter.emit();
  }
}
