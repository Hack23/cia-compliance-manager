import { existsSync, readFileSync, readdirSync } from "fs";
import { join } from "path";

const srcDir = join(process.cwd(), "src");

// Get all files in the src directory recursively
function getAllFiles(dir: string, fileList: string[] = []): string[] {
  const files = readdirSync(dir);

  files.forEach((file) => {
    const filePath = join(dir, file);
    if (file.endsWith(".ts") || file.endsWith(".tsx")) {
      fileList.push(filePath);
    } else if (
      existsSync(filePath) &&
      filePath.indexOf("node_modules") === -1
    ) {
      fileList = getAllFiles(filePath, fileList);
    }
  });

  return fileList;
}

// Check if a file is imported anywhere
function isFileImported(filePath: string, allFiles: string[]): boolean {
  const fileName = filePath
    .split("/")
    .pop()
    ?.replace(/\.[^/.]+$/, "");
  if (!fileName) return false;

  return allFiles.some((file) => {
    if (file === filePath) return false;

    const content = readFileSync(file, "utf-8");
    return (
      content.includes(`from './${fileName}'`) ||
      content.includes(`from '../${fileName}'`) ||
      content.includes(`from '../../${fileName}'`) ||
      content.includes(`from '../../../${fileName}'`)
    );
  });
}

const allFiles = getAllFiles(srcDir);
const unusedFiles = allFiles.filter((file) => !isFileImported(file, allFiles));

console.log("Potentially unused files:");
unusedFiles.forEach((file) => console.log(file));
