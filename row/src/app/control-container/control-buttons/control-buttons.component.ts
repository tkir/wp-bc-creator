import {
  Component, EventEmitter, OnDestroy, OnInit, Output
} from '@angular/core';
import {CardData} from "../../data/CardData";
import {Subscription} from "rxjs/Subscription";
import {Router} from "@angular/router";
import {DataService} from "../../services/data.service";
import {Store} from "../../services/store";
import {DesignService} from "../../services/design.service";
import {PreviewService} from "../../services/preview.service";
import {CardService} from "../../services/card.service";

@Component({
  selector: 'card-control-buttons',
  templateUrl: './control-buttons.component.html',
  styleUrls: ['./control-buttons.component.css']
})
export class ControlButtonsComponent implements OnInit, OnDestroy {

  model: CardData = null;
  @Output() openModalEvent: EventEmitter<any> = new EventEmitter();

  private subscription: Subscription;

  constructor(private router: Router,
              private dataService: DataService,
              private store: Store,
              private designService: DesignService,
              private previewService: PreviewService,
              private cardService: CardService) {
  }

  ngOnInit() {
    this.subscription = this.store.changes
      .subscribe((cardData: any) => this.model = cardData);
  }

  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

  reset() {
    this.dataService.resetData();
  }

  save() {
    this.designService.saveDesign(this.cardService.doubleSideCard)
      .subscribe(res =>
        this.previewService.updatePreviews()
          .subscribe(() => this.router.navigate([`/${res.Slug}`]))
      );
  }

  delete() {
    if (confirm('Delete this business card design?'))
      this.designService.deleteDesign(this.model.slug)
        .subscribe(res =>
          this.previewService.updatePreviews()
            .subscribe(() => this.router.navigate(['/'])));
  }

  getPreview() {
    this.previewService.seModalPreview(this.cardService.doubleSideCard);
    this.openModalEvent.emit();
  }

  // TODO удалить в релизе
  adminSaveDesign() {
    this.designService.adminSaveDesign(this.cardService.doubleSideCard)
      .subscribe(res => console.log(res));
  }
}
