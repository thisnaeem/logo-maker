import html2canvas from 'html2canvas';

interface DownloadOptionsProps {
  canvasRef: React.RefObject<HTMLDivElement>;
}

export function DownloadOptions({ canvasRef }: DownloadOptionsProps) {
  const handleDownload = async (format: 'svg' | 'png' | 'jpg') => {
    if (!canvasRef.current) return;
    
    const contentElement = canvasRef.current?.querySelector('div[style]') as HTMLDivElement;
    if (!contentElement) return;

    if (format === 'svg') {
      // Get the icon and text elements
      const iconElement = contentElement.querySelector('[data-icon]') as HTMLDivElement;
      const textElement = contentElement.querySelector('[data-text]') as HTMLDivElement;
      
      const svgData = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${contentElement.offsetWidth}" height="${contentElement.offsetHeight}">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=${textElement?.style.fontFamily.replace(/ /g, '+')}');
            .logo-container { 
              padding: 30px 20px;
              background-color: ${contentElement.style.backgroundColor};
              border-radius: ${contentElement.style.borderRadius};
              display: flex;
              align-items: center;
              gap: 10px;
            }
            .icon { 
              width: ${iconElement?.style.width};
              height: ${iconElement?.style.height};
              color: ${iconElement?.getAttribute('color')};
            }
            .text {
              font-family: ${textElement?.style.fontFamily};
              font-size: ${textElement?.style.fontSize};
              color: ${textElement?.style.color};
            }
          </style>
          <foreignObject width="100%" height="100%">
            <div xmlns="http://www.w3.org/1999/xhtml" class="logo-container">
              ${iconElement?.outerHTML || ''}
              <div class="text">${textElement?.textContent || ''}</div>
            </div>
          </foreignObject>
        </svg>`.trim();

      const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'logo.svg';
      link.click();
      URL.revokeObjectURL(url);
      return;
    } else {
      // Handle PNG and JPG exports
      const canvas = await html2canvas(contentElement as HTMLElement, {
        backgroundColor: format === 'jpg' ? '#FFFFFF' : null,
        scale: 2,
        useCORS: true,
        allowTaint: true,
        removeContainer: true
      });

      const link = document.createElement('a');
      link.download = `logo.${format}`;
      
      if (format === 'png') {
        // For PNG, preserve transparency
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.globalCompositeOperation = 'destination-over';
        }
      }
      
      link.href = canvas.toDataURL(`image/${format === 'jpg' ? 'jpeg' : 'png'}`);
      link.click();
    }
  };

  return (
    <div className="flex gap-3">
      {[
        { format: 'png', label: 'Download PNG' },
        { format: 'jpg', label: 'Download JPG' },
        { format: 'svg', label: 'Download SVG' }
      ].map(({ format, label }) => (
        <button
          key={format}
          onClick={() => handleDownload(format as 'png' | 'jpg' | 'svg')}
          className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 
                   text-white rounded-lg transition-all duration-200 transform hover:scale-105
                   shadow-lg hover:shadow-blue-500/50 active:scale-95"
        >
          <span className="mr-2">
            {format === 'png' && '🖼️'}
            {format === 'jpg' && '📸'}
            {format === 'svg' && '⚡'}
          </span>
          {label}
        </button>
      ))}
    </div>
  );
} 