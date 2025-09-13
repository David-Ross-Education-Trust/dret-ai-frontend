// src/portals/dret-analytics/reports/toolkit/allToolkits.js

import excelIcon from "../../../../assets/excel-icon.png";

// import individual school configs
import { AbbeyConfig } from "./primary/AbbeyConfig";
import { AinthorpeConfig } from "./primary/AinthorpeConfig";
import { TheArboursConfig } from "./primary/TheArboursConfig";
import { BoothWoodConfig } from "./primary/BoothWoodConfig";
import { BriarHillConfig } from "./primary/BriarHillConfig";
import { BringhurstConfig } from "./primary/BringhurstConfig";
import { CedarRoadConfig } from "./primary/CedarRoadConfig";
import { EastfieldConfig } from "./primary/EastfieldConfig";
import { EdwardHeneageConfig } from "./primary/EdwardHeneageConfig";
import { ThomasHinderwellConfig } from "./primary/ThomasHinderwellConfig";
import { EndikeConfig } from "./primary/EndikeConfig";
import { EresbyConfig } from "./primary/EresbyConfig";
import { FairfieldConfig } from "./primary/FairfieldConfig";
import { FalconersHillConfig } from "./primary/FalconersHillConfig";
import { GreenfieldsConfig } from "./primary/GreenfieldsConfig";
import { HogsthorpeConfig } from "./primary/HogsthorpeConfig";
import { IngoldsbyConfig } from "./primary/IngoldsbyConfig";
import { KingsHeathConfig } from "./primary/KingsHeathConfig";
import { MalcolmArnoldPrepConfig } from "./primary/MalcolmArnoldPrepConfig";
import { NewnhamConfig } from "./primary/NewnhamConfig";
import { WeltonConfig } from "./primary/WeltonConfig";
import { QuayConfig } from "./primary/QuayConfig";
import { RichmondConfig } from "./primary/RichmondConfig";
import { RockinghamConfig } from "./primary/RockinghamConfig";
import { WoldConfig } from "./primary/WoldConfig";

import { BarnesWallisConfig } from "./secondary/BarnesWallisConfig";
import { BobbyMooreConfig } from "./secondary/BobbyMooreConfig";
import { CharlesReadConfig } from "./secondary/CharlesReadConfig";
import { CharnwoodConfig } from "./secondary/CharnwoodConfig";
import { HavelockConfig } from "./secondary/HavelockConfig";
import { HumberstonConfig } from "./secondary/HumberstonConfig";
import { KingEdwardConfig } from "./secondary/KingEdwardConfig";
import { LodgeParkConfig } from "./secondary/LodgeParkConfig";
import { MalcolmArnoldConfig } from "./secondary/MalcolmArnoldConfig";
import { SkegnessConfig } from "./secondary/SkegnessConfig";
import { ThomasMiddlecottConfig } from "./secondary/ThomasMiddlecottConfig";

// 🔑 helper to normalise school names into URL-friendly keys
function normaliseSchoolLabel(label) {
  if (!label) return "";
  return label
    .replace(/\bToolkit\b/i, "")
    .replace(/\bAcademy\b/i, "")
    .replace(/\bPrimary\b/i, "")
    .replace(/[\W_]+/g, "") // remove spaces, punctuation, underscores
    .trim()
    .toLowerCase();
}

// 🔧 helper to attach schoolKey to every config item
function withSchoolKey(configArray, schoolName) {
  const schoolKey = normaliseSchoolLabel(schoolName);
  return configArray.map((item) => ({
    ...item,
    schoolKey,
    sourceToolkit: schoolName, // keep readable name
  }));
}

// Grouped configs per school
export const schoolToolkitConfigs = {
  abbey: withSchoolKey(AbbeyConfig, "Abbey Academy"),
  ainthorpe: withSchoolKey(AinthorpeConfig, "Ainthorpe Primary"),
  thearbours: withSchoolKey(TheArboursConfig, "The Arbours Primary"),
  boothwood: withSchoolKey(BoothWoodConfig, "Booth Wood Academy"),
  briarhill: withSchoolKey(BriarHillConfig, "Briar Hill Primary"),
  bringhurst: withSchoolKey(BringhurstConfig, "Bringhurst Primary"),
  cedarroad: withSchoolKey(CedarRoadConfig, "Cedar Road Primary"),
  eastfield: withSchoolKey(EastfieldConfig, "Eastfield Primary"),
  edwardheneage: withSchoolKey(EdwardHeneageConfig, "Edward Heneage Primary"),
  thomashinderwell: withSchoolKey(ThomasHinderwellConfig, "Thomas Hinderwell Primary"),
  endike: withSchoolKey(EndikeConfig, "Endike Academy"),
  eresby: withSchoolKey(EresbyConfig, "Eresby School"),
  fairfield: withSchoolKey(FairfieldConfig, "Fairfield Academy"),
  falconershill: withSchoolKey(FalconersHillConfig, "Falconer’s Hill Academy"),
  greenfields: withSchoolKey(GreenfieldsConfig, "Greenfields Primary"),
  hogsthorpe: withSchoolKey(HogsthorpeConfig, "Hogsthorpe Primary"),
  ingoldsby: withSchoolKey(IngoldsbyConfig, "Ingoldsby Academy"),
  kingsheath: withSchoolKey(KingsHeathConfig, "Kings Heath Primary"),
  malcolmarnoldprep: withSchoolKey(MalcolmArnoldPrepConfig, "Malcolm Arnold Prep"),
  newnham: withSchoolKey(NewnhamConfig, "Newnham Primary"),
  welton: withSchoolKey(WeltonConfig, "Welton Academy"),
  quay: withSchoolKey(QuayConfig, "Quay Academy"),
  richmond: withSchoolKey(RichmondConfig, "Richmond Primary"),
  rockingham: withSchoolKey(RockinghamConfig, "Rockingham Primary"),
  wold: withSchoolKey(WoldConfig, "Wold Academy"),

  barneswallis: withSchoolKey(BarnesWallisConfig, "Barnes Wallis Academy"),
  bobbymoore: withSchoolKey(BobbyMooreConfig, "Bobby Moore Academy"),
  charlesread: withSchoolKey(CharlesReadConfig, "Charles Read Academy"),
  charnwood: withSchoolKey(CharnwoodConfig, "Charnwood College"),
  havelock: withSchoolKey(HavelockConfig, "Havelock Academy"),
  humberston: withSchoolKey(HumberstonConfig, "Humberston Academy"),
  kingedward: withSchoolKey(KingEdwardConfig, "King Edward VI Academy"),
  lodgepark: withSchoolKey(LodgeParkConfig, "Lodge Park Academy"),
  malcolmarnold: withSchoolKey(MalcolmArnoldConfig, "Malcolm Arnold Academy"),
  skegness: withSchoolKey(SkegnessConfig, "Skegness Academy"),
  thomasmiddlecott: withSchoolKey(ThomasMiddlecottConfig, "Thomas Middlecott Academy"),
};

// Flattened list (for homepage, search, etc.)
export const allToolkitConfigs = Object.values(schoolToolkitConfigs).flat();
