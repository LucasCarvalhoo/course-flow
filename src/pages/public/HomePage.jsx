import React from 'react';
import { Link } from 'react-router-dom';
import { useModules } from '../../hooks/useModules';
import PublicLayout from '../../components/public/PublicLayout';
import ModuleCard from '../../components/public/ModuleCard';
import { 
  PlayCircle, 
  BookOpen, 
  Users, 
  ArrowRight, 
  Star, 
  Award, 
  Zap, 
  Globe,
  CheckCircle,
  TrendingUp,
  Github,
  Linkedin,
  Code,
  Heart
} from 'lucide-react';

const HomePage = () => {
  const { modules, loading } = useModules();

  const features = [
    {
      icon: <PlayCircle className="w-8 h-8" />,
      title: "Vídeos de Alta Qualidade",
      description: "Aprenda com aulas profissionalmente produzidas, totalmente gratuitas e atualizadas.",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Currículo Estruturado",
      description: "Módulos organizados progressivamente para garantir o melhor aprendizado.",
      color: "text-green-400",
      bgColor: "bg-green-500/10"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Comunidade Ativa",
      description: "Conecte-se com milhares de estudantes e compartilhe conhecimentos.",
      color: "text-purple-400",
      bgColor: "bg-purple-500/10"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Certificados",
      description: "Receba certificados de conclusão reconhecidos pelo mercado.",
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10"
    }
  ];

  const stats = [
    { label: "Estudantes", value: "10K+", icon: Users },
    { label: "Horas de Conteúdo", value: "100+", icon: PlayCircle },
    { label: "Módulos", value: "20+", icon: BookOpen },
    { label: "Taxa de Conclusão", value: "85%", icon: TrendingUp }
  ];

  const developers = [
    {
      id: 1,
      name: "Arthur Diógenes",
      role: "Full Stack Developer",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
      description: "Especialista em React e UI/UX, responsável pela interface intuitiva da plataforma.",
      github: "https://github.com/anasilva",
      linkedin: "https://linkedin.com/in/anasilva",
      skills: ["React", "TypeScript", "Tailwind CSS"]
    },
    {
      id: 2,
      name: "Filippe Monteiro",
      role: "Full Stack Developer",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      description: "Expert em Node.js e bancos de dados, construindo a arquitetura robusta do sistema.",
      github: "https://github.com/carlossantos",
      linkedin: "https://linkedin.com/in/carlossantos",
      skills: ["Node.js", "PostgreSQL", "Docker"]
    },
    {
      id: 3,
      name: "Lucas Carvalho",
      role: "Full Stack Developer",
      avatar: "https://i.imgur.com/vNiuV7M.png",
      description: "Desenvolvedor fullstack com foco em código limpo e eficiência.",
      github: "https://github.com/LucasCarvalhoo",
      linkedin: "https://linkedin.com/in/lucascarvalho-dev",
      skills: ["Java", "PostgreSQL", "Spring", "React"]
    }
  ];

  return (
    <PublicLayout showSidebar={false}>
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen flex items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-cyan-600/10"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.15),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(147,51,234,0.15),transparent_50%)]"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-blue-400">
                  <Star className="w-5 h-5" />
                  <span className="text-sm font-semibold tracking-wide uppercase">
                    Educação Gratuita de Qualidade
                  </span>
                </div>
                
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
                  Transforme sua
                  <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    carreira em tech
                  </span>
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-xl">
                  Aprenda as tecnologias mais demandadas do mercado com nossos cursos gratuitos. 
                  Do zero ao profissional, no seu próprio ritmo.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/modules"
                  className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <PlayCircle className="w-5 h-5" />
                  Começar Agora
                </Link>
                <a
                  href="#features"
                  className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 backdrop-blur-sm border border-white/10"
                >
                  Saiba Mais
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="text-center space-y-2">
                      <div className="flex justify-center">
                        <Icon className="w-6 h-6 text-blue-400" />
                      </div>
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative hidden lg:block">
              <div className="relative">
                {/* Main Visual */}
                <div className="w-full max-w-lg mx-auto">
                  <div className="relative">
                    {/* Background glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-3xl"></div>
                    
                    {/* Main card */}
                    <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 space-y-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                          <PlayCircle className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="text-white font-semibold">Aula Atual</div>
                          <div className="text-gray-400 text-sm">JavaScript Fundamentals</div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="w-full bg-gray-800/50 rounded-full h-2 overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-3/4 relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                          </div>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">12 min assistidos</span>
                          <span className="text-white">16 min total</span>
                        </div>
                      </div>
                      
                      {/* Mini lesson list */}
                      <div className="space-y-2">
                        {[
                          { title: "Variáveis e Tipos", completed: true },
                          { title: "Funções", completed: true },
                          { title: "Arrays e Objetos", completed: false },
                          { title: "DOM Manipulation", completed: false }
                        ].map((lesson, idx) => (
                          <div key={idx} className="flex items-center gap-3 p-2 rounded-lg bg-black/20">
                            <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                              lesson.completed ? 'bg-green-500' : 'bg-gray-600'
                            }`}>
                              {lesson.completed && <CheckCircle className="w-3 h-3 text-white" />}
                            </div>
                            <span className={`text-sm ${lesson.completed ? 'text-white' : 'text-gray-400'}`}>
                              {lesson.title}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Por que escolher a Geração Tech?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Oferecemos uma experiência de aprendizado completa, moderna e acessível para todos os níveis.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 text-center space-y-4 group hover:bg-gray-800/50 hover:border-gray-700 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className={`mx-auto w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center ${feature.color} group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="developers" className="py-24 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <div className="flex items-center justify-center gap-2 text-purple-400 mb-4">
              <Code className="w-5 h-5" />
              <span className="text-sm font-semibold tracking-wide uppercase">
                Nossa Equipe
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Conheça os Desenvolvedores
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              A equipe talentosa por trás da plataforma Geração Tech, dedicada a criar a melhor experiência de aprendizado.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {developers.map((developer, index) => (
              <div
                key={developer.id}
                className="bg-gray-900/70 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 text-center space-y-6 group hover:bg-gray-800/70 hover:border-gray-700 transition-all duration-300 hover:transform hover:scale-105 opacity-0 animate-fade-in"
                style={{animationDelay: `${index * 200}ms`, animationFillMode: 'forwards'}}
              >
                <div className="relative mx-auto w-24 h-24">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
                  <img
                    src={developer.avatar}
                    alt={developer.name}
                    className="relative w-24 h-24 rounded-full object-cover border-4 border-white/10 group-hover:border-white/20 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                    {developer.name}
                  </h3>
                  <p className="text-purple-400 font-medium text-sm">
                    {developer.role}
                  </p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {developer.description}
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-2">
                  {developer.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-xs font-medium border border-purple-500/30"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex justify-center gap-4 pt-4">
                  <a
                    href={developer.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-800/50 hover:bg-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200 hover:scale-110 group/icon"
                    title="GitHub"
                  >
                    <Github className="w-5 h-5 group-hover/icon:scale-110 transition-transform" />
                  </a>
                  <a
                    href={developer.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-blue-600/20 hover:bg-blue-600/30 rounded-full flex items-center justify-center text-blue-400 hover:text-blue-300 transition-all duration-200 hover:scale-110 group/icon border border-blue-600/30"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5 group-hover/icon:scale-110 transition-transform" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl p-8 border border-purple-500/20">
              <div className="flex items-center justify-center gap-2 text-purple-400 mb-4">
                <Heart className="w-5 h-5" />
                <span className="text-sm font-semibold">Feito com amor</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Tecnologia a serviço da educação
              </h3>
              <p className="text-gray-300 max-w-2xl mx-auto mb-6">
                Nossa equipe trabalha incansavelmente para democratizar o acesso à educação em tecnologia,
                criando uma plataforma robusta, intuitiva e completamente gratuita.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://github.com/geracao-tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:scale-105"
                >
                  <Github className="w-4 h-4" />
                  Ver no GitHub
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-3 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 font-semibold px-6 py-3 rounded-xl transition-all duration-200 backdrop-blur-sm border border-purple-600/30"
                >
                  <Users className="w-4 h-4" />
                  Junte-se ao Time
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modules Preview Section */}
      <section id="modules" className="py-24 bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <div className="flex items-center justify-center gap-2 text-blue-400 mb-4">
              <Globe className="w-5 h-5" />
              <span className="text-sm font-semibold tracking-wide uppercase">
                Cursos Disponíveis
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Explore nossos módulos de ensino
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Do básico ao avançado, nossos cursos são estruturados para levar você do zero ao profissional.
            </p>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-800/50 rounded-2xl h-96 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {modules.slice(0, 6).map((module, index) => (
                  <div key={module.id} className="opacity-0 animate-fade-in" style={{animationDelay: `${index * 100}ms`, animationFillMode: 'forwards'}}>
                    <ModuleCard module={module} />
                  </div>
                ))}
              </div>

              <div className="text-center">
                <Link
                  to="/modules"
                  className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Ver Todos os Cursos
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600"></div>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Pronto para começar sua jornada?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Junte-se a milhares de estudantes que já estão transformando suas carreiras com nossos cursos gratuitos.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/modules"
              className="inline-flex items-center gap-3 bg-white text-black font-semibold px-8 py-4 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl hover:bg-gray-100"
            >
              <PlayCircle className="w-5 h-5" />
              Começar Agora - É Grátis!
            </Link>
            <a
              href="#"
              className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 backdrop-blur-sm border border-white/20"
            >
              <Users className="w-5 h-5" />
              Entrar na Comunidade
            </a>
          </div>

          {/* Trust indicators */}
          <div className="pt-8 border-t border-white/20">
            <div className="flex flex-wrap justify-center items-center gap-8 text-white/70">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">100% Gratuito</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">Certificado Incluso</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">Suporte da Comunidade</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">Acesso Vitalício</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img 
                  src="../../img/logo-gt.png" 
                  alt="Geração Tech" 
                  className="h-8 w-auto"
                />
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Democratizando o acesso à educação em tecnologia através de cursos gratuitos e de qualidade.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Cursos</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/modules" className="text-gray-400 hover:text-white transition-colors">Todos os Módulos</Link></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">JavaScript</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">React</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Node.js</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Comunidade</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Discord</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">GitHub</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">YouTube</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contato</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Política de Privacidade</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Termos de Uso</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row justify-center items-center">
            <p className="text-gray-500 text-sm">
              © 2025 Geração Tech. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </PublicLayout>
  );
};

export default HomePage;