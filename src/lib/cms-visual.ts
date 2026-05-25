import type { VisualEditorState } from "./cms-types";

export const defaultVisualEditorState: VisualEditorState = {
  source: "3.0UI",
  routes: [
    { id: "home", route: "/", component: "HomePage" },
    { id: "about", route: "/about", component: "AboutPage" },
    { id: "awards", route: "/about#honors", component: "AboutPage" },
    { id: "event", route: "/events", component: "EventsPage" },
    { id: "media", route: "/industries", component: "IndustriesPage" },
    { id: "podcast", route: "/team", component: "TeamPage" },
    { id: "contact", route: "/contact", component: "ContactPage" },
  ],
  updatedAt: new Date("2026-05-01T00:00:00.000Z").toISOString(),
};
