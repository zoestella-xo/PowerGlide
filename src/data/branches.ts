/**
 * BRANCHES — PowerGlide's three locations (from the client's flyer).
 * Add, remove or reword a branch here; every branch selector, price lookup,
 * form and map reads from this list.
 *
 * TODO(client): confirm the exact street address of each branch, and paste a
 * Google embed URL / share link per branch (or just keep the mapQuery text).
 * Only the Ashaley Botwe address was given on the client's flyer.
 */
import type { Branch } from '../types';

export const BRANCHES: Branch[] = [
  {
    id: 'ashaley-botwe',
    name: 'Ashaley Botwe',
    address: 'Off Madina–Ashaley Botwe Road, towards Lakeside Estate',
    mapQuery: 'PowerGlide Premier Auto Service Center, Ashaley Botwe, Accra',
    mapEmbedUrl: '',
    mapLink: '',
  },
  {
    id: 'adabraka',
    name: 'Adabraka',
    address: 'Adabraka, Accra',
    mapQuery: 'PowerGlide Premier Auto Service Center, Adabraka, Accra',
    mapEmbedUrl: '',
    mapLink: '',
  },
  {
    id: 'achimota',
    name: 'Achimota',
    address: 'Achimota, Accra',
    mapQuery: 'PowerGlide Premier Auto Service Center, Achimota, Accra',
    mapEmbedUrl: '',
    mapLink: '',
  },
];

/** Branch preselected for first-time visitors. */
export const DEFAULT_BRANCH_ID = 'ashaley-botwe';

export const getBranch = (id: string | null | undefined): Branch | undefined =>
  BRANCHES.find((b) => b.id === id);
