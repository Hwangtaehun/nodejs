import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogController } from './blog.controller';
import { Blog, BlogSchema } from './blog.schema';
import { BlogService } from './blog.service';
import { BlogMongoRepository } from './blog.repository';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://mymongo:Password@cluster0.ms0xmt6.mongodb.net/blog',
    ),
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
  ],
  controllers: [BlogController],
  providers: [BlogService, BlogMongoRepository],
})
export class AppModule {}
