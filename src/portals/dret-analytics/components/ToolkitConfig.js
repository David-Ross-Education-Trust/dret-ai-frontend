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

// 3. Export the config array, each with logoUrl mapped to new imports
export const reportConfig = [
  { id: "abbey", name: "Demo Toolkit", description: "Demo Toolkit.", category: "Toolkit", tag: "", href: "/analytics/report/demo", component: DemoToolkit, logoUrl: dretLogo, comingSoon: false },
  { id: "abbey", name: "Abbey CE Academy", description: "Abbey CE Academy Toolkit.", category: "Toolkit", tag: "", href: "/analytics/report/abbey", component: AbbeyToolkit, logoUrl: AbbeyLogo, comingSoon: false },
  { id: "ainthorpe", name: "Ainthorpe Primary School", description: "Ainthorpe Primary School Toolkit.", category: "Toolkit", tag: "", href: "/analytics/report/ainthorpe", component: AinthorpeToolkit, logoUrl: AinthorpeLogo, comingSoon: false },
  { id: "boothwood", name: "Booth Wood Academy", description: "Booth Wood Academy Toolkit.", category: "Toolkit", tag: "", href: "/analytics/report/boothwood", component: BoothWoodToolkit, logoUrl: BoothWoodLogo, comingSoon: false },
  { id: "briarhill", name: "Briar Hill Primary School", description: "Briar Hill Primary School Toolkit.", category: "Toolkit", tag: "", href: "/analytics/report/briarhill", component: BriarHillToolkit, logoUrl: BriarHillLogo, comingSoon: false },
  { id: "bringhurst", name: "Bringhurst Primary School", description: "Bringhurst Primary School Toolkit.", category: "Toolkit", tag: "", href: "/analytics/report/bringhurst", component: BringhurstToolkit, logoUrl: BringhurstLogo, comingSoon: false },
  { id: "cedarrd", name: "Cedar Road Primary School", description: "Cedar Road Primary School Toolkit.", category: "Toolkit", tag: "", href: "/analytics/report/cedarrd", component: CedarRdToolkit, logoUrl: CedarRdLogo, comingSoon: false },
  { id: "charlesread", name: "Charles Read Academy", description: "Charles Read Academy Toolkit.", category: "Toolkit", tag: "", href: "/analytics/report/charlesread", component: CharlesReadToolkit, logoUrl: CharlesReadLogo, comingSoon: false },
  { id: "charnwood", name: "Charnwood College", description: "Charnwood College Toolkit.", category: "Toolkit", tag: "", href: "/analytics/report/charnwood", component: CharnwoodToolkit, logoUrl: CharnwoodLogo, comingSoon: false },
  { id: "eastfield", name: "Eastfield Academy", description: "Eastfield Academy Toolkit.", category: "Toolkit", tag: "", href: "/analytics/report/eastfield", component: EastfieldToolkit, logoUrl: EastfieldLogo, comingSoon: false },
  { id: "edheneage", name: "Edward Heneage Primary Academy", description: "Edward Heneage Primary Academy Toolkit.", category: "Toolkit", tag: "", href: "/analytics/report/edheneage", component: EdHeneageToolkit, logoUrl: EdHeneageLogo, comingSoon: false },
  { id: "endike", name: "Endike Academy", description: "Endike Academy Toolkit.", category: "Toolkit", tag: "", href: "/analytics/report/endike", component: EndikeToolkit, logoUrl: EndikeLogo, comingSoon: false },
  { id: "eresby", name: "Eresby School", description: "Eresby School Toolkit.", category: "Toolkit", tag: "", href: "/analytics/report/eresby", component: EresbyToolkit, logoUrl: EresbyLogo, comingSoon: false },
  { id: "fairfield", name: "Fairfield Academy", description: "Fairfield Academy Toolkit.", category: "Toolkit", tag: "", href: "/analytics/report/fairfield", component: FairfieldToolkit, logoUrl: FairfieldLogo, comingSoon: false },
  { id: "falconers", name: "Falconer's Hill Academy", description: "Falconer's Hill Academy Toolkit.", category: "Toolkit", tag: "", href: "/analytics/report/falconers", component: FalconersToolkit, logoUrl: FalconersLogo, comingSoon: false },
  { id: "greenfields", name: "Greenfields Primary School and Nursery", description: "Greenfields Primary School and Nursery Toolkit.", category: "Toolkit", tag: "", href: "/analytics/report/greenfields", component: GreenfieldsToolkit, logoUrl: GreenfieldsLogo, comingSoon: false },
  { id: "havelock", name: "Havelock Academy", description: "Havelock Academy Toolkit.", category: "Toolkit", tag: "", href: "/analytics/report/havelock", component: HavelockToolkit, logoUrl: HavelockLogo, comingSoon: false },
  { id: "hogs", name: "Hogsthorpe Primary Academy", description: "Hogsthorpe Primary Academy Toolkit.", category: "Toolkit", tag: "", href: "/analytics/report/hogs", component: HogsToolkit, logoUrl: HogsLogo, comingSoon: false },
  { id: "humberston", name: "Humberston Academy", description: "Humberston Academy Toolkit.", category: "Toolkit", tag: "", href: "/analytics/report/humberston", component: HumberstonToolkit, logoUrl: HumberstonLogo, comingSoon: false },
  { id: "ingoldsby", name: "Ingoldsby Academy", description: "Ingoldsby Academy Toolkit.", category: "Toolkit", tag: "", href: "/analytics/report/ingoldsby", component: IngoldsbyToolkit, logoUrl: IngoldsbyLogo, comingSoon: false },
  { id: "kinged", name: "King Edward VI Academy", description: "King Edward VI Academy Toolkit.", category: "Toolkit", tag: "", href: "/analytics/report/kinged", component: KingEdwardToolkit, logoUrl: KingEdwardLogo, comingSoon: false },
  { id: "kingsheath", name: "Kings Heath Primary Academy", description: "Kings Heath Primary Academy Toolkit.", category: "Toolkit", tag: "", href: "/analytics/report/kingsheath", component: KingsHeathToolkit, logoUrl: KingsHeathLogo, comingSoon: false },
  { id: "lodgepark", name: "Lodge Park Academy", description: "Lodge Park Academy Toolkit.", category: "Toolkit", tag: "", href: "/analytics/report/lodgepark", component: LodgeParkToolkit, logoUrl: LodgeParkLogo, comingSoon: false },
  { id: "macolarnold", name: "Malcolm Arnold Academy", description: "Malcolm Arnold Academy Toolkit.", category: "Toolkit", tag: "", href: "/analytics/report/macolarnold", component: MalcolmArnoldToolkit, logoUrl: MalcolmArnoldLogo, comingSoon: false },
  { id: "macolarnoldprep", name: "Malcolm Arnold Preparatory School", description: "Malcolm Arnold Preparatory School Toolkit.", category: "Toolkit", tag: "", href: "/analytics/report/macolarnoldprep", component: MalcolmArnoldPrepToolkit, logoUrl: MalcolmArnoldPrepLogo, comingSoon: false },
  { id: "newnham", name: "Newnham Primary School", description: "Newnham Primary School Toolkit.", category: "Toolkit", tag: "", href: "/analytics/report/newnham", component: NewnhamToolkit, logoUrl: NewnhamLogo, comingSoon: false },
  { id: "quay", name: "Quay Academy", description: "Quay Academy Toolkit.", category: "Toolkit", tag: "", href: "/analytics/report/quay", component: QuayToolkit, logoUrl: QuayLogo, comingSoon: false },
  { id: "rockingham", name: "Rockingham Primary School", description: "Rockingham Primary School Toolkit.", category: "Toolkit", tag: "", href: "/analytics/report/rockingham", component: RockinghamToolkit, logoUrl: RockinghamLogo, comingSoon: false },
  { id: "sgs", name: "Skegness Grammar School", description: "Skegness Grammar School Toolkit.", category: "Toolkit", tag: "", href: "/analytics/report/sgs", component: SgsToolkit, logoUrl: SgsLogo, comingSoon: false },
  { id: "thearbours", name: "The Arbours Primary School", description: "The Arbours Primary School Toolkit.", category: "Toolkit", tag: "", href: "/analytics/report/thearbours", component: TheArboursToolkit, logoUrl: TheArboursLogo, comingSoon: false },
  { id: "thomashinderwell", name: "Thomas Hinderwell Primary Academy", description: "Thomas Hinderwell Primary Academy Toolkit.", category: "Toolkit", tag: "", href: "/analytics/report/thomashinderwell", component: ThomasHinderwellToolkit, logoUrl: ThomasHinderwellLogo, comingSoon: false },
  { id: "thomasmiddlecott", name: "Thomas Middlecott Academy", description: "Thomas Middlecott Academy Toolkit.", category: "Toolkit", tag: "", href: "/analytics/report/thomasmiddlecott", component: ThomasMiddlecottToolkit, logoUrl: ThomasMiddlecottLogo, comingSoon: false },
  { id: "welton", name: "Welton CE Academy", description: "Welton CE Academy Toolkit.", category: "Toolkit", tag: "", href: "/analytics/report/welton", component: WeltonToolkit, logoUrl: WeltonLogo, comingSoon: false },
  { id: "wold", name: "Wold Academy", description: "Wold Academy Toolkit.", category: "Toolkit", tag: "", href: "/analytics/report/wold", component: WoldToolkit, logoUrl: WoldLogo, comingSoon: false },
  { id: "bobbymoore", name: "Bobby Moore Academy", description: "Bobby Moore Academy Toolkit.", category: "Toolkit", tag: "", href: "/analytics/report/bobbymoore", component: BobbyMooreToolkit, logoUrl: BobbyMooreLogo, comingSoon: false },
  { id: "barneswallis", name: "Barnes Wallis Academy", description: "Barnes Wallis Academy Toolkit.", category: "Toolkit", tag: "", href: "/analytics/report/barneswallis", component: BarnesWallisToolkit, logoUrl: BarnesWallisLogo, comingSoon: false }
];