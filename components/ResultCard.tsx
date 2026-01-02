"use client";

import { Birthday, Coordinates } from "@/lib/coordinates";
import { LocationInfo } from "@/lib/geocoding";
import { formatCoordinates } from "@/lib/coordinates";
import { getLocationImage, getMapImageUrl } from "@/lib/locationImage";
import { useRef, useState, useEffect } from "react";

interface ResultCardProps {
  birthday: Birthday;
  coordinates: Coordinates;
  locationInfo: LocationInfo;
}

export default function ResultCard({ birthday, coordinates, locationInfo }: ResultCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [locationImageUrl, setLocationImageUrl] = useState<string>("");
  const [isClient, setIsClient] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const formattedDate = `${String(birthday.day).padStart(2, '0')}-${String(birthday.month).padStart(2, '0')}-${birthday.year}`;
  const formattedCoords = formatCoordinates(coordinates);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    setIsImageLoading(true);

    getLocationImage(coordinates.latitude, coordinates.longitude, locationInfo.name)
      .then((url) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          setLocationImageUrl(url);
          setIsImageLoading(false);
        };
        img.onerror = () => {
          const mapUrl = getMapImageUrl(coordinates.latitude, coordinates.longitude);
          setLocationImageUrl(mapUrl);
          setIsImageLoading(false);
        };
        img.src = url;
      })
      .catch(() => {
        const mapUrl = getMapImageUrl(coordinates.latitude, coordinates.longitude);
        setLocationImageUrl(mapUrl);
        setIsImageLoading(false);
      });
  }, [coordinates, locationInfo.name, isClient]);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const showNotification = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleDownload = async () => {
    if (!cardRef.current || !isClient || typeof window === 'undefined') return;

    try {
      const html2canvasModule = await import('html2canvas');
      const html2canvas = html2canvasModule.default || html2canvasModule;

      if (!html2canvas) {
        throw new Error('html2canvas not available');
      }

      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
        foreignObjectRendering: false,
      });

      const link = document.createElement('a');
      link.download = `co-date-${formattedDate.replace(/\//g, '-')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      showNotification("Image downloaded successfully!");
    } catch (error) {
      console.error('Error downloading image:', error);
      alert('Failed to download image. Please try again.');
    }
  };

  const handleShare = async () => {
    if (!cardRef.current || !isClient || typeof window === 'undefined') return;

    try {
      const html2canvasModule = await import('html2canvas');
      const html2canvas = html2canvasModule.default || html2canvasModule;

      if (!html2canvas) throw new Error('html2canvas not available');

      await new Promise(resolve => setTimeout(resolve, 1000));

      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
        foreignObjectRendering: false,
      });

      const imageDataUrl = canvas.toDataURL('image/png');
      const blob = await fetch(imageDataUrl).then(r => r.blob());
      const file = new File([blob], `co-date-${formattedDate}.png`, { type: 'image/png' });

      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'My Birthday as coordinates - co-date',
          text: `I discovered my birthday location: ${locationInfo.name}!`
        });
      } else {
        handleCopyToClipboard();
      }
    } catch (error) {
      console.error('Error sharing:', error);
      handleDownload();
    }
  };

  const handleCopyToClipboard = async () => {
    if (!cardRef.current || !isClient) return;
    try {
      const html2canvasModule = await import('html2canvas');
      const html2canvas = html2canvasModule.default || html2canvasModule;
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });
      const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/png'));
      if (blob) {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        showNotification("Image copied! Ready to paste.");
      }
    } catch (e) {
      console.error(e);
      alert("Failed to copy image.");
    }
  }

  const handleShareOnX = async () => {
    await handleCopyToClipboard();

    const text = `Found my birthday coordinates on co-date! 🌍✨ ${locationInfo.name}, ${locationInfo.country || ''}\n\nCheck yours at https://co-date.vercel.app\n\nBuilt by @goelsahhab`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(twitterUrl, '_blank');
  };

  const fallbackMapSvg = `data:image/svg+xml,${encodeURIComponent(`
    <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e5e7eb" stroke-width="1"/>
        </pattern>
      </defs>
      <rect width="800" height="600" fill="#f9fafb"/>
      <rect width="800" height="600" fill="url(#grid)"/>
      <circle cx="400" cy="300" r="16" fill="#ef4444" stroke="#fff" stroke-width="4"/>
    </svg>
  `)}`;

  if (!isClient) {
    return (
      <div className="bg-white border-2 border-gray-900 rounded-3xl overflow-hidden max-w-2xl mx-auto shadow-2xl">
        <div className="w-full h-96 bg-gray-100 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-gray-900"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto relative">
      <div
        className={`fixed top-24 right-4 z-50 transform transition-all duration-300 ${showToast ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
      >
        <div className="bg-gray-900 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">
          <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="font-medium">{toastMessage}</span>
        </div>
      </div>

      <div
        ref={cardRef}
        className="bg-white border-8 border-white rounded-[2rem] overflow-hidden mb-8 shadow-2xl relative"
        style={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
      >
        <div className="w-full h-80 sm:h-96 bg-gray-100 relative overflow-hidden rounded-t-[1.5rem]">
          {isImageLoading ? (
            <div className="w-full h-full flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-gray-900"></div>
            </div>
          ) : locationImageUrl ? (
            <img
              src={locationImageUrl}
              alt={`${locationInfo.name} location`}
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              crossOrigin="anonymous"
              onError={(e) => {
                (e.target as HTMLImageElement).src = fallbackMapSvg;
              }}
            />
          ) : (
            <img
              src={fallbackMapSvg}
              alt="Location map"
              className="w-full h-full object-cover"
            />
          )}
        </div>

        <div className="p-8 sm:p-10">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 mb-8 border-b border-gray-100 pb-8">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Birthday</p>
              <p className="text-3xl font-black text-gray-900 tracking-tight">{formattedDate}</p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Coordinates</p>
              <p className="text-xl font-mono font-medium text-gray-900 break-all bg-gray-50 px-3 py-1 rounded-lg inline-block">{formattedCoords}</p>
            </div>
          </div>

          <div className="mb-8">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Location</p>
            <h3 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4 leading-tight">{locationInfo.name}</h3>
            <p className="text-lg text-gray-500 leading-relaxed font-light">{locationInfo.description}</p>
          </div>

          <div className="flex items-center gap-2 pt-6 border-t border-gray-100">
            <div className="w-6 h-6 bg-gray-900 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-[10px]">CD</span>
            </div>
            <p className="text-sm font-medium text-gray-400">
              co-date.vercel.app
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleCopyToClipboard}
            className="flex-1 px-6 py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-all hover:shadow-lg active:scale-95 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
            Copy Image
          </button>
          <button
            onClick={handleDownload}
            className="flex-1 px-6 py-4 bg-white border-2 border-gray-200 text-gray-900 font-bold rounded-xl hover:border-gray-900 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download
          </button>
          <button
            onClick={handleShare}
            className="flex-1 px-6 py-4 bg-white border-2 border-gray-200 text-gray-900 font-bold rounded-xl hover:border-gray-900 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Share
          </button>
        </div>

        <button
          onClick={handleShareOnX}
          className="w-full px-6 py-4 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-all hover:shadow-xl active:scale-95 flex items-center justify-center gap-3"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          Share on X (Copy & Tweet)
        </button>
      </div>
    </div>
  );
}
