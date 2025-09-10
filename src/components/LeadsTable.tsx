import { useState, useMemo, useEffect } from 'react';
import type { Lead } from '../types';

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

function Pagination({ currentPage, totalItems, itemsPerPage, onPageChange }: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-between mt-4 px-1">
      <p className="text-sm text-gray-700">
        Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium">{Math.min(currentPage * itemsPerPage, totalItems)}</span> of <span className="font-medium">{totalItems}</span> results
      </p>
      <div className="flex space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
}

interface TableProps {
  leads: Lead[];
  onSelectLead: (lead: Lead) => void;
}

function Table({ leads, onSelectLead }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {leads.map((lead) => (
            <tr key={lead.id} onClick={() => onSelectLead(lead)} className="hover:bg-gray-100 cursor-pointer">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                <div className="text-sm text-gray-500">{lead.email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{lead.company}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                  {lead.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-bold">{lead.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface LeadsTableProps {
  leads: Lead[];
  onSelectLead: (lead: Lead) => void;
}

export function LeadsTable({ leads, onSelectLead }: LeadsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const paginatedLeads = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return leads.slice(startIndex, endIndex);
  }, [leads, currentPage]);
  
  useEffect(() => {
    setCurrentPage(1);
  }, [leads]);

  return (
    <div>
      <Table leads={paginatedLeads} onSelectLead={onSelectLead} />
      <Pagination
        currentPage={currentPage}
        totalItems={leads.length}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}