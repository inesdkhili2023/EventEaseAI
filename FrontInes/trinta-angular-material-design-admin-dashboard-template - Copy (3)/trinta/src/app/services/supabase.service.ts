import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, AuthError } from '@supabase/supabase-js';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey,
      {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
          flowType: 'pkce'
        }
      }
    );
  }

// ✅ Connexion personnalisée avec vérification bcrypt côté SQL
async signIn(email: string, password: string) {
  try {
    const { data, error } = await this.supabase.rpc('verify_user_login', {
      p_email: email.trim().toLowerCase(),
      p_password: password
    });

    if (error) throw new Error('Email ou mot de passe incorrect.');
    if (!data || data.length === 0) throw new Error('Utilisateur non trouvé.');

    console.log('✅ Utilisateur connecté :', data[0]);
    return data[0]; // retourne toutes les infos utilisateur
  } catch (error) {
    console.error('Erreur de connexion :', error);
    throw error;
  }
}


async signUp(nom: string, prenom: string, email: string, password: string, role = 'CLIENT') {
  try {
    const { data, error } = await this.supabase.rpc('create_user_secure', {
      p_nom: nom,
      p_prenom: prenom,
      p_email: email.trim().toLowerCase(),
      p_password: password,
      p_role: role
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Erreur inscription :', error);
    throw error;
  }
}


  // 🚪 Déconnexion utilisateur
  async signOut(): Promise<void> {
    try {
      const { error } = await this.supabase.auth.signOut();
      if (error) throw error;

      // Nettoyer localStorage
      localStorage.removeItem('supabase-auth');
      localStorage.removeItem('rememberMe');
      localStorage.removeItem('userEmail');
    } catch (error) {
      console.error('Sign out error:', error);
      localStorage.clear();
      throw error;
    }
  }

  // 🧩 Obtenir la session actuelle
  async getSession() {
    try {
      const { data: { session }, error } = await this.supabase.auth.getSession();
      if (error) throw error;
      return session;
    } catch (error) {
      console.error('Get session error:', error);
      return null;
    }
  }

  // 👤 Obtenir l'utilisateur courant
  async getCurrentUser() {
    try {
      const { data: { user }, error } = await this.supabase.auth.getUser();
      if (error) throw error;
      return user;
    } catch (error) {
      console.error('Get user error:', error);
      return null;
    }
  }

  // 🔑 Réinitialiser le mot de passe
  async resetPassword(email: string): Promise<void> {
    try {
      const { error } = await this.supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/authentication/reset-password`
      });
      if (error) throw error;
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  }

  // 🔒 Mettre à jour le mot de passe
  async updatePassword(newPassword: string): Promise<void> {
    try {
      const { error } = await this.supabase.auth.updateUser({
        password: newPassword
      });
      if (error) throw error;
    } catch (error) {
      console.error('Update password error:', error);
      throw error;
    }
  }

  // 🟢 Vérifier si l'utilisateur est connecté
  async isAuthenticated(): Promise<boolean> {
    const session = await this.getSession();
    return !!session;
  }

  // 🧰 Gestion des erreurs
  private handleAuthError(error: AuthError): Error {
    const msg = error.message.toLowerCase();

    if (msg.includes('invalid login credentials') || msg.includes('invalid email or password')) {
      return new Error('Invalid email or password. Please check your credentials.');
    }
    if (msg.includes('email not confirmed')) {
      return new Error('Please verify your email address before signing in.');
    }
    if (msg.includes('user not found')) {
      return new Error('No account found with this email.');
    }
    if (msg.includes('too many requests')) {
      return new Error('Too many login attempts. Try again later.');
    }

    return new Error(error.message || 'Authentication error.');
  }

  // ✅ Fournir un accès à Supabase
  get client(): SupabaseClient {
    return this.supabase;
  }

  // Auth & Storage getter (corrigé)
  get auth() {
    return this.supabase.auth;
  }

  get storage() {
    // 🔥 Correction de l'erreur "Property 'storage' does not exist"
    return this.supabase.storage;
  }

  from(table: string) {
    return this.supabase.from(table);
  }
}
