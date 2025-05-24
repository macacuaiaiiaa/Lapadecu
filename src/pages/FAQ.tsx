
import React from 'react';

const FAQ: React.FC = () => {
  const questions = [
    {
      question: 'Como faço para assistir?',
      answer: 'Basta selecionar o conteúdo desejado e clicar em "Assistir Agora".'
    },
    {
      question: 'O serviço é gratuito?',
      answer: 'Sim, o serviço é totalmente gratuito.'
    },
    {
      question: 'Posso assistir em qualquer dispositivo?',
      answer: 'Sim, o serviço está disponível para todos os dispositivos com navegador web.'
    },
    {
      question: 'Como reporto um problema?',
      answer: 'Você pode utilizar nossa página de contato para reportar qualquer problema.'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Perguntas Frequentes</h1>
      <div className="space-y-6">
        {questions.map((item, index) => (
          <div key={index} className="bg-gray-800/50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">{item.question}</h3>
            <p className="text-gray-300">{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
