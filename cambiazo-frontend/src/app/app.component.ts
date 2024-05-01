import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FooterContentComponent} from "./public/footer-content/footer-content.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterContentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Cambiazo';
}
