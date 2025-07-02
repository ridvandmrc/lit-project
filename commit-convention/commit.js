import * as fs from "fs";
import * as path from "path";

const TYPE = ["feat", "fix", "docs", "style", "refactor", "test", "chore"];
const SUBJECT_LENGTH = 60;

const _msg = (message) => {
  console.log(message);
  process.exit(1); // Exit with a failure code
};

// Check subject of commit
const checkSubject = (subject) => {
  if (subject.length > SUBJECT_LENGTH)
    _msg(
      `Please check the commit message, subject should be less than ${SUBJECT_LENGTH} characters`
    );

  const [type, summary] = subject.split(": ");

  if (!type || !TYPE.includes(type?.toLowerCase().trim()))
    _msg(
      `Please check the commit message, type should be: ${TYPE.join(": ,")}: `
    );

  if (!summary)
    _msg(`Please check the commit message, message should contain summary.`);
};

const check = (commitMessage) => {
  const [subject] = commitMessage.split("\n\n");

  if (!subject)
    _msg(
      "Please check the commit message, it should be: \n[Subject]\n(Description)"
    );

  return {
    subject: () => checkSubject(subject),
  };
};

const main = () => {
  // Read commit message file
  const commitMsgFile = process.argv[2];
  const commitMessage = fs
    .readFileSync(path.join(commitMsgFile), "utf-8")
    .trim();

  const checkMessage = check(commitMessage);
  checkMessage.subject();

  console.log("Commit message is valid!!!");
};

// call main function and check commit messages
main();
