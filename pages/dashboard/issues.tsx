// import { useState, useEffect, useRef } from "react";
// import { useRouter } from "next/router";
// import { PageContainer } from "@features/layout";
// import { IssueList } from "@features/issues";
// import { Input } from "@features/ui";
// import { SelectComponent } from "@features/ui";
// import type { NextPage } from "next";
// import styles from "./issues.module.scss";

// const IssuesPage: NextPage = () => {
//   const router = useRouter();
//   const { name, projectId } = router.query;

//   const [searchTerm, setSearchTerm] = useState(
//     typeof name === "string" ? decodeURIComponent(name) : ""
//   );

//   const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

//   useEffect(() => {
//     if (typeof name === "string") {
//       setSearchTerm(decodeURIComponent(name));
//     }
//   }, [name]);

//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const newSearchTerm = event.target.value;
//     setSearchTerm(newSearchTerm);

//     if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);

//     searchTimeoutRef.current = setTimeout(() => {
//       router.push(
//         {
//           pathname: "/dashboard/issues",
//           query: { ...router.query, name: newSearchTerm }, // Avoid encoding here
//         },
//         undefined,
//         { shallow: true }
//       );
//     }, 500);
//   };

//   // Determine if it's the Issues page or the Projects page
//   const isIssuePage = router.pathname === "/dashboard/issues";

//   // Correct message for Issues and Projects pages
//   const infoMessage = isIssuePage
//     ? "Overview of errors, warnings, and events logged from your projects."
//     : "Overview of your projects sorted by alert level.";

//   return (
//     <PageContainer
//       title="Issues"
//       info={
//         <span className={styles.breakText}>
//           {isIssuePage ? (
//             <>
//               Overview of errors, warnings, and events <br /> logged from your
//               projects.
//             </>
//           ) : (
//             <>
//               Overview of your projects sorted by alert  <br /> level.
//             </>
//           )}
//         </span>
//       }
//     >
//       <div className={styles.filterControls}>
//         <div className={styles.selectContainer}>
//           <SelectComponent
//             label="Status"
//             value={
//               Array.isArray(router.query.status)
//                 ? router.query.status[0]
//                 : router.query.status || ""
//             }
//             options={[
//               { label: "All", value: "" },
//               { label: "Resolved", value: "resolved" },
//               { label: "Unresolved", value: "open" },
//             ]}
//             onChange={(value) => {
//               const status = typeof value === "string" ? value : undefined;
//               const newQuery = {
//                 ...router.query,
//                 status,
//               };
//               router.push({
//                 pathname: router.pathname,
//                 query: newQuery,
//               });
//             }}
//           />
//         </div>
//         <div className={styles.selectContainer}>
//           <SelectComponent
//             label="Level"
//             value={(router.query.level as string) || ""}
//             options={[
//               { label: "All", value: "" },
//               { label: "Error", value: "error" },
//               { label: "Warning", value: "warning" },
//               { label: "Info", value: "info" },
//             ]}
//             onChange={(value) => {
//               const level = typeof value === "string" ? value : undefined;
//               const newQuery = {
//                 ...router.query,
//                 level,
//               };
//               router.push({
//                 pathname: router.pathname,
//                 query: newQuery,
//               });
//             }}
//           />
//         </div>
//         <div className={styles.inputContainer}>
//           <Input
//             label="Search issues"
//             variant="outlined"
//             value={searchTerm}
//             onChange={handleSearchChange}
//           />
//         </div>
//       </div>
//       <IssueList
//         searchTerm={searchTerm}
//         status={
//           Array.isArray(router.query.status)
//             ? router.query.status[0]
//             : router.query.status || ""
//         }
//         level={
//           Array.isArray(router.query.level)
//             ? router.query.level[0]
//             : router.query.level || ""
//         }
//         projectId={projectId as string}
//       />
//     </PageContainer>
//   );
// };

// export default IssuesPage;

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { PageContainer } from "@features/layout";
import { IssueList } from "@features/issues";
import { Input } from "@features/ui";
import { SelectComponent } from "@features/ui";
import type { NextPage } from "next";
import styles from "./issues.module.scss";

const IssuesPage: NextPage = () => {
  const router = useRouter();
  const { name, projectId } = router.query;

  const [searchTerm, setSearchTerm] = useState(
    typeof name === "string" ? decodeURIComponent(name) : "",
  );

  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof name === "string") {
      setSearchTerm(decodeURIComponent(name));
    }
  }, [name]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);

    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);

    searchTimeoutRef.current = setTimeout(() => {
      router.push(
        {
          pathname: "/dashboard/issues",
          query: { ...router.query, name: newSearchTerm }, // Avoid encoding here
        },
        undefined,
        { shallow: true },
      );
    }, 500);
  };

  return (
    <PageContainer
      title="Issues"
      info={
        <>
          Overview of errors, warnings, and events <br /> logged from your
          projects.
        </>
      }
    >
      <div className={styles.filterControls}>
        <div className={styles.selectContainer}>
          <SelectComponent
            label="Status"
            value={
              Array.isArray(router.query.status)
                ? router.query.status[0]
                : router.query.status || ""
            }
            options={[
              { label: "All", value: "" },
              { label: "Resolved", value: "resolved" },
              { label: "Unresolved", value: "open" },
            ]}
            onChange={(value) => {
              const status = typeof value === "string" ? value : undefined;
              const newQuery = {
                ...router.query,
                status,
              };
              router.push({
                pathname: router.pathname,
                query: newQuery,
              });
            }}
          />
        </div>
        <div className={styles.selectContainer}>
          <SelectComponent
            label="Level"
            value={(router.query.level as string) || ""}
            options={[
              { label: "All", value: "" },
              { label: "Error", value: "error" },
              { label: "Warning", value: "warning" },
              { label: "Info", value: "info" },
            ]}
            onChange={(value) => {
              const level = typeof value === "string" ? value : undefined;
              const newQuery = {
                ...router.query,
                level,
              };
              router.push({
                pathname: router.pathname,
                query: newQuery,
              });
            }}
          />
        </div>
        <div className={styles.inputContainer}>
          <Input
            label="Search issues"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <IssueList
        searchTerm={searchTerm}
        status={
          Array.isArray(router.query.status)
            ? router.query.status[0]
            : router.query.status || ""
        }
        level={
          Array.isArray(router.query.level)
            ? router.query.level[0]
            : router.query.level || ""
        }
        projectId={projectId as string}
      />
    </PageContainer>
  );
};

export default IssuesPage;
