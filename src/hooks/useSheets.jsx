import { useQuery } from '@tanstack/react-query';

const fetchDataFromCsv = async () => {
  try {
    const response = await fetch(
      'https://docs.google.com/spreadsheets/d/1zeDo4QaGobB9s4Qnibb9HJujpiFO9OfXSaqhEwv5CUQ/gviz/tq?tqx=out:csv&gid=0'
    );

    if (!response.ok) {
      throw new Error('Failed to fetch data from Google Sheets');
    }

    const csvData = await response.text();
    const parsedData = parseCsv(csvData);
    return parsedData;
  } catch (error) {}
};

const parseCsv = (csvData) => {
  return csvData.split('\n').map((row) => row.split(/","/));
};

const useGoogleSheetsData = () => {
  return useQuery({queryKey:'googleSheetsData',queryFn: fetchDataFromCsv});
};

export default useGoogleSheetsData;
