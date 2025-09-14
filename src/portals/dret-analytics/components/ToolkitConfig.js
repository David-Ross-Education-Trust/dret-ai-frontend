// 1) Logos
import dretLogo from "../../../assets/icon.png";
import AbbeyLogo from "../../../assets/Abbey_CE_thumb.jpg";
import AinthorpeLogo from "../../../assets/Ainthorpe_Primary_School_thumb.jpg";
import BoothWoodLogo from "../../../assets/BoothWood_thumb.jpg";
import BriarHillLogo from "../../../assets/Briar_Hill_Primary_School_thumb.jpg";
import BringhurstLogo from "../../../assets/Bringhurst_Primary_thumb.jpg";
import CedarRdLogo from "../../../assets/Cedar_Road_Primary_thumb.jpg";
import CharlesReadLogo from "../../../assets/Charles_Read_Academy_thumb.jpg";
import CharnwoodLogo from "../../../assets/Charnwood_College_thumb.jpg";
import EastfieldLogo from "../../../assets/Eastfield_Academy_thumb.jpg";
import EdHeneageLogo from "../../../assets/Edward_Heneage_Primary_thumb.jpg";
import EndikeLogo from "../../../assets/Endike_Primary_thumb.jpg";
import EresbyLogo from "../../../assets/ESS_thumb.png";
import FairfieldLogo from "../../../assets/Fairfield_Academy_thumb.jpg";
import FalconersLogo from "../../../assets/Falconers_HIll_Academy_thumb.jpg";
import GreenfieldsLogo from "../../../assets/Greenfields_Primary_thumb.jpg";
import HavelockLogo from "../../../assets/Havelock_Academy_thumb.jpg";
import HogsLogo from "../../../assets/Hogsthorpe_Primary_Academy_thumb.jpg";
import HumberstonLogo from "../../../assets/Humberston_Academy_thumb.jpg";
import IngoldsbyLogo from "../../../assets/Ingoldsby_Academy_thumb.jpg";
import KingEdwardLogo from "../../../assets/King_Edward_VI_Academy_thumb.jpg";
import KingsHeathLogo from "../../../assets/Kings_Heath_Primary_thumb.jpg";
import LodgeParkLogo from "../../../assets/Lodge_Park_Academy_thumb.jpg";
import MalcolmArnoldLogo from "../../../assets/Malcolm_Arnold_Academy_thumb.jpg";
import MalcolmArnoldPrepLogo from "../../../assets/Malcolm_Arnold_Prep_thumb.jpg";
import NewnhamLogo from "../../../assets/Newnham_Primary_thumb.jpg";
import QuayLogo from "../../../assets/Quay_Academy_thumb.jpg";
import RichmondLogo from "../../../assets/Richmond_thumb.jpg";
import RockinghamLogo from "../../../assets/Rockingham_Primary_School_thumb.jpg";
import SgsLogo from "../../../assets/Skegness_Grammar_School_thumb.jpg";
import TheArboursLogo from "../../../assets/The_Arbours_Primary_Academy_thumb.jpg";
import ThomasHinderwellLogo from "../../../assets/Thomas_Hinderwell_Primary_thumb.jpg";
import ThomasMiddlecottLogo from "../../../assets/TMA_thumb.png";
import WeltonLogo from "../../../assets/Welton_CE_Academy_thumb.jpg";
import WoldLogo from "../../../assets/Wold_Academy_thumb.jpg";
import BobbyMooreLogo from "../../../assets/BMA_thumb.png";
import BarnesWallisLogo from "../../../assets/Barnes_Wallis_thumb.jpg";

