import {IsInt, IsNotEmpty, IsString} from "class-validator";

export class CreateTrackDto {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;
    public readonly artistId: string | null;
    public readonly albumId: string | null;

    @IsInt()
    public readonly duration: number;
}
