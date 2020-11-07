export class FileItem {
    public archivo: File;
    public nombreArchivo: string;
    public url: string;
    public estadoSubiendo: boolean;
    public progreso: number;
    public tipoDocumento: string;

    constructor( archivo: File, tipoDocumento: string) {
        this.archivo = archivo;
        this.nombreArchivo = archivo.name;

        this.estadoSubiendo = false;
        this.progreso = 0;
        this.tipoDocumento = tipoDocumento;
    }
}
