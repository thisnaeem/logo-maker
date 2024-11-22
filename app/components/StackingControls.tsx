interface StackingControlsProps {
  logoState: {
    stackingOption: 'left' | 'right' | 'top' | 'bottom';
    iconSize: number;
    fontSize: number;
    gap: number;
  };
  setLogoState: (state: any) => void;
}

export function StackingControls({ logoState, setLogoState }: StackingControlsProps) {
  const handleStackingChange = (option: 'left' | 'right' | 'top' | 'bottom') => {
    setLogoState({
      ...logoState,
      stackingOption: option
    });
  };

  return (
    <div className="space-y-4">
      <label className="block mb-2 text-white">Icon Position</label>
      <div className="grid grid-cols-2 gap-2">
        <button
          className={`p-4  ${
            logoState.stackingOption === 'left' ? 'bg-blue-500' : 'bg-gray-700'
          } text-white`}
          onClick={() => handleStackingChange('left')}
        >
          Left
        </button>
        <button
          className={`p-4  ${
            logoState.stackingOption === 'right' ? 'bg-blue-500' : 'bg-gray-700'
          } text-white`}
          onClick={() => handleStackingChange('right')}
        >
          Right
        </button>
        <button
          className={`p-4  ${
            logoState.stackingOption === 'top' ? 'bg-blue-500' : 'bg-gray-700'
          } text-white`}
          onClick={() => handleStackingChange('top')}
        >
          Top
        </button>
        <button
          className={`p-4  ${
            logoState.stackingOption === 'bottom' ? 'bg-blue-500' : 'bg-gray-700'
          } text-white`}
          onClick={() => handleStackingChange('bottom')}
        >
          Bottom
        </button>
      </div>

      <div>
        <label className="block mb-2 text-white">Spacing</label>
        <input
          type="range"
          min="0"
          max="100"
          value={logoState.gap}
          onChange={(e) => setLogoState({ ...logoState, gap: Number(e.target.value) })}
          className="w-full accent-blue-500"
        />
      </div>
    </div>
  );
} 