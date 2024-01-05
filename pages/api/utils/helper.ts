import { User } from "@/utils/models";

export function excludeProperties(obj: User, propertiesToExclude: string[]) {
  const newObj = { ...obj };
  propertiesToExclude.forEach((property) => delete newObj[property]);
  return newObj;
}
