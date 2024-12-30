import Head from "next/head";
import { SidebarNavigation } from "../sidebar-navigation";
import { Footer } from "../../footer/footer";
import classNames from "classnames";
import styles from "./page-container.module.scss";
import { useContext } from "react";
import { NavigationContext } from "../sidebar-navigation/navigation-context";

type PageContainerProps = {
  children: React.ReactNode;
  title: string;
  info?: React.ReactNode;
};

export function PageContainer({ children, title, info }: PageContainerProps) {
  const documentTitle = `ProLog - ${title}`;
  const { isSidebarCollapsed } = useContext(NavigationContext);

  return (
    <div className={styles.container}>
      <Head>
        <title>{documentTitle}</title>
        <meta name="description" content="Error monitoring" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className={classNames(
          styles.sidebar,
          isSidebarCollapsed && styles.isCollapsed,
        )}
      >
        <SidebarNavigation />
      </div>

      <div
        className={classNames(
          styles.contentWrapper,
          isSidebarCollapsed && styles.isCollapsed,
        )}
      >
        <main className={styles.main}>
          <div className={styles.contentContainer}>
            <h1 className={styles.title}>{title}</h1>
            <div className={styles.info}>{info}</div>
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
