import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CardUpdateBalanceDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  amount: number;
}
