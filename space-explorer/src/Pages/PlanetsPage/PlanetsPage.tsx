import { useCallback, useMemo, useRef, useState } from "react";
import { nanoid } from "@reduxjs/toolkit";

import styles from "./PlanetsPage.module.scss";
import { globalState, setError, setIsLoading } from "@SpaceExplorer/redux-slices/globalSlice";
import { useAppDispatch, useAppSelector } from "@SpaceExplorer/App/hooks";
import useGetAgentView from "@SpaceExplorer/hooks/useGetAgentView";

import { ErrorMessage } from "@SpaceExplorer/Layouts";
import PlanetButton from "@SpaceExplorer/Components/PlanetButton/PlanetButton";
import * as planets from "@SpaceExplorer/assets/Planets/index";

import { fetchPlanets } from "@SpaceExplorer/services/Fetch-planets-api";
import {
    planetState,
    resetPlanetData,
    setPlanet,
    setPlanetImage,
} from "@SpaceExplorer/redux-slices/planetSlice";
import PlanetCard from "@SpaceExplorer/Components/PlanetCard/PlanetCard";
import { TGLobalError } from "@SpaceExplorer/Interfaces and types/Types/types";

export const PlanetsPage = () => {
    const globalData = useAppSelector(globalState);
    const planetData = useAppSelector(planetState);

    const dispatch = useAppDispatch();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const scrollPosition = useRef<number>(0);
    const currentlySelectedPlanet = useRef<string>(planetData.name);

    const planetsListImages = useMemo(() => {
        return Object.entries(planets);
    }, []);
    const { isMobileWidth } = useGetAgentView();

    const handleFetchPlanetData = useCallback(
        async (planetName: string) => {
            if (currentlySelectedPlanet.current.toLowerCase() === planetName.toLowerCase()) return;
            if (!planetName) return;
            currentlySelectedPlanet.current = planetName;
            scrollPosition.current = window.scrollY;

            try {
                dispatch(setIsLoading(true));
                const controller = new AbortController();
                const signal = controller.signal;

                const res = await fetchPlanets({
                    signal,
                    controller: controller,
                    searchValue: planetName,
                });
                if (res && Array.isArray(res)) {
                    dispatch(setPlanet(res));
                }
                const planetImage = Object.values(planets).find((el) =>
                    el.includes(planetName.toLowerCase())
                );
                dispatch(setPlanetImage(planetImage || ""));
                setIsModalOpen(true);
            } catch (error) {
                console.error("Failed to fetch planet data", error);
                dispatch(setError(error as TGLobalError));
                setIsModalOpen(false);
            } finally {
                dispatch(setIsLoading(false));
                window.scrollTo(0, scrollPosition.current);
            }
        },
        [dispatch]
    );

    const renderPlanets = useMemo(
        () =>
            planetsListImages.map((el) => (
                <PlanetButton
                    key={nanoid()}
                    image={el[1]}
                    planetName={el[0]}
                    handleFetchPlanetData={handleFetchPlanetData}
                />
            )),
        [planetsListImages, handleFetchPlanetData]
    );

    const handleCloseTheModal = useCallback(() => {
        dispatch(resetPlanetData());
        setIsModalOpen(false);
        currentlySelectedPlanet.current = "";
    }, [dispatch]);

    return (
        <section
            id="planets"
            style={{ marginTop: isMobileWidth ? "200px" : "100px" }}
            className={styles["planets-main-container"]}
        >
            <div
                className={
                    styles[!isMobileWidth ? "planets-header-container" : "planets-header-container-mobile"]
                }
            >
                <h3 className={styles["header"]}>Solar system planets</h3>
                <p className={styles["sub-text"]}>
                    Explore the planets of our solar system, Pluto included &#128512;
                </p>
            </div>

            {isModalOpen && <PlanetCard handleCloseModal={handleCloseTheModal} />}
            <div className={styles["planets-secondary-container"]}>
                {globalData.error.error && globalData.error.page === "planets" ? (
                    <div className={styles["loader-error"]}>
                        <ErrorMessage error={globalData.error.error} />
                    </div>
                ) : (
                    <div className={styles["planet-buttons-container"]}>{renderPlanets}</div>
                )}
            </div>
        </section>
    );
};

export default PlanetsPage;
