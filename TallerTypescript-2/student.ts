
export class Student{

    codigo: number;
    cedula : number
    Edad : number;
    Direccion: String;
    Telefono: number;

    constructor(codigo: number, cedula : number, Edad : number, Direccion: String, Telefono: number){
        this.codigo = codigo;
        this.cedula= cedula;
        this.Edad = Edad;
        this.Direccion= Direccion;
        this.Telefono = Telefono;
    }

}