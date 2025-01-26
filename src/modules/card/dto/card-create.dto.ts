import { IsInt, IsPositive } from 'class-validator';

export class CardCreateDto {
  @IsInt()
  @IsPositive()
  user_id: number;
  @IsInt()
  @IsPositive()
  card_number: number;
}
