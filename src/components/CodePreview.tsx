import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Copy } from 'lucide-react';

interface CodePreviewProps {
  code: string;
  language: string;
}

export function CodePreview({ code, language }: CodePreviewProps) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="relative">
      <button
        onClick={copyToClipboard}
        className="absolute top-4 right-4 p-2 rounded-md bg-gray-800 hover:bg-gray-700 transition-colors"
        title="Copy to clipboard"
      >
        <Copy className="w-4 h-4 text-gray-300" />
      </button>
      <SyntaxHighlighter
        language={language}
        style={vs2015}
        customStyle={{
          padding: '1.5rem',
          borderRadius: '0.5rem',
          fontSize: '0.875rem',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}