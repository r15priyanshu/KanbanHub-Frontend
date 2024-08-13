export class AddressDto {
    private addressId?:number;
    public city: string;
    public state: string;

    constructor(city: string, state: string) {
        this.city = city;
        this.state = state;
    }
}