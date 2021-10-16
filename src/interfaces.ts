export interface BandiEventProps {
  init: (x: InitProps) => void;
  getCurrentBalance: () => number;
  startMonetization: () => void;
  stopMonetization: () => void;
  isActive: () => boolean;
}

export interface InitProps {
  currentBalance: number;
  multiplier: number;
  onTransaction?: () => number;
}

export interface IIndexable {
  [key: string]: unknown;
}

export interface EventDetail {
  paymentPointer: string;
  requestId: string;
  amount: number;
  assetCode: string;
  assetScale: number;
  receipt: string;
}

export interface Transaction {
  assetScale: number;
  amount: number;
  currentBalance: number;
  multiplier: number;
}
