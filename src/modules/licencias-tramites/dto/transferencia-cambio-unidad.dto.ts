import { IsNumber } from "class-validator";

export class TransferenciaCambioUnidadDTO {

  @IsNumber()
  readonly licencia: number;

  @IsNumber()
  readonly persona: number;

  @IsNumber()
  readonly vehiculo: number;

  @IsNumber()
  creatorUser: number;

  @IsNumber()
  updatorUser: number;

}