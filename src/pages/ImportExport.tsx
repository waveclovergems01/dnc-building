// src/components/ImportExport.tsx
import {
  getClass1,
  getClass2,
  getAllSkillLevels,
} from './Memory';
import { useState } from 'react';
import { compressToEncodedURIComponent } from 'lz-string';

export interface ExportedSkillData {
  class1: string;
  class2: string;
  skills: Record<string, Record<string, number>>;
}

function encodeData(data: ExportedSkillData): string {
  const json = JSON.stringify(data);
  return compressToEncodedURIComponent(json);
}

export default function ImportExport() {
  const [url, setUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerateUrl = () => {
    const data: ExportedSkillData = {
      class1: getClass1(),
      class2: getClass2(),
      skills: {},
    };

    const allSkills = getAllSkillLevels();
    Object.entries(allSkills).forEach(([cls, skillMap]) => {
      data.skills[cls] = {};
      Object.entries(skillMap).forEach(([skillId, level]) => {
        if (level > 0) {
          data.skills[cls][skillId] = level;
        }
      });
    });

    const encoded = encodeData(data);
    const fullUrl = `${window.location.origin}${window.location.pathname}?d=${encoded}`;
    setUrl(fullUrl);
    setCopied(false);
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert('ไม่สามารถคัดลอก URL ได้');
    }
  };

  return (
    <div className="space-y-4 text-white">
      <button
        onClick={handleGenerateUrl}
        className="px-4 py-1 bg-blue-600 rounded shadow"
      >
        Generate Share URL
      </button>

      {url && (
        <>
          <textarea
            rows={4}
            className="w-full p-2 bg-black border border-gray-500 text-green-300"
            value={url}
            readOnly
          />
          <button
            onClick={handleCopyUrl}
            className="px-4 py-1 bg-purple-600 rounded shadow"
          >
            {copied ? 'URL Copied!' : 'Copy URL'}
          </button>
        </>
      )}
    </div>
  );
}
