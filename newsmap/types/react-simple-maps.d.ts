declare module "react-simple-maps" {
  import { ComponentType, ReactNode, SVGProps } from "react";

  interface ProjectionConfig {
    scale?: number;
    center?: [number, number];
    rotate?: [number, number, number];
    parallels?: [number, number];
  }

  interface ComposableMapProps {
    projection?: string;
    projectionConfig?: ProjectionConfig;
    width?: number;
    height?: number;
    style?: React.CSSProperties;
    className?: string;
    children?: ReactNode;
  }

  interface ZoomableGroupProps {
    zoom?: number;
    center?: [number, number];
    minZoom?: number;
    maxZoom?: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onMoveStart?: (position: any) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onMoveEnd?: (position: any) => void;
    children?: ReactNode;
  }

  interface GeographiesProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    geography: string | object;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: (props: { geographies: any[] }) => ReactNode;
  }

  interface GeographyStyle {
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    outline?: string;
    cursor?: string;
    transition?: string;
    pointerEvents?: string;
  }

  interface GeographyProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    geography: any;
    style?: { default?: GeographyStyle; hover?: GeographyStyle; pressed?: GeographyStyle };
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    onClick?: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    key?: string;
    className?: string;
  }

  export const ComposableMap: ComponentType<ComposableMapProps>;
  export const ZoomableGroup: ComponentType<ZoomableGroupProps>;
  export const Geographies: ComponentType<GeographiesProps>;
  export const Geography: ComponentType<GeographyProps>;
}
