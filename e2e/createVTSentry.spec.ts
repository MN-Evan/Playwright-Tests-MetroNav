import { test, expect } from '@playwright/test';
import path = require('path');

test('start new VTS entry with LM case', async ({ page }) => {
  test.setTimeout(240000) 
	// sign in to okta
  await page.goto('https://metronational.okta.com/login/agentlessDsso/');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('link', { name: 'Select to get a push' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('');
  await page.getByRole('button', { name: 'Verify' }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'launch app MetroNav - QA' }).click();
  const page1 = await page1Promise;
  await page1.getByTestId('MN-LeaseManagement-Menu').click();
  await page.waitForTimeout(2000);

  	// start new case
  await page1.getByTestId('LM-NewCase-Button').click({timeout: 5000});

  await page1.locator('.ant-select-selector').first().click({ timeout: 100000 });
  await page1.getByText('ARES Group').click();

  await page1.locator('div:nth-child(2) > div > div > .ant-form-item > .ant-row > .ant-col.ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector').first().click({ timeout: 100000 });

  await page1.getByText('Cyndi Reynolds (ARES Group)').click();

  await page1.locator('.ant-select-selection-wrap > .ant-select-selection-search').first().click({ timeout: 100000});
  await page1.getByText('Office').click();
//type in tenant name
  await page1.locator('div').filter({ hasText: /^Select Tenant$/ }).nth(4).click({timeout: 100000});
  await page1.getByRole('combobox', { name: 'Prospect/Existing Tenant' }).fill('wee');
  await page1.getByText('Weekley Homes LLC dba David').click();

  await page1.getByRole('textbox', { name: 'Tenant d/b/a' }).click();
  await page1.getByRole('textbox', { name: 'Tenant d/b/a' }).fill('testing-update-vts-case');

//  await page1.getByTestId('LM-SelectProperty-Select').locator('div').click({timeout: 100000});
//  await page1.getByTitle('10100 Katy Freeway').click();
//  await page1.getByTestId('LM-SelectProperty-Button').click({timeout: 10000});

  await page1.getByTestId('LM-SelectProjectClassification-Select').locator('div').click();
  await page1.getByText('New', { exact: true }).click();
  await page1.getByTestId('LM-SelectProjectClassification-Button').click();
  await page1.getByRole('radio', { name: 'No' }).check();
  await page1.locator('.ant-picker-input').click();
  await page1.getByRole('textbox', { name: '* Anticipated Rent' }).press('Enter');
  await page1.getByRole('textbox', { name: '* Anticipated Rent' }).click();
  await page1.getByRole('textbox', { name: '* Anticipated Rent' }).fill('12/31/2027');
  await page1.getByRole('textbox', { name: '* Anticipated Rent' }).press('Enter');
  await page1.locator('.ant-layout-content > .ant-form > div > div:nth-child(3) > .ant-form-item > .ant-row > .ant-col.ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector').click();
  await page1.getByTitle('TI', { exact: true }).locator('div').click();

	// add suites
  await page1.getByRole('button', { name: 'Add Suite' }).click();
  await page1.locator('.ant-col > .ant-select > .ant-select-selector > .ant-select-selection-wrap > .ant-select-selection-item').click();
  await page1.getByTitle('110').locator('div').click();
  await page1.getByRole('spinbutton').first().click();
  await page1.getByRole('spinbutton').first().fill('900');
  await page1.getByRole('spinbutton').nth(1).click();
  await page1.getByRole('spinbutton').nth(1).fill('900');

  await page1.getByRole('button', { name: 'Add Suite' }).click();
  await page1.locator('.ant-col > .ant-select > .ant-select-selector > .ant-select-selection-wrap > .ant-select-selection-item').last().click();
  await page1.getByTitle('105').locator('div').last().click();
  await page1.getByRole('spinbutton').nth(2).click();
  await page1.getByRole('spinbutton').nth(2).fill('123');
  await page1.getByRole('spinbutton').nth(3).click();
  await page1.getByRole('spinbutton').nth(3).fill('123');



  await page1.getByTestId('LM-AddClassificationDrawer-Button').click();

  await page1.getByTestId('LM-CaseFooterScreenFlowNext-Button').click();
// create vts proposal
  await page1.getByTestId('LM-NewProposal-Button').click();



  await page1.getByRole('tab', { name: 'Term' }).click();
  await page1.getByRole('textbox', { name: '* Term duration' }).click();
  await page1.getByRole('textbox', { name: '* Term duration' }).fill('24');
  await page1.getByRole('textbox', { name: '* Starts (mo)' }).click();
  await page1.getByRole('textbox', { name: '* Starts (mo)' }).fill('1');
  await page1.getByRole('textbox', { name: '* Amount' }).click();
  await page1.getByRole('textbox', { name: '* Amount' }).fill('12');
	
  await page1.getByTestId('LM-ProposalSave-Button').click();

  await page1.getByTestId('LM-UpdateVTS-Button').click();



  await page1.getByTestId('LM-CaseFooterScreenFlowNext-Button').click();
}) 
