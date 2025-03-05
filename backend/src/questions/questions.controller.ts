import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { QuestionFilters } from './dto/question-filters.dto';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm';

@Controller('questions')
export class QuestionsController {
  constructor(
    private readonly questionsService: QuestionsService,
    private readonly questionRepository: Repository<Question>,
  ) {}

  @Post()
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionsService.create(createQuestionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Questions' })
  @ApiResponse({
    status: 200,
    description: 'List of all Questions successfully retrieved',
  })
  public getQuestions(
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('difficulty', new DefaultValuePipe(null), ParseIntPipe)
    difficulty?: number,
    @Query('songId') songId?: string, // Assuming songId remains a string
    @Query('minPoints', new DefaultValuePipe(null), ParseIntPipe)
    minPoints?: number,
    @Query('maxPoints', new DefaultValuePipe(null), ParseIntPipe)
    maxPoints?: number,
  ) {
    // Create the filters object ensuring the types match your QuestionFilters type.
    const filters = { page, limit, difficulty, songId, minPoints, maxPoints };
    return this.questionsService.getAll(filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionsService.update(id, updateQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionsService.remove(+id);
  }
}
