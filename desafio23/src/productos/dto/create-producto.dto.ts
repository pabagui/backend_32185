import { ApiProperty } from "@nestjs/swagger";

export class CreateProductoDto {
        @ApiProperty()
        readonly name: string;
    
        @ApiProperty()
        readonly stock: number;
    
        @ApiProperty()
        readonly price: number;
}
