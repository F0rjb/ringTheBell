import {
  IsOptional,
  IsString,
} from 'class-validator';
import { IsNotEmpty } from 'class-validator';
export class EditBookmarkDto {
  @IsString()
  @IsOptional()
  title?: string;
  @IsOptional()
  @IsString()
  description?: string;
  @IsString()
  @IsOptional()
  link?: string;
}
