import { IconType } from 'react-icons';
import { useState } from 'react';
import * as Fi from 'react-icons/fi';
import * as Ai from 'react-icons/ai';
import * as Bs from 'react-icons/bs';
import * as Fa from 'react-icons/fa';
import * as Hi from 'react-icons/hi';

interface IconModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (id: string) => void;
  selectedIcon: string;
}

const modalIcons = [
  // Feather icons
  ...Object.entries(Fi).map(([key, Icon]) => ({
    id: `fi-${key.toLowerCase()}`,
    Icon,
    label: key.replace(/^Fi/, '')
  })),
  // Ant Design icons (commonly used)
  ...Object.entries(Ai).filter((_, i) => i < 100).map(([key, Icon]) => ({
    id: `ai-${key.toLowerCase()}`,
    Icon,
    label: key.replace(/^Ai/, '')
  })),
  // Bootstrap icons (commonly used)
  ...Object.entries(Bs).filter((_, i) => i < 100).map(([key, Icon]) => ({
    id: `bs-${key.toLowerCase()}`,
    Icon,
    label: key.replace(/^Bs/, '')
  })),
  // Font Awesome icons (commonly used)
  ...Object.entries(Fa).filter((_, i) => i < 100).map(([key, Icon]) => ({
    id: `fa-${key.toLowerCase()}`,
    Icon,
    label: key.replace(/^Fa/, '')
  })),
  // Heroicons (commonly used)
  ...Object.entries(Hi).filter((_, i) => i < 100).map(([key, Icon]) => ({
    id: `hi-${key.toLowerCase()}`,
    Icon,
    label: key.replace(/^Hi/, '')
  }))
].filter(({ Icon }) => typeof Icon === 'function');

// Add search functionality to handle large number of icons
export function IconModal({ isOpen, onClose, onSelect, selectedIcon }: IconModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const iconsPerPage = 64;

  const filteredIcons = modalIcons.filter(({ label }) => 
    label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredIcons.length / iconsPerPage);
  const paginatedIcons = filteredIcons.slice(
    (currentPage - 1) * iconsPerPage,
    currentPage * iconsPerPage
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-gray-800  p-6 w-[80vw] h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl text-white font-semibold">Select Icon</h2>
          <button onClick={onClose} className="text-white hover:text-gray-300">✕</button>
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search icons..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full p-2 bg-gray-700 text-white border border-gray-600"
          />
        </div>
        
        <div className="grid grid-cols-8 gap-2 mb-4">
          {paginatedIcons.map(({ id, Icon, label }) => (
            <button
              key={id}
              className={`p-3 flex flex-col items-center  ${
                selectedIcon === id ? 'bg-blue-500' : 'bg-gray-700'
              } hover:bg-blue-400 transition-colors`}
              onClick={() => {
                onSelect(id);
                onClose();
              }}
            >
              <Icon size={24} className="text-white" />
              <span className="mt-1 text-xs text-white truncate w-full text-center">
                {label}
              </span>
            </button>
          ))}
        </div>

        <div className="flex justify-center gap-2">
          {[...Array(pageCount)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1  ${
                currentPage === i + 1 ? 'bg-blue-500' : 'bg-gray-700'
              } text-white`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 