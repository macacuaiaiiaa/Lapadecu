
import React from 'react';

const Terms: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Termos de Uso</h1>
      <div className="prose prose-invert max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Aceitação dos Termos</h2>
          <p className="text-gray-300">
            Ao acessar e usar este serviço, você aceita e concorda em cumprir estes termos e condições de uso.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Uso do Serviço</h2>
          <p className="text-gray-300">
            O serviço é fornecido "como está" e destina-se apenas para uso pessoal e não comercial.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Conteúdo</h2>
          <p className="text-gray-300">
            Todo o conteúdo disponibilizado é protegido por direitos autorais e outras leis de propriedade intelectual.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Terms;
