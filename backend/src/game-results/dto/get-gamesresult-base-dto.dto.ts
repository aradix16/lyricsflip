import { IsDate, IsOptional } from 'class-validator';
import { IntersectionType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query-dto.dto';

class GetGamesResultBaseDto {
  @IsDate()
  @IsOptional()
  startDate?: Date;

  @IsDate()
  @IsOptional()
  endDate?: Date;
}

export class GetGamesResultsDto extends IntersectionType(
  GetGamesResultBaseDto,
  PaginationQueryDto,
) {}
