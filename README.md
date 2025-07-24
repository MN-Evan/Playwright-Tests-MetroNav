# Playwright-Tests-MetroNav

## Due to the need of a testing account without 2FA there are lines in the code where you will need to input an account email and password
  - await page.getByRole('textbox', { name: 'Username' }).fill('${your MN email}');
  - await page.getByRole('textbox', { name: 'Password' }).fill('${your password}');
## There is also a section for Tenant Email requesting Esign
  - await page1.getByRole('textbox', { name: '* Email' }).fill('%{tenant email}');

### to run the tests in terminal use these commands
- Headless
```npx playwright test```
- GUI
```npx playwirght test --ui```

.
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

