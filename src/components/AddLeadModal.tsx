import { useState, type FormEvent } from 'react';
import type { Lead, LeadStatus } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAddLead: (leadData: Omit<Lead, 'id'>) => void; 
}

const statusOptions: LeadStatus[] = ['New', 'Contacted', 'Qualified', 'Lost'];
const initialFormState: Omit<Lead, 'id'> = {
    name: '',
    company: '',
    email: '',
    source: 'Website',
    score: 50,
    status: 'New'
};

export function AddLeadModal({ isOpen, onClose, onAddLead }: Props) {
  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.company || !formData.email) {
      alert('Por favor, preencha os campos obrigatórios.');
      return;
    }
    onAddLead(formData);
    setFormData(initialFormState);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Lead</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" required/>
            </div>
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company</label>
              <input type="text" name="company" id="company" value={formData.company} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" required/>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" required/>
            </div>
             <div>
              <label htmlFor="score" className="block text-sm font-medium text-gray-700">Score ({formData.score})</label>
              <input type="range" min="0" max="100" name="score" id="score" value={formData.score} onChange={handleChange} className="mt-1 block w-full"/>
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
              <select name="status" id="status" value={formData.status} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3">
                {statusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
              Cancel
            </button>
            <button type="submit" className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">
              Save Lead
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}