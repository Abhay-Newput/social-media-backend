import express from "express";
import userRoutes from "./user.routes";
import authRoutes from "./auth.routes";
import postRoutes from "./post.routes";

const router = express.Router();

interface Route {
  path: string;
  route: express.Router;
}


const defaultRoutes: Route[] = [
  { path: "/user", route: userRoutes },
  { path: "/auth", route: authRoutes },
  { path: "/post", route: postRoutes },
];


defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
