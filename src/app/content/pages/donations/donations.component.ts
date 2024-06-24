import {Component, ViewChild} from '@angular/core';
import {FilterOngsComponent} from "../../components/filter-ongs/filter-ongs.component";
import {SearchOngsComponent} from "../../components/search-ongs/search-ongs.component";

@Component({
  selector: 'app-donations',
  standalone: true,
  imports: [
    FilterOngsComponent,
    SearchOngsComponent
  ],
  templateUrl: './donations.component.html',
  styleUrl: './donations.component.css'
})
export class DonationsComponent {

  @ViewChild(SearchOngsComponent) searchOngsComponent!: SearchOngsComponent;

  handleFilterOng(data:any){
    this.searchOngsComponent.filterOng(data)
  }

}
