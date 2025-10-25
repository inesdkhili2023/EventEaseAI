declare module 'jspdf-autotable' {
  import { jsPDF } from 'jspdf';
  
  export interface UserOptions {
    head?: any[][];
    body?: any[][];
    foot?: any[][];
    startY?: number;
    margin?: number | { top?: number; right?: number; bottom?: number; left?: number };
    pageBreak?: 'auto' | 'avoid' | 'always';
    theme?: 'striped' | 'grid' | 'plain';
    headStyles?: any;
    bodyStyles?: any;
    footStyles?: any;
    alternateRowStyles?: any;
    columnStyles?: any;
    styles?: any;
    showHead?: 'everyPage' | 'firstPage' | 'never';
    showFoot?: 'everyPage' | 'lastPage' | 'never';
  }
  
  export default function autoTable(doc: jsPDF, options: UserOptions): void;
}
