import { Component, ViewChild } from '@angular/core';
import { CardComponent } from 'src/app/admin/card/card.component';
import { Card } from 'src/app/model/card.model';
import { CardService } from 'src/app/services/card.service';
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  cardList: Array<Card> = [];
  errorMessage: string = "";

  selectedCard: Card = new Card();

  @ViewChild(DetailsComponent, { static: false }) child: DetailsComponent | null = null;
  constructor(private cardService: CardService) { }

  searchQuery: string = "";

  applySearchFilter() {
    if (!this.searchQuery) {
      this.getAllCards();
    } else {
      this.cardList = this.cardList.filter((item) => {
        return (
          item.id?.toString().toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          (item.employee?.name?.toLowerCase().includes(this.searchQuery.toLowerCase()) || false) ||
          (item.employee?.surname?.toLowerCase().includes(this.searchQuery.toLowerCase()) || false) ||
          (item.employee?.role?.toLowerCase().includes(this.searchQuery.toLowerCase()) || false)
        );
      });
    }
  }

  ngOnInit(): void {
    this.cardService.getAllCards().subscribe(data => {
      this.cardList = data;
    });
  }

  getAllCards(): void {
    this.cardService.getAllCards().subscribe(
      (data: Card[]) => {
        this.cardList = data;
      },
      (error) => {
        this.errorMessage = 'Failed to fetch card data.';
        console.error(error);
      }
    );
  }

  deleteCard(item: Card, ind: number) {
    this.cardService.deleteCard(item).subscribe(data=> {
      this.cardList.splice(ind, 1);
    }, err=> {
      this.errorMessage = "unexpected error occured.";
      console.log(err);
    })
  }

  createCardRequest() {
    this.selectedCard = new Card();
    this.child?.showDetailsModal();
  }

  editCardRequest(item: Card) {
    this.selectedCard = Object.assign({}, item);
    this.child?.showDetailsModal();
  }

 detailsWatcher(card: Card) {
    let itemIndex = this.cardList.findIndex(item => item.id === card.id);
    if (itemIndex !== -1) {
      this.cardList[itemIndex] = card;
    } else {
      this.cardList.push(card);
    }
  }
}