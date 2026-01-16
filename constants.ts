
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

// FIX: Added missing CARD_THEMES export to be consumed by AddEditCardModal.
export const CARD_THEMES = [
  {
    name: 'Green',
    gradient: { colors: ['#4ade80', '#14b8a6'], from: 'from-green-400', to: 'to-teal-500' },
    textColor: '#FFFFFF',
  },
  {
    name: 'Blue',
    gradient: { colors: ['#60a5fa', '#6366f1'], from: 'from-blue-400', to: 'to-indigo-500' },
    textColor: '#FFFFFF',
  },
  {
    name: 'Orange',
    gradient: { colors: ['#fb923c', '#eab308'], from: 'from-orange-400', to: 'to-yellow-500' },
    textColor: '#000000',
  },
  {
    name: 'Purple',
    gradient: { colors: ['#a855f7', '#2563eb'], from: 'from-purple-500', to: 'to-blue-600' },
    textColor: '#FFFFFF',
  },
  {
    name: 'Gray',
    gradient: { colors: ['#374151', '#000000'], from: 'from-gray-700', to: 'to-black' },
    textColor: '#FFFFFF',
  },
  {
    name: 'Red',
    gradient: { colors: ['#ef4444', '#b91c1c'], from: 'from-red-500', to: 'to-red-700' },
    textColor: '#FFFFFF',
  },
];
