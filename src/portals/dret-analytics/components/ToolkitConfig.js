// 1. Import logo images (new "_thumb.jpg" naming, adjust paths if needed)
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
import RockinghamLogo from "../../../assets/Rockingham_Primary_School_thumb.jpg";
import SgsLogo from "../../../assets/Skegness_Grammar_School_thumb.jpg";
import TheArboursLogo from "../../../assets/The_Arbours_Primary_Academy_thumb.jpg";
import ThomasHinderwellLogo from "../../../assets/Thomas_Hinderwell_Primary_thumb.jpg";
import ThomasMiddlecottLogo from "../../../assets/TMA_thumb.png";
import WeltonLogo from "../../../assets/Welton_CE_Academy_thumb.jpg";
import WoldLogo from "../../../assets/Wold_Academy_thumb.jpg";
import BobbyMooreLogo from "../../../assets/BMA_thumb.png";
import BarnesWallisLogo from "../../../assets/Barnes_Wallis_thumb.jpg";

// 2. Import your Toolkit page components (unchanged)
import DemoToolkit from "../reports/toolkit/DemoToolkit";
import AbbeyToolkit from "../reports/toolkit/primary/AbbeyToolkit";
import AinthorpeToolkit from "../reports/toolkit/primary/AinthorpeToolkit";
import BoothWoodToolkit from "../reports/toolkit/primary/BoothWoodToolkit";
import BriarHillToolkit from "../reports/toolkit/primary/BriarHillToolkit";
import BringhurstToolkit from "../reports/toolkit/primary/BringhurstToolkit";
import CedarRoadToolkit from "../reports/toolkit/primary/CedarRoadToolkit";
import CharlesReadToolkit from "../reports/toolkit/secondary/CharlesReadToolkit";
import CharnwoodToolkit from "../reports/toolkit/secondary/CharnwoodToolkit";
import EastfieldToolkit from "../reports/toolkit/primary/EastfieldToolkit";
import EdwardHeneageToolkit from "../reports/toolkit/primary/EdwardHeneageToolkit";
import EndikeToolkit from "../reports/toolkit/primary/EndikeToolkit";
import EresbyToolkit from "../reports/toolkit/primary/EresbyToolkit";
import FairfieldToolkit from "../reports/toolkit/primary/FairfieldToolkit";
import FalconersHillToolkit from "../reports/toolkit/primary/FalconersHillToolkit";
import GreenfieldsToolkit from "../reports/toolkit/primary/GreenfieldsToolkit";
import HavelockToolkit from "../reports/toolkit/secondary/HavelockToolkit";
import HogsthorpeToolkit from "../reports/toolkit/primary/HogsthorpeToolkit";
import HumberstonToolkit from "../reports/toolkit/secondary/HumberstonToolkit";
import IngoldsbyToolkit from "../reports/toolkit/primary/IngoldsbyToolkit";
import KingEdwardToolkit from "../reports/toolkit/secondary/KingEdwardToolkit";
import KingsHeathToolkit from "../reports/toolkit/primary/KingsHeathToolkit";
import LodgeParkToolkit from "../reports/toolkit/secondary/LodgeParkToolkit";
import MalcolmArnoldToolkit from "../reports/toolkit/secondary/MalcolmArnoldToolkit";
import MalcolmArnoldPrepToolkit from "../reports/toolkit/primary/MalcolmArnoldPrepToolkit";
import NewnhamToolkit from "../reports/toolkit/primary/NewnhamToolkit";
import QuayToolkit from "../reports/toolkit/primary/QuayToolkit";
import RockinghamToolkit from "../reports/toolkit/primary/RockinghamToolkit";
import SkegnessToolkit from "../reports/toolkit/secondary/SkegnessToolkit";
import TheArboursToolkit from "../reports/toolkit/primary/TheArboursToolkit";
import ThomasHinderwellToolkit from "../reports/toolkit/primary/ThomasHinderwellToolkit";
import ThomasMiddlecottToolkit from "../reports/toolkit/secondary/ThomasMiddlecottToolkit";
import WeltonToolkit from "../reports/toolkit/primary/WeltonToolkit";
import WoldToolkit from "../reports/toolkit/primary/WoldToolkit";
import BobbyMooreToolkit from "../reports/toolkit/secondary/BobbyMooreToolkit";
import BarnesWallisToolkit from "../reports/toolkit/secondary/BarnesWallisToolkit";

