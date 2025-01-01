// import capitalize from "lodash/capitalize";
// import { Badge, BadgeColor, BadgeSize } from "@features/ui";
// import { ProjectLanguage } from "@api/projects.types";
// import { IssueLevel } from "@api/issues.types";
// import type { Issue } from "@api/issues.types";
// import styles from "./issue-row.module.scss";

// type IssueRowProps = {
//   projectLanguage: ProjectLanguage;
//   issue: Issue;
// };

// const levelColors = {
//   [IssueLevel.info]: BadgeColor.success,
//   [IssueLevel.warning]: BadgeColor.warning,
//   [IssueLevel.error]: BadgeColor.error,
// };

// export function IssueRow({ projectLanguage, issue }: IssueRowProps) {
//   const { name, message, stack, level, numEvents, numUsers } = issue;
//   const firstLineOfStackTrace = stack.split("\n")[1];

//   return (
//     <tr className={styles.row}>
//       <td className={styles.issueCell}>
//         {/* eslint-disable-next-line @next/next/no-img-element */}
//         <img
//           className={styles.languageIcon}
//           src={`/icons/${projectLanguage}.svg`}
//           alt={projectLanguage}
//         />
//         <div>
//           <div className={styles.errorTypeAndMessage}>
//             <span className={styles.errorType}>{name}:&nbsp;</span>
//             {message}
//           </div>
//           <div>{firstLineOfStackTrace}</div>
//         </div>
//       </td>
//       <td className={styles.cell}>
//         <Badge color={levelColors[level]} size={BadgeSize.sm}>
//           {capitalize(level)}
//         </Badge>
//       </td>
//       <td className={styles.cell}>{numEvents}</td>
//       <td className={styles.cell}>{numUsers}</td>
//     </tr>
//   );
// }

import { useState, useEffect } from "react";
import capitalize from "lodash/capitalize";
import { Badge, BadgeColor, BadgeSize } from "@features/ui";
import { ProjectLanguage } from "@api/projects.types";
import { IssueLevel } from "@api/issues.types";
import type { Issue } from "@api/issues.types";
import styles from "./issue-row.module.scss";

type IssueRowProps = {
  projectLanguage: ProjectLanguage;
  issue: Issue;
};

const levelColors = {
  [IssueLevel.info]: BadgeColor.success,
  [IssueLevel.warning]: BadgeColor.warning,
  [IssueLevel.error]: BadgeColor.error,
};

export function IssueRow({ projectLanguage, issue }: IssueRowProps) {
  const { name, message, stack, level, numEvents, numUsers } = issue;
  const firstLineOfStackTrace = stack.split("\n")[1];

  // Detect screen width to toggle between mobile/desktop views
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check screen width when component mounts and on resize
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1023); // Mobile screen width
    };

    // Set the initial state on mount
    handleResize();

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isMobile ? (
        // Mobile View
        <tr className={styles.mobile}>
          <td className={styles.issueCell}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={styles.languageIcon}
              src={`/icons/${projectLanguage}.svg`}
              alt={projectLanguage}
            />
            <div>
              <div className={styles.errorTypeAndMessage}>
                <span className={styles.errorType}>{name}:&nbsp;</span>
                {message}
              </div>
              <div>{firstLineOfStackTrace}</div>
              <div className={styles.cell}>
                <div>Status</div>
                <Badge color={levelColors[level]} size={BadgeSize.sm}>
                  {capitalize(level)}
                </Badge>
              </div>
              <div>Events</div>
              <div className={styles.cell}>{numEvents}</div>
              <div>Users</div>
              <div className={styles.cell}>{numUsers}</div>
            </div>
          </td>
        </tr>
      ) : (
        // Desktop View
        <tr className={styles.row}>
          <td className={styles.issueCell}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={styles.languageIcon}
              src={`/icons/${projectLanguage}.svg`}
              alt={projectLanguage}
            />
            <div>
              <div className={styles.errorTypeAndMessage}>
                <span className={styles.errorType}>{name}:&nbsp;</span>
                {message}
              </div>
              <div>{firstLineOfStackTrace}</div>
            </div>
          </td>
          <td className={styles.cell}>
            <Badge color={levelColors[level]} size={BadgeSize.sm}>
              {capitalize(level)}
            </Badge>
          </td>
          <td className={styles.cell}>{numEvents}</td>
          <td className={styles.cell}>{numUsers}</td>
        </tr>
      )}
    </>
  );
}
