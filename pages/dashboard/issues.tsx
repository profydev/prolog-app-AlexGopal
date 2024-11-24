// original

// import { useState, useEffect, useRef } from "react";
// import { useRouter } from "next/router";
// import { PageContainer } from "@features/layout";
// import { IssueList } from "@features/issues";
// import { Input } from "@features/ui";
// import { SelectComponent } from "@features/ui";
// import type { NextPage } from "next";

// const IssuesPage: NextPage = () => {
//   const router = useRouter();
//   const { name } = router.query;

//   const [searchTerm, setSearchTerm] = useState(
//     typeof name === "string" ? decodeURIComponent(name) : "",
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
//         { shallow: true },
//       );
//     }, 500);
//   };

//   return (
//     <PageContainer
//       title="Issues"
//       info="Overview of errors, warnings, and events logged from your projects."
//     >
//       <SelectComponent></SelectComponent>
//       <Input
//         label="Search issues"
//         variant="outlined"
//         value={searchTerm}
//         onChange={handleSearchChange}
//       />
//       <IssueList searchTerm={searchTerm} />
//     </PageContainer>
//   );
// };

// export default IssuesPage;

// non reuseable version

// import { useState, useEffect, useRef } from "react";
// import { useRouter } from "next/router";
// import { PageContainer } from "@features/layout";
// import { IssueList } from "@features/issues";
// import { Input } from "@features/ui";
// import { SelectComponent } from "@features/ui";
// import type { NextPage } from "next";

// const IssuesPage: NextPage = () => {
//   const router = useRouter();
//   const { name } = router.query;

//   const [searchTerm, setSearchTerm] = useState(
//     typeof name === "string" ? decodeURIComponent(name) : "",
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
//         { shallow: true },
//       );
//     }, 500);
//   };

//   return (
//     <PageContainer
//       title="Issues"
//       info="Overview of errors, warnings, and events logged from your projects."
//     >
//     <SelectComponent
//       label="Status"
//       value={Array.isArray(router.query.status) ? router.query.status[0] : router.query.status || ""}
//       onChange={(value) => {
//         const status = typeof value === "string" ? value : undefined; // Ensure `status` is a string or undefined
//         const newQuery = {
//           ...router.query,
//           status, // Safely add `status` to the query
//         };

//         router.push({
//           pathname: router.pathname,
//           query: newQuery,
//         });
//       }}
//     />
//       <Input
//         label="Search issues"
//         variant="outlined"
//         value={searchTerm}
//         onChange={handleSearchChange}
//       />
//       <IssueList searchTerm={searchTerm} />
//     </PageContainer>
//   );
// };

// export default IssuesPage;

// reuseable version

// import { useState, useEffect, useRef } from "react";
// import { useRouter } from "next/router";
// import { PageContainer } from "@features/layout";
// import { IssueList } from "@features/issues";
// import { Input } from "@features/ui";
// import { SelectComponent } from "@features/ui";
// import type { NextPage } from "next";

// const IssuesPage: NextPage = () => {
//   const router = useRouter();
//   const { name } = router.query;

//   const [searchTerm, setSearchTerm] = useState(
//     typeof name === "string" ? decodeURIComponent(name) : "",
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
//         { shallow: true },
//       );
//     }, 500);
//   };

//   return (
//     <PageContainer
//       title="Issues"
//       info="Overview of errors, warnings, and events logged from your projects."
//     >
//   <SelectComponent
//       label="Status"
//       value={Array.isArray(router.query.status) ? router.query.status[0] : router.query.status || ""}
//       options={[
//         { label: "All", value: "" },
//         { label: "Resolved", value: "resolved" },
//         { label: "Unresolved", value: "unresolved" },
//       ]}
//       onChange={(value) => {
//         const status = typeof value === "string" ? value : undefined; // Ensure status is a valid string
//         const newQuery = {
//           ...router.query,
//           status, // Add or remove the status filter
//         };

//         router.push({
//           pathname: router.pathname,
//           query: newQuery,
//         });
//       }}
//   />
//       <Input
//         label="Search issues"
//         variant="outlined"
//         value={searchTerm}
//         onChange={handleSearchChange}
//       />
//       <IssueList searchTerm={searchTerm} />

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

const IssuesPage: NextPage = () => {
  const router = useRouter();
  const { name } = router.query;

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
      info="Overview of errors, warnings, and events logged from your projects."
    >
      <SelectComponent
        label="Status"
        /*
          This code ensures that the status query parameter from the router.query object is:
          - Converted to a single value (if it's an array).
          - Defaulted to an empty string if it is not present.
        */

        /*
          Explanation of `router.query.status`:
          - This comes from Next.js's useRouter() hook.
          - `router.query` contains all the query parameters from the URL, and `router.query.status` represents the `status` parameter.
          - `Array.isArray(router.query.status)`:
              - Query parameters in Next.js can be either:
                - A string (e.g., `?status=resolved` → `"resolved"`).
                - An array of strings (e.g., `?status=resolved&status=unresolved` → `["resolved", "unresolved"]`).
              - This check determines whether `router.query.status` is an array.
          - `router.query.status[0]`:
              - If `router.query.status` is an array, this extracts the first element (e.g., `"resolved"` from `["resolved", "unresolved"]`).
              - This ensures only one value is used in cases where multiple values might accidentally appear in the query.
          - `router.query.status || ""`:
              - If `router.query.status` is undefined or null (i.e., the `status` parameter is not in the URL), this defaults it to an empty string (`""`).
              - This avoids passing undefined or null, which can lead to errors or unintended behavior.
        */
        // We take only the first value because we assume `status` can actually only have one value at a time
        value={
          Array.isArray(router.query.status)
            ? router.query.status[0]
            : router.query.status || ""
        }
        options={[
          { label: "All", value: "" }, // No filtering
          { label: "Resolved", value: "resolved" }, // Maps to API's "resolved"
          { label: "Unresolved", value: "open" }, // Maps to API's "open"
        ]}
        onChange={(value) => {
          const status = typeof value === "string" ? value : undefined; // Ensure `status` is a valid string
          const newQuery = {
            ...router.query,
            status, // Add or remove the `status` filter
          };

          // Update the URL with the new query parameters
          router.push({
            pathname: router.pathname,
            query: newQuery,
          });
        }}
      />

      <Input
        label="Search issues"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <IssueList
        searchTerm={searchTerm}
        status={
          Array.isArray(router.query.status)
            ? router.query.status[0]
            : router.query.status || ""
        }
      />
    </PageContainer>
  );
};

export default IssuesPage;
