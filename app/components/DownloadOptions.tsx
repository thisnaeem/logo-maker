import html2canvas from 'html2canvas';

interface DownloadOptionsProps {
  canvasRef: React.RefObject<HTMLDivElement>;
}

export function DownloadOptions({ canvasRef }: DownloadOptionsProps) {
  const handleDownload = async (format: 'svg' | 'png' | 'jpg') => {
    if (!canvasRef.current) return;
    
    const contentElement = canvasRef.current.querySelector('div[style*="padding"]');
    if (!contentElement) return;

    if (format === 'svg') {
      // Get the icon and text elements
      const iconElement = contentElement.querySelector('[data-icon]');
      const textElement = contentElement.querySelector('[data-text]');
      
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
    <div className="flex mt-4 gap-2">
      <button
        onClick={() => handleDownload('png')}
        className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600"
      >
        Download PNG
      </button>
      <button
        onClick={() => handleDownload('jpg')}
        className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600"
      >
        Download JPG
      </button>
      <button
        onClick={() => handleDownload('svg')}
        className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600"
      >
        Download SVG
      </button>
    </div>
  );
} 