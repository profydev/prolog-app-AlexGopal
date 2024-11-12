// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import { PageContainer } from "@features/layout";
// import { IssueList } from "@features/issues";
// import { Input } from "@features/ui/input";
// import { useGetIssues } from "@features/issues/api/use-get-issues";
// import type { NextPage } from "next";

// const IssuesPage: NextPage = () => {
//   const router = useRouter();
//   const { name } = router.query;
//   const [searchTerm, setSearchTerm] = useState(name || "");

//   // Call useGetIssues with the current page and name filter from URL
//   const { data: issues } = useGetIssues(1, name as string);

//   // Log the API response to verify filtered data
//   useEffect(() => {
//     if (issues) {
//       console.log("Filtered issues:", issues); // Log API response
//     }
//   }, [issues]);

//   // Sync URL and state on initial load or URL change
//   useEffect(() => {
//     if (typeof name === 'string') {
//       setSearchTerm(name);
//     }
//   }, [name]);

//   // Handle input changes with debouncing and URL updating
//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const newSearchTerm = event.target.value;
//     setSearchTerm(newSearchTerm);
//     console.log("Search term:", newSearchTerm); // Log the updated search term

//     // Debounce updating the URL
//     clearTimeout((window as any).searchTimeout);
//     (window as any).searchTimeout = setTimeout(() => {
//       router.push({
//         pathname: '/issues',
//         query: { ...router.query, name: newSearchTerm },
//       }, undefined, { shallow: true });
//     }, 500);
//   };

//   return (
//     <PageContainer
//       title="Issues"
//       info="Overview of errors, warnings, and events logged from your projects."
//     >
//       <Input
//         label="Search issues"
//         variant="outlined"
//         value={searchTerm}
//         onChange={handleSearchChange}
//       />
//       {/* Placeholder for IssueList, displaying issues will be in Step 5 */}
//     </PageContainer>
//   );
// };

// export default IssuesPage;

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { PageContainer } from "@features/layout";
import { IssueList } from "@features/issues";
import { Input } from "@features/ui";
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
      <Input
        label="Search issues"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <IssueList searchTerm={searchTerm} />
    </PageContainer>
  );
};

export default IssuesPage;
