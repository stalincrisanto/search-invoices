export interface SearchParams {
  cardId: string;
  dateStart: string;
  dateEnd: string;
}

export interface Invoice {
  id: number;
  account_fiscal_id: string;
  account_razon: string;
  chs_data_dat: string;
  ruta_pdf_generado: string;
  ruta_xml_comprobante_recibido: string;
}
