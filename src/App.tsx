import { useState, useEffect, useMemo } from 'react';
import type { Lead, LeadStatus, Opportunity } from './types';
import leadsData from './data/leads.json';
import { LeadsTable } from './components/LeadsTable';
import { LeadDetailPanel } from './components/LeadDetailPanel';
import { OpportunitiesTable } from './components/OpportunitiesTable';
import { AddLeadModal } from './components/AddLeadModal';

function App() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'All'>('All');

  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);

  useEffect(() => {
    try {
      setLeads(leadsData as Lead[]);
    } catch (err) {
      setError("Failed to load leads data.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleUpdateLead = (updatedLead: Lead) => {
    setLeads(leads.map(lead => lead.id === updatedLead.id ? updatedLead : lead));
    setSelectedLead(null);
  };

  const handleConvertToOpportunity = (leadToConvert: Lead) => {
    const newOpportunity: Opportunity = {
      id: `opp-${Date.now()}`,
      name: `${leadToConvert.name}'s Opportunity`,
      accountName: leadToConvert.company,
      stage: 'Prospecting',
    };

    setOpportunities([...opportunities, newOpportunity]);
    setLeads(leads.filter(lead => lead.id !== leadToConvert.id));
    setSelectedLead(null);
  };

  const displayedLeads = useMemo(() => {
    console.log('Recalculando a lista de leads...');
    return leads
      .filter(lead => statusFilter === 'All' || lead.status === statusFilter)
      .filter(lead =>
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.company.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => b.score - a.score);
  }, [leads, statusFilter, searchTerm]);

  const handleAddLead = (leadData: Omit<Lead, 'id'>) => {
    const newLead: Lead = {
      ...leadData,
      id: `lead-${Date.now()}-${Math.random()}`,
    };

    setLeads([newLead, ...leads]);
    setIsAddLeadModalOpen(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-gray-900">Mini Seller Console</h1>
          <button
            onClick={() => setIsAddLeadModalOpen(true)}
            className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Add Lead
          </button>
        </div>
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Search by name or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="md:col-span-2 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as LeadStatus | 'All')}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="All">All Statuses</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Lost">Lost</option>
          </select>
        </div>

        {isLoading && <p className="text-center text-gray-500">Loading leads...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!isLoading && !error && (
          <>
            {displayedLeads.length > 0 ? (
              <LeadsTable leads={displayedLeads} onSelectLead={setSelectedLead} />
            ) : (
              <p className="text-center text-gray-500 bg-white p-6 rounded-md shadow">No leads found.</p>
            )}
            <OpportunitiesTable opportunities={opportunities} />
          </>
        )}

      </main>

      <LeadDetailPanel
        lead={selectedLead}
        onClose={() => setSelectedLead(null)}
        onSave={handleUpdateLead}
        onConvert={handleConvertToOpportunity}
      />
      <AddLeadModal
        isOpen={isAddLeadModalOpen}
        onClose={() => setIsAddLeadModalOpen(false)}
        onAddLead={handleAddLead}
      />
    </div>
  );
}

export default App;