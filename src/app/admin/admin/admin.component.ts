import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { Card } from 'src/app/model/card.model';
import { tempcard } from 'src/app/model/tempcard.model';
import { CardService } from 'src/app/services/card.service';
import { CardpassService } from 'src/app/services/cardpass.service';
import {CardComponent} from "../card/card.component";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  cardList: Array<Card> = [];
  cardpassList: Array<tempcard> = [];
  errorMessage: string = "";

  selectedCardPass: any[] = [];

  selectedCard: Card = new Card();

  @ViewChild(CardComponent, { static: false }) child: CardComponent | null = null;
  constructor(private cardService: CardService, private cardpassService: CardpassService, private datePipe: DatePipe) { }

  searchQuery: string = "";

  get selectedLatecomers(): any[]{
    return this.cardpassList.filter((e, ind) => this.selectedCardPass[ind]);
  }

  getRowHighlightClass(index: number): string {
    return this.selectedCardPass[index] ? 'pink-row' : '';
  }
  get selectAll(): any[]{
    return this.cardpassList;
  }

  tarih: string="";
  
  search(){ 
    if (this.tarih) {
      const formattedDate = this.datePipe.transform(this.tarih, 'dd.MM.yyyy');
      console.log(formattedDate);
  
      if(formattedDate){
        this.cardpassService.getLatecomers(formattedDate).subscribe(
          result => {
            this.cardpassList = result;
          },
          error => {
            console.log(error);
          }
        );
      }
   
    } else {
      console.log('Please select a date before searching.');
    }
  }

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

    this.cardpassService.getLatecomers(this.tarih).subscribe(data => {
      this.cardpassList = data;
    });
  }

  getAllCardPasses(): void {
    this.cardpassService.getAllCards().subscribe(
      (data: tempcard[]) => {
        this.cardpassList = data;
      },
      (error) => {
        this.errorMessage = 'Failed to fetch card data.';
        console.error(error);
      }
    );
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
    this.child?.showCardModal();
  }

  editCardRequest(item: Card) {
    this.selectedCard = Object.assign({}, item);
    this.child?.showCardModal();
  }

  saveCardWatcher(card: Card) {
    let itemIndex = this.cardList.findIndex(item => item.id === card.id);
    if (itemIndex !== -1) {
      this.cardList[itemIndex] = card;
    } else {
      this.cardList.push(card);
    }
  }
  
  sendMails() {
    const selectedLatecomers = this.selectedLatecomers;
    const ids = selectedLatecomers.map(item => item.pin); 
  
    this.cardpassService.sendMails(selectedLatecomers[0].tarih, ids).subscribe(
      () => {
        console.log("E-postalar başarıyla gönderildi.");
      },
      (error) => {
        console.error("E-postalar gönderilirken bir hata oluştu:", error);
      }
    );
  }
  
}