export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Lost';
export type OpportunityStage = 'Prospecting' | 'Proposal' | 'Closed-Won' | 'Closed-Lost';

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  source: string;
  score: number;
  status: LeadStatus;
}

export interface Opportunity {
  id: string;
  name: string;
  stage: OpportunityStage;
  amount?: number;
  accountName: string;
}