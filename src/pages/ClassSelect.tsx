import { useState, useEffect } from 'react';

interface ClassOption {
  jobId: number;
  jobName: string;
}

interface Props {
  onSelect: (jobName: string) => void;
  label: string;
  disabled?: boolean;
  resetTrigger?: boolean;
  options: ClassOption[];
}

export default function ClassSelect({ onSelect, label, disabled = false, resetTrigger, options }: Props) {
  const [selected, setSelected] = useState('');

  useEffect(() => {
    setSelected('');
  }, [resetTrigger]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelected(value);
    onSelect(value);
  };

  return (
    <div className="relative inline-block w-48">
      <label className="block text-sm text-white mb-1">{label}</label>
      <select
        value={selected}
        onChange={handleChange}
        disabled={disabled}
        className={`block w-full px-4 text-sm border shadow-sm appearance-none focus:outline-none
          ${disabled ? 'bg-gray-200 text-gray-500' : 'bg-white text-gray-800 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'}`}
      >
        <option value="">-- เลือก {label} --</option>
        {options.map((cls) => (
          <option key={cls.jobId} value={cls.jobName}>
            {cls.jobName}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg className="w-4 h-4 text-gray-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 12a1 1 0 01-.707-.293l-4-4a1 1 0 011.414-1.414L10 9.586l3.293-3.293a1 1 0 111.414 1.414l-4 4A1 1 0 0110 12z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  );
}
