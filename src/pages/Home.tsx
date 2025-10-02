import { KeyboardEvent, useCallback, useEffect, useMemo } from "react";
import Typewriter from "typewriter-effect";
import Spline from "@splinetool/react-spline";
import LiquidEther from "../components/LiquidEther";
import "./Home.css";

const Home = () => {
    const energyPalette = useMemo(
        () => ["#2f2f5c", "#646cff", "#bfcfff"],
        []
    );

    const handleNabigateToPrompt = useCallback(() => {
        window.location.hash = "prompt";
    }, []);

    const handleFooterKeyDown = useCallback(
        (event: KeyboardEvent<HTMLElement>) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handleNabigateToPrompt();
            }
        },
        [handleNabigateToPrompt]
    );

    useEffect(() => {
        const handleWheel = (event: WheelEvent) => {
            if (event.deltaY < -40) {
                handleNabigateToPrompt();
            }
        };

        window.addEventListener("wheel", handleWheel, { passive: true });
        return () => {
            window.removeEventListener("wheel", handleWheel);
        };
    }, [handleNabigateToPrompt]); 

    return (
        <div className="home">
            <LiquidEther
                className="home__liquid"
                colors={[ '#5227FF', '#293699', '#6AA5BE' ]}
                mouseForce={20}
                cursorSize={100}
                isViscous={false}
                viscous={30}
                iterationsViscous={32}
                iterationsPoisson={32}
                resolution={0.5}
                isBounce={false}
                autoDemo={true}
                autoSpeed={0.5}
                autoIntensity={2.2}
                takeoverDuration={0.25}
                autoResumeDelay={3000}
                autoRampDuration={0.6}
            />

            <div className="home__overlay"/>

            <header className="home__masthead">Reconnected Outsider</header>

            <div className="home__planet">
                <Spline scene="https://my.spline.design/planetbw-f8f404c0bd70dfef5908d623a953d7da/scene.splinecode" />
            </div>

            <div className="home__content">
                <h1 className="home__title font-display">
                    <Typewriter
                        onInit={(typewriter) => {
                            typewriter
                                .typeString("Embodied Intelligence")
                                .pauseFor(2600)
                                .deleteAll()
                                .pauseFor(600)
                                .start()
                        }}
                        options={{
                            loop: true,
                            delay: 85,
                            deleteSpeed: 20,
                            cursor: "▌",
                            wrapperClassName: "home__typewriter-wrapper",
                            cursorClassName: "home__typewriter-cursor",
                        }}
                    />
                </h1>
                <p className="home__subtitle">The Hidden Cost of AI</p>
            </div>

            <p className="home__tagline">
                Measure your AI prompts&apos; environmental footprint
            </p>

            <footer
                className="home__footer"
                role="button"
                tabIndex={0}
                onClick={handleNabigateToPrompt}
                onKeyDown={handleFooterKeyDown}
            >
                Scroll Up
            </footer>

        </div>
    );
};

export default Home;