// // import { Routes } from "@config/routes";
// import { Header } from "../features/header/header";
// import { ContactModal } from "../features/landing-page/contact-modal";
// import { InferGetStaticPropsType, GetStaticProps } from "next";

// type meta = {
//   title: string;
//   description: string;

// }

// const IssuesPage = () => {
//   return (
//     <div>
//       <Header />
//       <ContactModal />
//     </div>
//   );
// };

// export default IssuesPage;

// import { Routes } from "@config/routes";

import { useEffect, useState } from "react";
import { getHeroSection } from "../api/content";
import type { HeroSection } from "../api/content.types";
import { Header } from "../features/header/header";
import { ContactModal } from "../features/landing-page/contact-modal";
import styles from "./index.module.scss"; // Update to your actual SCSS file path

const IssuesPage = () => {
  const [heroSection, setHeroSection] = useState<HeroSection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const hero = await getHeroSection();
        console.log("Hero Section:", hero);
        setHeroSection(hero);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchHero();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!heroSection) return <p>Hero section not found.</p>;

  // const imageUrl = heroSection.image
  //   ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${heroSection.image.src}`
  //   : null;

  return (
    <div>
      <Header />
      <ContactModal />
      <div className={styles.heroWrapper}>
        <div className={styles.content}>
          <h1 className={styles.heroTitle}>{heroSection.title}</h1>
          <p className={styles.subTitle}>{heroSection.subtitle}</p>
        </div>
        {heroSection.image && (
          <img
            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${heroSection.image.src}`}
            alt="Hero"
            width={heroSection.image.width}
            height={heroSection.image.height}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        )}
      </div>
    </div>
  );
};

export default IssuesPage;
