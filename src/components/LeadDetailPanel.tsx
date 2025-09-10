import { useState, useEffect, type ChangeEvent, type FormEvent } from 'react';
import type { Lead, LeadStatus } from '../types';

interface Props {
  lead: Lead | null;
  onClose: () => void;
  onSave: (updatedLead: Lead) => void;
  onConvert: (leadToConvert: Lead) => void;
}

const statusOptions: LeadStatus[] = ['New', 'Contacted', 'Qualified', 'Lost'];

export function LeadDetailPanel({ lead, onClose, onSave, onConvert }: Props) {
  const [formData, setFormData] = useState<Lead | null>(lead);
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    setFormData(lead);
    setEmailError('');
  }, [lead]);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!formData) return;
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'email') {
      if (!validateEmail(value)) {
        setEmailError('Please enter a valid email address.');
      } else {
        setEmailError('');
      }
    }
  };

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    if (formData && validateEmail(formData.email)) {
      onSave(formData);
    } else {
      setEmailError('Cannot save with an invalid email.');
    }
  };
  
  const handleConvert = () => {
    if (formData) {
        onConvert(formData);
    }
  };

  if (!lead) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 z-40"
        onClick={onClose}
      ></div>

      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${lead ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Lead Details</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800">&times;</button>
          </div>

          <form onSubmit={handleSave} className="flex-grow">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <p id="name" className="mt-1 p-2 w-full text-gray-500">{formData?.name}</p>
            </div>
            <div className="mb-4">
              <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company</label>
              <p id="company" className="mt-1 p-2 w-full text-gray-500">{formData?.company}</p>
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData?.email || ''}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
              <select
                id="status"
                name="status"
                value={formData?.status || ''}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                {statusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
          </form>

          <div className="mt-auto pt-6 border-t border-gray-200 flex flex-col space-y-3">
             <button
              onClick={handleConvert}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Convert Lead
            </button>
            <div className='flex space-x-3'>
              <button onClick={onClose} className="flex-1 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleSave}
                disabled={!!emailError}
                className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}