import { useState, useRef, useEffect } from 'react';
import { RiRobot3Line } from "react-icons/ri";

const AiAssistMenu = ({ title, content, setTitle, setContent, setKeywords }) => {
  const isDisabled = !title.trim();
  const [open, setOpen] = useState(false);
  const [loadingType, setLoadingType] = useState('');
  const menuRef = useRef(null);

  const handleAction = async (type) => {
    setOpen(false);
    setLoadingType(type);

    try {
      const res = await fetch('/api/blog/ai-assist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type, title, content }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'AI error');

      if (type === 'enhanceTitle') setTitle(data.title);
      if (type === 'generateContent') setContent(data.content);
      if (type === 'suggestKeywords') setKeywords(data.keywords);
    } catch (err) {
      console.error('AI Assist failed:', err);
    } finally {
      setLoadingType('');
    }
  };

  // 🔻 Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        disabled={isDisabled || loadingType}
        className="cursor-pointer px-4 py-3 bg-white border border-gray-200 rounded-lg hover:ring-2 hover:ring-blue-600 transition font-semibold text-zinc-600 flex gap-2 items-center disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loadingType ? (
          <>
            <span>Thinking...</span>
            <span className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></span>
          </>
        ) : (
          <>
            <span>AI Assist</span>
            <RiRobot3Line className="text-lg" />
          </>
        )}
      </button>

      {open && (
        <div className="absolute right-1 mt-2 w-56 shadow-lg bg-white rounded-lg ring-1 ring-black ring-opacity-5 z-10">
          <ul className="py-1 text-sm text-gray-700">
            <li>
              <button
                onClick={() => handleAction('enhanceTitle')}
                className="w-full text-left px-4 py-3 hover:bg-blue-50"
              >
                {loadingType === 'enhanceTitle' ? 'Enhancing...' : '✨ Enhance Title'}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleAction('generateContent')}
                className="w-full text-left px-4 py-3 hover:bg-blue-50"
              >
                {loadingType === 'generateContent' ? 'Generating...' : '🪄 Generate Content'}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleAction('suggestKeywords')}
                className="w-full text-left px-4 py-3 hover:bg-blue-50"
              >
                {loadingType === 'suggestKeywords' ? 'Suggesting...' : '🔑 Suggest Keywords'}
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default AiAssistMenu;
