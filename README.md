# Playwright-Tests-MetroNav


1. createVTSentry.spec.ts
  - starts a new LM case
  - adds a tenant, address, suite, and Proposal
  - submits details to VTS
2. endTiCase.spec.ts
  - starts a new LM case
  - progresses to the point of creating a TI case
  - opens global chat to cycle through and message each recipient group
  - opens TI case to repeat Global Chat from the TI side
  - opens TI case to claim the first Workflow step and continue progress to the end of the TI flow
3. skipEsignEndLMCase.spec.ts
  - starts a new LM case
  - uploads required documents and file types to complete the workflow
  - progresses to the end of the LM case by skipping the Esign functionality
4. startEsignLmCase.spec.ts
  - starts a new LM case
  - uploads required documents and file types to complete the workflow
  - Reaches the point of E-sign and sends an email to the tenant

