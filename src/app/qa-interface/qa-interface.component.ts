import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Message } from '../models/message';
import { QaService } from '../services/qa.service';

@Component({
  selector: 'app-qa-interface',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    HttpClientModule  // Dodajemo HttpClientModule u imports
  ],
  providers: [QaService],  // Dodajemo QaService u providers
  templateUrl: './qa-interface.component.html',
  styleUrls: ['./qa-interface.component.scss']
})
export class QaInterfaceComponent {
  question: string = '';
  messages: Message[] = [];
  isLoading: boolean = false;

  constructor(private qaService: QaService) {}

  async handleSubmit(): Promise<void> {
    if (!this.question.trim()) return;

    // Dodaj pitanje u konverzaciju
    this.messages.push({
      type: 'question',
      content: this.question.trim(),
      timestamp: new Date()
    });

    this.isLoading = true;

    try {
      // Pozivamo servis
      this.qaService.askQuestion(this.question.trim()).subscribe({
        next: (response) => {
          if (response.answer) {
            this.messages.push({
              type: 'answer',
              content: response.answer,
              timestamp: new Date()
            });
          }
          this.question = ''; // Očisti input
        },
        error: (error) => {
          console.error('Error:', error);
          this.messages.push({
            type: 'answer',
            content: 'Sorry, there was an error getting the answer.',
            timestamp: new Date()
          });
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    } catch (error) {
      console.error('Error:', error);
      this.isLoading = false;
    }
  }

  trackByFn(index: number): number {
    return index;
  }
}