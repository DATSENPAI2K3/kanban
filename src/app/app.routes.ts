import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { KanbanBoard } from './kanban-board/kanban-board';
import { Overview } from './Overview/overview/overview';
import { Scrum } from './scrum/scrum';

export const routes: Routes = [
    {
        path: 'login',
        component: Login
    },
    {
        path: 'signup',
        component: Signup
    },
    {
        path: 'scrum',
        component: Scrum
    },
    {
        path: 'overview',
        component: Overview
    }
];