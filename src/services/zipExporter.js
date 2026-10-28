import JSZip from 'jszip';

export const exportProjectZip = async () => {
  try {
    const response = await fetch('/restaurant-network.zip');
    if (response.ok) {
      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = 'restaurant-network.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(downloadUrl);
      return;
    }
  } catch {
    // Fall back to on-the-fly bundle below
  }

  const zip = new JSZip();
  const publicFolder = zip.folder('public');
  const locales = publicFolder?.folder('locales');

  try {
    const dbRes = await fetch('/db.json');
    if (dbRes.ok) {
      const dbText = await dbRes.text();
      zip.file('db.json', dbText);
      publicFolder?.file('db.json', dbText);
    }

    const uzRes = await fetch('/locales/uz/translation.json');
    if (uzRes.ok) locales?.folder('uz')?.file('translation.json', await uzRes.text());

    const ruRes = await fetch('/locales/ru/translation.json');
    if (ruRes.ok) locales?.folder('ru')?.file('translation.json', await ruRes.text());

    const enRes = await fetch('/locales/en/translation.json');
    if (enRes.ok) locales?.folder('en')?.file('translation.json', await enRes.text());

    const trRes = await fetch('/locales/tr/translation.json');
    if (trRes.ok) locales?.folder('tr')?.file('translation.json', await trRes.text());
  } catch (e) {
    console.warn('Could not bundle all dynamic assets', e);
  }

  const blob = await zip.generateAsync({ type: 'blob' });
  const downloadUrl = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = downloadUrl;
  a.download = 'restaurant-network.zip';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(downloadUrl);
};
