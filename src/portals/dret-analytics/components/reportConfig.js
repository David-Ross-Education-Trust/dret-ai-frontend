// src/portals/dret-analytics/components/reportConfig.js

// 1. Import the logo images
import abbeyLogo from "../../../assets/abbey.png";
import ainthorpeLogo from "../../../assets/ainthorpe.png";
import boothwoodLogo from "../../../assets/bw-academy.png";
import briarhillLogo from "../../../assets/briarhill.png";
import bringhurstLogo from "../../../assets/bringhurst.png";
import cedarrdLogo from "../../../assets/cedarrd.png";
import charlesreadLogo from "../../../assets/charlesread.png";
import charnwoodLogo from "../../../assets/charnwood.png";
import eastfieldLogo from "../../../assets/eastfield.png";
import edheneageLogo from "../../../assets/edheneage.png";
import endikeLogo from "../../../assets/endike.png";
import eresbyLogo from "../../../assets/eresby.png";
import fairfieldLogo from "../../../assets/fairfield.png";
import falconersLogo from "../../../assets/falconers.png";
import greenfieldsLogo from "../../../assets/greenfields.png";
import havelockLogo from "../../../assets/havelock.png";
import hogsLogo from "../../../assets/hogs.png";
import humberstonLogo from "../../../assets/humberston.png";
import ingoldsbyLogo from "../../../assets/ingoldsby.png";
import kingedLogo from "../../../assets/kinged.png";
import kingsheathLogo from "../../../assets/kingsheath.png";
import lodgeparkLogo from "../../../assets/lodgepark.png";
import malcolmarnoldLogo from "../../../assets/macolmarnold.png";
import malcolmarnoldprepLogo from "../../../assets/malcolmarnoldprep.png";
import newnhamLogo from "../../../assets/newnham.png";
import quayLogo from "../../../assets/quay.png";
import rockinghamLogo from "../../../assets/rockingham.png";
import sgsLogo from "../../../assets/sgs.png";
import thearboursLogo from "../../../assets/thearbours.png";
import thomashinderwellLogo from "../../../assets/thomashinderwell.png";
import thomasmiddlecottLogo from "../../../assets/thomasmiddlecott.png";
import weltonLogo from "../../../assets/welton.png";
import woldLogo from "../../../assets/wold.png";
import bobbymooreLogo from "../../../assets/bobbymoore.png";
import barneswallisLogo from "../../../assets/bw-academy.png";

// 2. Import your Toolkit page components (as before)
import AbbeyToolkit from "../reports/toolkit/AbbeyToolkit";
import AinthorpeToolkit from "../reports/toolkit/AinthorpeToolkit";
import BoothWoodToolkit from "../reports/toolkit/BoothWoodToolkit";
import BriarHillToolkit from "../reports/toolkit/BriarHillToolkit";
import BringhurstToolkit from "../reports/toolkit/BringhurstToolkit";
import CedarRdToolkit from "../reports/toolkit/CedarRdToolkit";
import CharlesReadToolkit from "../reports/toolkit/CharlesReadToolkit";
import CharnwoodToolkit from "../reports/toolkit/CharnwoodToolkit";
import EastfieldToolkit from "../reports/toolkit/EastfieldToolkit";
import EdHeneageToolkit from "../reports/toolkit/EdHeneageToolkit";
import EndikeToolkit from "../reports/toolkit/EndikeToolkit";
import EresbyToolkit from "../reports/toolkit/EresbyToolkit";
import FairfieldToolkit from "../reports/toolkit/FairfieldToolkit";
import FalconersToolkit from "../reports/toolkit/FalconersToolkit";
import GreenfieldsToolkit from "../reports/toolkit/GreenfieldsToolkit";
import HavelockToolkit from "../reports/toolkit/HavelockToolkit";
import HogsToolkit from "../reports/toolkit/HogsToolkit";
import HumberstonToolkit from "../reports/toolkit/HumberstonToolkit";
import IngoldsbyToolkit from "../reports/toolkit/IngoldsbyToolkit";
import KingEdwardToolkit from "../reports/toolkit/KingEdwardToolkit";
import KingsHeathToolkit from "../reports/toolkit/KingsheathToolkit";
import LodgeParkToolkit from "../reports/toolkit/LodgeparkToolkit";
import MalcolmArnoldToolkit from "../reports/toolkit/MalcolmArnoldToolkit";
import MalcolmArnoldPrepToolkit from "../reports/toolkit/MalcolmArnoldPrepToolkit";
import NewnhamToolkit from "../reports/toolkit/NewnhamToolkit";
import QuayToolkit from "../reports/toolkit/QuayToolkit";
import RockinghamToolkit from "../reports/toolkit/RockinghamToolkit";
import SgsToolkit from "../reports/toolkit/SgsToolkit";
import TheArboursToolkit from "../reports/toolkit/TheArboursToolkit";
import ThomasHinderwellToolkit from "../reports/toolkit/ThomasHinderwellToolkit";
import ThomasMiddlecottToolkit from "../reports/toolkit/ThomasMiddlecottToolkit";
import WeltonToolkit from "../reports/toolkit/WeltonToolkit";
import WoldToolkit from "../reports/toolkit/WoldToolkit";
import BobbyMooreToolkit from "../reports/toolkit/BobbyMooreToolkit";
import BarnesWallisToolkit from "../reports/toolkit/BarnesWallisToolkit";

