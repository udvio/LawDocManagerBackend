import { IsString, IsDate, Length } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
export class Person {

    @ApiModelProperty()
    @IsString()
    readonly name: string;

    @ApiModelProperty()
    @IsDate(
        {message: 'Required date format'},
    )
    readonly dob: Date;

    @ApiModelProperty()
    @IsString()
    @Length(14)
    ic: string;
}
