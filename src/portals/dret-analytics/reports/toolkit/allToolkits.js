// ---------- PRIMARY ----------
export { AbbeyConfig } from "./primary/AbbeyConfig";
export { AinthorpeConfig } from "./primary/AinthorpeConfig";
export { TheArboursConfig } from "./primary/TheArboursConfig";
export { BoothWoodConfig } from "./primary/BoothWoodConfig";
export { BriarHillConfig } from "./primary/BriarHillConfig";
export { BringhurstConfig } from "./primary/BringhurstConfig";
export { CedarRoadConfig } from "./primary/CedarRoadConfig";
export { EastfieldConfig } from "./primary/EastfieldConfig";
export { EdwardHeneageConfig } from "./primary/EdwardHeneageConfig";
export { ThomasHinderwellConfig } from "./primary/ThomasHinderwellConfig";
export { EndikeConfig } from "./primary/EndikeConfig";
export { EresbyConfig } from "./primary/EresbyConfig";
export { FairfieldConfig } from "./primary/FairfieldConfig";
export { FalconersHillConfig } from "./primary/FalconersHillConfig";
export { GreenfieldsConfig } from "./primary/GreenfieldsConfig";
export { HogsthorpeConfig } from "./primary/HogsthorpeConfig";
export { IngoldsbyConfig } from "./primary/IngoldsbyConfig";
export { KingsHeathConfig } from "./primary/KingsHeathConfig";
export { MalcolmArnoldPrepConfig } from "./primary/MalcolmArnoldPrepConfig";
export { NewnhamConfig } from "./primary/NewnhamConfig";
export { WeltonConfig } from "./primary/WeltonConfig";
export { QuayConfig } from "./primary/QuayConfig";
export { RichmondConfig } from "./primary/RichmondConfig";
export { RockinghamConfig } from "./primary/RockinghamConfig";
export { WoldConfig } from "./primary/WoldConfig";

// ---------- SECONDARY ----------
export { BarnesWallisConfig } from "./secondary/BarnesWallisConfig";
export { BobbyMooreConfig } from "./secondary/BobbyMooreConfig";
export { CharlesReadConfig } from "./secondary/CharlesReadConfig";
export { CharnwoodConfig } from "./secondary/CharnwoodConfig";
export { HavelockConfig } from "./secondary/HavelockConfig";
export { HumberstonConfig } from "./secondary/HumberstonConfig";
export { KingEdwardConfig } from "./secondary/KingEdwardConfig";
export { LodgeParkConfig } from "./secondary/LodgeParkConfig";
export { MalcolmArnoldConfig } from "./secondary/MalcolmArnoldConfig";
export { SkegnessConfig } from "./secondary/SkegnessConfig";
export { ThomasMiddlecottConfig } from "./secondary/ThomasMiddlecottConfig";

// ---------- ALL TOGETHER ----------
import { AbbeyConfig as _Abbey } from "./primary/AbbeyConfig";
import { AinthorpeConfig as _Ainthorpe } from "./primary/AinthorpeConfig";
import { TheArboursConfig as _TheArbours } from "./primary/TheArboursConfig";
import { BoothWoodConfig as _BoothWood } from "./primary/BoothWoodConfig";
import { BriarHillConfig as _BriarHill } from "./primary/BriarHillConfig";
import { BringhurstConfig as _Bringhurst } from "./primary/BringhurstConfig";
import { CedarRoadConfig as _CedarRoad } from "./primary/CedarRoadConfig";
import { EastfieldConfig as _Eastfield } from "./primary/EastfieldConfig";
import { EdwardHeneageConfig as _EdwardHeneage } from "./primary/EdwardHeneageConfig";
import { ThomasHinderwellConfig as _ThomasHinderwell } from "./primary/ThomasHinderwellConfig";
import { EndikeConfig as _Endike } from "./primary/EndikeConfig";
import { EresbyConfig as _Eresby } from "./primary/EresbyConfig";
import { FairfieldConfig as _Fairfield } from "./primary/FairfieldConfig";
import { FalconersHillConfig as _FalconersHill } from "./primary/FalconersHillConfig";
import { GreenfieldsConfig as _Greenfields } from "./primary/GreenfieldsConfig";
import { HogsthorpeConfig as _Hogsthorpe } from "./primary/HogsthorpeConfig";
import { IngoldsbyConfig as _Ingoldsby } from "./primary/IngoldsbyConfig";
import { KingsHeathConfig as _KingsHeath } from "./primary/KingsHeathConfig";
import { MalcolmArnoldPrepConfig as _MalcolmArnoldPrep } from "./primary/MalcolmArnoldPrepConfig";
import { NewnhamConfig as _Newnham } from "./primary/NewnhamConfig";
import { WeltonConfig as _Welton } from "./primary/WeltonConfig";
import { QuayConfig as _Quay } from "./primary/QuayConfig";
import { RichmondConfig as _Richmond } from "./primary/RichmondConfig";
import { RockinghamConfig as _Rockingham } from "./primary/RockinghamConfig";
import { WoldConfig as _Wold } from "./primary/WoldConfig";

// secondary imports for aggregation
import { BarnesWallisConfig as _BarnesWallis } from "./secondary/BarnesWallisConfig";
import { BobbyMooreConfig as _BobbyMoore } from "./secondary/BobbyMooreConfig";
import { CharlesReadConfig as _CharlesRead } from "./secondary/CharlesReadConfig";
import { CharnwoodConfig as _Charnwood } from "./secondary/CharnwoodConfig";
import { HavelockConfig as _Havelock } from "./secondary/HavelockConfig";
import { HumberstonConfig as _Humberston } from "./secondary/HumberstonConfig";
import { KingEdwardConfig as _KingEdward } from "./secondary/KingEdwardConfig";
import { LodgeParkConfig as _LodgePark } from "./secondary/LodgeParkConfig";
import { MalcolmArnoldConfig as _MalcolmArnold } from "./secondary/MalcolmArnoldConfig";
import { SkegnessConfig as _Skegness } from "./secondary/SkegnessConfig";
import { ThomasMiddlecottConfig as _ThomasMiddlecott } from "./secondary/ThomasMiddlecottConfig";

export const allToolkitConfigs = [
  // primaries
  ..._Abbey,
  ..._Ainthorpe,
  ..._TheArbours,
  ..._BoothWood,
  ..._BriarHill,
  ..._Bringhurst,
  ..._CedarRoad,
  ..._Eastfield,
  ..._EdwardHeneage,
  ..._ThomasHinderwell,
  ..._Endike,
  ..._Eresby,
  ..._Fairfield,
  ..._FalconersHill,
  ..._Greenfields,
  ..._Hogsthorpe,
  ..._Ingoldsby,
  ..._KingsHeath,
  ..._MalcolmArnoldPrep,
  ..._Newnham,
  ..._Welton,
  ..._Quay,
  ..._Richmond,
  ..._Rockingham,
  ..._Wold,

  // secondaries
  ..._BarnesWallis,
  ..._BobbyMoore,
  ..._CharlesRead,
  ..._Charnwood,
  ..._Havelock,
  ..._Humberston,
  ..._KingEdward,
  ..._LodgePark,
  ..._MalcolmArnold,
  ..._Skegness,
  ..._ThomasMiddlecott,
];
