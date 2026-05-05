import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { About } from "./components/About";
import { Industries } from "./components/Industries";
import { IndustryDetail } from "./components/IndustryDetail";
import { Events } from "./components/Events";
import { EventDetail } from "./components/EventDetail";
import { Team } from "./components/Team";
import { Contact } from "./components/Contact";
import { MemberDetail } from "./components/MemberDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "industries", Component: Industries },
      { path: "industries/:id", Component: IndustryDetail },
      { path: "events", Component: Events },
      { path: "events/:id", Component: EventDetail },
      { path: "team", Component: Team },
      { path: "team/:id", Component: MemberDetail },
      { path: "contact", Component: Contact },
      { path: "*", Component: Home },
    ],
  },
]);
