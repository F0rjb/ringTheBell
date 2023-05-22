import {
  IsOptional,
  IsString,
} from 'class-validator';
import { IsNotEmpty } from 'class-validator';
export class CreateBookmarkDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsOptional()
  @IsString()
  description?: string;
  @IsString()
  @IsNotEmpty()
  link: string;
}
