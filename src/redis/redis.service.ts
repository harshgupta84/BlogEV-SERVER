import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: Redis;
 // Separate subscriber client

  async onModuleInit() {
    // Initialize the Redis clients
    this.client = new Redis({ host: 'localhost', port: 6379 }); // Publisher
    
    console.log('RedisService initialized');
  }

  async set(key: string, value: any, ttl?: number) {
    const data = JSON.stringify(value);
    if (ttl) {
      await this.client.set(key, data, 'EX', ttl); // Set expiration
      console.log(`Set key: ${key} with TTL: ${ttl}`);
    } else {
      await this.client.set(key, data);
      console.log(`Set key: ${key}`);
    }
  }

  async get(key: string) {
    const data = await this.client.get(key);
    console.log(`Get key: ${key} - Found: ${!!data}`);
    return data ? JSON.parse(data) : null;
  }
  async onModuleDestroy() {
    this.client.quit(); // Close the subscriber client when the module is destroyed
    
  }
 
}
