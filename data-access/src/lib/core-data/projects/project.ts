export interface Project {
  id: string;
  title: string;
  details: string;
  importanceLevel: number;
}

export const emptyProject: Project = {
  id: '0',
  title: '',
  details: '',
  importanceLevel: 0,
};
