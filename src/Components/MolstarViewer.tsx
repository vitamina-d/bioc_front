import { useEffect, useRef } from "react";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Molstar: any;
    molstarLoaded?: boolean;
  }
}

export default function MolstarViewer() {
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (viewerRef.current) {
      const viewer = new window.Molstar.Viewer(viewerRef.current, {
        layoutIsExpanded: false,
        layoutShowControls: true,
      });
      viewer.loadPdbId("1CRN");
    }
  }, []);

  return <div ref={viewerRef} style={{ width: "100%", height: "600px" }} />;
}
