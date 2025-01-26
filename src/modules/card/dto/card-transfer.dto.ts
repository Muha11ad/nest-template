import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class CardTransferDto {
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  user_id: number;
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  sender_card_id: number;
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  reciever_card_id: number;
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  amount: number;
}
