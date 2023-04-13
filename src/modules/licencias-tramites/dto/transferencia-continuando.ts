import { IsNumber } from "class-validator";

export class TransferenciaContinuandoDTO {

  @IsNumber()
  readonly licencia: number;

  @IsNumber()
  readonly persona: number;

  @IsNumber()
  creatorUser: number;

  @IsNumber()
  updatorUser: number;

}