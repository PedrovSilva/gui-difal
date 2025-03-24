import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api/difal', // URL base da sua API
  timeout: 5000,                       // Timeout da requisição
  headers: {
    'Content-Type': 'application/json',
    'Accept': '*/*',
  },
});

// Interceptador de requisição (opcional)
apiClient.interceptors.request.use(
  (config) => {
    // Pode adicionar token ou modificar configuração aqui
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptador de resposta (opcional)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Trate erros globais, se necessário
    return Promise.reject(error);
  }
);

export default apiClient;