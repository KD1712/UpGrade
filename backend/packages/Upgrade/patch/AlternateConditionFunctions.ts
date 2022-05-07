// TODO delete this after x-prize competition

import AlternateCondition from '../patch/alternateConditions.json';
import { IExperimentAssignment } from 'upgrade_types';

// organize json data here
const importedJsonArray: Array<{
  experimentPoint: string;
  condition: string;
  id: string;
  workspace: string;
  schoolId: string[];
}> = AlternateCondition;

export const assignAlternateCondition = (user: any): ((data: IExperimentAssignment) => IExperimentAssignment) => {
  // tslint:disable-next-line: no-string-literal
  const userSchoolIds: string[] = user?.group?.['schoolId'];
  return (data: IExperimentAssignment): IExperimentAssignment => {
    const findData = importedJsonArray.find(
      (importedJson) =>
        importedJson.experimentPoint === data.expPoint &&
        importedJson.id === data.expId &&
        importedJson.condition === data.assignedCondition.conditionCode
    );
    if (findData) {
      // search for schoolId
      const schoolExist = userSchoolIds.some((userSchoolId) => {
        return findData.schoolId.includes(userSchoolId);
      });
      // replace assigned condition
      if (schoolExist) {
        data.assignedCondition.conditionCode = findData.workspace;
      }
    }
    return data;
  };
};

export const replaceAlternateConditionWithValidCondition = (
  experimentPoint: string,
  experimentId: string,
  condition: string,
  userDoc: any
): string => {
  let newCondition = condition;
  const userSchoolIds: string[] = userDoc?.group?.['schoolId'];
  const findData = importedJsonArray.find(
    (importedJson) =>
      importedJson.experimentPoint === experimentPoint &&
      importedJson.id === experimentId &&
      importedJson.workspace === condition
  );

  if (findData) {
    // search for schoolId
    const schoolExist = userSchoolIds.some((userSchoolId) => {
      return findData.schoolId.includes(userSchoolId);
    });

    if (schoolExist) {
      newCondition = findData.condition;
    }
  }

  return newCondition;
};