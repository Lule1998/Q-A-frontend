import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface QAResponse {
  success: boolean;
  answer?: string;
  error?: string;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class QaService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  askQuestion(question: string): Observable<QAResponse> {
    return this.http.post<QAResponse>(`${this.apiUrl}/api/ask`, { question });
  }
}