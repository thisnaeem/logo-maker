import { HexColorPicker } from 'react-colorful';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  showPicker: boolean;
  onToggle: () => void;
}

export function ColorPicker({ color, onChange, showPicker, onToggle }: ColorPickerProps) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="w-full p-2 flex items-center gap-2 bg-gray-700 border border-gray-600 rounded"
      >
        <div 
          className="w-6 h-6 rounded border border-gray-600" 
          style={{ backgroundColor: color }}
        />
        <span className="text-white">{color}</span>
      </button>
      
      {showPicker && (
        <div className="absolute z-50 mt-2">
          <div
            className="fixed inset-0"
            onClick={onToggle}
          />
          <HexColorPicker
            color={color}
            onChange={onChange}
            style={{ 
              position: 'relative',
              zIndex: 51
            }}
          />
        </div>
      )}
    </div>
  );
} 