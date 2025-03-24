import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private router: Router) {}

  images: string[] = [
    'band_logos/Babymetal-Logo.png',
    'band_logos/Pantera-Logo.png',
    'band_logos/Judas-Priest-Logo.png',
    'band_logos/Gojira-Logo.png',
    'band_logos/Ghost-Logo.png',
    'band_logos/System-of-a-Down-Logo.png',
    'band_logos/Korn-Logo.png',
    'band_logos/Trivium-Logo.png',
    'band_logos/Black-Sabbath-Logo.png',
    'band_logos/Iron-Maiden-Logo.png',
    'band_logos/Slayer-Logo.png',
    'band_logos/Kiss-Logo.png',
    'band_logos/Metallica-Logo.png',
    'band_logos/Rammstein-Logo.png',
    'band_logos/Ozzy-Osbourne-Logo.png',
  ];

  navigateToProfile() {
    this.router.navigate(['bandDetails']);
  }

  pageSize = 9;
  currentPage = 0;

  get paginatedImages(): string[] {
    const start = this.currentPage * this.pageSize;
    return this.images.slice(start, start + this.pageSize);
  }

  nextPage() {
    if ((this.currentPage + 1) * this.pageSize < this.images.length) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }
}
