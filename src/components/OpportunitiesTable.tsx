import { useState, useMemo, useEffect } from 'react';
import type { Opportunity } from '../types';

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
  opportunities: Opportunity[];
}

function Table({ opportunities }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stage</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {opportunities.map((op) => (
            <tr key={op.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{op.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{op.accountName}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  {op.stage}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface OpportunitiesTableProps {
  opportunities: Opportunity[];
}

export function OpportunitiesTable({ opportunities }: OpportunitiesTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  const paginatedOpportunities = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return opportunities.slice(startIndex, endIndex);
  }, [opportunities, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [opportunities]);

  if (opportunities.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Opportunities</h2>
      <Table opportunities={paginatedOpportunities} />
      <Pagination
        currentPage={currentPage}
        totalItems={opportunities.length}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}