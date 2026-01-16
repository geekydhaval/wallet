
export interface CardData {
  id: number;
  type: string;
  issuer: string;
  number: string;
  name: string;
  emoji: string;
  gradient: string[]; // Array of hex color strings
  textColor: string; // Hex color string
}
