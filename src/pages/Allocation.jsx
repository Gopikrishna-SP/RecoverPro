import { useState, useMemo } from 'react';
import { Search, Download, Eye, Edit, Trash2 } from 'lucide-react';

const styles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: linear-gradient(135deg, #0f172a 0%, #1a1f35 50%, #0f172a 100%);
    min-height: 100vh;
    color: #e2e8f0;
  }

  .container {
    max-width: 100%;
    margin: 0 auto;
    padding: 32px;
  }

  .header {
    margin-bottom: 32px;
  }

  .header h1 {
    font-size: 36px;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 8px;
  }

  .header p {
    font-size: 14px;
    color: #94a3b8;
  }

  .controls {
    display: flex;
    gap: 12px;
    margin-bottom: 24px;
    flex-wrap: wrap;
  }

  .search-box {
    flex: 1;
    min-width: 250px;
    position: relative;
  }

  .search-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #94a3b8;
    pointer-events: none;
  }

  .search-input {
    width: 100%;
    padding: 10px 12px 10px 40px;
    background: rgba(30, 41, 59, 0.5);
    border: 1px solid rgba(71, 85, 105, 0.3);
    border-radius: 8px;
    color: #ffffff;
    font-size: 13px;
    transition: all 0.3s ease;
  }

  .search-input::placeholder {
    color: #64748b;
  }

  .search-input:focus {
    outline: none;
    border-color: rgba(59, 130, 246, 0.5);
    background: rgba(30, 41, 59, 0.8);
  }

  .export-btn {
    padding: 10px 16px;
    background: rgba(30, 41, 59, 0.5);
    border: 1px solid rgba(71, 85, 105, 0.3);
    color: #cbd5e1;
    border-radius: 8px;
    cursor: pointer;
    font-size: 13px;
    font-weight: 600;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .export-btn:hover {
    border-color: rgba(59, 130, 246, 0.5);
    background: rgba(30, 41, 59, 0.8);
    color: #e2e8f0;
  }

  .stats-bar {
    background: rgba(30, 41, 59, 0.5);
    border: 1px solid rgba(71, 85, 105, 0.3);
    border-radius: 8px;
    padding: 12px 16px;
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;
  }

  .stat-info {
    font-size: 13px;
    color: #cbd5e1;
  }

  .stat-info strong {
    color: #e2e8f0;
  }

  .table-wrapper {
    background: rgba(30, 41, 59, 0.5);
    border: 1px solid rgba(71, 85, 105, 0.3);
    border-radius: 12px;
    overflow: hidden;
  }

  .table-container {
    overflow-x: auto;
    max-height: 75vh;
    overflow-y: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    table-layout: auto;
    min-width: max-content;
  }

  thead {
    position: sticky;
    top: 0;
    background: rgba(15, 23, 42, 0.9);
    z-index: 10;
  }

  th {
    text-align: left;
    padding: 12px 10px;
    font-size: 10px;
    font-weight: 700;
    color: #cbd5e1;
    border-bottom: 1px solid rgba(71, 85, 105, 0.3);
    text-transform: uppercase;
    letter-spacing: 0.4px;
    white-space: nowrap;
    background: rgba(15, 23, 42, 0.95);
    min-width: 80px;
  }

  td {
    padding: 10px;
    font-size: 11px;
    color: #cbd5e1;
    border-bottom: 1px solid rgba(71, 85, 105, 0.1);
    min-width: 80px;
  }

  tr:hover {
    background: rgba(59, 130, 246, 0.05);
  }

  .currency {
    color: #10b981;
    font-weight: 500;
  }

  .date {
    color: #60a5fa;
  }

  .action-btns {
    display: flex;
    gap: 4px;
    white-space: nowrap;
  }

  .action-btn {
    background: none;
    border: none;
    color: #60a5fa;
    cursor: pointer;
    padding: 3px 5px;
    border-radius: 3px;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .action-btn:hover {
    background: rgba(59, 130, 246, 0.1);
    color: #93c5fd;
  }

  .action-btn.delete:hover {
    background: rgba(239, 68, 68, 0.1);
    color: #fca5a5;
  }

  .empty-state {
    padding: 48px 24px;
    text-align: center;
  }

  .empty-state h3 {
    font-size: 16px;
    font-weight: 600;
    color: #cbd5e1;
    margin-bottom: 8px;
  }

  .empty-state p {
    font-size: 13px;
    color: #94a3b8;
  }

  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    padding: 16px;
    border-top: 1px solid rgba(71, 85, 105, 0.2);
  }

  .page-btn {
    padding: 6px 12px;
    background: rgba(30, 41, 59, 0.5);
    border: 1px solid rgba(71, 85, 105, 0.3);
    color: #cbd5e1;
    border-radius: 6px;
    cursor: pointer;
    font-size: 12px;
    transition: all 0.2s ease;
  }

  .page-btn:hover:not(:disabled) {
    border-color: rgba(59, 130, 246, 0.5);
    background: rgba(30, 41, 59, 0.8);
  }

  .page-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .page-btn.active {
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: white;
    border-color: transparent;
  }

  @media (max-width: 768px) {
    .table-container {
      max-height: 60vh;
    }
    th, td {
      padding: 8px 6px;
      font-size: 10px;
    }
  }
`;

const ALL_COLUMNS = [
  'segment', 'product', 'zone', 'state', 'branch', 'location', 'loanNumber', 'customerName',
  'disburseAmount', 'disburseDate', 'pos', 'posAmount', 'emi', 'emiStartDate', 'emiEndDate',
  'bktTag', 'openingBucket', 'ashvDaPtc', 'securitization', 'seInse', 'agencyCode', 'agency',
  'managerEmpId', 'manager', 'zmEmpId', 'zonalManager', 'mainApplicantMobileNo', 'mainApplicantName',
  'coApplicant1Name', 'coApplicant1MobileNo', 'relationWithMainApplicant', 'addressPriority1',
  'addressPriority2', 'addressPriority3', 'addressPriority4', 'addressPriority5', 'addressPriority6',
  'addressPriority7', 'addressPriority8', 'businessPinCode', 'residencePinCode', 'mainPinCode',
  'panMainApp', 'dobMainApp', 'panCoApp', 'dobCoApp', 'address1', 'address2', 'address3', 'address4',
  'address5', 'address6', 'address7', 'address8', 'address9', 'address10', 'phone1', 'phone2', 'phone3',
  'phone4', 'phone5', 'phone6', 'phone7', 'phone8', 'phone9', 'phone10', 'monthLastNotice', 'lrn1',
  'lrnMonth2', 'lrn2', 'lrnMonth3', 'lrn3', 'revisedStageArbitration', 'advocateOnRecord',
  'arbitrationInvocationDate1', 'arbitrationInvocationDate2', 'tentativeDateIssueReference',
  'letterToArbitrator', 'tentativeDateFreezingOrders', 'sec17OrderDate', 'relief', 'nodh',
  'monthOfNotice', 'noticeDate', 'dateFilingConfirmation', 'sec25Filed', 'sec25ProcessStage',
  'sec25Ldoh', 'sec25Ndoh', 'listingDate', 'dateOfFiling', 'courtForum', 'caseNumber', 'advocateName',
  'advocateContactNumber', 'authorizedOfficer', 'stage1Verification', 'stage1HearingOn',
  'stage2SummonsStage', 'stage2SummonsIssued', 'stage2SummonsCollected', 'stage3Appearance',
  'stage3HearingOn', 'stage4BailableWarrantIssuedDate', 'stage4BailableWarrantIssued',
  'stage4BailableWarrantCollected', 'stage6NonBailableWarrantIssued', 'stage6NonBailableWarrantCollected',
  'nonBailableWarrantReIssuedDate', 'nonBailableWarrantReIssueCollxDate', 'twoNdNonBailableWarrantReIssuedDate',
  'twoNdNonBailableWarrantReIssueCollxDate', 'thirdNonBailableWarrantReIssuedDate', 'thirdNonBailableWarrantReIssueCollxDate',
  'fourthNonBailableWarrantReIssuedDate', 'fourthNonBailableWarrantReIssueCollxDate', 'fifthNonBailableWarrantReIssuedDate',
  'fifthNonBailableWarrantReIssueCollxDate', 'sec138Filed', 'sec138ProcessStage', 'sec138Ldoh', 'sec138Ndoh',
  'sec138ListingDate', 'sec138DateOfFiling', 'sec138CourtForum', 'sec138LocationFilling', 'sec138CaseNumber',
  'sec420ProcessStage', 'caseWithdrawalDate', 'sec420Ldoh', 'sec420Ndoh', 'sec420ListingDate', 'sec420Remarks',
  'sec420DateOfFiling', 'sec420CourtForum', 'sec420CaseNumber', 'claimAmount', 'sec420AdvocateName',
  'sec420AdvocateContactNumber', 'sec420AuthorizedOfficer', 'sec420Stage1Verification', 'sec420Stage1HearingOn',
  'sec420Stage2Summons', 'sec420Stage2SummonsCollected', 'sec420Stage3Appearance', 'sec420Stage3HearingOn',
  'sec420Stage4BailableWarrantIssuedDate', 'sec420Stage4BailableWarrantIssued', 'sec420Stage4BailableWarrantCollected',
  'sec420Stage5NonBailableWarrantIssuedDate', 'bwReIssuedDate', 'bwWarrantPostDate', 'bwReIssuedCollectionDate',
  'sec420Stage5NonBailableWarrantIssued', 'sec420Stage5NonBailableWarrantCollected', 'stage6NonBailableWarrantReIssuedDate',
  'stage6NonBailableWarrantReIssued', 'stage7NonBailableWarrantReIssuedDate', 'stage7NonBailableWarrantReIssued',
  'stage8NonBailableWarrantReIssuedDate', 'stage8NonBailableWarrantReIssued', 'stage5NonBailableWarrantRecollected',
  'stage5ProclamationIssuedDate', 'stage5ProclamationIssued', 'stage5ProclamationCollected',
  'stage5AttachmentPropertyIssuedDate', 'stage5AttachmentPropertyIssued', 'stage5AttachmentPropertyCollected',
  'accountHolder1', 'bankName1', 'accountNumber1', 'ifscCode1', 'accountHolder2', 'bankName2',
  'accountNumber2', 'ifscCode2', 'accountHolder3', 'bankName3', 'accountNumber3', 'ifscCode3'
];

const dummyData = [
  {
    segment: 'EEG', product: 'Business Loan', zone: 'Zone 1', state: 'Karnataka', branch: 'Bangalore',
    location: 'BANGALORE', loanNumber: 'GS015EEB1426578', customerName: 'MEDICENE POINT',
    disburseAmount: 500000, disburseDate: '2023-01-15', pos: 0.0047217, posAmount: 47217, emi: 24819,
    emiStartDate: '2023-02-15', emiEndDate: '2028-02-15', bktTag: 'BKT 3-6', openingBucket: 'BKT 3',
    ashvDaPtc: '-', securitization: 'IDFC Bank', seInse: 'SE', agencyCode: 'AGY001', agency: 'Agency A',
    managerEmpId: 'MGR001', manager: 'John Smith', zmEmpId: 'ZM001', zonalManager: 'Ram Kumar',
    mainApplicantMobileNo: '9620171383', mainApplicantName: 'Rajesh Kumar', coApplicant1Name: 'Priya Sharma',
    coApplicant1MobileNo: '9876543210', relationWithMainApplicant: 'Spouse', addressPriority1: '123 Main Street',
    addressPriority2: '456 Secondary Lane', addressPriority3: 'Wing A', addressPriority4: 'Bangalore', addressPriority5: 'Karnataka', addressPriority6: '560001', addressPriority7: 'India', addressPriority8: '-',
    businessPinCode: '560001', residencePinCode: '560002', mainPinCode: '560001', panMainApp: 'ABCD1234E', dobMainApp: '1985-05-20',
    panCoApp: 'XYZP9876Q', dobCoApp: '1988-08-15', address1: '123 Main Street', address2: '456 Secondary', address3: 'Wing A', address4: 'Block 1', address5: 'Bangalore', address6: 'Karnataka', address7: 'India', address8: '560001', address9: '-', address10: '-',
    phone1: '9620171383', phone2: '9876543210', phone3: '-', phone4: '-', phone5: '-', phone6: '-', phone7: '-', phone8: '-', phone9: '-', phone10: '-',
    monthLastNotice: '2023-06', lrn1: 'LRN001', lrnMonth2: '2023-07', lrn2: 'LRN002', lrnMonth3: '2023-08', lrn3: 'LRN003',
    revisedStageArbitration: 'Stage 2', advocateOnRecord: 'ARV001', arbitrationInvocationDate1: '2023-09-10', arbitrationInvocationDate2: '2023-10-15', tentativeDateIssueReference: '2023-11-20', letterToArbitrator: '2023-12-01', tentativeDateFreezingOrders: '2024-01-15', sec17OrderDate: '2024-02-10', relief: '500000', nodh: '2024-03-01',
    monthOfNotice: '2024-04', noticeDate: '2024-04-15', dateFilingConfirmation: '2024-04-20', sec25Filed: 'Yes', sec25ProcessStage: 'Filed', sec25Ldoh: '2024-05-01', sec25Ndoh: '2024-06-01', listingDate: '2024-06-15', dateOfFiling: '2024-06-20', courtForum: 'District Court', caseNumber: 'DC/2024/001', advocateName: 'Ashish Verma', advocateContactNumber: '9988776655', authorizedOfficer: 'AO001',
    stage1Verification: 'Completed', stage1HearingOn: '2024-07-01', stage2SummonsStage: 'Issued', stage2SummonsIssued: '2024-07-10', stage2SummonsCollected: '2024-07-15', stage3Appearance: 'Yes', stage3HearingOn: '2024-08-01', stage4BailableWarrantIssuedDate: '2024-08-15', stage4BailableWarrantIssued: 'Issued', stage4BailableWarrantCollected: '2024-08-20', stage6NonBailableWarrantIssued: 'Pending', stage6NonBailableWarrantCollected: '-',
    nonBailableWarrantReIssuedDate: '-', nonBailableWarrantReIssueCollxDate: '-', twoNdNonBailableWarrantReIssuedDate: '-', twoNdNonBailableWarrantReIssueCollxDate: '-', thirdNonBailableWarrantReIssuedDate: '-', thirdNonBailableWarrantReIssueCollxDate: '-', fourthNonBailableWarrantReIssuedDate: '-', fourthNonBailableWarrantReIssueCollxDate: '-', fifthNonBailableWarrantReIssuedDate: '-', fifthNonBailableWarrantReIssueCollxDate: '-',
    sec138Filed: 'Yes', sec138ProcessStage: 'Filed', sec138Ldoh: '2024-09-01', sec138Ndoh: '2024-10-01', sec138ListingDate: '2024-10-15', sec138DateOfFiling: '2024-10-20', sec138CourtForum: 'District Court', sec138LocationFilling: 'Bangalore', sec138CaseNumber: 'SEC138/2024/001',
    sec420ProcessStage: 'Filed', caseWithdrawalDate: '-', sec420Ldoh: '2024-11-01', sec420Ndoh: '2024-12-01', sec420ListingDate: '2024-12-15', sec420Remarks: 'Case pending', sec420DateOfFiling: '2024-12-20', sec420CourtForum: 'District Court', sec420CaseNumber: 'SEC420/2024/001', claimAmount: 500000, sec420AdvocateName: 'Ashish Verma', sec420AdvocateContactNumber: '9988776655', sec420AuthorizedOfficer: 'AO001',
    sec420Stage1Verification: 'Completed', sec420Stage1HearingOn: '2025-01-10', sec420Stage2Summons: 'Issued', sec420Stage2SummonsCollected: '2025-01-15', sec420Stage3Appearance: 'Yes', sec420Stage3HearingOn: '2025-02-01', sec420Stage4BailableWarrantIssuedDate: '2025-02-15', sec420Stage4BailableWarrantIssued: 'Issued', sec420Stage4BailableWarrantCollected: '2025-02-20', sec420Stage5NonBailableWarrantIssuedDate: '-', bwReIssuedDate: '-', bwWarrantPostDate: '-', bwReIssuedCollectionDate: '-',
    sec420Stage5NonBailableWarrantIssued: '-', sec420Stage5NonBailableWarrantCollected: '-', stage6NonBailableWarrantReIssuedDate: '-', stage6NonBailableWarrantReIssued: '-', stage7NonBailableWarrantReIssuedDate: '-', stage7NonBailableWarrantReIssued: '-', stage8NonBailableWarrantReIssuedDate: '-', stage8NonBailableWarrantReIssued: '-', stage5NonBailableWarrantRecollected: '-', stage5ProclamationIssuedDate: '-', stage5ProclamationIssued: '-', stage5ProclamationCollected: '-',
    stage5AttachmentPropertyIssuedDate: '-', stage5AttachmentPropertyIssued: '-', stage5AttachmentPropertyCollected: '-',
    accountHolder1: 'Rajesh Kumar', bankName1: 'HDFC Bank', accountNumber1: '1234567890123', ifscCode1: 'HDFC0000123', accountHolder2: 'Priya Sharma', bankName2: 'ICICI Bank', accountNumber2: '9876543210987', ifscCode2: 'ICIC0000456', accountHolder3: '-', bankName3: '-', accountNumber3: '-', ifscCode3: '-'
  },
  {
    segment: 'EEG', product: 'Business Loan', zone: 'Zone 2', state: 'Karnataka', branch: 'Mysuru',
    location: 'MYSURU', loanNumber: 'GS020EEB2413307', customerName: 'SKANDA GARMENTS',
    disburseAmount: 750000, disburseDate: '2023-02-10', pos: 0.0065441, posAmount: 65441, emi: 35250,
    emiStartDate: '2023-03-10', emiEndDate: '2028-03-10', bktTag: 'BKT 0-30', openingBucket: 'BKT 0',
    ashvDaPtc: '-', securitization: 'HDFC Bank', seInse: 'SE', agencyCode: 'AGY002', agency: 'Agency B',
    managerEmpId: 'MGR002', manager: 'Priya Singh', zmEmpId: 'ZM002', zonalManager: 'Ashok Patel',
    mainApplicantMobileNo: '9876543210', mainApplicantName: 'Suresh Desai', coApplicant1Name: 'Anjali Desai',
    coApplicant1MobileNo: '9123456789', relationWithMainApplicant: 'Spouse', addressPriority1: '789 Complex',
    addressPriority2: '321 Business', addressPriority3: 'Suite 5', addressPriority4: 'Mysuru', addressPriority5: 'Karnataka', addressPriority6: '570001', addressPriority7: 'India', addressPriority8: '-',
    businessPinCode: '570001', residencePinCode: '570002', mainPinCode: '570001', panMainApp: 'EFGH5678I', dobMainApp: '1982-03-10', panCoApp: 'MNOP2345R', dobCoApp: '1985-06-22',
    address1: '789 Complex', address2: '321 Business', address3: 'Suite 5', address4: 'Block 2', address5: 'Mysuru', address6: 'Karnataka', address7: 'India', address8: '570001', address9: '-', address10: '-',
    phone1: '9876543210', phone2: '9123456789', phone3: '-', phone4: '-', phone5: '-', phone6: '-', phone7: '-', phone8: '-', phone9: '-', phone10: '-',
    monthLastNotice: '2023-07', lrn1: 'LRN004', lrnMonth2: '2023-08', lrn2: 'LRN005', lrnMonth3: '2023-09', lrn3: 'LRN006',
    revisedStageArbitration: 'Stage 1', advocateOnRecord: 'ARV002', arbitrationInvocationDate1: '2023-10-20', arbitrationInvocationDate2: '2023-11-25', tentativeDateIssueReference: '2023-12-30', letterToArbitrator: '2024-01-10', tentativeDateFreezingOrders: '2024-02-20', sec17OrderDate: '2024-03-15', relief: '750000', nodh: '2024-04-10',
    monthOfNotice: '2024-05', noticeDate: '2024-05-20', dateFilingConfirmation: '2024-05-25', sec25Filed: 'Yes', sec25ProcessStage: 'In Progress', sec25Ldoh: '2024-06-05', sec25Ndoh: '2024-07-05', listingDate: '2024-07-20', dateOfFiling: '2024-07-25', courtForum: 'District Court', caseNumber: 'DC/2024/002', advocateName: 'Priya Nair', advocateContactNumber: '9765432101', authorizedOfficer: 'AO002',
    stage1Verification: 'In Progress', stage1HearingOn: '2024-08-10', stage2SummonsStage: 'Pending', stage2SummonsIssued: '-', stage2SummonsCollected: '-', stage3Appearance: 'Pending', stage3HearingOn: '-', stage4BailableWarrantIssuedDate: '-', stage4BailableWarrantIssued: '-', stage4BailableWarrantCollected: '-', stage6NonBailableWarrantIssued: '-', stage6NonBailableWarrantCollected: '-',
    nonBailableWarrantReIssuedDate: '-', nonBailableWarrantReIssueCollxDate: '-', twoNdNonBailableWarrantReIssuedDate: '-', twoNdNonBailableWarrantReIssueCollxDate: '-', thirdNonBailableWarrantReIssuedDate: '-', thirdNonBailableWarrantReIssueCollxDate: '-', fourthNonBailableWarrantReIssuedDate: '-', fourthNonBailableWarrantReIssueCollxDate: '-', fifthNonBailableWarrantReIssuedDate: '-', fifthNonBailableWarrantReIssueCollxDate: '-',
    sec138Filed: 'No', sec138ProcessStage: 'Not Filed', sec138Ldoh: '-', sec138Ndoh: '-', sec138ListingDate: '-', sec138DateOfFiling: '-', sec138CourtForum: '-', sec138LocationFilling: '-', sec138CaseNumber: '-',
    sec420ProcessStage: 'Not Filed', caseWithdrawalDate: '-', sec420Ldoh: '-', sec420Ndoh: '-', sec420ListingDate: '-', sec420Remarks: 'Awaiting action', sec420DateOfFiling: '-', sec420CourtForum: '-', sec420CaseNumber: '-', claimAmount: 750000, sec420AdvocateName: '-', sec420AdvocateContactNumber: '-', sec420AuthorizedOfficer: '-',
    sec420Stage1Verification: '-', sec420Stage1HearingOn: '-', sec420Stage2Summons: '-', sec420Stage2SummonsCollected: '-', sec420Stage3Appearance: '-', sec420Stage3HearingOn: '-', sec420Stage4BailableWarrantIssuedDate: '-', sec420Stage4BailableWarrantIssued: '-', sec420Stage4BailableWarrantCollected: '-', sec420Stage5NonBailableWarrantIssuedDate: '-', bwReIssuedDate: '-', bwWarrantPostDate: '-', bwReIssuedCollectionDate: '-',
    sec420Stage5NonBailableWarrantIssued: '-', sec420Stage5NonBailableWarrantCollected: '-', stage6NonBailableWarrantReIssuedDate: '-', stage6NonBailableWarrantReIssued: '-', stage7NonBailableWarrantReIssuedDate: '-', stage7NonBailableWarrantReIssued: '-', stage8NonBailableWarrantReIssuedDate: '-', stage8NonBailableWarrantReIssued: '-', stage5NonBailableWarrantRecollected: '-', stage5ProclamationIssuedDate: '-', stage5ProclamationIssued: '-', stage5ProclamationCollected: '-',
    stage5AttachmentPropertyIssuedDate: '-', stage5AttachmentPropertyIssued: '-', stage5AttachmentPropertyCollected: '-',
    accountHolder1: 'Suresh Desai', bankName1: 'ICICI Bank', accountNumber1: '4567891234567', ifscCode1: 'ICIC0000789', accountHolder2: 'Anjali Desai', bankName2: 'Axis Bank', accountNumber2: '7891234567890', ifscCode2: 'UTIB0000234', accountHolder3: '-', bankName3: '-', accountNumber3: '-', ifscCode3: '-'
  },
  {
    segment: 'SME', product: 'Trade Loan', zone: 'Zone 3', state: 'Maharashtra', branch: 'Pune',
    location: 'PUNE', loanNumber: 'GS025SME3156890', customerName: 'TECH SOLUTIONS',
    disburseAmount: 1200000, disburseDate: '2023-03-05', pos: 0.008975, posAmount: 89750, emi: 54320,
    emiStartDate: '2023-04-05', emiEndDate: '2028-04-05', bktTag: 'BKT 6-9', openingBucket: 'BKT 6',
    ashvDaPtc: 'ASHV-12', securitization: 'Kotak Mahindra', seInse: 'INSE', agencyCode: 'AGY003', agency: 'Agency C',
    managerEmpId: 'MGR003', manager: 'Vikram Reddy', zmEmpId: 'ZM003', zonalManager: 'Neha Gupta',
    mainApplicantMobileNo: '9654321098', mainApplicantName: 'Anil Sharma', coApplicant1Name: 'Divya Sharma',
    coApplicant1MobileNo: '9234567890', relationWithMainApplicant: 'Partner', addressPriority1: '201 Tech Park',
    addressPriority2: '456 Industrial', addressPriority3: 'Phase 2', addressPriority4: 'Pune', addressPriority5: 'Maharashtra', addressPriority6: '411001', addressPriority7: 'India', addressPriority8: '-',
    businessPinCode: '411001', residencePinCode: '411003', mainPinCode: '411001', panMainApp: 'IJKL9012M', dobMainApp: '1980-07-25', panCoApp: 'QRST3456S', dobCoApp: '1983-09-14',
    address1: '201 Tech Park', address2: '456 Industrial Zone', address3: 'Phase 2', address4: 'Building C', address5: 'Pune', address6: 'Maharashtra', address7: 'India', address8: '411001', address9: '-', address10: '-',
    phone1: '9654321098', phone2: '9234567890', phone3: '-', phone4: '-', phone5: '-', phone6: '-', phone7: '-', phone8: '-', phone9: '-', phone10: '-',
    monthLastNotice: '2024-01', lrn1: 'LRN007', lrnMonth2: '2024-02', lrn2: 'LRN008', lrnMonth3: '2024-03', lrn3: 'LRN009',
    revisedStageArbitration: 'Stage 3', advocateOnRecord: 'ARV003', arbitrationInvocationDate1: '2024-04-15', arbitrationInvocationDate2: '2024-05-20', tentativeDateIssueReference: '2024-06-25', letterToArbitrator: '2024-07-05', tentativeDateFreezingOrders: '2024-08-15', sec17OrderDate: '2024-09-10', relief: '1200000', nodh: '2024-10-01',
    monthOfNotice: '2024-11', noticeDate: '2024-11-15', dateFilingConfirmation: '2024-11-20', sec25Filed: 'Yes', sec25ProcessStage: 'Under Review', sec25Ldoh: '2024-12-01', sec25Ndoh: '2025-01-01', listingDate: '2025-01-15', dateOfFiling: '2025-01-20', courtForum: 'High Court', caseNumber: 'HC/2025/001', advocateName: 'Rajesh Kumar', advocateContactNumber: '9654321098', authorizedOfficer: 'AO003',
    stage1Verification: 'Completed', stage1HearingOn: '2025-02-10', stage2SummonsStage: 'Issued', stage2SummonsIssued: '2025-02-20', stage2SummonsCollected: '2025-02-25', stage3Appearance: 'Yes', stage3HearingOn: '2025-03-15', stage4BailableWarrantIssuedDate: '2025-04-01', stage4BailableWarrantIssued: 'Issued', stage4BailableWarrantCollected: '2025-04-05', stage6NonBailableWarrantIssued: 'Issued', stage6NonBailableWarrantCollected: '2025-04-10',
    nonBailableWarrantReIssuedDate: '2025-05-01', nonBailableWarrantReIssueCollxDate: '2025-05-05', twoNdNonBailableWarrantReIssuedDate: '-', twoNdNonBailableWarrantReIssueCollxDate: '-', thirdNonBailableWarrantReIssuedDate: '-', thirdNonBailableWarrantReIssueCollxDate: '-', fourthNonBailableWarrantReIssuedDate: '-', fourthNonBailableWarrantReIssueCollxDate: '-', fifthNonBailableWarrantReIssuedDate: '-', fifthNonBailableWarrantReIssueCollxDate: '-',
    sec138Filed: 'Yes', sec138ProcessStage: 'In Progress', sec138Ldoh: '2025-05-15', sec138Ndoh: '2025-06-15', sec138ListingDate: '2025-06-30', sec138DateOfFiling: '2025-07-05', sec138CourtForum: 'District Court', sec138LocationFilling: 'Pune', sec138CaseNumber: 'SEC138/2025/001',
    sec420ProcessStage: 'Filed', caseWithdrawalDate: '-', sec420Ldoh: '2025-07-20', sec420Ndoh: '2025-08-20', sec420ListingDate: '2025-09-05', sec420Remarks: 'Under consideration', sec420DateOfFiling: '2025-09-10', sec420CourtForum: 'High Court', sec420CaseNumber: 'SEC420/2025/001', claimAmount: 1200000, sec420AdvocateName: 'Rajesh Kumar', sec420AdvocateContactNumber: '9654321098', sec420AuthorizedOfficer: 'AO003',
    sec420Stage1Verification: 'Completed', sec420Stage1HearingOn: '2025-09-25', sec420Stage2Summons: 'Issued', sec420Stage2SummonsCollected: '2025-10-01', sec420Stage3Appearance: 'Yes', sec420Stage3HearingOn: '2025-10-15', sec420Stage4BailableWarrantIssuedDate: '2025-11-01', sec420Stage4BailableWarrantIssued: 'Issued', sec420Stage4BailableWarrantCollected: '2025-11-05', sec420Stage5NonBailableWarrantIssuedDate: '-', bwReIssuedDate: '-', bwWarrantPostDate: '-', bwReIssuedCollectionDate: '-',
    sec420Stage5NonBailableWarrantIssued: '-', sec420Stage5NonBailableWarrantCollected: '-', stage6NonBailableWarrantReIssuedDate: '-', stage6NonBailableWarrantReIssued: '-', stage7NonBailableWarrantReIssuedDate: '-', stage7NonBailableWarrantReIssued: '-', stage8NonBailableWarrantReIssuedDate: '-', stage8NonBailableWarrantReIssued: '-', stage5NonBailableWarrantRecollected: '-', stage5ProclamationIssuedDate: '-', stage5ProclamationIssued: '-', stage5ProclamationCollected: '-',
    stage5AttachmentPropertyIssuedDate: '-', stage5AttachmentPropertyIssued: '-', stage5AttachmentPropertyCollected: '-',
    accountHolder1: 'Anil Sharma', bankName1: 'Kotak Mahindra', accountNumber1: '1357924680135', ifscCode1: 'KKBK0000001', accountHolder2: 'Divya Sharma', bankName2: 'SBI', accountNumber2: '2468135792468', ifscCode2: 'SBIN0000567', accountHolder3: '-', bankName3: '-', accountNumber3: '-', ifscCode3: '-'
  }
];

export default function AllocationsList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredData = useMemo(() => {
    if (!searchTerm) return dummyData;
    const search = searchTerm.toLowerCase();
    return dummyData.filter(item =>
      item.loanNumber.toLowerCase().includes(search) ||
      item.customerName.toLowerCase().includes(search) ||
      item.mainApplicantMobileNo.includes(search) ||
      item.mainApplicantName.toLowerCase().includes(search)
    );
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIdx, startIdx + itemsPerPage);

  const handleExport = () => {
    const csv = [
      ALL_COLUMNS.join(','),
      ...paginatedData.map(row =>
        ALL_COLUMNS.map(col => {
          const val = row[col];
          return typeof val === 'string' ? `"${val || ''}"` : (val || '');
        }).join(',')
      ),
    ].join('\n');

    const link = document.createElement('a');
    link.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
    link.download = 'allocations.csv';
    link.click();
  };

  return (
    <>
      <style>{styles}</style>
      <div className="container">
        <div className="header">
          <h1>Allocations</h1>
          <p>View all loan allocations with 150+ fields</p>
        </div>

        <div className="controls">
          <div className="search-box">
            <Search className="search-icon" size={16} />
            <input
              type="text"
              className="search-input"
              placeholder="Search by loan, customer, mobile, applicant..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <button className="export-btn" onClick={handleExport}>
            <Download size={14} /> Export CSV
          </button>
        </div>

        <div className="stats-bar">
          <div className="stat-info">
            Total: <strong>{filteredData.length}</strong> allocations
          </div>
          <div className="stat-info">
            Page: <strong>{currentPage}</strong> of <strong>{totalPages || 1}</strong>
          </div>
        </div>

        <div className="table-wrapper">
          <div className="table-container">
            {paginatedData.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    {ALL_COLUMNS.map(col => (
                      <th key={col}>{col}</th>
                    ))}
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((row, idx) => (
                    <tr key={idx}>
                      {ALL_COLUMNS.map(col => (
                        <td key={`${idx}-${col}`} title={row[col] || '-'}>
                          {col.includes('Amount') || col.includes('Emi') 
                            ? <span className="currency">₹{row[col]?.toLocaleString() || '-'}</span>
                            : col.includes('Date')
                            ? <span className="date">{row[col] || '-'}</span>
                            : row[col] || '-'}
                        </td>
                      ))}
                      <td>
                        <div className="action-btns">
                          <button className="action-btn" title="View">
                            <Eye size={12} />
                          </button>
                          <button className="action-btn" title="Edit">
                            <Edit size={12} />
                          </button>
                          <button className="action-btn delete" title="Delete">
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="empty-state">
                <h3>No allocations found</h3>
                <p>Try adjusting your search criteria</p>
              </div>
            )}
          </div>

          {paginatedData.length > 0 && (
            <div className="pagination">
              <button
                className="page-btn"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                <button
                  key={pageNum}
                  className={`page-btn ${pageNum === currentPage ? 'active' : ''}`}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </button>
              ))}

              <button
                className="page-btn"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}