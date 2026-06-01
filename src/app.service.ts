import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  // Handle contact form submissions
  handleContact(data: {
    name: string;
    email: string;
    phone: string;
    industry: string;
    message: string;
  }) {
    // Log the submission (replace with email/database logic later)
    console.log('New Demo Request Received:');
    console.log('---------------------------');
    console.log(`Name:     ${data.name}`);
    console.log(`Email:    ${data.email}`);
    console.log(`Phone:    ${data.phone}`);
    console.log(`Industry: ${data.industry}`);
    console.log(`Message:  ${data.message}`);
    console.log('---------------------------');

    return {
      success: true,
      message: 'Thank you! We will contact you within 24 hours.',
    };
  }
}