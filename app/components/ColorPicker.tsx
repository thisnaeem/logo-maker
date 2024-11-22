import { HexColorPicker } from 'react-colorful';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  showPicker: boolean;
  onToggle: () => void;
}

export function ColorPicker({ color, onChange, showPicker, onToggle }: ColorPickerProps) {
  return (
    <div className="flex flex-col gap-2">
      <div 
        className="w-full h-10 cursor-pointer border border-gray-600"
        style={{ backgroundColor: color }}
        onClick={onToggle}
      />
      {showPicker && (
        <div className="absolute z-10 -translate-y-[280px]">
          <HexColorPicker
            color={color}
            onChange={onChange}
          />
        </div>
      )}
      <input
        type="text"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border bg-gray-700 text-white border-gray-600"
      />
    </div>
  );
} 