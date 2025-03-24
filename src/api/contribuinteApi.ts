// src/api/exampleApi.ts

import { Item } from '@/types/itemTypes';
import apiClient from './apiClient';

export const enviarParaApiContribuinte = async (data: Item[]) => {
  try {
    const response = await apiClient.post('/contribuinte', data );
    return response.data;
  } catch (error) {
    console.error('Erro ao chamar a API:', error);
    throw error;
  }
};
