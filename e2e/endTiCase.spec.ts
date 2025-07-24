import { test, expect } from '@playwright/test';
import path = require('path');

test('end to end TI case', async ({ page }) => {
  test.setTimeout(1000000) 
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

  await page1.getByText('Alliant Insurance Services,').click();
  await page1.getByRole('textbox', { name: 'Tenant d/b/a' }).click();
  await page1.getByRole('textbox', { name: 'Tenant d/b/a' }).fill('test-end-2-end-ti-case');

// add classification

  await page1.getByTestId('LM-SelectProjectClassification-Select').locator('div').click();
  await page1.getByText('New', { exact: true }).click();
  await page1.getByTestId('LM-SelectProjectClassification-Button').click();
  await page1.getByRole('radio', { name: 'Yes' }).check();
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
  await page1.getByTestId('LM-AddClassificationDrawer-Button').click();

  await page1.getByTestId('LM-CaseFooterScreenFlowNext-Button').click();

  await page1.getByTestId('LM-CaseFooterScreenFlowNext-Button').click();
  await page1.getByTestId('LM-CaseFooterSubmit-Button').click();
  await page1.getByRole('button', { name: 'Yes' }).click();
  await page1.getByText('Next Tasks').click();

  await page.waitForTimeout(2000);


// commenting to each team from LM case
  await page1.getByRole('main').getByRole('button').filter({ hasText: /^$/ }).click();

  await page1.locator('#updatesFor').nth(1).click();
  await page.waitForTimeout(2000);
  await page1.getByText('ALL').click();
  await page1.getByRole('textbox', { name: 'Enter your comments here' }).nth(1).click();
  await page1.getByRole('textbox', { name: 'Enter your comments here' }).nth(1).fill('Test message for All');
	
  await page1.getByRole('button', { name: 'arrow-up' }).nth(1).click();
  await page1.locator('#updatesFor').nth(1).click();
  await page.waitForTimeout(2000);
  await page1.getByText('Legal Team').click();
  await page1.getByRole('textbox', { name: 'Enter your comments here' }).nth(1).click();
  await page1.getByRole('textbox', { name: 'Enter your comments here' }).nth(1).fill('Test message for Legal');

  await page1.getByText('Test message for Legal').click();
  await page1.getByRole('button', { name: 'arrow-up' }).nth(1).click();
  await page1.locator('#updatesFor').nth(1).click();
  await page.waitForTimeout(2000);
  await page1.getByText('Leasing Team').click();
  await page1.getByRole('textbox', { name: 'Enter your comments here' }).nth(1).click();
  await page1.getByRole('textbox', { name: 'Enter your comments here' }).nth(1).fill('test message for Leasing');

  await page1.getByRole('button', { name: 'arrow-up' }).nth(1).click();
  await page1.locator('#updatesFor').nth(1).click();
  await page1.getByText('TI Team').click();
  await page.waitForTimeout(2000);
  await page1.locator('.ant-select-selection-overflow').click();
  await page1.locator('#caseId').press('Enter');
  await page1.getByRole('textbox', { name: 'Enter your comments here' }).nth(1).click();
  await page1.getByRole('textbox', { name: 'Enter your comments here' }).nth(1).fill('test message for TI');

  await page1.getByRole('button', { name: 'arrow-up' }).nth(1).click();
// reply to TI comment just made
  await page1.locator('div').filter({ hasText: /^\( TI Team \)Reply$/ }).getByRole('button').click();
  await page1.getByRole('dialog').filter({ hasText: /^Updates for:/ }).getByPlaceholder('Enter your comments here').last().click();
  await page1.getByRole('dialog').filter({ hasText: /^Updates for:/ }).getByPlaceholder('Enter your comments here').last().fill('reply to TI');

  await page1.getByRole('button', { name: 'arrow-up' }).nth(1).click();
// create update for accouting
  await page1.locator('#updatesFor').nth(1).click();
  await page1.getByText('Accounting Team').click();
  await page.waitForTimeout(2000);
  await page1.getByRole('textbox', { name: 'Enter your comments here' }).nth(1).click();
  await page1.getByRole('textbox', { name: 'Enter your comments here' }).nth(1).fill('test message for Accounting');
  await page1.getByRole('button', { name: 'arrow-up' }).nth(1).click();
  await page1.locator('#updatesFor').nth(1).click();
  await page.waitForTimeout(2000);
  await page1.getByText('Finance Team').click();
  await page1.getByRole('textbox', { name: 'Enter your comments here' }).nth(1).click();
  await page1.getByRole('textbox', { name: 'Enter your comments here' }).nth(1).fill('Test message for Finance');

  await page1.getByRole('button', { name: 'arrow-up' }).nth(1).click();
  await page1.locator('#updatesFor').nth(1).click();
  await page.waitForTimeout(2000);
  await page1.getByText('Lease Approver Team').click();
  await page1.getByRole('textbox', { name: 'Enter your comments here' }).nth(1).click();
  await page1.getByRole('textbox', { name: 'Enter your comments here' }).nth(1).fill('Test message for Lease Approver');
  await page1.getByRole('button', { name: 'arrow-up' }).nth(1).click(); 

// go to TI workflow
  await page1.goto('https://feqa.mn.p3fusionapps.com/tenant-improvement');

  await page.waitForTimeout(2000);
  await page1.getByRole('link', { name: /TI-2507-\d+/ }).nth(0).click();
  await page.waitForTimeout(2000);

  await page1.getByRole('main').getByRole('button').filter({ hasText: /^$/ }).click();


  await page1.locator('#updatesFor').nth(1).click();
  await page.waitForTimeout(3000);
  await page1.locator('div').filter({ hasText: /^ALL$/ }).nth(2).click();
  await page1.getByRole('textbox', { name: 'Enter your comments here' }).nth(1).click();
  await page1.getByRole('textbox', { name: 'Enter your comments here' }).nth(1).fill('message to all from TI');
  await page1.getByRole('button', { name: 'arrow-up' }).nth(1).click();

  await page1.locator('#updatesFor').nth(1).click();
  await page.waitForTimeout(3000);
  await page1.locator('div').filter({ hasText: /^Legal Team$/ }).nth(2).click();
  await page1.getByRole('textbox', { name: 'Enter your comments here' }).nth(1).click();
  await page1.getByRole('textbox', { name: 'Enter your comments here' }).nth(1).fill('message to Legal from TI');
  await page1.getByRole('button', { name: 'arrow-up' }).nth(1).click();
	
  await page1.locator('#updatesFor').nth(1).click();
  await page.waitForTimeout(3000);
  await page1.locator('div').filter({ hasText: /^Leasing Team$/ }).nth(2).click();
  await page1.getByRole('textbox', { name: 'Enter your comments here' }).nth(1).click();
  await page1.getByRole('textbox', { name: 'Enter your comments here' }).nth(1).fill('message to Leasing from TI');
  await page1.getByRole('button', { name: 'arrow-up' }).nth(1).click();

  await page1.locator('#updatesFor').nth(1).click();
  await page.waitForTimeout(3000);
  await page1.locator('div').filter({ hasText: /^TI Team$/ }).nth(2).click();
  await page1.getByRole('textbox', { name: 'Enter your comments here' }).nth(1).click();
  await page1.getByRole('textbox', { name: 'Enter your comments here' }).nth(1).fill('message to TI from TI');
  await page1.getByRole('button', { name: 'arrow-up' }).nth(1).click();

  await page1.locator('#updatesFor').nth(1).click();
  await page.waitForTimeout(3000);
  await page1.locator('div').filter({ hasText: /^Accounting Team$/ }).nth(2).click();
  await page1.getByRole('textbox', { name: 'Enter your comments here' }).nth(1).click();
  await page1.getByRole('textbox', { name: 'Enter your comments here' }).nth(1).fill('message to Accounting from TI');
  await page1.getByRole('button', { name: 'arrow-up' }).nth(1).click();

  await page1.locator('#updatesFor').nth(1).click();
  await page.waitForTimeout(3000);
  await page1.locator('div').filter({ hasText: /^Finance Team$/ }).nth(2).click();
  await page1.getByRole('textbox', { name: 'Enter your comments here' }).nth(1).click();
  await page1.getByRole('textbox', { name: 'Enter your comments here' }).nth(1).fill('message to Finance from TI');
  await page1.getByRole('button', { name: 'arrow-up' }).nth(1).click();
	
  await page1.locator('#updatesFor').nth(1).click();
  await page.waitForTimeout(3000);
  await page1.locator('div').filter({ hasText: /^Lease Approver Team$/ }).nth(2).click();
  await page1.getByRole('textbox', { name: 'Enter your comments here' }).nth(1).click();
  await page1.getByRole('textbox', { name: 'Enter your comments here' }).nth(1).fill('message to Lease Approver from TI');
  await page1.getByRole('button', { name: 'arrow-up' }).nth(1).click();
 




// go to TI workflow
  await page1.goto('https://feqa.mn.p3fusionapps.com/tenant-improvement');

  await page.waitForTimeout(2000);
  await page1.getByRole('link', { name: /TI-2507-\d+/ }).nth(0).click();
  await page.waitForTimeout(2000);

  await page1.getByTestId('MN-Open-Button').click();
  await page1.getByTestId('LM-CaseFooterSubmit-Button').click();
  await page1.getByTestId('MN-Open-Button').click();
  await page1.getByTestId('LM-CaseFooterSubmit-Button').click();
  await page1.getByTestId('MN-Open-Button').click();
  await page1.getByRole('radio', { name: 'Yes' }).check();
  await page1.getByTestId('LM-CaseFooterSubmit-Button').click();
  await page1.getByTestId('MN-Open-Button').click();
  await page1.locator('#isLeaseExhibitCompleted').getByRole('radio', { name: 'Yes' }).check();
  await page1.getByRole('combobox', { name: '* Name' }).click();
  await page1.getByText('Kate Bride').click();
  await page1.getByRole('textbox', { name: '* Comments' }).click();
  await page1.getByRole('textbox', { name: '* Comments' }).fill('required comment');
  await page1.getByTestId('LM-CaseFooterSubmit-Button').click();
  await page1.getByTestId('MN-Open-Button').click();
  await page1.getByRole('checkbox', { name: 'Skip Invitation to' }).check();
  await page1.getByRole('textbox', { name: '* Comments' }).click();
  await page1.getByRole('textbox', { name: '* Comments' }).fill('entering a comment');
  await page1.getByTestId('LM-CaseFooterSubmit-Button').click();

  await page1.getByTestId('MN-Open-Button').click();
  await page1.getByTestId('LM-CaseFooterSubmit-Button').click();
  await page1.getByTestId('MN-Open-Button').click();
  await page1.getByRole('radio', { name: 'Yes' }).check();
  await page1.getByTestId('LM-CaseFooterSubmit-Button').click();
  await page1.getByTestId('MN-Open-Button').click();
  await page1.locator('#isExecuteLease').getByRole('radio', { name: 'Yes' }).check();

  await page1.getByRole('button', { name: 'pushpin Pinned Legal - Fully' }).click();
  await page1.getByTestId('MN-AttachmentUpload-Button').click();

const firstFileChooserPromise = page1.waitForEvent('filechooser')
await page1.getByRole('button', { name: 'inbox Click or drag file to' }).click();
const firstFileChooser = await firstFileChooserPromise
await firstFileChooser.setFiles([path.resolve('./uploadFiles/page 49.pdf')])
  await page1.locator('[id^="rc_select_"]').nth(0).click();
 await page1.keyboard.type('Legal - Fully Executed Lease');
 await page1.keyboard.press('Enter');
  await page1.getByTestId('MN-Attach-Button').click();
  await page.waitForTimeout(1000);
  await page.waitForTimeout(1000);
  await page1.getByTestId('LM-AttachmentChoose-Button').click();


  await page1.getByTestId('LM-CaseFooterSubmit-Button').click();

// budget authorization
  await page1.getByTestId('MN-Open-Button').click();
  await page1.getByRole('textbox', { name: '* Cost' }).click();
  await page1.getByRole('textbox', { name: '* Cost' }).fill('1000');
  await page1.getByRole('combobox', { name: '* Budget Manager Approval' }).click();
  await page1.getByText('Jason Tedrick').click();
  await page1.getByRole('combobox', { name: '* Job Type' }).click();
  await page1.getByTitle('Maintenance').locator('div').click();
  await page1.getByRole('textbox', { name: '* Estimated(Anticipated)' }).click();
  await page1.getByRole('textbox', { name: '* Estimated(Anticipated)' }).fill('01/01/2030');
  await page1.getByRole('textbox', { name: '* Estimated(Anticipated)' }).press('Enter');
  await page1.getByRole('textbox', { name: '* Estimated Construction' }).click();
  await page1.getByRole('textbox', { name: '* Estimated Construction' }).fill('01/01/2030');
  await page1.getByRole('textbox', { name: '* Estimated Construction' }).press('Enter');
  await page1.getByLabel('', { exact: true }).check();
  await page1.locator('.ant-select.ant-select-outlined.ant-select-in-form-item.ant-select-status-success.css-dev-only-do-not-override-1k2z3qc.ant-select-single.ant-select-show-arrow.ant-select-show-search > .ant-select-selector > .ant-select-selection-wrap > .ant-select-selection-item').first().click();
  await page1.getByText('- 10100 Katy Fwy (CEMEX)').click();
  await page1.locator('div:nth-child(3) > .ant-form-item > .ant-row > .ant-col.ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector > .ant-select-selection-wrap > .ant-select-selection-item').click();
  await page1.getByText('-0140 - CIP-Medical-TI').click();
  await page1.getByRole('tab', { name: 'Budget Breakdown' }).click();
  await page1.getByRole('row', { name: '10-0127 Engineering Fees (' }).getByTestId('TI-SoftCost-CurrencyInput').click();
  await page1.getByRole('row', { name: '10-0127 Engineering Fees (' }).getByTestId('TI-SoftCost-CurrencyInput').fill('1000');
  await page1.getByRole('row', { name: '10-0127 Engineering Fees (' }).getByTestId('TI-SoftCost-CurrencyInput').press('Enter');
  await page1.getByRole('tab', { name: 'Budget Information' }).click();
  await page1.getByTestId('TI-ReviewBudgetEmail-Button').click();
  await page1.getByRole('button', { name: 'OK' }).click();
  await page1.getByTestId('LM-CaseFooterSubmit-Button').click();

	// project approval

  await page1.getByTestId('MN-Open-Button').click();
  await page1.locator('#isBugdetapprovedbyConstructionManager').getByRole('radio', { name: 'Yes' }).check();
  await page1.getByTestId('LM-CaseFooterSubmit-Button').click();
  await page1.getByRole('button', { name: 'OK' }).click();
  await page1.getByTestId('MN-Open-Button').click();
  await page1.locator('#isBugdetapprovedbyBudgetManager').getByRole('radio', { name: 'Yes' }).check();
  await page1.getByTestId('LM-CaseFooterSubmit-Button').click();
  await page1.getByRole('button', { name: 'OK' }).click();
  await page1.getByRole('listitem').filter({ hasText: 'MEP Drawing RequestAssigned' }).getByTestId('MN-Open-Button').click();
  await page1.getByRole('radio', { name: 'Yes' }).check();
  await page1.getByTestId('TI-MEPDrawingRequestEmail-Button').click();
  await page1.getByTestId('LM-SendMail-Button').click();
  await page1.getByTestId('LM-CaseFooterSubmit-Button').click();


  await page1.getByRole('listitem').filter({ hasText: 'Review Update Budget Form and' }).getByTestId('MN-Open-Button').click();
  await page1.getByTestId('LM-CaseFooterSubmit-Button').click();
  await page1.getByRole('listitem').filter({ hasText: 'Waiting for Drawings from' }).getByTestId('MN-Open-Button').click();
  await page1.getByTestId('LM-CaseFooterSubmit-Button').click();
  await page1.getByRole('listitem').filter({ hasText: 'Setup Job NumberAssigned to' }).getByTestId('MN-Open-Button').click();
  await page1.getByRole('textbox', { name: '* Job Code' }).click();
  await page1.getByRole('textbox', { name: '* Job Code' }).fill('123456');
  await page1.getByTestId('TI-InitiateMRIJobSetup-Button').click();
  await page1.getByTestId('LM-CaseFooterSubmit-Button').click();

	// invitation to bids
  await page1.getByTestId('MN-Open-Button').click();
  await page1.locator('div').filter({ hasText: /^--Select--$/ }).first().click();
  await page1.getByText('Adam Boak - O\'Donnell Snider').click();
  await page1.getByRole('button', { name: 'Add Contractor' }).click();
  await page1.getByRole('textbox', { name: '* Bid Due Date' }).click();
  await page1.getByRole('textbox', { name: '* Bid Due Date' }).fill('01/01/2030');
  await page1.getByRole('textbox', { name: '* Bid Due Date' }).press('Enter');
  await page1.getByTestId('TI-InviteBidEmail-Button').click();
  await page1.getByTestId('LM-SendMail-Button').click();
  await page1.getByTestId('LM-CaseFooterSubmit-Button').click();
  await page1.getByTestId('MN-Open-Button').click();
  await page1.getByTestId('LM-CaseFooterSubmit-Button').click();
	// review bids

  await page1.getByTestId('MN-Open-Button').click();
  await page1.getByLabel('', { exact: true }).check();
  await page1.getByTestId('TI-ReviewBidsBidAmount-CurrencyInput').click();
  await page1.getByTestId('TI-ReviewBidsBidAmount-CurrencyInput').fill('900');
  await page1.getByTestId('LM-CaseFooterSubmit-Button').click();
  await page1.getByTestId('MN-Open-Button').click();
  await page1.getByRole('radio', { name: 'Yes' }).check();
  await page1.getByTestId('LM-CaseFooterSubmit-Button').click();
  await page1.getByTestId('MN-Open-Button').click();
  await page1.getByRole('checkbox', { name: 'Skip Share Finishes with' }).check();
  await page1.getByTestId('LM-CaseFooterSubmit-Button').click();
  await page1.getByTestId('MN-Open-Button').click();
  await page1.getByTestId('LM-CaseFooterSubmit-Button').click();

// review and confirm final documents
	//
  await page1.getByTestId('MN-Open-Button').click();
  await page1.getByTestId('TI-PostFinalDocuments-ExpandCollapse').click();
  await page1.locator('.ant-checkbox-input').first().check();
  await page1.locator('div:nth-child(2) > .ant-collapse-content > .ant-collapse-content-box > div > .ant-col.attachFile > div > div > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').check();
  await page1.locator('div:nth-child(3) > .ant-collapse-content > .ant-collapse-content-box > div > .ant-col.attachFile > div > div > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').check();
  await page1.locator('div:nth-child(4) > .ant-collapse-content > .ant-collapse-content-box > div > .ant-col.attachFile > div > div > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').check();
  await page1.locator('div:nth-child(5) > .ant-collapse-content > .ant-collapse-content-box > div > .ant-col.attachFile > div > div > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').check();
  await page1.locator('div:nth-child(6) > .ant-collapse-content > .ant-collapse-content-box > div > .ant-col.attachFile > div > div > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').check();
  await page1.locator('div:nth-child(7) > .ant-collapse-content > .ant-collapse-content-box > div > .ant-col.attachFile > div > div > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').check();
  await page1.locator('div:nth-child(8) > .ant-collapse-content > .ant-collapse-content-box > div > .ant-col.attachFile > div > div > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').check();
  await page1.locator('div:nth-child(9) > .ant-collapse-content > .ant-collapse-content-box > div > .ant-col.attachFile > div > div > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').check();
  await page1.getByTestId('LM-CaseFooterSubmit-Button').click();
  await page1.getByTestId('MN-Open-Button').click();
  await page1.getByRole('radio', { name: 'Yes' }).check();
  await page1.getByTestId('TI-CloseOutProjectEmail-Button').click();
  await page1.getByTestId('TI-SendMailTo-Select').locator('div').nth(1).click();
  await page1.getByText('Dolatowski, Evan').click();
  await page1.getByRole('button', { name: 'paper-clip' }).click();
  await page1.getByRole('row', { name: 'BudgetInfo.pdf Budget System' }).getByTestId('LM-CheckBoxAttachment-Checkbox').check();
  await page1.getByTestId('LM-AttachmentChoose-Button').click();
  await page1.getByTestId('LM-SendMail-Button').click();
  await page1.getByTestId('LM-CaseFooterSubmit-Button').click();

 });
