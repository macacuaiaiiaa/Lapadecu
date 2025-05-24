
import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você implementaria a lógica de envio
    console.log('Form data:', formData);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Contato</h1>
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2">Nome</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full p-3 bg-gray-800 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full p-3 bg-gray-800 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Assunto</label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({...formData, subject: e.target.value})}
              className="w-full p-3 bg-gray-800 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Mensagem</label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full p-3 bg-gray-800 rounded-lg min-h-[150px]"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-[#e50914] text-white px-6 py-3 rounded-lg hover:bg-[#f6121d]"
          >
            Enviar Mensagem
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
