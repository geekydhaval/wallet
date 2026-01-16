import React, { useState, useEffect } from 'react';
import type { CardData } from '../types';
import { CARD_THEMES } from '../constants';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  // FIX: Removed 'isCustom' from Omit as it is not part of CardData type.
  onSave: (data: Omit<CardData, 'id'>) => void;
  initialData: CardData | null;
}

export const AddEditCardModal: React.FC<ModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  // FIX: Separated theme name from cardholder name in state to avoid property collision.
  // The theme object's 'name' property was overwriting the card's 'name' property.
  const [formData, setFormData] = useState({
    type: '',
    issuer: '',
    number: '',
    name: '',
    emoji: '',
    // FIX: Initialize gradient with the hex color array from the theme, to match CardData type.
    gradient: CARD_THEMES[0].gradient.colors,
    textColor: CARD_THEMES[0].textColor,
    themeName: CARD_THEMES[0].name,
  });

  useEffect(() => {
    if (initialData) {
      // FIX: Correctly find the theme by comparing hex color arrays, as `initialData.gradient` is `string[]`, not an object with `from` and `to` properties.
      const theme = CARD_THEMES.find(t => 
        t.gradient.colors[0] === initialData.gradient[0] && 
        t.gradient.colors[1] === initialData.gradient[1]
      ) || CARD_THEMES[0];
      setFormData({
        type: initialData.type,
        issuer: initialData.issuer,
        number: initialData.number,
        name: initialData.name,
        emoji: initialData.emoji,
        // FIX: Set gradient to the hex color array from the found theme.
        gradient: theme.gradient.colors,
        textColor: theme.textColor,
        themeName: theme.name,
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleThemeChange = (theme: typeof CARD_THEMES[0]) => {
      // FIX: Update only theme-related properties, preserving the cardholder name.
      // Set gradient to the hex color array to match CardData type.
      setFormData(prev => ({
        ...prev,
        gradient: theme.gradient.colors,
        textColor: theme.textColor,
        themeName: theme.name
      }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // FIX: Destructure 'themeName' instead of 'name' to correctly prepare card data for saving.
    // This ensures the cardholder's name is preserved and passed to the onSave function, fixing the error on the following line.
    const {themeName, ...cardDetails} = formData; // Exclude theme name from saved data
    onSave(cardDetails);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
          onClose();
      }
  }

  return (
    <div 
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-[200] p-4"
        onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm">
        <h2 className="text-xl font-bold p-6 border-b">Edit Card</h2>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <input className="w-full p-3 border rounded-lg" type="text" name="type" placeholder="Card Type (e.g., Library Card)" value={formData.type} onChange={handleChange} required />
          <input className="w-full p-3 border rounded-lg" type="text" name="issuer" placeholder="Issuer (e.g., City Library)" value={formData.issuer} onChange={handleChange} required />
          <input className="w-full p-3 border rounded-lg" type="text" name="number" placeholder="Card Number" value={formData.number} onChange={handleChange} />
          <input className="w-full p-3 border rounded-lg" type="text" name="name" placeholder="Name on Card" value={formData.name} onChange={handleChange} required />
          <input className="w-full p-3 border rounded-lg" type="text" name="emoji" placeholder="Emoji (e.g., 💳)" value={formData.emoji} onChange={handleChange} maxLength={2} />
          
          <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
              <div className="flex flex-wrap gap-3">
                  {CARD_THEMES.map(theme => (
                      // FIX: Compare with formData.themeName to correctly highlight the selected theme.
                      <button type="button" key={theme.name} onClick={() => handleThemeChange(theme)} className={`w-8 h-8 rounded-full bg-gradient-to-br ${theme.gradient.from} ${theme.gradient.to} border-2 ${formData.themeName === theme.name ? 'border-blue-500' : 'border-transparent'}`}></button>
                  ))}
              </div>
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 font-semibold">Cancel</button>
            <button type="submit" className="px-6 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};
