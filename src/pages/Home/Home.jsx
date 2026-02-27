import { Helmet } from "react-helmet-async";

import Hero from "./Hero";
import Introduction from "./Introduction";
import Services from "./Services";
import FoodMenu from "./FoodMenu";
import Destination from "./Destination";
import Reviews from "./Reviews";

export default function Home() {
    return (
        <>
            <Helmet>
                <title>
                    Best Houseboat in Alleppey Backwaters | Galilea Houseboat
                </title>

                <meta
                    name="description"
                    content="Experience the best houseboat in Alleppey backwaters with Galilea Houseboat. Luxury AC rooms, Kerala cuisine, and scenic backwater cruises."
                />
            </Helmet>

            <Hero />
            <Introduction />
            <Services />
            <Destination />
            <FoodMenu />
            <Reviews />
        </>
    );
}