import { parseCsv } from './csv';

export async function getTestData(filePath) {
  const data = await parseCsv(filePath);

  return (data as any[]).map((row) => ({
    username: row.username,
    password: row.password,
  }));
}