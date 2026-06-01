import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Serve index.html for the root route
  @Get()
  getIndex(@Res() res: Response) {
    res.sendFile(join(__dirname, '..', 'public', 'index.html'));
  }

  // API endpoint for contact form submissions
  @Post('api/contact')
  submitContact(@Body() body: {
    name: string;
    email: string;
    phone: string;
    industry: string;
    message: string;
  }) {
    return this.appService.handleContact(body);
  }
}