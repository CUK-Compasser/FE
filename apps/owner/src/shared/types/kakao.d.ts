export {};

declare global {
  interface Window {
    kakao: {
      maps: {
        load: (callback: () => void) => void;

        LatLng: new (latitude: number, longitude: number) => KakaoLatLng;

        Map: new (
          container: HTMLElement,
          options: {
            center: KakaoLatLng;
            level: number;
          }
        ) => KakaoMapInstance;

        Marker: new (options: {
          map?: KakaoMapInstance | null;
          position: KakaoLatLng;
          title?: string;
          image?: KakaoMarkerImage;
        }) => KakaoMarker;

        MarkerImage: new (
          src: string,
          size: KakaoSize,
          options?: {
            offset?: KakaoPoint;
            alt?: string;
            shape?: string;
            coords?: string;
            spriteOrigin?: KakaoPoint;
            spriteSize?: KakaoSize;
          }
        ) => KakaoMarkerImage;

        Size: new (width: number, height: number) => KakaoSize;

        Point: new (x: number, y: number) => KakaoPoint;

        event: {
          addListener: (
            target: object,
            type: string,
            handler: (...args: unknown[]) => void
          ) => void;
          removeListener: (
            target: object,
            type: string,
            handler: (...args: unknown[]) => void
          ) => void;
        };

        services: {
          Geocoder: new () => {
            addressSearch: (
              address: string,
              callback: (
                result: KakaoAddressSearchResult[],
                status: string
              ) => void,
              options?: {
                page?: number;
                size?: number;
                analyze_type?: string;
              }
            ) => void;
          };

          Status: {
            OK: string;
            ZERO_RESULT: string;
            ERROR: string;
          };

          AnalyzeType: {
            SIMILAR: string;
            EXACT: string;
          };
        };
      };
    };
  }

  interface KakaoLatLng {}

  interface KakaoMapInstance {
    relayout: () => void;
    setCenter: (latlng: KakaoLatLng) => void;
  }

  interface KakaoMarker {
    setMap: (map: KakaoMapInstance | null) => void;
    setPosition: (position: KakaoLatLng) => void;
  }

  interface KakaoMarkerImage {}

  interface KakaoSize {}

  interface KakaoPoint {}

  interface KakaoAddressSearchResult {
    address_name: string;
    x: string;
    y: string;
    address?: {
      address_name: string;
    };
    road_address?: {
      address_name: string;
    };
  }
}