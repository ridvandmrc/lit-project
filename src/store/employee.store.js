import { createStore } from 'zustand/vanilla';
import { employeeData } from '../data';

export const employeeStore = createStore((set) => ({
  employee: employeeData,
  setEmployee: (employee) => set({ employee }),
  addEmployee: (newEmployee) =>
    set((state) => ({
      employee: [newEmployee, ...state.employee],
    })),
  updateEmployee: (updatedEmployee) =>
    set((state) => {
      const updatedList = state.employee.map((user) =>
        user.email === updatedEmployee.email ? updatedEmployee : user
      );
      return { employee: updatedList };
    }),
  removeEmployee: (email) =>
    set((state) => {
      return {
        employee: state.employee.filter((user) => user.email !== email),
      };
    }),
}));

export const useEmployeeStore = () => employeeStore.getState();

export const addEmployee = (newEmployee) =>
  employeeStore.getState().addEmployee(newEmployee);

export const updateEmployee = (updatedEmployee) =>
  employeeStore.getState().updateEmployee(updatedEmployee);

export const removeEmployee = (email) =>
  employeeStore.getState().removeEmployee(email);
