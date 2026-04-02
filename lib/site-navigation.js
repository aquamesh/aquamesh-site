import { homeSectionHref, routeHref } from "./site-paths";

function isProductRoute(route) {
  return route.startsWith("products/");
}

export function getPrimaryNavigation(route = "") {
  return [
    {
      label: "Home",
      href: homeSectionHref(route, "home"),
      active: route === ""
    },
    {
      label: "Products",
      href: routeHref("/products/aquaspectra-probe/"),
      active: isProductRoute(route),
      children: [
        { label: "AquaSpectra Probe", href: routeHref("/products/aquaspectra-probe/") },
        { label: "AquaLab Benchtop", href: routeHref("/products/aqualab-benchtop/") },
        { label: "AquaLink Hub", href: routeHref("/products/aqualink-hub/") },
        { label: "AquaView Platform", href: routeHref("/products/aquaview-platform/") }
      ]
    },
    {
      label: "Team",
      href: routeHref("/team/")
    },
    {
      label: "Careers",
      href: routeHref("/join/"),
      active: route === "join"
    }
  ];
}

export function getFooterQuickLinks(route = "") {
  return [
    {
      label: "Home",
      href: homeSectionHref(route, "home")
    },
    {
      label: "Team",
      href: routeHref("/team/")
    },
    {
      label: "Careers",
      href: routeHref("/join/")
    },
    {
      label: "Preorder",
      href: routeHref("/preorder/")
    },
    {
      label: "Contact",
      href: routeHref("/contact/")
    }
  ];
}

export function getFooterProductLinks(route = "") {
  return [
    {
      label: "AquaSpectra Probe",
      href: routeHref("/products/aquaspectra-probe/")
    },
    {
      label: "AquaLab Benchtop",
      href: routeHref("/products/aqualab-benchtop/")
    },
    {
      label: "AquaLink Hub",
      href: routeHref("/products/aqualink-hub/")
    },
    {
      label: "AquaView Platform",
      href: routeHref("/products/aquaview-platform/")
    }
  ];
}
