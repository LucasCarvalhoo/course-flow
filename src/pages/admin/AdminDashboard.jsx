import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { useModules } from '../../hooks/useModules';
import { 
  BookOpen, 
  PlayCircle, 
  Users, 
  TrendingUp, 
  Plus,
  Eye,
  Edit,
  BarChart3
} from 'lucide-react';

const AdminDashboard = () => {
  const { modules, loading } = useModules();
  const [stats, setStats] = useState({
    totalModules: 0,
    totalLessons: 0,
    totalViews: 0,
    totalStudents: 0
  });

  useEffect(() => {
    if (modules) {
      const totalLessons = modules.reduce((acc, module) => acc + (module.lessons?.length || 0), 0);
      setStats({
        totalModules: modules.length,
        totalLessons: totalLessons,
        totalViews: Math.floor(Math.random() * 10000) + 5000, // Mock data
        totalStudents: Math.floor(Math.random() * 1000) + 500 // Mock data
      });
    }
  }, [modules]);

  const statsCards = [
    {
      title: 'Total de Módulos',
      value: stats.totalModules,
      icon: BookOpen,
      color: 'blue',
      change: '+2',
      changeText: 'novos este mês'
    },
    {
      title: 'Total de Aulas',
      value: stats.totalLessons,
      icon: PlayCircle,
      color: 'green',
      change: '+8',
      changeText: 'novas esta semana'
    },
    {
      title: 'Visualizações',
      value: stats.totalViews.toLocaleString(),
      icon: Eye,
      color: 'purple',
      change: '+12%',
      changeText: 'vs. mês anterior'
    },
    {
      title: 'Estudantes Ativos',
      value: stats.totalStudents.toLocaleString(),
      icon: Users,
      color: 'orange',
      change: '+5%',
      changeText: 'crescimento mensal'
    }
  ];

  const recentModules = modules.slice(0, 5);

  const quickActions = [
    {
      title: 'Criar Novo Módulo',
      description: 'Adicionar um novo módulo ao curso',
      icon: BookOpen,
      href: '/admin/modules/new',
      color: 'blue'
    },
    {
      title: 'Adicionar Aula',
      description: 'Criar uma nova aula em vídeo',
      icon: PlayCircle,
      href: '/admin/lessons/new',
      color: 'green'
    },
    {
      title: 'Ver Relatórios',
      description: 'Analisar métricas e performance',
      icon: BarChart3,
      href: '/admin/reports',
      color: 'purple'
    }
  ];

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Bem-vindo ao Dashboard! 👋
          </h1>
          <p className="text-[#cccccc]">
            Aqui está um resumo da sua plataforma de cursos online.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-[#2a2a2a] rounded-xl p-6 border border-[#333333]">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-${stat.color}-600/20`}>
                    <Icon className={`w-6 h-6 text-${stat.color}-400`} />
                  </div>
                  <span className="text-green-400 text-sm font-medium">
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">
                  {stat.value}
                </h3>
                <p className="text-[#666666] text-sm">{stat.title}</p>
                <p className="text-[#888888] text-xs mt-1">{stat.changeText}</p>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-bold text-white mb-4">Ações Rápidas</h2>
            <div className="space-y-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={index}
                    to={action.href}
                    className="block bg-[#2a2a2a] rounded-xl p-4 border border-[#333333] hover:border-[#444444] transition-colors group"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-${action.color}-600/20 group-hover:bg-${action.color}-600/30 transition-colors`}>
                        <Icon className={`w-5 h-5 text-${action.color}-400`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                          {action.title}
                        </h3>
                        <p className="text-[#666666] text-sm">{action.description}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Recent Modules */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Módulos Recentes</h2>
              <Link 
                to="/admin/modules"
                className="text-blue-400 hover:text-blue-300 text-sm font-medium"
              >
                Ver todos
              </Link>
            </div>

            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-[#2a2a2a] rounded-xl p-4 animate-pulse">
                    <div className="h-4 bg-[#333333] rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-[#333333] rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {recentModules.map((module) => (
                  <div key={module.id} className="bg-[#2a2a2a] rounded-xl p-4 border border-[#333333]">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-white mb-1">
                          {module.title}
                        </h3>
                        <p className="text-[#666666] text-sm line-clamp-2">
                          {module.description}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-[#888888]">
                          <span>{module.lessons?.length || 0} aulas</span>
                          <span>Ordem: {module.order_position || 'N/A'}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Link
                          to={`/module/${module.id}`}
                          target="_blank"
                          className="p-2 text-[#666666] hover:text-blue-400 transition-colors"
                          title="Visualizar"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          to={`/admin/modules/${module.id}/edit`}
                          className="p-2 text-[#666666] hover:text-green-400 transition-colors"
                          title="Editar"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}

                {recentModules.length === 0 && (
                  <div className="text-center py-8 bg-[#2a2a2a] rounded-xl border border-[#333333]">
                    <BookOpen className="w-12 h-12 text-[#666666] mx-auto mb-4" />
                    <h3 className="text-white font-semibold mb-2">Nenhum módulo criado</h3>
                    <p className="text-[#666666] mb-4">Comece criando seu primeiro módulo de curso.</p>
                    <Link
                      to="/admin/modules/new"
                      className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Criar Primeiro Módulo
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* System Status */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="bg-[#2a2a2a] rounded-xl p-6 border border-[#333333]">
            <h3 className="text-lg font-semibold text-white mb-4">Status do Sistema</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[#cccccc]">Banco de Dados</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-green-400 text-sm">Online</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#cccccc]">CDN de Vídeos</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-green-400 text-sm">Funcionando</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#cccccc]">Backup Automático</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-yellow-400 text-sm">Agendado</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#2a2a2a] rounded-xl p-6 border border-[#333333]">
            <h3 className="text-lg font-semibold text-white mb-4">Atividade Recente</h3>
            <div className="space-y-3">
              <div className="text-sm">
                <div className="text-[#cccccc]">Último login admin</div>
                <div className="text-[#888888]">Há 2 minutos</div>
              </div>
              <div className="text-sm">
                <div className="text-[#cccccc]">Última modificação</div>
                <div className="text-[#888888]">Módulo atualizado há 1 hora</div>
              </div>
              <div className="text-sm">
                <div className="text-[#cccccc]">Novos estudantes</div>
                <div className="text-[#888888]">+15 hoje</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;