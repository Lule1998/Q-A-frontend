export interface Message {
    type: 'question' | 'answer';
    content: string;
    timestamp: Date;
  }