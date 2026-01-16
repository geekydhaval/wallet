import type { CardData } from './types';

export const INITIAL_CARDS: CardData[] = [
  {
    id: 1,
    type: 'Aadhar Card',
    issuer: 'UIDAI',
    number: 'XXXX XXXX 1234',
    name: 'Citizen Name',
    emoji: '🆔',
    gradient: ['#4ade80', '#14b8a6'],
    textColor: '#FFFFFF',
  },
  {
    id: 2,
    type: 'PAN Card',
    issuer: 'Income Tax Dept.',
    number: 'ABCDE1234F',
    name: 'Citizen Name',
    emoji: '💳',
    gradient: ['#60a5fa', '#6366f1'],
    textColor: '#FFFFFF',
  },
  {
    id: 3,
    type: 'Driver\'s License',
    issuer: 'Transport Dept.',
    number: 'DL-XX-YYYY-ZZZZZZZ',
    name: 'Citizen Name',
    emoji: '🚗',
    gradient: ['#fb923c', '#eab308'],
    textColor: '#000000',
  },
  {
    id: 4,
    type: 'Passport',
    issuer: 'Govt. of India',
    number: 'X1234567',
    name: 'Citizen Name',
    emoji: '🛂',
    gradient: ['#a855f7', '#2563eb'],
    textColor: '#FFFFFF',
  },
  {
    id: 5,
    type: 'Voter ID',
    issuer: 'Election Commission',
    number: 'XYZ1234567',
    name: 'Citizen Name',
    emoji: '🗳️',
    gradient: ['#374151', '#000000'],
    textColor: '#FFFFFF',
  },
  {
    id: 6,
    type: 'RC Book',
    issuer: 'Transport Dept.',
    number: 'MH XX XX 1234',
    name: 'Citizen Name',
    emoji: '🏍️',
    gradient: ['#ef4444', '#b91c1c'],
    textColor: '#FFFFFF',
  },
];

// FIX: Define and export CARD_THEMES for the AddEditCardModal component.
// This provides a set of predefined themes with TailwindCSS classes for the UI
// and hex color arrays for the card data.
export const CARD_THEMES = [
  { name: 'Green', gradient: { from: 'from-green-400', to: 'to-teal-500', colors: ['#4ade80', '#14b8a6'] }, textColor: '#FFFFFF' },
  { name: 'Blue', gradient: { from: 'from-blue-400', to: 'to-indigo-500', colors: ['#60a5fa', '#6366f1'] }, textColor: '#FFFFFF' },
  { name: 'Orange', gradient: { from: 'from-orange-400', to: 'to-yellow-500', colors: ['#fb923c', '#eab308'] }, textColor: '#000000' },
  { name: 'Purple', gradient: { from: 'from-purple-500', to: 'to-blue-600', colors: ['#a855f7', '#2563eb'] }, textColor: '#FFFFFF' },
  { name: 'Dark', gradient: { from: 'from-gray-700', to: 'to-black', colors: ['#374151', '#000000'] }, textColor: '#FFFFFF' },
  { name: 'Red', gradient: { from: 'from-red-500', to: 'to-red-800', colors: ['#ef4444', '#b91c1c'] }, textColor: '#FFFFFF' },
  { name: 'Pink', gradient: { from: 'from-pink-500', to: 'to-rose-500', colors: ['#ec4899', '#f43f5e'] }, textColor: '#FFFFFF' },
  { name: 'Sky', gradient: { from: 'from-sky-400', to: 'to-cyan-300', colors: ['#38bdf8', '#67e8f9'] }, textColor: '#000000' },
];
