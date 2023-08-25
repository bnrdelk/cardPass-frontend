import {Component, Output, EventEmitter, Input} from '@angular/core';
import {Card} from "../../model/card.model";
import {CardService} from "../../services/card.service";

declare var $: any;

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  errorMessage: string = "";

  @Input() card: Card = new Card();
  @Output() save = new EventEmitter<any>();
  constructor(private cardService: CardService) { }

  saveCard() {
    this.cardService.saveCard(this.card).subscribe(data => {
      this.save.emit(data);
      $('#cardModal').modal('hide');
    }, err => {
      this.errorMessage = 'Unexpected error occurred.';
      console.log(err);
    })
  }

  showCardModal() {
    $('#cardModal').modal('show');
  }
}

