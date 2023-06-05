export interface Project {
  id: string;
  name: string;
  description: string;
}

export const emptyProject: Project = {
  id: '0',
  name: '',
  description: '',
};
