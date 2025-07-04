import { Router } from '@vaadin/router';
import { AppRoutes } from './src/constants';

const routes = Object.values(AppRoutes);

export const router = new Router(document.querySelector('#outlet'));

router.setRoutes(routes);
