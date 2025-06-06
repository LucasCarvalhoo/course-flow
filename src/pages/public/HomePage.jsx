import React from 'react';
import { Link } from 'react-router-dom';
import { useModules } from '../../hooks/useModules';
import PublicLayout from '../../components/public/PublicLayout';
import ModuleCard from '../../components/public/ModuleCard';
import { PlayCircle, BookOpen, Users, ArrowRight } from 'lucide-react';

const HomePage = () => {
  const { modules, loading } = useModules();

  const features = [
    {
      icon: <PlayCircle className="w-8 h-8" />,
      title: "Vídeos Gratuitos",
      description: "Aprenda com aulas em vídeo de alta qualidade, totalmente gratuitas."
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Conteúdo Estruturado",
      description: "Cursos organizados em módulos progressivos para melhor aprendizado."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Comunidade Ativa",
      description: "Conecte-se com outros estudantes e compartilhe conhecimentos."
    }
  ];

  return (
    <PublicLayout showSidebar={false}>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-purple-800"></div>
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Geração Tech 2.0
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Aprenda tecnologia gratuitamente com nossos cursos online. 
              Comece sua jornada na programação hoje mesmo!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/modules"
                className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg"
              >
                <PlayCircle className="w-5 h-5" />
                Começar Agora
              </Link>
              <a
                href="#modules"
                className="inline-flex items-center gap-2 border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-black transition-colors text-lg"
              >
                Ver Cursos
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Por que escolher nossos cursos?
            </h2>
            <p className="text-xl text-[#cccccc] max-w-2xl mx-auto">
              Oferecemos uma experiência de aprendizado completa e acessível para todos.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-[#2a2a2a] rounded-xl p-8 text-center hover:bg-[#333333] transition-colors"
              >
                <div className="text-blue-400 mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-[#cccccc]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules Preview Section */}
      <section id="modules" className="py-20 bg-[#1f1f1f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Nossos Cursos
            </h2>
            <p className="text-xl text-[#cccccc] max-w-2xl mx-auto">
              Explore nossos módulos de ensino e comece a aprender hoje mesmo.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {modules.slice(0, 6).map((module) => (
                <ModuleCard key={module.id} module={module} />
              ))}
            </div>
          )}

          <div className="text-center">
            <Link
              to="/modules"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Ver Todos os Cursos
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Pronto para começar sua jornada?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Junte-se a milhares de estudantes que já estão aprendendo conosco.
          </p>
          <Link
            to="/modules"
            className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg"
          >
            <PlayCircle className="w-5 h-5" />
            Começar Agora - É Grátis!
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] border-t border-[#333333] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <img 
                src="/public/img/logo-gt.png" 
                alt="Geração Tech" 
                className="h-8 w-auto mb-4 [filter:drop-shadow(0_0_6px_rgba(255,255,255,0.2))]"
              />
              <p className="text-[#cccccc]">
                Democratizando o acesso à educação em tecnologia.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Links Rápidos</h4>
              <ul className="space-y-2">
                <li><Link to="/modules" className="text-[#cccccc] hover:text-white transition-colors">Cursos</Link></li>
                <li><a href="#" className="text-[#cccccc] hover:text-white transition-colors">Comunidade</a></li>
                <li><a href="#" className="text-[#cccccc] hover:text-white transition-colors">Suporte</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contato</h4>
              <ul className="space-y-2">
                <li className="text-[#cccccc]">contato@geracaotech.com</li>
                <li className="text-[#cccccc]">+55 (11) 99999-9999</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#333333] mt-8 pt-8 text-center">
            <p className="text-[#666666]">
              © 2025 Geração Tech. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </PublicLayout>
  );
};

export default HomePage;