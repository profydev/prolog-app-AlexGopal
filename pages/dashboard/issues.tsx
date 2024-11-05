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
import { Input } from "@features/ui"; // Updated import
import type { NextPage } from "next";

const IssuesPage: NextPage = () => {
  const router = useRouter();
  const { name } = router.query;

  // Initialize searchTerm with name from the URL query if present
  const [searchTerm, setSearchTerm] = useState(
    typeof name === "string" ? name : "",
  );

  // Reference for debounce timeout
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Sync URL query parameter and searchTerm state on load or URL change
  useEffect(() => {
    if (typeof name === "string") {
      setSearchTerm(name);
    }
  }, [name]);

  // Handle search input changes with debouncing and URL update
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);

    // Clear existing timeout if any
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);

    // Set a new timeout to debounce the URL update
    searchTimeoutRef.current = setTimeout(() => {
      router.push(
        {
          pathname: "/dashboard/issues", // Ensure this path is correct
          query: { ...router.query, name: newSearchTerm },
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
      {/* Pass only searchTerm to IssueList */}
      <IssueList searchTerm={searchTerm} />
    </PageContainer>
  );
};

export default IssuesPage;
