import { ComponentNames } from './component.const';

export const AppRoutes = {
  main: {
    path: '/',
    component: ComponentNames.patterns.employee,
  },
  employee: {
    path: '/employee',
    component: ComponentNames.patterns.employee,
  },
  addEmployee: {
    path: '/add-employee',
    component: ComponentNames.patterns.addEmployee,
  },
  editEmployee: {
    path: '/edit-employee/:email',
    component: ComponentNames.patterns.addEmployee,
  },
};
