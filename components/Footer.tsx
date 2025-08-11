import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-slate-900 text-white mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
            <h3 className="text-2xl font-bold"><span className="font-medium">CRIE</span> INOVE<span className="text-teal-400">.</span></h3>
            <p className="mt-2 text-slate-400">Soluções criativas em personalizados.</p>
            <div className="mt-4 text-slate-400">
                <p>Precisa de algo especial ou tem alguma dúvida?</p>
                <a 
                  href={`https://wa.me/5531987552948`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-teal-400 hover:text-teal-300 transition-colors"
                >
                    Fale conosco pelo WhatsApp!
                </a>
            </div>
        </div>
        <div className="mt-8 border-t border-slate-700 pt-6 text-center text-sm text-slate-500">
          <p>&copy; {currentYear} CRIE INOVE Personalizados. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;