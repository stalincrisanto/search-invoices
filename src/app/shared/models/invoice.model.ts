export interface Invoice {
    id:                         number;
    concessionCode:             number;
    chsDataDat:                 string;
    accoutFiscalId:             string;
    accountRazon:               string;
    rutaXmlEnviado:             string;
    rutaXmlRecibido:            string;
    rutaXmlComprobanteRecibido: string;
    rutaPdfGenerado:            string;
}
