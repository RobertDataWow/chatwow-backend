import { customAlphabet } from 'nanoid';

const LETTERS = 'ABCDEFGHJKLMNPQRSTUVWXYZ'; // removes I, O avoid confusion
const ALPHANUM = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'; // removes 0,1,I,O avoid confusion
const genLetter = customAlphabet(LETTERS, 1);
const genMid = customAlphabet(ALPHANUM, 4);
export function generateVerificationCode() {
  return genLetter() + genMid() + genLetter();
}

export function isVerificationCode(code: string): boolean {
  // 1st char: letter (A–Z, excluding I, O)
  // 2–5:      alphanum (2–9, A–Z, excluding 0,1,I,O)
  // 6th char: letter (A–Z, excluding I, O)
  const regex = /^[A-HJ-NP-Z][2-9A-HJ-NP-Z]{4}[A-HJ-NP-Z]$/;
  return regex.test(code);
}
