import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { BandModel } from '../models/band.model';
import { BandService } from '../services/band.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  bands: BandModel[] = [];
  pageSize = 9;
  currentPage = 0;
  searchQuery: string = '';
  searchDate: string = '';

  constructor(private router: Router, private bandService: BandService) {}

  ngOnInit(): void {
    this.loadBands();
  }

  loadBands(): void {
    this.bandService.getBands().subscribe(
      (data: BandModel[]) => {
        this.bands = data;
      },
      (error) => {
        console.error('Hiba az adatok lekérésekor:', error);
      }
    );
  }

  get filteredBands(): BandModel[] {
    return this.bands.filter((band) => {
      const nameMatch = band.name
        .toLowerCase()
        .includes(this.searchQuery.toLowerCase());

      const dateMatch = this.searchDate
        ? band.days?.date === this.searchDate
        : true;

      return nameMatch && dateMatch;
    });
  }

  get paginatedBands(): BandModel[] {
    const start = this.currentPage * this.pageSize;
    return this.filteredBands.slice(start, start + this.pageSize);
  }

  nextPage(): void {
    if ((this.currentPage + 1) * this.pageSize < this.bands.length) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  navigateToProfile(bandId: number): void {
    this.router.navigate(['bandDetails', bandId]);
  }
}
