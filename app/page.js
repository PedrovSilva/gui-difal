import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import axios from "axios";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://api-difal.onrender.com/api/difal/naoContribuinte", [formData], {
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
      });
      setResponse(res.data);
    } catch (error) {
      console.error("Erro ao enviar requisição", error);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <Card>
        <CardContent>
          <h2 className="text-xl font-bold mb-4">Cálculo DIFAL</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {Object.keys(formData).map((key) => (
              <div key={key}>
                <Label htmlFor={key}>{key.replace("_", " ")}</Label>
                <Input
                  type="text"
                  id={key}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}
            <Button type="submit">Calcular</Button>
          </form>
          {response && (
            <div className="mt-4 p-3 bg-gray-100 rounded">
              <h3 className="font-semibold">Resultado:</h3>
              <pre className="text-sm">{JSON.stringify(response, null, 2)}</pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
