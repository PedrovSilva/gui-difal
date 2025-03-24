

import { Item } from '@/types/itemTypes';
import * as XLSX from 'xlsx';

export const convertXlsxToJson = (data: Uint8Array): Item[] => {
  const workbook = XLSX.read(data, { type: 'array' });
  const sheetName = workbook.SheetNames[0]; // Obtém o nome da primeira planilha
  const sheet = workbook.Sheets[sheetName]; // Obtém a primeira planilha
  const jsonData = XLSX.utils.sheet_to_json<Item>(sheet, { defval: null }); // Converte a planilha para JSON
  return jsonData;
};
