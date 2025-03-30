import { Component, OnInit } from '@angular/core';
import { BandModel } from '../models/band.model';
import { ActivatedRoute } from '@angular/router';
import { BandService } from '../services/band.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-band-details',
  imports: [CommonModule],
  templateUrl: './band-details.component.html',
  styleUrl: './band-details.component.css',
})
export class BandDetailsComponent implements OnInit {
  band: BandModel | null = null;

  constructor(
    private route: ActivatedRoute,
    private bandService: BandService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.bandService.getBand(id).subscribe(
        (response) => {
          console.log(response);

          this.band = response;
        },
        (error) => {
          console.error('Hiba az API hívás során:', error);
        }
      );
    }
  }
}
