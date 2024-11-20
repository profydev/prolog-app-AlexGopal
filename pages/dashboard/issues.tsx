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
      <SelectComponent></SelectComponent>
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
