
import React from 'react';

const Privacy: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Política de Privacidade</h1>
      <div className="prose prose-invert max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Coleta de Informações</h2>
          <p className="text-gray-300">
            Coletamos apenas as informações necessárias para fornecer nossos serviços.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Uso das Informações</h2>
          <p className="text-gray-300">
            As informações coletadas são utilizadas apenas para melhorar sua experiência.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Proteção de Dados</h2>
          <p className="text-gray-300">
            Seus dados são protegidos usando as melhores práticas de segurança disponíveis.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Privacy;
