import { ResolveFn } from '@angular/router';
import { ProjectDto } from '../dtos/ProjectDto';
import { inject } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { catchError, finalize, of } from 'rxjs';

export const allProjectsResolver: ResolveFn<ProjectDto[]> = (route, state) => {
  const projectService = inject(ProjectService);

  // Access the static boolean value from `route data` passed at route configuration level.
  const fetchAllProjectsPartial = route.data['fetchAllProjectsPartial'];

  console.info('Executing AllProjects Route Resolver For : ', state.url);

  return projectService.getAllProjects(fetchAllProjectsPartial).pipe(
    catchError((_error) => {
      console.error('Error While Fetching AllProjects Data !!');
      // Handle the error, e.g., navigate to an error page or return an empty array
      // Return an empty observable to allow navigation
      return of([]);
    }),
    finalize(() => {
      // This will execute after the observable completes, regardless of success or failure
      console.log('AllProjects Route Resolver Execution Completed For : ',state.url);
    })
  );
};
