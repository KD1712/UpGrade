import { FILTER_MODE } from "upgrade_types";

export const revertToExperiment = {
  id: 'be3ae74f-370a-4015-93f3-7761d16f8b17',
  name: 'Test Experiment',
  description: 'Test Experiment Description',
  consistencyRule: 'experiment',
  assignmentUnit: 'individual',
  postExperimentRule: 'assign',
  revertTo: 'c22467b1-f0e9-4444-9517-cc03037bc079',
  state: 'inactive',
  startOn: new Date().toISOString(),
  group: 'teacher',
  context: ['home'],
  tags: [],
  queries: [],
  filterMode: FILTER_MODE.INCLUDE_ALL,
  experimentSegmentInclusion: { segment: { individualForSegment: [], groupForSegment: [], subSegments: []}},
  experimentSegmentExclusion: { segment: { individualForSegment: [], groupForSegment: [], subSegments: []}},
  conditions: [
    {
      id: 'c22467b1-f0e9-4444-9517-cc03037bc079',
      name: 'Condition A',
      description: 'Condition A',
      assignmentWeight: 40,
      conditionCode: 'ConditionA',
      twoCharacterId: 'CA',
    },
    {
      id: 'd2702d3c-5e04-41a7-8766-1da8a95b72ce',
      name: 'Condition B',
      description: 'Condition B',
      assignmentWeight: 60,
      conditionCode: 'ConditionB',
      twoCharacterId: 'CB',
    },
  ],
  partitions: [
    {
      site: 'CurriculumSequence',
      target: 'W1',
      description: 'Decision Point on Workspace 1',
      twoCharacterId: 'W1',
    },
    {
      site: 'CurriculumSequence',
      target: 'W2',
      description: 'Decision Point on Workspace 2',
      twoCharacterId: 'W2',
    },
    {
      site: 'CurriculumSequence',
      description: 'No Decision Point',
      twoCharacterId: 'NP',
    },
  ],
  backendVersion: "1.0.0",
  groupSatisfied: 0,
};

export const experiment = {
  id: 'be3ae74f-370a-4015-93f3-7761d16f8b17',
  name: 'Test Experiment',
  description: 'Test Experiment Description',
  consistencyRule: 'individual',
  assignmentUnit: 'individual',
  postExperimentRule: 'continue',
  state: 'scheduled',
  startOn: new Date().toISOString(),
  group: 'teacher',
  context: ['home'],
  tags: [],
  queries: [],
  filterMode: FILTER_MODE.INCLUDE_ALL,
  experimentSegmentInclusion: { segment: { individualForSegment: [], groupForSegment: [], subSegments: []}},
  experimentSegmentExclusion: { segment: { individualForSegment: [], groupForSegment: [], subSegments: []}},
  conditions: [
    {
      id: 'c22467b1-f0e9-4444-9517-cc03037bc079',
      name: 'Condition A',
      description: 'Condition A',
      assignmentWeight: 40,
      conditionCode: 'ConditionA',
      twoCharacterId: 'CA',
    },
    {
      id: 'd2702d3c-5e04-41a7-8766-1da8a95b72ce',
      name: 'Condition B',
      description: 'Condition B',
      assignmentWeight: 60,
      conditionCode: 'ConditionB',
      twoCharacterId: 'CB',
    },
  ],
  partitions: [
    {
      site: 'CurriculumSequence',
      target: 'W1',
      description: 'Decision Point on Workspace 1',
      twoCharacterId: 'W1',
    },
    {
      site: 'CurriculumSequence',
      target: 'W2',
      description: 'Decision Point on Workspace 2',
      twoCharacterId: 'W2',
    },
    {
      site: 'CurriculumSequence',
      description: 'No Decision Point',
      twoCharacterId: 'NP',
    },
  ],
  backendVersion: "1.0.0",
  groupSatisfied: 0,
};

export const experimentSecond = {
  id: '8b0e562a-029e-4680-836c-7de6b2ef6ac9',
  name: 'Test Experiment',
  description: 'Test Experiment Description',
  consistencyRule: 'individual',
  assignmentUnit: 'individual',
  postExperimentRule: 'continue',
  state: 'scheduled',
  startOn: new Date().toISOString(),
  group: 'teacher',
  context: ['home'],
  tags: [],
  queries: [],
  filterMode: FILTER_MODE.INCLUDE_ALL,
  experimentSegmentInclusion: { segment: { individualForSegment: [], groupForSegment: [], subSegments: []}},
  experimentSegmentExclusion: { segment: { individualForSegment: [], groupForSegment: [], subSegments: []}},
  conditions: [
    {
      id: 'bb8844a9-085b-4ceb-b893-eaaea3b739af',
      name: 'Condition A',
      description: 'Condition A',
      assignmentWeight: 40,
      conditionCode: 'ConditionA',
      twoCharacterId: 'BA',
    },
    {
      id: '439a6fef-901d-4f0c-bca8-25f06e9e6262',
      name: 'Condition B',
      description: 'Condition B',
      assignmentWeight: 60,
      conditionCode: 'ConditionB',
      twoCharacterId: 'BB',
    },
  ],
  partitions: [
    {
      site: 'CurriculumSequence2',
      target: 'W1',
      description: 'Decision Point on Workspace 1',
      twoCharacterId: 'X1',
    },
    {
      site: 'CurriculumSequence2',
      target: 'W2',
      description: 'Decision Point on Workspace 2',
      twoCharacterId: 'X2',
    },
  ],
  backendVersion: "1.0.0",
  groupSatisfied: 0,
};

