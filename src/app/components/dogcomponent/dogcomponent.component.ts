import { Component, inject } from '@angular/core';
import { DogsRepository } from 'src/app/state/dog.repository';
import { DogsService } from 'src/app/state/dog.service';

@Component({
  selector: 'app-dogcomponent',
  templateUrl: './dogcomponent.component.html',
  styleUrls: ['./dogcomponent.component.css']
})
export class DogcomponentComponent {
  dogService: DogsService = inject(DogsService);
  constructor(public dogsRepo: DogsRepository) {}

  ngOnInit(): void {
    this.dogService.getFacts().subscribe();
  }

  update(id: number) {
    this.dogService.update(id).subscribe();
  }


}
