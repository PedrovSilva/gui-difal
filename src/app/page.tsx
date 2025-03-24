'use client'

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DifalCalculator() {
  const [formData, setFormData] = useState({
    NUMR_NCM: "",
    QTDE_TRIBUTARIA: "",
    VALR_UNIDADE_TRIB_ITEM: "",
    VALR_FRETE_ITEM: "",
    VALR_SEGURO_ITEM: "",
    VALR_DESCONTO_ITEM: "",
    ALIQ_ORIGEM: ""
  });

  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("https://api-difal.onrender.com/api/difal/naoContribuinte", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*"
        },
        body: JSON.stringify([formData])
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error("Erro ao enviar requisição", error);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <Card>
        <CardContent className="p-4 space-y-2">
          <h2 className="text-xl font-bold">Cálculo de DIFAL</h2>
          {Object.keys(formData).map((key) => (
            <Input
              key={key}
              name={key}
              placeholder={key}
              value={formData[key]}
              onChange={handleChange}
            />
          ))}
          <Button onClick={handleSubmit}>Calcular</Button>
          {response && (
            <div className="mt-4 p-2 bg-gray-100 rounded">
              <h3 className="font-semibold">Resposta:</h3>
              <pre className="text-sm">{JSON.stringify(response, null, 2)}</pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
