import {IsBoolean, IsNotEmpty, IsString} from "class-validator";

export class CreateArtistDto {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;

    @IsBoolean()
    public readonly grammy: boolean;
}
