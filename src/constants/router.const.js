export const AppRoutes = {
  main: {
    path: '/',
    component: 'my-employee',
  },
  employee: {
    path: '/employee',
    component: 'my-employee',
  },
  addEmployee: {
    path: '/add-employee',
    component: 'my-add-employee',
  },
  editEmployee: {
    path: '/edit-employee/:email',
    component: 'my-add-employee',
  },
};
