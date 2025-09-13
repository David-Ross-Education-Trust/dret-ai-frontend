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

// Build master list
export const allToolkitConfigs = [
  // primaries
  ...withSchoolKey(AbbeyConfig, "Abbey Academy"),
  ...withSchoolKey(AinthorpeConfig, "Ainthorpe Primary"),
  ...withSchoolKey(TheArboursConfig, "The Arbours Primary"),
  ...withSchoolKey(BoothWoodConfig, "Booth Wood Academy"),
  ...withSchoolKey(BriarHillConfig, "Briar Hill Primary"),
  ...withSchoolKey(BringhurstConfig, "Bringhurst Primary"),
  ...withSchoolKey(CedarRoadConfig, "Cedar Road Primary"),
  ...withSchoolKey(EastfieldConfig, "Eastfield Primary"),
  ...withSchoolKey(EdwardHeneageConfig, "Edward Heneage Primary"),
  ...withSchoolKey(ThomasHinderwellConfig, "Thomas Hinderwell Primary"),
  ...withSchoolKey(EndikeConfig, "Endike Academy"),
  ...withSchoolKey(EresbyConfig, "Eresby School"),
  ...withSchoolKey(FairfieldConfig, "Fairfield Academy"),
  ...withSchoolKey(FalconersHillConfig, "Falconer’s Hill Academy"),
  ...withSchoolKey(GreenfieldsConfig, "Greenfields Primary"),
  ...withSchoolKey(HogsthorpeConfig, "Hogsthorpe Primary"),
  ...withSchoolKey(IngoldsbyConfig, "Ingoldsby Academy"),
  ...withSchoolKey(KingsHeathConfig, "Kings Heath Primary"),
  ...withSchoolKey(MalcolmArnoldPrepConfig, "Malcolm Arnold Prep"),
  ...withSchoolKey(NewnhamConfig, "Newnham Primary"),
  ...withSchoolKey(WeltonConfig, "Welton Academy"),
  ...withSchoolKey(QuayConfig, "Quay Academy"),
  ...withSchoolKey(RichmondConfig, "Rockingham Primary"),
  ...withSchoolKey(RockinghamConfig, "Rockingham Primary"),
  ...withSchoolKey(WoldConfig, "Wold Academy"),

  // secondaries
  ...withSchoolKey(BarnesWallisConfig, "Barnes Wallis Academy"),
  ...withSchoolKey(BobbyMooreConfig, "Bobby Moore Academy"),
  ...withSchoolKey(CharlesReadConfig, "Charles Read Academy"),
  ...withSchoolKey(CharnwoodConfig, "Charnwood College"),
  ...withSchoolKey(HavelockConfig, "Havelock Academy"),
  ...withSchoolKey(HumberstonConfig, "Humberston Academy"),
  ...withSchoolKey(KingEdwardConfig, "King Edward VI Academy"),
  ...withSchoolKey(LodgeParkConfig, "Lodge Park Academy"),
  ...withSchoolKey(MalcolmArnoldConfig, "Malcolm Arnold Academy"),
  ...withSchoolKey(SkegnessConfig, "Skegness Academy"),
  ...withSchoolKey(ThomasMiddlecottConfig, "Thomas Middlecott Academy"),
];
