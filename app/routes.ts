import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    index("routes/login.tsx"),

    layout("routes/root_layout.tsx", [
        route("users", "routes/users/layout.tsx", [
            index('routes/users/list.tsx'),
            route('create', 'routes/users/create.tsx'),
            route('edit/:id', 'routes/users/edit.tsx'),
            route('delete/:id', 'routes/users/delete.tsx'),
        ]),

        route("roles", "routes/roles/layout.tsx", [
            index('routes/roles/list.tsx'),
            route('create', 'routes/roles/create.tsx'),
            route('edit/:id', 'routes/roles/edit.tsx'),
            route('delete/:id', 'routes/roles/delete.tsx'),
        ]),
    ]),



] satisfies RouteConfig;
