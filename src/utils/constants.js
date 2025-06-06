// src/utils/constants.js

export const APP_NAME = 'CourseOS';
export const APP_SUBTITLE = 'Framer Template';

export const ROUTES = {
  HOME: '/',
  LESSON: '/lesson/:id',
  MODULE: '/module/:id',
  ADMIN: '/admin',
  LOGIN: '/login'
};

export const LESSON_STATUS = {
  NOT_STARTED: 'not_started',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed'
};

export const RESOURCE_TYPES = {
  LINK: 'link',
  DOWNLOAD: 'download',
  EXTERNAL: 'external'
};

export const VIDEO_PROVIDERS = {
  YOUTUBE: 'youtube',
  VIMEO: 'vimeo',
  CUSTOM: 'custom'
};

export const MODULE_ICONS = {
  1: '✓',
  2: '⚡',
  3: '🎨',
  4: '📊',
  5: '🚀',
  6: '💡',
  7: '📚',
  8: '🎯'
};

export const SIDEBAR_SECTIONS = {
  MODULES: 'MODULAR',
  LINKS: 'LINKS',
  ACCOUNT: 'ACCOUNT'
};

export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};