// 3. Export the config array, each with logoUrl mapped to new imports
export const toolkitConfig = [
  { id: "demo-toolkit", name: "Demo Toolkit", description: "Demo Toolkit.", category: "Toolkit", tag: "", href: "/analytics/toolkits/demo", component: DemoToolkit, logoUrl: dretLogo, comingSoon: false },
  { id: "abbey", name: "Abbey CE Academy", description: "Abbey CE Academy Toolkit.", category: "Toolkit", tag: "", href: "/analytics/toolkits/abbey", component: AbbeyToolkit, logoUrl: AbbeyLogo, comingSoon: false },
  { id: "ainthorpe", name: "Ainthorpe Primary School", description: "Ainthorpe Primary School Toolkit.", category: "Toolkit", tag: "", href: "/analytics/toolkits/ainthorpe", component: AinthorpeToolkit, logoUrl: AinthorpeLogo, comingSoon: false },
  { id: "arbours", name: "The Arbours Primary School", description: "The Arbours Primary School Toolkit.", category: "Toolkit", tag: "", href: "/analytics/toolkits/arbours", component: TheArboursToolkit, logoUrl: TheArboursLogo, comingSoon: false },
  { id: "barneswallis", name: "Barnes Wallis Academy", description: "Barnes Wallis Academy Toolkit.", category: "Toolkit", tag: "", href: "/analytics/toolkits/barneswallis", component: BarnesWallisToolkit, logoUrl: BarnesWallisLogo, comingSoon: false },
  { id: "bobbymoore", name: "Bobby Moore Academy", description: "Bobby Moore Academy Toolkit.", category: "Toolkit", tag: "", href: "/analytics/toolkits/bobbymoore", component: BobbyMooreToolkit, logoUrl: BobbyMooreLogo, comingSoon: false },
  { id: "boothwood", name: "Booth Wood Academy", description: "Booth Wood Academy Toolkit.", category: "Toolkit", tag: "", href: "/analytics/toolkits/boothwood", component: BoothWoodToolkit, logoUrl: BoothWoodLogo, comingSoon: false },
  { id: "briarhill", name: "Briar Hill Primary School", description: "Briar Hill Primary School Toolkit.", category: "Toolkit", tag: "", href: "/analytics/toolkits/briarhill", component: BriarHillToolkit, logoUrl: BriarHillLogo, comingSoon: false },
  { id: "bringhurst", name: "Bringhurst Primary School", description: "Bringhurst Primary School Toolkit.", category: "Toolkit", tag: "", href: "/analytics/toolkits/bringhurst", component: BringhurstToolkit, logoUrl: BringhurstLogo, comingSoon: false },
  { id: "cedarroad", name: "Cedar Road Primary School", description: "Cedar Road Primary School Toolkit.", category: "Toolkit", tag: "", href: "/analytics/toolkits/cedarroad", component: CedarRoadToolkit, logoUrl: CedarRdLogo, comingSoon: false },
  { id: "charlesread", name: "Charles Read Academy", description: "Charles Read Academy Toolkit.", category: "Toolkit", tag: "", href: "/analytics/toolkits/charlesread", component: CharlesReadToolkit, logoUrl: CharlesReadLogo, comingSoon: false },
  { id: "charnwood", name: "Charnwood College", description: "Charnwood College Toolkit.", category: "Toolkit", tag: "", href: "/analytics/toolkits/charnwood", component: CharnwoodToolkit, logoUrl: CharnwoodLogo, comingSoon: false },
  { id: "eastfield", name: "Eastfield Academy", description: "Eastfield Academy Toolkit.", category: "Toolkit", tag: "", href: "/analytics/toolkits/eastfield", component: EastfieldToolkit, logoUrl: EastfieldLogo, comingSoon: false },
  { id: "edwardheneage", name: "Edward Heneage Primary Academy", description: "Edward Heneage Primary Academy Toolkit.", category: "Toolkit", tag: "", href: "/analytics/toolkits/edwardheneage", component: EdwardHeneageToolkit, logoUrl: EdHeneageLogo, comingSoon: false },
  { id: "endike", name: "Endike Academy", description: "Endike Academy Toolkit.", category: "Toolkit", tag: "", href: "/analytics/toolkits/endike", component: EndikeToolkit, logoUrl: EndikeLogo, comingSoon: false },
  { id: "eresby", name: "Eresby School", description: "Eresby School Toolkit.", category: "Toolkit", tag: "", href: "/analytics/toolkits/eresby", component: EresbyToolkit, logoUrl: EresbyLogo, comingSoon: false },
  { id: "fairfield", name: "Fairfield Academy", description: "Fairfield Academy Toolkit.", category: "Toolkit", tag: "", href: "/analytics/toolkits/fairfield", component: FairfieldToolkit, logoUrl: FairfieldLogo, comingSoon: false },
  { id: "falconers", name: "Falconer's Hill Academy", description: "Falconer's Hill Academy Toolkit.", category: "Toolkit", tag: "", href: "/analytics/toolkits/falconers", component: FalconersHillToolkit, logoUrl: FalconersLogo, comingSoon: false },
  { id: "greenfields", name: "Greenfields Primary School and Nursery", description: "Greenfields Primary School and Nursery Toolkit.", category: "Toolkit", tag: "", href: "/analytics/toolkits/greenfields", component: GreenfieldsToolkit, logoUrl: GreenfieldsLogo, comingSoon: false },
  { id: "havelock", name: "Havelock Academy", description: "Havelock Academy Toolkit.", category: "Toolkit", tag: "", href: "/analytics/toolkits/havelock", component: HavelockToolkit, logoUrl: HavelockLogo, comingSoon: false },
  { id: "hogs", name: "Hogsthorpe Primary Academy", description: "Hogsthorpe Primary Academy Toolkit.", category: "Toolkit", tag: "", href: "/analytics/toolkits/hogsthorpe", component: HogsthorpeToolkit, logoUrl: HogsLogo, comingSoon: false },
  { id: "humberston", name: "Humberston Academy", description: "Humberston Academy Toolkit.", category: "Toolkit", tag: "", href: "/analytics/toolkits/humberston", component: HumberstonToolkit, logoUrl: HumberstonLogo, comingSoon: false },
  { id: "ingoldsby", name: "Ingoldsby Academy", description: "Ingoldsby Academy Toolkit.", category: "Toolkit", tag: "", href: "/analytics/toolkits/ingoldsby", component: IngoldsbyToolkit, logoUrl: IngoldsbyLogo, comingSoon: false },
  { id: "kevi", name: "King Edward VI Academy", description: "King Edward VI Academy Toolkit.", category: "Toolkit", tag: "", href: "/analytics/toolkits/kevi", component: KingEdwardToolkit, logoUrl: KingEdwardLogo, comingSoon: false },
  { id: "kingsheath", name: "Kings Heath Primary Academy", description: "Kings Heath Primary Academy Toolkit.", category: "Toolkit", tag: "", href: "/analytics/toolkits/kingsheath", component: KingsHeathToolkit, logoUrl: KingsHeathLogo, comingSoon: false },
  { id: "lodgepark", name: "Lodge Park Academy", description: "Lodge Park Academy Toolkit.", category: "Toolkit", tag: "", href: "/analytics/toolkits/lodgepark", component: LodgeParkToolkit, logoUrl: LodgeParkLogo, comingSoon: false },
  { id: "malcolmarnold", name: "Malcolm Arnold Academy", description: "Malcolm Arnold Academy Toolkit.", category: "Toolkit", tag: "", href: "/analytics/toolkits/malcolmarnold", component: MalcolmArnoldToolkit, logoUrl: MalcolmArnoldLogo, comingSoon: false },
  { id: "malcolmarnoldprep", name: "Malcolm Arnold Preparatory School", description: "Malcolm Arnold Preparatory School Toolkit.", category: "Toolkit", tag: "", href: "/analytics/toolkits/malcolmarnoldprep", component: MalcolmArnoldPrepToolkit, logoUrl: MalcolmArnoldPrepLogo, comingSoon: false },
  { id: "newnham", name: "Newnham Primary School", description: "Newnham Primary School Toolkit.", category: "Toolkit", tag: "", href: "/analytics/toolkits/newnham", component: NewnhamToolkit, logoUrl: NewnhamLogo, comingSoon: false },
  { id: "quay", name: "Quay Academy", description: "Quay Academy Toolkit.", category: "Toolkit", tag: "", href: "/analytics/toolkits/quay", component: QuayToolkit, logoUrl: QuayLogo, comingSoon: false },
  { id: "rockingham", name: "Rockingham Primary School", description: "Rockingham Primary School Toolkit.", category: "Toolkit", tag: "", href: "/analytics/toolkits/rockingham", component: RockinghamToolkit, logoUrl: RockinghamLogo, comingSoon: false },
  { id: "sgs", name: "Skegness Grammar School", description: "Skegness Grammar School Toolkit.", category: "Toolkit", tag: "", href: "/analytics/toolkits/skegness", component: SkegnessToolkit, logoUrl: SgsLogo, comingSoon: false },
  { id: "thomashinderwell", name: "Thomas Hinderwell Primary Academy", description: "Thomas Hinderwell Primary Academy Toolkit.", category: "Toolkit", tag: "", href: "/analytics/toolkits/thomashinderwell", component: ThomasHinderwellToolkit, logoUrl: ThomasHinderwellLogo, comingSoon: false },
  { id: "thomasmiddlecott", name: "Thomas Middlecott Academy", description: "Thomas Middlecott Academy Toolkit.", category: "Toolkit", tag: "", href: "/analytics/toolkits/thomasmiddlecott", component: ThomasMiddlecottToolkit, logoUrl: ThomasMiddlecottLogo, comingSoon: false },
  { id: "welton", name: "Welton CE Academy", description: "Welton CE Academy Toolkit.", category: "Toolkit", tag: "", href: "/analytics/toolkits/welton", component: WeltonToolkit, logoUrl: WeltonLogo, comingSoon: false },
  { id: "wold", name: "Wold Academy", description: "Wold Academy Toolkit.", category: "Toolkit", tag: "", href: "/analytics/toolkits/wold", component: WoldToolkit, logoUrl: WoldLogo, comingSoon: false },
];