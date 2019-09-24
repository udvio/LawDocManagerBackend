import { IsString, IsDate, Length } from 'class-validator';
export class Person {

    @IsString()
    readonly name: string;

    @IsDate(
        {message: 'Required date format'},
    )
    readonly dob: Date;

    @IsString()
    @Length(14)
    ic: string;
}
