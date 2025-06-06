# Instruções para Integrar o Modal de Perfil

## 1. Atualize o arquivo src/pages/Modules.jsx

Adicione no início do arquivo:
```javascript
import ProfileModal from '../components/ProfileModal'
```

Adicione após os outros estados:
```javascript
const [showProfileModal, setShowProfileModal] = useState(false)
```

Localize o item "Perfil" na sidebar e substitua por:
```javascript
<div 
  className="flex items-center gap-3 p-3 text-[#cccccc] hover:text-white cursor-pointer transition-colors"
  onClick={() => setShowProfileModal(true)}
>
  <svg className="w-4 h-4 text-[#888888]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
  <span className="text-sm">Perfil</span>
</div>
```

Antes do último </div> do componente, adicione:
```javascript
{/* Profile Modal */}
<ProfileModal 
  isOpen={showProfileModal} 
  onClose={() => setShowProfileModal(false)} 
/>
```

## 2. Configure o Supabase

1. Vá para o painel do Supabase
2. Clique em "SQL Editor"
3. Cole e execute o conteúdo do arquivo `supabase_profiles_setup.sql`

## 3. Teste a implementação

1. Faça login na aplicação
2. Clique em "Perfil" na sidebar
3. Teste o upload de avatar
4. Teste a alteração de nome
5. Teste a alteração de senha

## Recursos do Modal:

- Upload de avatar com preview
- Alteração de nome completo
- Alteração de senha
- Validações de formulário
- Mensagens de sucesso/erro
- Design responsivo
- Animações suaves
