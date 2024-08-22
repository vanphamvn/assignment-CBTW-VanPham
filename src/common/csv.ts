import fs from 'fs';
import csv from 'csv-parser';

export async function parseCsv(filePath) {
  const data: any[] = []; // Define the type of data as any[]

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => data.push(row))
      .on('end', () => resolve(data))
      .on('error', (error) => reject(error));
  });
}