// 3. Full config array (all have `logoUrl`)
export const reportConfig = [
  {
    id: "abbey",
    name: "Abbey CE Academy",
    description: "Abbey CE Academy Toolkit.",
    category: "Toolkit",
    tag: "",
    href: "/analytics/report/abbey",
    component: AbbeyToolkit,
    logoUrl: abbeyLogo,
    comingSoon: false,
  },
  {
    id: "ainthorpe",
    name: "Ainthorpe Primary School",
    description: "Ainthorpe Primary School Toolkit.",
    category: "Toolkit",
    tag: "",
    href: "/analytics/report/ainthorpe",
    component: AinthorpeToolkit,
    logoUrl: ainthorpeLogo,
    comingSoon: false,
  },
  {
    id: "boothwood",
    name: "Booth Wood Academy",
    description: "Booth Wood Academy Toolkit.",
    category: "Toolkit",
    tag: "",
    href: "/analytics/report/boothwood",
    component: BoothWoodToolkit,
    logoUrl: boothwoodLogo,
    comingSoon: false,
  },
  {
    id: "briarhill",
    name: "Briar Hill Primary School",
    description: "Briar Hill Primary School Toolkit.",
    category: "Toolkit",
    tag: "",
    href: "/analytics/report/briarhill",
    component: BriarHillToolkit,
    logoUrl: briarhillLogo,
    comingSoon: false,
  },
  {
    id: "bringhurst",
    name: "Bringhurst Primary School",
    description: "Bringhurst Primary School Toolkit.",
    category: "Toolkit",
    tag: "",
    href: "/analytics/report/bringhurst",
    component: BringhurstToolkit,
    logoUrl: bringhurstLogo,
    comingSoon: false,
  },
  {
    id: "cedarrd",
    name: "Cedar Road Primary School",
    description: "Cedar Road Primary School Toolkit.",
    category: "Toolkit",
    tag: "",
    href: "/analytics/report/cedarrd",
    component: CedarRdToolkit,
    logoUrl: cedarrdLogo,
    comingSoon: false,
  },
  {
    id: "charlesread",
    name: "Charles Read Academy",
    description: "Charles Read Academy Toolkit.",
    category: "Toolkit",
    tag: "",
    href: "/analytics/report/charlesread",
    component: CharlesReadToolkit,
    logoUrl: charlesreadLogo,
    comingSoon: false,
  },
  {
    id: "charnwood",
    name: "Charnwood College",
    description: "Charnwood College Toolkit.",
    category: "Toolkit",
    tag: "",
    href: "/analytics/report/charnwood",
    component: CharnwoodToolkit,
    logoUrl: charnwoodLogo,
    comingSoon: false,
  },
  {
    id: "eastfield",
    name: "Eastfield Academy",
    description: "Eastfield Academy Toolkit.",
    category: "Toolkit",
    tag: "",
    href: "/analytics/report/eastfield",
    component: EastfieldToolkit,
    logoUrl: eastfieldLogo,
    comingSoon: false,
  },
  {
    id: "edheneage",
    name: "Edward Heneage Primary Academy",
    description: "Edward Heneage Primary Academy Toolkit.",
    category: "Toolkit",
    tag: "",
    href: "/analytics/report/edheneage",
    component: EdHeneageToolkit,
    logoUrl: edheneageLogo,
    comingSoon: false,
  },
  {
    id: "endike",
    name: "Endike Academy",
    description: "Endike Academy Toolkit.",
    category: "Toolkit",
    tag: "",
    href: "/analytics/report/endike",
    component: EndikeToolkit,
    logoUrl: endikeLogo,
    comingSoon: false,
  },
  {
    id: "eresby",
    name: "Eresby School",
    description: "Eresby School Toolkit.",
    category: "Toolkit",
    tag: "",
    href: "/analytics/report/eresby",
    component: EresbyToolkit,
    logoUrl: eresbyLogo,
    comingSoon: false,
  },
  {
    id: "fairfield",
    name: "Fairfield Academy",
    description: "Fairfield Academy Toolkit.",
    category: "Toolkit",
    tag: "",
    href: "/analytics/report/fairfield",
    component: FairfieldToolkit,
    logoUrl: fairfieldLogo,
    comingSoon: false,
  },
  {
    id: "falconers",
    name: "Falconer's Hill Academy",
    description: "Falconer's Hill Academy Toolkit.",
    category: "Toolkit",
    tag: "",
    href: "/analytics/report/falconers",
    component: FalconersToolkit,
    logoUrl: falconersLogo,
    comingSoon: false,
  },
  {
    id: "greenfields",
    name: "Greenfields Primary School and Nursery",
    description: "Greenfields Primary School and Nursery Toolkit.",
    category: "Toolkit",
    tag: "",
    href: "/analytics/report/greenfields",
    component: GreenfieldsToolkit,
    logoUrl: greenfieldsLogo,
    comingSoon: false,
  },
  {
    id: "havelock",
    name: "Havelock Academy",
    description: "Havelock Academy Toolkit.",
    category: "Toolkit",
    tag: "",
    href: "/analytics/report/havelock",
    component: HavelockToolkit,
    logoUrl: havelockLogo,
    comingSoon: false,
  },
  {
    id: "hogs",
    name: "Hogsthorpe Primary Academy",
    description: "Hogsthorpe Primary Academy Toolkit.",
    category: "Toolkit",
    tag: "",
    href: "/analytics/report/hogs",
    component: HogsToolkit,
    logoUrl: hogsLogo,
    comingSoon: false,
  },
  {
    id: "humberston",
    name: "Humberston Academy",
    description: "Humberston Academy Toolkit.",
    category: "Toolkit",
    tag: "",
    href: "/analytics/report/humberston",
    component: HumberstonToolkit,
    logoUrl: humberstonLogo,
    comingSoon: false,
  },
  {
    id: "ingoldsby",
    name: "Ingoldsby Academy",
    description: "Ingoldsby Academy Toolkit.",
    category: "Toolkit",
    tag: "",
    href: "/analytics/report/ingoldsby",
    component: IngoldsbyToolkit,
    logoUrl: ingoldsbyLogo,
    comingSoon: false,
  },
  {
    id: "kinged",
    name: "King Edward VI Academy",
    description: "King Edward VI Academy Toolkit.",
    category: "Toolkit",
    tag: "",
    href: "/analytics/report/kinged",
    component: KingEdwardToolkit,
    logoUrl: kingedLogo,
    comingSoon: false,
  },
  {
    id: "kingsheath",
    name: "Kings Heath Primary Academy",
    description: "Kings Heath Primary Academy Toolkit.",
    category: "Toolkit",
    tag: "",
    href: "/analytics/report/kingsheath",
    component: KingsHeathToolkit,
    logoUrl: kingsheathLogo,
    comingSoon: false,
  },
  {
    id: "lodgepark",
    name: "Lodge Park Academy",
    description: "Lodge Park Academy Toolkit.",
    category: "Toolkit",
    tag: "",
    href: "/analytics/report/lodgepark",
    component: LodgeParkToolkit,
    logoUrl: lodgeparkLogo,
    comingSoon: false,
  },
  {
    id: "macolarnold",
    name: "Malcolm Arnold Academy",
    description: "Malcolm Arnold Academy Toolkit.",
    category: "Toolkit",
    tag: "",
    href: "/analytics/report/macolarnold",
    component: MalcolmArnoldToolkit,
    logoUrl: malcolmarnoldLogo,
    comingSoon: false,
  },
  {
    id: "macolarnoldprep",
    name: "Malcolm Arnold Preparatory School",
    description: "Malcolm Arnold Preparatory School Toolkit.",
    category: "Toolkit",
    tag: "",
    href: "/analytics/report/macolarnoldprep",
    component: MalcolmArnoldPrepToolkit,
    logoUrl: malcolmarnoldprepLogo,
    comingSoon: false,
  },
  {
    id: "newnham",
    name: "Newnham Primary School",
    description: "Newnham Primary School Toolkit.",
    category: "Toolkit",
    tag: "",
    href: "/analytics/report/newnham",
    component: NewnhamToolkit,
    logoUrl: newnhamLogo,
    comingSoon: false,
  },
  {
    id: "quay",
    name: "Quay Academy",
    description: "Quay Academy Toolkit.",
    category: "Toolkit",
    tag: "",
    href: "/analytics/report/quay",
    component: QuayToolkit,
    logoUrl: quayLogo,
    comingSoon: false,
  },
  {
    id: "rockingham",
    name: "Rockingham Primary School",
    description: "Rockingham Primary School Toolkit.",
    category: "Toolkit",
    tag: "",
    href: "/analytics/report/rockingham",
    component: RockinghamToolkit,
    logoUrl: rockinghamLogo,
    comingSoon: false,
  },
  {
    id: "sgs",
    name: "Skegness Grammar School",
    description: "Skegness Grammar School Toolkit.",
    category: "Toolkit",
    tag: "",
    href: "/analytics/report/sgs",
    component: SgsToolkit,
    logoUrl: sgsLogo,
    comingSoon: false,
  },
  {
    id: "thearbours",
    name: "The Arbours Primary School",
    description: "The Arbours Primary School Toolkit.",
    category: "Toolkit",
    tag: "",
    href: "/analytics/report/thearbours",
    component: TheArboursToolkit,
    logoUrl: thearboursLogo,
    comingSoon: false,
  },
  {
    id: "thomashinderwell",
    name: "Thomas Hinderwell Primary Academy",
    description: "Thomas Hinderwell Primary Academy Toolkit.",
    category: "Toolkit",
    tag: "",
    href: "/analytics/report/thomashinderwell",
    component: ThomasHinderwellToolkit,
    logoUrl: thomashinderwellLogo,
    comingSoon: false,
  },
  {
    id: "thomasmiddlecott",
    name: "Thomas Middlecott Academy",
    description: "Thomas Middlecott Academy Toolkit.",
    category: "Toolkit",
    tag: "",
    href: "/analytics/report/thomasmiddlecott",
    component: ThomasMiddlecottToolkit,
    logoUrl: thomasmiddlecottLogo,
    comingSoon: false,
  },
  {
    id: "welton",
    name: "Welton CE Academy",
    description: "Welton CE Academy Toolkit.",
    category: "Toolkit",
    tag: "",
    href: "/analytics/report/welton",
    component: WeltonToolkit,
    logoUrl: weltonLogo,
    comingSoon: false,
  },
  {
    id: "wold",
    name: "Wold Academy",
    description: "Wold Academy Toolkit.",
    category: "Toolkit",
    tag: "",
    href: "/analytics/report/wold",
    component: WoldToolkit,
    logoUrl: woldLogo,
    comingSoon: false,
  },
  {
    id: "bobbymoore",
    name: "Bobby Moore Academy",
    description: "Bobby Moore Academy Toolkit.",
    category: "Toolkit",
    tag: "",
    href: "/analytics/report/bobbymoore",
    component: BobbyMooreToolkit,
    logoUrl: bobbymooreLogo,
    comingSoon: false,
  },
  {
    id: "barneswallis",
    name: "Barnes Wallis Academy",
    description: "Barnes Wallis Academy Toolkit.",
    category: "Toolkit",
    tag: "",
    href: "/analytics/report/barneswallis",
    component: BarnesWallisToolkit,
    logoUrl: barneswallisLogo,
    comingSoon: false,
  },
];
