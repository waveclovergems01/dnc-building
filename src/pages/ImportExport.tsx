// src/components/ImportExport.tsx
import {
  getClass1,
  getClass2,
  setClass1,
  setClass2,
  setSkillLevel,
  getAllSkillLevels
} from './Memory';
import { useState } from 'react';
import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string';

interface ExportedSkillData {
  class1: string;
  class2: string;
  skills: Record<string, Record<string, number>>;
}

export default function ImportExport() {
  const [importText, setImportText] = useState('');
  const [exportText, setExportText] = useState('');
  const [copied, setCopied] = useState(false);

  const encodeData = (data: ExportedSkillData): string => {
    const json = JSON.stringify(data);
    return compressToEncodedURIComponent(json);
  };

  const decodeData = (encoded: string): ExportedSkillData | null => {
    try {
      const json = decompressFromEncodedURIComponent(encoded);
      return JSON.parse(json || '{}') as ExportedSkillData;
    } catch {
      return null;
    }
  };

  const handleExport = () => {
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
    setExportText(encoded);
    setCopied(false);
  };

  const handleImport = () => {
    try {
      const parsed = decodeData(importText);
      if (!parsed) throw new Error();

      setClass1(parsed.class1 || '');
      setClass2(parsed.class2 || '');

      if (parsed.skills) {
        Object.entries(parsed.skills).forEach(([cls, skillMap]) => {
          Object.entries(skillMap).forEach(([id, level]) => {
            setSkillLevel(cls, id, level);
          });
        });
      }

      alert('นำเข้าสำเร็จจากรหัสที่ถูกเข้ารหัสแล้ว');
    } catch {
      alert('ไม่สามารถถอดรหัสข้อมูลได้');
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(exportText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert('ไม่สามารถคัดลอกได้');
    }
  };

  return (
    <div className="space-y-4 text-white">
      <div className="flex gap-2">
        <button onClick={handleExport} className="px-4 py-1 bg-blue-600 rounded shadow">
          Export Encoded
        </button>
        <button
          onClick={handleCopy}
          disabled={!exportText}
          className="px-4 py-1 bg-emerald-600 rounded shadow disabled:opacity-50"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      <textarea
        rows={6}
        className="w-full p-2 bg-black border border-gray-500 text-green-300"
        value={exportText}
        readOnly
      />

      <textarea
        rows={6}
        className="w-full p-2 bg-gray-900 border border-gray-500"
        value={importText}
        onChange={(e) => setImportText(e.target.value)}
        placeholder="วางรหัสที่ถูกเข้ารหัสไว้ที่นี่"
      />

      <button onClick={handleImport} className="px-4 py-1 bg-green-600 rounded shadow">
        Import Encoded
      </button>
    </div>
  );
}
