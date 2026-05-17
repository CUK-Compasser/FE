export interface AddressSearchItem {
  id: string;
  label: string;
  roadAddress: string;
  lotNumberAddress: string;
  zonecode: string;
}

export interface DaumPostcodeData {
  zonecode: string;
  roadAddress: string;
  jibunAddress: string;
  address: string;
  buildingName: string;
  bname: string;
}

declare global {
  interface Window {
    daum?: {
      Postcode: new (options: {
        oncomplete: (data: DaumPostcodeData) => void;
        onclose?: () => void;
      }) => {
        open: () => void;
      };
    };
  }
}

export {};