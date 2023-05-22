import {
  IsOptional,
  IsString,
  IsEmail,
} from 'class-validator';

export class EditUserDto {
  @IsEmail()
  email: string;
  @IsString()
  @IsOptional()
  firstName?: string;
  @IsString()
  @IsOptional()
  lastName?: string;
}
