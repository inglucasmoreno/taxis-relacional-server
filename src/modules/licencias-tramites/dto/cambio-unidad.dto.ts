import { IsNumber } from "class-validator";

export class CambioUnidadDTO {

  @IsNumber()
  readonly vehiculo: number;

  @IsNumber()
  readonly licencia: number;

  @IsNumber()
  creatorUser: number;

  @IsNumber()
  updatorUser: number;

}