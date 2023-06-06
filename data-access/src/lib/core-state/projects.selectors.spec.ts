import { ProjectsEntity } from './projects.models';
import {
  projectsAdapter,
  ProjectsPartialState,
  initialProjectsState,
} from './projects.reducer';
import * as ProjectsSelectors from './projects.selectors';

describe('Projects Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getProjectsId = (it: ProjectsEntity) => it.id;
  const createProjectsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as ProjectsEntity);

  let state: ProjectsPartialState;

  beforeEach(() => {
    state = {
      projects: projectsAdapter.setAll(
        [
          createProjectsEntity('PRODUCT-AAA'),
          createProjectsEntity('PRODUCT-BBB'),
          createProjectsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialProjectsState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Projects Selectors', () => {
    it('selectAllProjects() should return the list of Projects', () => {
      const results = ProjectsSelectors.selectAllProjects(state);
      const selId = getProjectsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = ProjectsSelectors.selectEntity(state) as ProjectsEntity;
      const selId = getProjectsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectProjectsLoaded() should return the current "loaded" status', () => {
      const result = ProjectsSelectors.selectProjectsLoaded(state);

      expect(result).toBe(true);
    });

    it('selectProjectsError() should return the current "error" state', () => {
      const result = ProjectsSelectors.selectProjectsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
