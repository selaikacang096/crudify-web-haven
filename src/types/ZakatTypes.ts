
export interface ZakatRecord {
  id: string;
  penginput: string;
  tanggal: string;
  nama: string;
  alamat: string;
  zakatFitrah: {
    jiwaBeras: number;
    berasKg: number;
    jiwaUang: number;
    uang: number;
  };
  zakatMaal: number;
  infaq: {
    beras: number;
    uang: number;
  };
  fidyah: {
    beras: number;
    uang: number;
  };
  totalBeras: number;
  totalUang: number;
  createdAt: string;
  updatedAt: string;
}

export type ZakatFormData = Omit<ZakatRecord, 'id' | 'totalBeras' | 'totalUang' | 'createdAt' | 'updatedAt'>;

export interface TableColumn {
  key: string;
  label: string;
  render?: (value: any, record: ZakatRecord) => React.ReactNode;
}

export interface DailyReportItem {
  label: string;
  count: number;
  color: string;
}

export interface DailyReportData {
  date: string;
  totalRecords: number;
  items: DailyReportItem[];
}
