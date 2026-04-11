export const downloadCSV = (data, filename = "reporte.csv") => {
  const csv = convertToCSV(data);
  const blob = new Blob([csv], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  window.URL.revokeObjectURL(url);
};

export const downloadJSON = (data, filename = "reporte.json") => {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  window.URL.revokeObjectURL(url);
};

export const downloadPDF = (html, filename = "reporte.pdf") => {
  // Simulación: en producción usar jsPDF o similar
  console.log("📄 Simulando descarga como PDF:", filename);
  console.log("Contenido:", html);
  alert("✅ PDF generado (simulado). En producción usaría jsPDF.");
};

export const convertToCSV = (data) => {
  if (!Array.isArray(data) || data.length === 0) {
    return "";
  }

  const headers = Object.keys(data[0]);
  const headerRow = headers.map((h) => `"${h}"`).join(",");

  const rows = data.map((item) =>
    headers.map((h) => `"${item[h] || ""}"`).join(",")
  );

  return [headerRow, ...rows].join("\n");
};

export const downloadExcel = (data, filename = "reporte.xlsx") => {
  // Simulación: en producción usar xlsx o python-xlsx
  console.log("📊 Simulando descarga como EXCEL:", filename);
  const csv = convertToCSV(data);
  downloadCSV(data, filename.replace(".xlsx", ".csv"));
  alert("✅ EXCEL generado (descargado como CSV). En producción usaría XLSX.");
};
