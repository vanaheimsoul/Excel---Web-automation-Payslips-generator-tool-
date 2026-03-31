import { toPng } from 'html-to-image';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export async function exportPayslipsToZip(payslipNodes: HTMLElement[]) {
  const zip = new JSZip();

  for (let i = 0; i < payslipNodes.length; i += 1) {
    const node = payslipNodes[i];
    const dataUrl = await toPng(node, { pixelRatio: 2, cacheBust: true });
    const base64 = dataUrl.split(',')[1];
    zip.file(`payslip-${i + 1}.png`, base64, { base64: true });
  }

  const blob = await zip.generateAsync({ type: 'blob' });
  saveAs(blob, 'payslips.zip');
}
