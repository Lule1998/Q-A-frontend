import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QaInterfaceComponent } from './qa-interface/qa-interface.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    QaInterfaceComponent,
    HttpClientModule
  ],
  template: '<app-qa-interface></app-qa-interface>'
})
export class AppComponent {
  title = 'qa-frontend';
}