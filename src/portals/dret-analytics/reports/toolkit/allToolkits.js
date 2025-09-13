// PRIMARY
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

// SECONDARY
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

// 🔑 Grouped configs per school (for dynamic routing)
export const schoolToolkitConfigs = {
  Abbey: {
    name: "Abbey Primary Academy",
    storageKey: "toolkitFavourites_Abbey",
    config: AbbeyConfig,
  },
  Ainthorpe: {
    name: "Ainthorpe Primary Academy",
    storageKey: "toolkitFavourites_Ainthorpe",
    config: AinthorpeConfig,
  },
  TheArbours: {
    name: "The Arbours Primary Academy",
    storageKey: "toolkitFavourites_TheArbours",
    config: TheArboursConfig,
  },
  BoothWood: {
    name: "Booth Wood Primary Academy",
    storageKey: "toolkitFavourites_BoothWood",
    config: BoothWoodConfig,
  },
  BriarHill: {
    name: "Briar Hill Primary Academy",
    storageKey: "toolkitFavourites_BriarHill",
    config: BriarHillConfig,
  },
  Bringhurst: {
    name: "Bringhurst Primary Academy",
    storageKey: "toolkitFavourites_Bringhurst",
    config: BringhurstConfig,
  },
  CedarRoad: {
    name: "Cedar Road Primary Academy",
    storageKey: "toolkitFavourites_CedarRoad",
    config: CedarRoadConfig,
  },
  Eastfield: {
    name: "Eastfield Primary Academy",
    storageKey: "toolkitFavourites_Eastfield",
    config: EastfieldConfig,
  },
  EdwardHeneage: {
    name: "Edward Heneage Primary Academy",
    storageKey: "toolkitFavourites_EdwardHeneage",
    config: EdwardHeneageConfig,
  },
  ThomasHinderwell: {
    name: "Thomas Hinderwell Primary Academy",
    storageKey: "toolkitFavourites_ThomasHinderwell",
    config: ThomasHinderwellConfig,
  },
  Endike: {
    name: "Endike Primary Academy",
    storageKey: "toolkitFavourites_Endike",
    config: EndikeConfig,
  },
  Eresby: {
    name: "The Eresby School",
    storageKey: "toolkitFavourites_Eresby",
    config: EresbyConfig,
  },
  Fairfield: {
    name: "Fairfield Academy",
    storageKey: "toolkitFavourites_Fairfield",
    config: FairfieldConfig,
  },
  FalconersHill: {
    name: "Falconer’s Hill Academy",
    storageKey: "toolkitFavourites_FalconersHill",
    config: FalconersHillConfig,
  },
  Greenfields: {
    name: "Greenfields Primary School",
    storageKey: "toolkitFavourites_Greenfields",
    config: GreenfieldsConfig,
  },
  Hogsthorpe: {
    name: "Hogsthorpe Primary Academy",
    storageKey: "toolkitFavourites_Hogsthorpe",
    config: HogsthorpeConfig,
  },
  Ingoldsby: {
    name: "Ingoldsby Academy",
    storageKey: "toolkitFavourites_Ingoldsby",
    config: IngoldsbyConfig,
  },
  KingsHeath: {
    name: "King’s Heath Primary Academy",
    storageKey: "toolkitFavourites_KingsHeath",
    config: KingsHeathConfig,
  },
  MalcolmArnoldPrep: {
    name: "Malcolm Arnold Preparatory School",
    storageKey: "toolkitFavourites_MalcolmArnoldPrep",
    config: MalcolmArnoldPrepConfig,
  },
  Newnham: {
    name: "Newnham Primary School",
    storageKey: "toolkitFavourites_Newnham",
    config: NewnhamConfig,
  },
  Welton: {
    name: "Welton CE Academy",
    storageKey: "toolkitFavourites_Welton",
    config: WeltonConfig,
  },
  Quay: {
    name: "The Quay School",
    storageKey: "toolkitFavourites_Quay",
    config: QuayConfig,
  },
  Richmond: {
    name: "Richmond Primary Academy",
    storageKey: "toolkitFavourites_Richmond",
    config: RichmondConfig,
  },
  Rockingham: {
    name: "Rockingham Primary",
    storageKey: "toolkitFavourites_Rockingham",
    config: RockinghamConfig,
  },
  Wold: {
    name: "The Wold Academy",
    storageKey: "toolkitFavourites_Wold",
    config: WoldConfig,
  },

  // SECONDARY
  BarnesWallis: {
    name: "Barnes Wallis Academy",
    storageKey: "toolkitFavourites_BarnesWallis",
    config: BarnesWallisConfig,
  },
  BobbyMoore: {
    name: "Bobby Moore Academy",
    storageKey: "toolkitFavourites_BobbyMoore",
    config: BobbyMooreConfig,
  },
  CharlesRead: {
    name: "Charles Read Academy",
    storageKey: "toolkitFavourites_CharlesRead",
    config: CharlesReadConfig,
  },
  Charnwood: {
    name: "Charnwood College",
    storageKey: "toolkitFavourites_Charnwood",
    config: CharnwoodConfig,
  },
  Havelock: {
    name: "Havelock Academy",
    storageKey: "toolkitFavourites_Havelock",
    config: HavelockConfig,
  },
  Humberston: {
    name: "Humberston Academy",
    storageKey: "toolkitFavourites_Humberston",
    config: HumberstonConfig,
  },
  KingEdward: {
    name: "King Edward VI Academy",
    storageKey: "toolkitFavourites_KingEdward",
    config: KingEdwardConfig,
  },
  LodgePark: {
    name: "Lodge Park Academy",
    storageKey: "toolkitFavourites_LodgePark",
    config: LodgeParkConfig,
  },
  MalcolmArnold: {
    name: "Malcolm Arnold Academy",
    storageKey: "toolkitFavourites_MalcolmArnold",
    config: MalcolmArnoldConfig,
  },
  Skegness: {
    name: "Skegness Academy",
    storageKey: "toolkitFavourites_Skegness",
    config: SkegnessConfig,
  },
  ThomasMiddlecott: {
    name: "Thomas Middlecott Academy",
    storageKey: "toolkitFavourites_ThomasMiddlecott",
    config: ThomasMiddlecottConfig,
  },
};

// Derive flat list for homepage favourites
export const allToolkitConfigs = Object.values(schoolToolkitConfigs).flatMap(
  (s) => s.config.map((item) => ({ ...item, schoolKey: Object.keys(schoolToolkitConfigs).find(k => schoolToolkitConfigs[k] === s) }))
);
