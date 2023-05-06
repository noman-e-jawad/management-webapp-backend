const menu = {
  dashboard: 'dashboard',
  createLead: 'add-lead',
  importLead: 'import-leads',
  viewLeads: 'view-leads',
  viewVerifiedLeads: 'view-verified-leads',
  createStuff: 'create-stuff',
  viewStuffs: 'view-stuff',
  createClient: 'create-client',
  viewClients: 'view-clients',
};

const {
  dashboard,
  createLead,
  importLead,
  viewLeads,
  viewVerifiedLeads,
  createStuff,
  viewStuffs,
  createClient,
  viewClients,
} = menu;

export const adminPermissions = [
  dashboard,
  createLead,
  importLead,
  viewLeads,
  viewVerifiedLeads,
  createStuff,
  viewStuffs,
  createClient,
  viewClients,
];

export const qcPermissions = [dashboard, viewLeads, viewVerifiedLeads];

export const managerPermissions = [
  dashboard,
  createLead,
  importLead,
  viewLeads,
  viewVerifiedLeads,
  createStuff,
  viewStuffs,
  createClient,
  viewClients,
];

export const clientPermissions = [dashboard, viewLeads];
