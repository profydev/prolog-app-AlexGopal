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

  console.log("Extracted projectId from query:", projectId); // Log projectId

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

  // const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   const selectedValue = event.target.value;
  //   router.push(
  //     {
  //       pathname: router.pathname,
  //       query: { ...router.query, filter: selectedValue }, // Add or update the `filter` query parameter
  //     },
  //     undefined,
  //     { shallow: true }
  //   );
  // };

  return (
    <PageContainer
      title="Issues"
      info="Overview of errors, warnings, and events logged from your projects."
    >
      <div className={styles.filterControls}>
        <SelectComponent
          label="Status"
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
            // console.log("Level changed to:", value); // Add this
            const level = typeof value === "string" ? value : undefined; // Ensure `level` is a valid string
            const newQuery = {
              ...router.query,
              level, // Add or remove the `level` filter
            };

            // Update the URL with the new query parameters
            router.push({
              pathname: router.pathname,
              query: newQuery,
            });
          }}
        />
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
        // we just cast proejctId as a string for saftey
        // from earlier in our code we already know all query parameter values can be
        // string | string[] | undefined
        // see the select component
        projectId={projectId as string}
      />
    </PageContainer>
  );
};

export default IssuesPage;
