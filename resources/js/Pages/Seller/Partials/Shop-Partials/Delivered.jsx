import { Suspense, useEffect, useState } from "react";
import { lazy } from "react";

const ProcessingPreparing = lazy(() => import("./ProcessingPreparing"));
const ProcessingReadyForPickUp = lazy(() =>
    import("./ProcessingReadyForPickup")
);
const ProcessingForPickUp = lazy(() => import("./ProcessingPickedUp"));

export default function Delivered({ processedData }) {
    const [activeProcessingTab, setActiveProcessingTab] = useState();

    return <>hello</>;
}
