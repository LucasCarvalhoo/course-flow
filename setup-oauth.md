# Configuração OAuth no Supabase

## 1. Microsoft (Azure AD)
1. Acesse https://portal.azure.com
2. Vá para "Azure Active Directory" > "App registrations"
3. Clique em "New registration"
4. Configure:
   - Name: CourseOS
   - Redirect URI: https://[YOUR-PROJECT].supabase.co/auth/v1/callback
5. Copie Application (client) ID
6. Em "Certificates & secrets", crie um novo client secret
7. No Supabase Dashboard > Authentication > Providers > Azure:
   - Enable Azure provider
   - Azure Tenant URL: https://login.microsoftonline.com/[YOUR-TENANT-ID]
   - Azure Client ID: [YOUR-CLIENT-ID]
   - Azure Client Secret: [YOUR-CLIENT-SECRET]

## 2. Google
1. Acesse https://console.cloud.google.com
2. Crie um novo projeto ou selecione existente
3. Ative a API do Google+ 
4. Em "Credentials", crie um OAuth 2.0 Client ID
5. Configure:
   - Authorized redirect URIs: https://[YOUR-PROJECT].supabase.co/auth/v1/callback
6. No Supabase Dashboard > Authentication > Providers > Google:
   - Enable Google provider
   - Google Client ID: [YOUR-CLIENT-ID]
   - Google Client Secret: [YOUR-CLIENT-SECRET]

## 3. GitHub
1. Acesse https://github.com/settings/developers
2. Clique em "New OAuth App"
3. Configure:
   - Application name: CourseOS
   - Homepage URL: https://[YOUR-APP-URL]
   - Authorization callback URL: https://[YOUR-PROJECT].supabase.co/auth/v1/callback
4. No Supabase Dashboard > Authentication > Providers > GitHub:
   - Enable GitHub provider
   - GitHub Client ID: [YOUR-CLIENT-ID]
   - GitHub Client Secret: [YOUR-CLIENT-SECRET]
