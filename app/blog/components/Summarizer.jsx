'use client'
import React, { useState } from 'react';
import { CgFileDocument } from "react-icons/cg";

const Summarizer = ({ blogDescription }) => {
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);

    const stripHtml = (html) => {
        if (!html) return '';
        const div = document.createElement('div');
        div.innerHTML = html;
        return div.textContent || div.innerText || '';
    };

    const fetchSummary = async () => {
        setLoading(true);

        const stripHtml = (html) => {
            if (!html) return '';
            const div = document.createElement('div');
            div.innerHTML = html;
            return div.textContent || div.innerText || '';
        };

        const getFirstWords = (text, wordLimit = 280) => {
            return text.split(/\s+/).slice(0, wordLimit).join(' ');
        };

        const plainText = getFirstWords(stripHtml(blogDescription), 280); // ✅ Trim to 280 words
        
        try {
            const res = await fetch('/api/blog/summarize', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ description: plainText }),
            });

            const data = await res.json();

            if (res.ok) {
                setSummary(data.summary);
            } else {
                setSummary('Error: ' + data.error);
            }
        } catch (error) {
            setSummary('Something went wrong.');
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <div className='w-full flex justify-end'>
                <button
                    onClick={fetchSummary}
                    disabled={loading || !!summary} // ⬅️ Disable if loading OR summary already exists
                    className={`mt-2 mb-2 px-4 py-2 font-semibold border border-blue-500 rounded flex gap-2 items-center transition-all duration-300 ${loading || summary ? 'bg-blue-500 text-white opacity-50 cursor-not-allowed' : 'text-blue-500 hover:text-white hover:bg-blue-500'}`}
                >
                    {loading ? (
                        <>
                            Thinking...
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        </>
                    ) : (
                        <>
                            Summarize
                            <CgFileDocument className="text-lg" />
                        </>
                    )}
                </button>
            </div>

            {(loading || summary) && (
                <div className={`p-4 rounded border border-blue-500`}>

                    {/* response skelaton loader */}
                    {loading && (
                        <div className='flex flex-col gap-2'>
                            <div className='h-4 w-full rounded-xl skeleton2'></div>
                            <div className='h-4 w-full rounded-xl skeleton2'></div>
                            <div className='h-4 w-full rounded-xl skeleton2'></div>
                            <div className='h-4 w-full rounded-xl skeleton2'></div>
                            <div className='h-4 w-[50%] rounded-xl skeleton2'></div>
                        </div>
                    )}

                    {!loading && summary && (
                        <p className="md:text-xl text-zinc-600 whitespace-pre-line">{summary}</p>
                    )}
                </div>
            )}
        </>
    );
};

export default Summarizer;
