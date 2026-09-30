/**
 * authService.js
 * 
 * Mock / Local Authentication Service for ResumeLens ATS.
 * 
 * ARCHITECTURE NOTE FOR AWS INTEGRATION:
 * This service is designed with clean boundary interfaces so that it can be
 * seamlessly swapped with Amazon Cognito User Pools in the AWS deployment phase:
 * 
 * - login()          -> aws-sdk CognitoIdentityProviderClient (InitiateAuth / AdminInitiateAuth)
 * - register()       -> aws-sdk CognitoIdentityProviderClient (SignUpCommand)
 * - logout()         -> aws-sdk CognitoIdentityProviderClient (GlobalSignOutCommand)
 * - getCurrentUser() -> aws-amplify Auth.currentAuthenticatedUser() or JWT session decode
 * 
 * NOTICE: No AWS credentials or secrets are placed here.
 */

import { INITIAL_USERS } from '../data/sampleData';

const STORAGE_KEYS = {
  CURRENT_USER: 'resumelens_auth_user',
  USERS_LIST: 'resumelens_all_users',
};

// Initialize localStorage with seed users if not already present
function initUsers() {
  const existing = localStorage.getItem(STORAGE_KEYS.USERS_LIST);
  if (!existing) {
    localStorage.setItem(STORAGE_KEYS.USERS_LIST, JSON.stringify(INITIAL_USERS));
  }
}

export const authService = {
  /**
   * Log in user with email and password
   */
  async login(email, password) {
    initUsers();
    // Simulate slight network latency for realistic feel
    await new Promise((res) => setTimeout(res, 300));

    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS_LIST) || '[]');
    const user = users.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
    );

    if (!user) {
      throw new Error('Invalid email or password. Please check your credentials.');
    }

    // Update lastActive
    user.lastActive = new Date().toISOString().split('T')[0];
    const updatedUsers = users.map((u) => (u.id === user.id ? user : u));
    localStorage.setItem(STORAGE_KEYS.USERS_LIST, JSON.stringify(updatedUsers));

    // Exclude password in active session object
    const sessionUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role || 'student',
      joinedDate: user.joinedDate,
      analysesCount: user.analysesCount || 0,
      lastActive: user.lastActive,
    };

    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(sessionUser));
    return sessionUser;
  },

  /**
   * Register a new user
   */
  async register({ name, email, password }) {
    initUsers();
    await new Promise((res) => setTimeout(res, 300));

    if (!name || !email || !password) {
      throw new Error('All fields are required.');
    }

    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS_LIST) || '[]');
    const existing = users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());

    if (existing) {
      throw new Error('An account with this email address already exists.');
    }

    const newUser = {
      id: `usr-${Date.now().toString(36)}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      role: 'student',
      joinedDate: new Date().toISOString().split('T')[0],
      analysesCount: 0,
      lastActive: new Date().toISOString().split('T')[0],
    };

    users.push(newUser);
    localStorage.setItem(STORAGE_KEYS.USERS_LIST, JSON.stringify(users));

    const sessionUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      joinedDate: newUser.joinedDate,
      analysesCount: 0,
      lastActive: newUser.lastActive,
    };

    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(sessionUser));
    return sessionUser;
  },

  /**
   * Log out active session
   */
  async logout() {
    await new Promise((res) => setTimeout(res, 150));
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  },

  /**
   * Get currently authenticated user
   */
  getCurrentUser() {
    const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  /**
   * Check if current user is admin
   */
  isAdmin() {
    const user = this.getCurrentUser();
    return user?.role === 'admin';
  },

  /**
   * Check if any user is logged in
   */
  isAuthenticated() {
    return this.getCurrentUser() !== null;
  },

  /**
   * Retrieve all users (for Admin Dashboard)
   */
  getUsers() {
    initUsers();
    try {
      const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS_LIST) || '[]');
      return users.map(({ password, ...safeUser }) => safeUser);
    } catch {
      return INITIAL_USERS;
    }
  },

  /**
   * Forgot password mock request
   */
  async forgotPassword(email) {
    await new Promise((res) => setTimeout(res, 400));
    if (!email || !email.includes('@')) {
      throw new Error('Please enter a valid email address.');
    }
    return {
      message: `Password reset instructions have been dispatched to ${email}. Check your inbox.`,
    };
  },
};
