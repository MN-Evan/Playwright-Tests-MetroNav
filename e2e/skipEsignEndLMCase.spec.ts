import { test, expect } from '@playwright/test';
import path = require('path');

test('skip esign new case and complete it', async ({ page }) => {
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
  await page1.locator('div').filter({ hasText: /^Select Tenant$/ }).nth(4).click({timeout: 100000});

  await page1.getByRole('combobox', { name: 'Prospect/Existing Tenant' }).fill('wee');
  await page1.getByText('Weekley Homes LLC dba David').click();
  await page1.getByRole('textbox', { name: 'Tenant d/b/a' }).click();
  await page1.getByRole('textbox', { name: 'Tenant d/b/a' }).fill('testing-completing-LM-case-skip-esign');

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
  await page.waitForTimeout(2000);
  await page1.getByRole('spinbutton').first().click();
  await page1.getByRole('spinbutton').first().fill('900');
  await page1.getByRole('spinbutton').nth(1).click();
  await page1.getByRole('spinbutton').nth(1).fill('900');
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
  await page.waitForTimeout(2000);


  await page1.getByTestId('LM-CaseFooterScreenFlowNext-Button').click();
  await page1.getByTestId('LM-CaseFooterSubmit-Button').click();
  await page1.getByRole('button', { name: 'Yes' }).click();
  await page1.getByText('Next Tasks').click();

  await page.waitForTimeout(2000);

	// handle upload for files
  await page1.getByText('Project Overview').click();
  await page1.getByText('Attachments').click();
  await page1.getByTestId('MN-CaseInfo-Collapse').getByRole('button', { name: 'upload Upload Files' }).click();

const firstFileChooserPromise = page1.waitForEvent('filechooser')
await page1.getByRole('button', { name: 'inbox Click or drag file to' }).click();
const firstFileChooser = await firstFileChooserPromise
await firstFileChooser.setFiles([path.resolve('./uploadFiles/Screenshot.png')])

  await page1.locator('[id^="rc_select_"]').nth(0).press('Enter');

 await page1.keyboard.type('Tenant - Financials');
 await page1.keyboard.press('Enter');

	// upload second file
const secondFileChooserPromise = page1.waitForEvent('filechooser')
await page1.getByRole('button', { name: 'inbox Click or drag file to' }).click();
const secondFileChooser = await secondFileChooserPromise
await secondFileChooser.setFiles([path.resolve('./uploadFiles/Screenshot.png')])

  await page1.locator('[id^="rc_select_"]').nth(1).click();

 await page1.keyboard.type('Legal - Leasing Draft');
 await page1.keyboard.press('Enter');


	// upload third file
const thirdFileChooserPromise = page1.waitForEvent('filechooser')
await page1.getByRole('button', { name: 'inbox Click or drag file to' }).click();
const thirdFileChooser = await thirdFileChooserPromise
await thirdFileChooser.setFiles([path.resolve('./uploadFiles/page 49.pdf')])

  await page1.locator('[id^="rc_select_"]').nth(2).click();

 await page1.keyboard.type('Legal - Tenant Executed Version');
 await page1.keyboard.press('Enter');

  await page1.getByTestId('MN-Attach-Button').click();
  await page.waitForTimeout(1000);

// legal upload step
  await page1.getByRole('listitem').filter({ hasText: 'Legal Review of Lease' }).getByTestId('MN-Open-Button').click();
  await page1.getByTestId('LM-CaseFooterSubmit-Button').click();
// next step Review Leasing Approval

  await page1.getByRole('banner').click();
  await page1.getByRole('listitem').filter({ hasText: 'Review Leasing Approval' }).getByTestId('MN-Open-Button').click();
  await page1.getByTestId('LM-CaseFooterSubmit-Button').click();
  await page1.getByRole('listitem').filter({ hasText: 'Review Legal Acceptance and' }).getByTestId('MN-Open-Button').click();
  await page1.getByRole('radio', { name: 'N/A' }).check();
  await page.waitForTimeout(2000);
  await page1.getByTestId('LM-CaseFooterSubmit-Button').click();

  await page1.getByRole('listitem').filter({ hasText: 'Review ROFR Response and' }).getByTestId('MN-Open-Button').click();

  await page1.locator('#budgetApprovedByFinance').getByRole('radio', { name: 'Yes' }).check();
  await page1.locator('#isBalanceSheetAvailable').getByRole('radio', { name: 'Yes' }).check();
  await page1.locator('#financialApprovalOnBalanceSheet').getByRole('radio', { name: 'Yes' }).check();
  await page1.getByTestId('LM-CaseFooterSubmit-Button').click();
  await page1.getByRole('listitem').filter({ hasText: 'Prepare Lease Routing and' }).getByTestId('MN-Open-Button').click();

  await page.waitForTimeout(2000);

	// save in create lease routing sheet step
  await page1.getByTestId('LM-CaseFooterSave-Button').click();

  await page1.getByRole('checkbox', { name: 'Skip E-Signature' }).check();
  await page1.getByRole('radio', { name: 'Yes' }).check();
  await page1.getByRole('textbox', { name: '* Document Title' }).click();
  await page1.getByRole('textbox', { name: '* Document Title' }).fill('test document title');
  await page1.getByRole('textbox', { name: '* Changes From Approved Terms' }).click();
  await page1.getByRole('textbox', { name: '* Changes From Approved Terms' }).fill('insert changes here');
  await page1.getByTestId('LM-CaseFooterSubmit-Button').click();

	// upload final doc and end flow
  await page.waitForTimeout(3000);

  await page1.getByRole('listitem').filter({ hasText: 'Upload Final Signed Lease' }).getByTestId('MN-Open-Button').click();
  await page1.getByRole('radio', { name: 'Yes' }).check();
  await page1.getByRole('button', { name: 'pushpin Pin Document/Email' }).click();
  await page1.getByTestId('MN-AttachmentUpload-Button').click();

	// upload final file
const finalFileChooserPromise = page1.waitForEvent('filechooser')
await page1.getByRole('button', { name: 'inbox Click or drag file to' }).click();
const finalFileChooser = await finalFileChooserPromise
await finalFileChooser.setFiles([path.resolve('./uploadFiles/page 49.pdf')])

  await page1.locator('[id^="rc_select_"]').nth(0).click();

 await page1.keyboard.type('Legal - Fully Executed Lease');
 await page1.keyboard.press('Enter');

  await page1.getByTestId('MN-Attach-Button').click();
  await page.waitForTimeout(1000);


  await page.waitForTimeout(9000);


  await page1.getByTestId('LM-AttachmentChoose-Button').click();

  await page1.getByTestId('LM-IntegrateSignedVTS-Button').click();

  await page1.getByRole('button', { name: 'mail Notify Internal' }).click();
  await page.waitForTimeout(2000);
  await page.waitForTimeout(2000);
  await page1.getByTestId('LM-SendMail-Button').click();

//  await page1.getByTestId('LM-IntegrateSignedVTS-Button').click();

  await page1.getByTestId('LM-CaseFooterSubmit-Button').click();

});
