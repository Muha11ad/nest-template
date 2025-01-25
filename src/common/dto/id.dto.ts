import { IsNotEmpty } from 'class-validator';

export class IdDto {
  @IsNotEmpty()
  id: string;
}