export const experimentThird = {
  id: '3711346b-49d4-4f49-92b9-0d0ce7fa6e07',
  name: 'Test Experiment',
  description: 'Test Experiment Description',
  consistencyRule: 'individual',
  assignmentUnit: 'individual',
  postExperimentRule: 'continue',
  state: 'scheduled',
  startOn: new Date().toISOString(),
  group: 'teacher',
  context: ['home'],
  tags: [],
  queries: [],
  filterMode: FILTER_MODE.INCLUDE_ALL,
  experimentSegmentInclusion: { segment: { individualForSegment: [], groupForSegment: [], subSegments: []}},
  experimentSegmentExclusion: { segment: { individualForSegment: [], groupForSegment: [], subSegments: []}},
  conditions: [
    {
      id: '74684fa9-fcd8-44ef-a2d1-b5bdf96076e1',
      name: 'Condition A',
      description: 'Condition A',
      assignmentWeight: 40,
      conditionCode: 'ConditionA',
      twoCharacterId: 'AA',
    },
    {
      id: '8c7b2951-f9a7-4d2e-a1ed-0572e1ede879',
      name: 'Condition B',
      description: 'Condition B',
      assignmentWeight: 60,
      conditionCode: 'ConditionB',
      twoCharacterId: 'AB',
    },
  ],
  partitions: [
    {
      site: 'CurriculumSequence3',
      target: 'W1',
      description: 'Decision Point on Workspace 1',
      twoCharacterId: 'Y1',
    },
    {
      site: 'CurriculumSequence3',
      target: 'W2',
      description: 'Decision Point on Workspace 2',
      twoCharacterId: 'Y2',
    },
  ],
  backendVersion: "1.0.0",
  groupSatisfied: 0,
};

export const experimentFourth = {
  id: '3711346b-49d4-4f49-92b9-0d0ce7fa6e08',
  name: 'Test Experiment 4',
  description: 'Test Experiment Description',
  consistencyRule: 'individual',
  assignmentUnit: 'individual',
  postExperimentRule: 'continue',
  state: 'scheduled',
  startOn: new Date().toISOString(),
  group: 'teacher',
  context: ['home'],
  tags: [],
  queries: [],
  filterMode: FILTER_MODE.INCLUDE_ALL,
  experimentSegmentInclusion: { segment: { individualForSegment: [], groupForSegment: [], subSegments: []}},
  experimentSegmentExclusion: { segment: { individualForSegment: [], groupForSegment: [], subSegments: []}},
  conditions: [
    {
      id: '74684fa9-fcd8-44ef-a2d1-b5bdf96076e2',
      name: 'Condition A',
      description: 'Condition A',
      assignmentWeight: 55.5,
      conditionCode: 'ConditionA',
      twoCharacterId: 'AA',
    },
    {
      id: '8c7b2951-f9a7-4d2e-a1ed-0572e1ede878',
      name: 'Condition B',
      description: 'Condition B',
      assignmentWeight: 44.5,
      conditionCode: 'ConditionB',
      twoCharacterId: 'AB',
    },
  ],
  partitions: [
    {
      site: 'CurriculumSequence3',
      target: 'W1',
      description: 'Decision Point on Workspace 1',
      twoCharacterId: 'Y1',
    },
    {
      site: 'CurriculumSequence3',
      target: 'W2',
      description: 'Decision Point on Workspace 2',
      twoCharacterId: 'Y2',
    },
  ],
  backendVersion: "1.0.0",
  groupSatisfied: 0,
};

export function getRevertToExperiment() {
  return JSON.parse(JSON.stringify(revertToExperiment));
}
export function getExperiment() {
  return JSON.parse(JSON.stringify(experiment));
}

export function getSecondExperiment() {
  return JSON.parse(JSON.stringify(experimentSecond));
}

export function getThirdExperiment() {
  return JSON.parse(JSON.stringify(experimentThird));
}

export function getFourthExperiment() {
  return JSON.parse(JSON.stringify(experimentFourth));
}