// 2) Pure data: NO component imports, ids match allToolkits.js keys
export const toolkitConfig = [
  // Demo
  {
    id: "demotoolkit",
    name: "Demo Toolkit",
    description: "Demo Toolkit.",
    category: "Toolkit",
    tag: "",
    href: "/analytics/toolkits/demotoolkit",
    logoUrl: dretLogo,
    comingSoon: false,
  },

  // Primary
  { id: "abbey", name: "Abbey Academy", description: "Abbey Academy Toolkit.", category: "Toolkit", tag: "", href: "/analytics/toolkits/abbey", logoUrl: AbbeyLogo, comingSoon: false },
  { id: "ainthorpe", name: "Ainthorpe Primary School", description: "Ainthorpe Primary School Toolkit.", category: "Toolkit", tag: "", href: "/analytics/toolkits/ainthorpe", logoUrl: AinthorpeLogo, comingSoon: false },
  { id: "arbours", name: "The Arbours Primary School", description: "The Arbours Primary School Toolkit.", category: "Toolkit", tag: "", href: "/analytics/toolkits/arbours", logoUrl: TheArboursLogo, comingSoon: false },
  { id: "boothwood", name: "Booth Wood Academy", description: "Booth Wood Academy Toolkit.", category: "Toolkit", tag: "", href: "/analytics/toolkits/boothwood", logoUrl: BoothWoodLogo, comingSoon: false },
  { id: "briarhill", name: "Briar Hill Primary School", description: "Briar Hill Primary School Toolkit.", category: "Toolkit", tag: "", href: "/analytics/toolkits/briarhill", logoUrl: BriarHillLogo, comingSoon: false },
  { id: "bringhurst", name: "Bringhurst Primary School", description: "Bringhurst Primary School Toolkit.", category: "Toolkit", tag: "", href: "/analytics/toolkits/bringhurst", logoUrl: BringhurstLogo, comingSoon: false },
  { id: "cedarroad", name: "Cedar Road Primary School", description: "Cedar Road Primary School Toolkit.", category: "Toolkit", tag: "", href: "/analytics/toolkits/cedarroad", logoUrl: CedarRdLogo, comingSoon: false },
  { id: "eastfield", name: "Eastfield Academy", description: "Eastfield Academy Toolkit.", category: "Toolkit", tag: "", href: "/analytics/toolkits/eastfield", logoUrl: EastfieldLogo, comingSoon: false },
  { id: "edwardheneage", name: "Edward Heneage Primary Academy", description: "Edward Heneage Primary Academy Toolkit.", category: "Toolkit", tag: "", href: "/analytics/toolkits/edwardheneage", logoUrl: EdHeneageLogo, comingSoon: false },
  { id: "thomashinderwell", name: "Thomas Hinderwell Primary Academy", description: "Thomas Hinderwell Primary Academy Toolkit.", category: "Toolkit", tag: "", href: "/analytics/toolkits/thomashinderwell", logoUrl: ThomasHinderwellLogo, comingSoon: false },
  { id: "endike", name: "Endike Academy", description: "Endike Academy Toolkit.", category: "Toolkit", tag: "", href: "/analytics/toolkits/endike", logoUrl: EndikeLogo, comingSoon: false },
  { id: "eresby", name: "Eresby School", description: "Eresby School Toolkit.", category: "Toolkit", tag: "", href: "/analytics/toolkits/eresby", logoUrl: EresbyLogo, comingSoon: false },
  { id: "fairfield", name: "Fairfield Academy", description: "Fairfield Academy Toolkit.", category: "Toolkit", tag: "", href: "/analytics/toolkits/fairfield", logoUrl: FairfieldLogo, comingSoon: false },
  { id: "falconershill", name: "Falconer's Hill Academy", description: "Falconer's Hill Academy Toolkit.", category: "Toolkit", tag: "", href: "/analytics/toolkits/falconershill", logoUrl: FalconersLogo, comingSoon: false },
  { id: "greenfields", name: "Greenfields Primary School and Nursery", description: "Greenfields Primary School and Nursery Toolkit.", category: "Toolkit", tag: "", href: "/analytics/toolkits/greenfields", logoUrl: GreenfieldsLogo, comingSoon: false },
  { id: "hogsthorpe", name: "Hogsthorpe Primary Academy", description: "Hogsthorpe Primary Academy Toolkit.", category: "Toolkit", tag: "", href: "/analytics/toolkits/hogsthorpe", logoUrl: HogsLogo, comingSoon: false },
  { id: "ingoldsby", name: "Ingoldsby Academy", description: "Ingoldsby Academy Toolkit.", category: "Toolkit", tag: "", href: "/analytics/toolkits/ingoldsby", logoUrl: IngoldsbyLogo, comingSoon: false },
  { id: "kingsheath", name: "Kings Heath Primary Academy", description: "Kings Heath Primary Academy Toolkit.", category: "Toolkit", tag: "", href: "/analytics/toolkits/kingsheath", logoUrl: KingsHeathLogo, comingSoon: false },
  { id: "malcolmarnoldprep", name: "Malcolm Arnold Preparatory School", description: "Malcolm Arnold Preparatory School Toolkit.", category: "Toolkit", tag: "", href: "/analytics/toolkits/malcolmarnoldprep", logoUrl: MalcolmArnoldPrepLogo, comingSoon: false },
  { id: "newnham", name: "Newnham Primary School", description: "Newnham Primary School Toolkit.", category: "Toolkit", tag: "", href: "/analytics/toolkits/newnham", logoUrl: NewnhamLogo, comingSoon: false },
  { id: "quay", name: "Quay Academy", description: "Quay Academy Toolkit.", category: "Toolkit", tag: "", href: "/analytics/toolkits/quay", logoUrl: QuayLogo, comingSoon: false },
  { id: "richmond", name: "Richmond Primary School", description: "Richmond Primary School Toolkit.", category: "Toolkit", tag: "", href: "/analytics/toolkits/richmond", logoUrl: RichmondLogo, comingSoon: false },
  { id: "rockingham", name: "Rockingham Primary School", description: "Rockingham Primary School Toolkit.", category: "Toolkit", tag: "", href: "/analytics/toolkits/rockingham", logoUrl: RockinghamLogo, comingSoon: false },
  { id: "wold", name: "Wold Academy", description: "Wold Academy Toolkit.", category: "Toolkit", tag: "", href: "/analytics/toolkits/wold", logoUrl: WoldLogo, comingSoon: false },
  { id: "welton", name: "Welton CE Academy", description: "Welton CE Academy Toolkit.", category: "Toolkit", tag: "", href: "/analytics/toolkits/welton", logoUrl: WeltonLogo, comingSoon: false },

  // Secondary
  { id: "barneswallis", name: "Barnes Wallis Academy", description: "Barnes Wallis Academy Toolkit.", category: "Toolkit", tag: "", href: "/analytics/toolkits/barneswallis", logoUrl: BarnesWallisLogo, comingSoon: false },
  { id: "bobbymoore", name: "Bobby Moore Academy", description: "Bobby Moore Academy Toolkit.", category: "Toolkit", tag: "", href: "/analytics/toolkits/bobbymoore", logoUrl: BobbyMooreLogo, comingSoon: false },
  { id: "charlesread", name: "Charles Read Academy", description: "Charles Read Academy Toolkit.", category: "Toolkit", tag: "", href: "/analytics/toolkits/charlesread", logoUrl: CharlesReadLogo, comingSoon: false },
  { id: "charnwood", name: "Charnwood College", description: "Charnwood College Toolkit.", category: "Toolkit", tag: "", href: "/analytics/toolkits/charnwood", logoUrl: CharnwoodLogo, comingSoon: false },
  { id: "havelock", name: "Havelock Academy", description: "Havelock Academy Toolkit.", category: "Toolkit", tag: "", href: "/analytics/toolkits/havelock", logoUrl: HavelockLogo, comingSoon: false },
  { id: "humberston", name: "Humberston Academy", description: "Humberston Academy Toolkit.", category: "Toolkit", tag: "", href: "/analytics/toolkits/humberston", logoUrl: HumberstonLogo, comingSoon: false },
  { id: "kingedward", name: "King Edward VI Academy", description: "King Edward VI Academy Toolkit.", category: "Toolkit", tag: "", href: "/analytics/toolkits/kingedward", logoUrl: KingEdwardLogo, comingSoon: false },
  { id: "lodgepark", name: "Lodge Park Academy", description: "Lodge Park Academy Toolkit.", category: "Toolkit", tag: "", href: "/analytics/toolkits/lodgepark", logoUrl: LodgeParkLogo, comingSoon: false },
  { id: "malcolmarnold", name: "Malcolm Arnold Academy", description: "Malcolm Arnold Academy Toolkit.", category: "Toolkit", tag: "", href: "/analytics/toolkits/malcolmarnold", logoUrl: MalcolmArnoldLogo, comingSoon: false },
  { id: "skegness", name: "Skegness Grammar School", description: "Skegness Grammar School Toolkit.", category: "Toolkit", tag: "", href: "/analytics/toolkits/skegness", logoUrl: SgsLogo, comingSoon: false },
  { id: "thomasmiddlecott", name: "Thomas Middlecott Academy", description: "Thomas Middlecott Academy Toolkit.", category: "Toolkit", tag: "", href: "/analytics/toolkits/thomasmiddlecott", logoUrl: ThomasMiddlecottLogo, comingSoon: false },
];
