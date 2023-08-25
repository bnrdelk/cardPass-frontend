import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from 'src/app/model/card.model';
import { CardService } from 'src/app/services/card.service';

declare var $: any;

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {

  errorMessage: string = "";

  @Input() card: Card = new Card();
  @Output() save = new EventEmitter<any>();
  constructor(private cardService: CardService) { }

  saveCard() {
    this.cardService.saveCard(this.card).subscribe(data => {
      this.save.emit(data);
      $('#detailsModal').modal('hide');
    }, err => {
      this.errorMessage = 'Unexpected error occurred.';
      console.log(err);
    })
  }

  showDetailsModal() {
    $('#detailsModal').modal('show');
  }
}

