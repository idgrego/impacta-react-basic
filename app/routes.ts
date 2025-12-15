import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/login.tsx"),

    route('users', 'routes/users/list.tsx'),
    route('users/create', 'routes/users/create.tsx'),
    route('users/edit/:id', 'routes/users/edit.tsx'),
    route('users/delete/:id', 'routes/users/delete.tsx'),

    route('roles', 'routes/roles/list.tsx'),
    route('roles/create', 'routes/roles/create.tsx'),
    route('roles/edit/:id', 'routes/roles/edit.tsx'),
    route('roles/delete/:id', 'routes/roles/delete.tsx'),

] satisfies RouteConfig;
