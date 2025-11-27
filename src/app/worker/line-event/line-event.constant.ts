// user send
export const LINE_SELECTION_MENU_KEYWORD = 'ฉันรักดาต้าว้าว';

// Invalid reply
export const LINE_INVALID_MESSAGE_REPLY = 'ผมยังไม่รองรับข้อความประเภทนี้ครับ';
export const LINE_INVALID_VERIFICATION_REPLY = 'รหัสยืนยันไม่ถูกต้อง';
export const LINE_INVALID_PROJECT_SELECTION_REPLY =
  'ไม่มี project ที่คุณเลือก โปรดลองอีกครั้ง';
export const LINE_NO_PROJECT_REPLY =
  'ดูเหมือนคุณจะไม่มี Project โปรดติดต่อ admin';

// success reply
export const LINE_SUCCESS_VERIFICATION_REPLY = 'ยืนยันตัวตนสำเร็จ';
export const LINE_SUCCESS_PROJECT_SELECTION_REPLY = (projectName: string) =>
  `เลือก project ${projectName} สำเร็จคุยได้เลย`;
