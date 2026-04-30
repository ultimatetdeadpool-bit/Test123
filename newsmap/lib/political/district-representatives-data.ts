// ALL 435 US CONGRESSIONAL DISTRICTS - 119th Congress
// BARE MINIMUM: Just Name and Party

export interface DistrictInfo {
  district: string;
  state?: string;
  stateAbbr?: string;
  districtCode?: string;
  representative: {
    name: string;
    party: "Republican" | "Democratic" | "Independent";
    photoUrl?: string;
  };
}

export const districtRepresentativeData: Record<string, DistrictInfo> = {
  "0101": {
    district: "AL-01",
    state: "Alabama",
    stateAbbr: "AL",
    districtCode: "AL-01",
    representative: {
      name: "Jerry Carl",
      party: "Republican",
      photoUrl: "/representatives/Jerry_Carl.jpg"
    }
  },
  "0102": {
    district: "AL-02",
    state: "Alabama",
    stateAbbr: "AL",
    districtCode: "AL-02",
    representative: {
      name: "Barry Moore",
      party: "Republican",
      photoUrl: "/representatives/Barry_Moore.jpg"
    }
  },
  "0103": {
    district: "AL-03",
    state: "Alabama",
    stateAbbr: "AL",
    districtCode: "AL-03",
    representative: {
      name: "Mike Rogers",
      party: "Republican",
      photoUrl: "/representatives/Mike_Rogers.jpg"
    }
  },
  "0104": {
    district: "AL-04",
    state: "Alabama",
    stateAbbr: "AL",
    districtCode: "AL-04",
    representative: {
      name: "Robert Aderholt",
      party: "Republican",
      photoUrl: "/representatives/Robert_Aderholt.jpg"
    }
  },
  "0105": {
    district: "AL-05",
    state: "Alabama",
    stateAbbr: "AL",
    districtCode: "AL-05",
    representative: {
      name: "Dale Strong",
      party: "Republican",
      photoUrl: "/representatives/Dale_Strong.jpg"
    }
  },
  "0106": {
    district: "AL-06",
    state: "Alabama",
    stateAbbr: "AL",
    districtCode: "AL-06",
    representative: {
      name: "Gary Palmer",
      party: "Republican",
      photoUrl: "/representatives/Gary_Palmer.jpg"
    }
  },
  "0107": {
    district: "AL-07",
    state: "Alabama",
    stateAbbr: "AL",
    districtCode: "AL-07",
    representative: {
      name: "Terri Sewell",
      party: "Democratic",
      photoUrl: "/representatives/Terri_Sewell.jpg"
    }
  },
  "0200": {
    district: "AK-AL",
    representative: {
      name: "Mary Peltola",
      party: "Democratic",
      photoUrl: "/representatives/Mary_Peltola.jpg"
    }
  },
  "0401": {
    district: "AZ-01",
    state: "Arizona",
    stateAbbr: "AZ",
    districtCode: "AZ-01",
    representative: {
      name: "David Schweikert",
      party: "Republican",
      photoUrl: "/representatives/David_Schweikert.jpg"
    }
  },
  "0402": {
    district: "AZ-02",
    state: "Arizona",
    stateAbbr: "AZ",
    districtCode: "AZ-02",
    representative: {
      name: "Eli Crane",
      party: "Republican",
      photoUrl: "/representatives/Eli_Crane.jpg"
    }
  },
  "0403": {
    district: "AZ-03",
    state: "Arizona",
    stateAbbr: "AZ",
    districtCode: "AZ-03",
    representative: {
      name: "Ruben Gallego",
      party: "Democratic",
      photoUrl: "/representatives/Ruben_Gallego.jpg"
    }
  },
  "0404": {
    district: "AZ-04",
    state: "Arizona",
    stateAbbr: "AZ",
    districtCode: "AZ-04",
    representative: {
      name: "Greg Stanton",
      party: "Democratic",
      photoUrl: "/representatives/Greg_Stanton.jpg"
    }
  },
  "0405": {
    district: "AZ-05",
    state: "Arizona",
    stateAbbr: "AZ",
    districtCode: "AZ-05",
    representative: {
      name: "Andy Biggs",
      party: "Republican",
      photoUrl: "/representatives/Andy_Biggs.jpg"
    }
  },
  "0406": {
    district: "AZ-06",
    state: "Arizona",
    stateAbbr: "AZ",
    districtCode: "AZ-06",
    representative: {
      name: "Juan Ciscomani",
      party: "Republican",
      photoUrl: "/representatives/Juan_Ciscomani.jpg"
    }
  },
  "0407": {
    district: "AZ-07",
    state: "Arizona",
    stateAbbr: "AZ",
    districtCode: "AZ-07",
    representative: {
      name: "Raúl Grijalva",
      party: "Democratic",
      photoUrl: "/representatives/Raul_Grijalva.jpg"
    }
  },
  "0408": {
    district: "AZ-08",
    state: "Arizona",
    stateAbbr: "AZ",
    districtCode: "AZ-08",
    representative: {
      name: "Debbie Lesko",
      party: "Republican",
      photoUrl: "/representatives/Debbie_Lesko.jpg"
    }
  },
  "0409": {
    district: "AZ-09",
    state: "Arizona",
    stateAbbr: "AZ",
    districtCode: "AZ-09",
    representative: {
      name: "Paul Gosar",
      party: "Republican",
      photoUrl: "/representatives/Paul_Gosar.jpg"
    }
  },
  "0501": {
    district: "AR-01",
    state: "Arkansas",
    stateAbbr: "AR",
    districtCode: "AR-01",
    representative: {
      name: "Rick Crawford",
      party: "Republican",
      photoUrl: "/representatives/Rick_Crawford.jpg"
    }
  },
  "0502": {
    district: "AR-02",
    state: "Arkansas",
    stateAbbr: "AR",
    districtCode: "AR-02",
    representative: {
      name: "French Hill",
      party: "Republican",
      photoUrl: "/representatives/French_Hill.jpg"
    }
  },
  "0503": {
    district: "AR-03",
    state: "Arkansas",
    stateAbbr: "AR",
    districtCode: "AR-03",
    representative: {
      name: "Steve Womack",
      party: "Republican",
      photoUrl: "/representatives/Steve_Womack.jpg"
    }
  },
  "0504": {
    district: "AR-04",
    state: "Arkansas",
    stateAbbr: "AR",
    districtCode: "AR-04",
    representative: {
      name: "Bruce Westerman",
      party: "Republican",
      photoUrl: "/representatives/Bruce_Westerman.jpg"
    }
  },
  "0601": {
    district: "CA-01",
    state: "California",
    stateAbbr: "CA",
    districtCode: "CA-01",
    representative: {
      name: "Doug LaMalfa",
      party: "Republican",
      photoUrl: "/representatives/Doug_LaMalfa.jpg"
    }
  },
  "0602": {
    district: "CA-02",
    state: "California",
    stateAbbr: "CA",
    districtCode: "CA-02",
    representative: {
      name: "Jared Huffman",
      party: "Democratic",
      photoUrl: "/representatives/Jared_Huffman.jpg"
    }
  },
  "0603": {
    district: "CA-03",
    state: "California",
    stateAbbr: "CA",
    districtCode: "CA-03",
    representative: {
      name: "Kevin Kiley",
      party: "Republican",
      photoUrl: "/representatives/Kevin_Kiley.jpg"
    }
  },
  "0604": {
    district: "CA-04",
    state: "California",
    stateAbbr: "CA",
    districtCode: "CA-04",
    representative: {
      name: "Mike Thompson",
      party: "Democratic",
      photoUrl: "/representatives/Mike_Thompson.jpg"
    }
  },
  "0605": {
    district: "CA-05",
    state: "California",
    stateAbbr: "CA",
    districtCode: "CA-05",
    representative: {
      name: "Tom McClintock",
      party: "Republican",
      photoUrl: "/representatives/Tom_McClintock.jpg"
    }
  },
  "0606": {
    district: "CA-06",
    state: "California",
    stateAbbr: "CA",
    districtCode: "CA-06",
    representative: {
      name: "Ami Bera",
      party: "Democratic",
      photoUrl: "/representatives/Ami_Bera.jpg"
    }
  },
  "0607": {
    district: "CA-07",
    state: "California",
    stateAbbr: "CA",
    districtCode: "CA-07",
    representative: {
      name: "Doris Matsui",
      party: "Democratic",
      photoUrl: "/representatives/Doris_Matsui.jpg"
    }
  },
  "0608": {
    district: "CA-08",
    state: "California",
    stateAbbr: "CA",
    districtCode: "CA-08",
    representative: {
      name: "John Garamendi",
      party: "Democratic",
      photoUrl: "/representatives/John_Garamendi.jpg"
    }
  },
  "0609": {
    district: "CA-09",
    state: "California",
    stateAbbr: "CA",
    districtCode: "CA-09",
    representative: {
      name: "Josh Harder",
      party: "Democratic",
      photoUrl: "/representatives/Josh_Harder.jpg"
    }
  },
  "0610": {
    district: "CA-10",
    state: "California",
    stateAbbr: "CA",
    districtCode: "CA-10",
    representative: {
      name: "Mark DeSaulnier",
      party: "Democratic",
      photoUrl: "/representatives/Mark_DeSaulnier.jpg"
    }
  },
  "0611": {
    district: "CA-11",
    state: "California",
    stateAbbr: "CA",
    districtCode: "CA-11",
    representative: {
      name: "Nancy Pelosi",
      party: "Democratic",
      photoUrl: "/representatives/Nancy_Pelosi.jpg"
    }
  },
  "0612": {
    district: "CA-12",
    state: "California",
    stateAbbr: "CA",
    districtCode: "CA-12",
    representative: {
      name: "Barbara Lee",
      party: "Democratic",
      photoUrl: "/representatives/Barbara_Lee.jpg"
    }
  },
  "0613": {
    district: "CA-13",
    state: "California",
    stateAbbr: "CA",
    districtCode: "CA-13",
    representative: {
      name: "John Duarte",
      party: "Republican",
      photoUrl: "/representatives/John_Duarte.jpg"
    }
  },
  "0614": {
    district: "CA-14",
    state: "California",
    stateAbbr: "CA",
    districtCode: "CA-14",
    representative: {
      name: "Eric Swalwell",
      party: "Democratic",
      photoUrl: "/representatives/Eric_Swalwell.jpg"
    }
  },
  "0615": {
    district: "CA-15",
    state: "California",
    stateAbbr: "CA",
    districtCode: "CA-15",
    representative: {
      name: "Kevin Mullin",
      party: "Democratic",
      photoUrl: "/representatives/Kevin_Mullin.jpg"
    }
  },
  "0616": {
    district: "CA-16",
    state: "California",
    stateAbbr: "CA",
    districtCode: "CA-16",
    representative: {
      name: "Sam Liccardo",
      party: "Democratic",
      photoUrl: "/representatives/Sam_Liccardo.jpg"
    }
  },
  "0617": {
    district: "CA-17",
    state: "California",
    stateAbbr: "CA",
    districtCode: "CA-17",
    representative: {
      name: "Ro Khanna",
      party: "Democratic",
      photoUrl: "/representatives/Ro_Khanna.jpg"
    }
  },
  "0618": {
    district: "CA-18",
    state: "California",
    stateAbbr: "CA",
    districtCode: "CA-18",
    representative: {
      name: "Zoe Lofgren",
      party: "Democratic",
      photoUrl: "/representatives/Zoe_Lofgren.jpg"
    }
  },
  "0619": {
    district: "CA-19",
    state: "California",
    stateAbbr: "CA",
    districtCode: "CA-19",
    representative: {
      name: "Jimmy Panetta",
      party: "Democratic",
      photoUrl: "/representatives/Jimmy_Panetta.jpg"
    }
  },
  "0620": {
    district: "CA-20",
    state: "California",
    stateAbbr: "CA",
    districtCode: "CA-20",
    representative: {
      name: "Kevin McCarthy",
      party: "Republican",
      photoUrl: "/representatives/Kevin_McCarthy.jpg"
    }
  },
  "0621": {
    district: "CA-21",
    state: "California",
    stateAbbr: "CA",
    districtCode: "CA-21",
    representative: {
      name: "Jim Costa",
      party: "Democratic",
      photoUrl: "/representatives/Jim_Costa.jpg"
    }
  },
  "0622": {
    district: "CA-22",
    state: "California",
    stateAbbr: "CA",
    districtCode: "CA-22",
    representative: {
      name: "David Valadao",
      party: "Republican",
      photoUrl: "/representatives/David_Valadao.jpg"
    }
  },
  "0623": {
    district: "CA-23",
    state: "California",
    stateAbbr: "CA",
    districtCode: "CA-23",
    representative: {
      name: "Jay Obernolte",
      party: "Republican",
      photoUrl: "/representatives/Jay_Obernolte.jpg"
    }
  },
  "0624": {
    district: "CA-24",
    state: "California",
    stateAbbr: "CA",
    districtCode: "CA-24",
    representative: {
      name: "Salud Carbajal",
      party: "Democratic",
      photoUrl: "/representatives/Salud_Carbajal.jpg"
    }
  },
  "0625": {
    district: "CA-25",
    state: "California",
    stateAbbr: "CA",
    districtCode: "CA-25",
    representative: {
      name: "Raul Ruiz",
      party: "Democratic",
      photoUrl: "/representatives/Raul_Ruiz.jpg"
    }
  },
  "0626": {
    district: "CA-26",
    state: "California",
    stateAbbr: "CA",
    districtCode: "CA-26",
    representative: {
      name: "Julia Brownley",
      party: "Democratic",
      photoUrl: "/representatives/Julia_Brownley.jpg"
    }
  },
  "0627": {
    district: "CA-27",
    state: "California",
    stateAbbr: "CA",
    districtCode: "CA-27",
    representative: {
      name: "Mike Garcia",
      party: "Republican",
      photoUrl: "/representatives/Mike_Garcia.jpg"
    }
  },
  "0628": {
    district: "CA-28",
    state: "California",
    stateAbbr: "CA",
    districtCode: "CA-28",
    representative: {
      name: "Judy Chu",
      party: "Democratic",
      photoUrl: "/representatives/Judy_Chu.jpg"
    }
  },
  "0629": {
    district: "CA-29",
    state: "California",
    stateAbbr: "CA",
    districtCode: "CA-29",
    representative: {
      name: "Tony Cárdenas",
      party: "Democratic",
      photoUrl: "/representatives/Tony_Cárdenas.jpg"
    }
  },
  "0630": {
    district: "CA-30",
    state: "California",
    stateAbbr: "CA",
    districtCode: "CA-30",
    representative: {
      name: "Adam Schiff",
      party: "Democratic",
      photoUrl: "/representatives/Adam_Schiff.jpg"
    }
  },
  "0631": {
    district: "CA-31",
    state: "California",
    stateAbbr: "CA",
    districtCode: "CA-31",
    representative: {
      name: "Grace Napolitano",
      party: "Democratic",
      photoUrl: "/representatives/Grace_Napolitano.jpg"
    }
  },
  "0632": {
    district: "CA-32",
    state: "California",
    stateAbbr: "CA",
    districtCode: "CA-32",
    representative: {
      name: "Brad Sherman",
      party: "Democratic",
      photoUrl: "/representatives/Brad_Sherman.jpg"
    }
  },
  "0633": {
    district: "CA-33",
    state: "California",
    stateAbbr: "CA",
    districtCode: "CA-33",
    representative: {
      name: "Pete Aguilar",
      party: "Democratic",
      photoUrl: "/representatives/Pete_Aguilar.jpg"
    }
  },
  "0634": {
    district: "CA-34",
    state: "California",
    stateAbbr: "CA",
    districtCode: "CA-34",
    representative: {
      name: "Jimmy Gomez",
      party: "Democratic",
      photoUrl: "/representatives/Jimmy_Gomez.jpg"
    }
  },
  "0635": {
    district: "CA-35",
    state: "California",
    stateAbbr: "CA",
    districtCode: "CA-35",
    representative: {
      name: "Norma Torres",
      party: "Democratic",
      photoUrl: "/representatives/Norma_Torres.jpg"
    }
  },
  "0636": {
    district: "CA-36",
    state: "California",
    stateAbbr: "CA",
    districtCode: "CA-36",
    representative: {
      name: "Ted Lieu",
      party: "Democratic",
      photoUrl: "/representatives/Ted_Lieu.jpg"
    }
  },
  "0637": {
    district: "CA-37",
    state: "California",
    stateAbbr: "CA",
    districtCode: "CA-37",
    representative: {
      name: "Sydney Kamlager-Dove",
      party: "Democratic",
      photoUrl: "/representatives/Sydney_Kamlager-Dove.jpg"
    }
  },
  "0638": {
    district: "CA-38",
    state: "California",
    stateAbbr: "CA",
    districtCode: "CA-38",
    representative: {
      name: "Linda Sanchez",
      party: "Democratic",
      photoUrl: "/representatives/Linda_Sanchez.jpg"
    }
  },
  "0639": {
    district: "CA-39",
    state: "California",
    stateAbbr: "CA",
    districtCode: "CA-39",
    representative: {
      name: "Young Kim",
      party: "Republican",
      photoUrl: "/representatives/Young_Kim.jpg"
    }
  },
  "0640": {
    district: "CA-40",
    state: "California",
    stateAbbr: "CA",
    districtCode: "CA-40",
    representative: {
      name: "Robert Garcia",
      party: "Democratic",
      photoUrl: "/representatives/Robert_Garcia.jpg"
    }
  },
  "0641": {
    district: "CA-41",
    state: "California",
    stateAbbr: "CA",
    districtCode: "CA-41",
    representative: {
      name: "Mark Takano",
      party: "Democratic",
      photoUrl: "/representatives/Mark_Takano.jpg"
    }
  },
  "0642": {
    district: "CA-42",
    state: "California",
    stateAbbr: "CA",
    districtCode: "CA-42",
    representative: {
      name: "Ken Calvert",
      party: "Republican",
      photoUrl: "/representatives/Ken_Calvert.jpg"
    }
  },
  "0643": {
    district: "CA-43",
    state: "California",
    stateAbbr: "CA",
    districtCode: "CA-43",
    representative: {
      name: "Maxine Waters",
      party: "Democratic",
      photoUrl: "/representatives/Maxine_Waters.jpg"
    }
  },
  "0644": {
    district: "CA-44",
    state: "California",
    stateAbbr: "CA",
    districtCode: "CA-44",
    representative: {
      name: "Nanette Barragan",
      party: "Democratic",
      photoUrl: "/representatives/Nanette_Barragan.jpg"
    }
  },
  "0645": {
    district: "CA-45",
    state: "California",
    stateAbbr: "CA",
    districtCode: "CA-45",
    representative: {
      name: "Michelle Steel",
      party: "Republican",
      photoUrl: "/representatives/Michelle_Steel.jpg"
    }
  },
  "0646": {
    district: "CA-46",
    state: "California",
    stateAbbr: "CA",
    districtCode: "CA-46",
    representative: {
      name: "Lou Correa",
      party: "Democratic",
      photoUrl: "/representatives/Lou_Correa.jpg"
    }
  },
  "0647": {
    district: "CA-47",
    state: "California",
    stateAbbr: "CA",
    districtCode: "CA-47",
    representative: {
      name: "Katie Porter",
      party: "Democratic",
      photoUrl: "/representatives/Katie_Porter.jpg"
    }
  },
  "0648": {
    district: "CA-48",
    state: "California",
    stateAbbr: "CA",
    districtCode: "CA-48",
    representative: {
      name: "Darrell Issa",
      party: "Republican",
      photoUrl: "/representatives/Darrell_Issa.jpg"
    }
  },
  "0649": {
    district: "CA-49",
    state: "California",
    stateAbbr: "CA",
    districtCode: "CA-49",
    representative: {
      name: "Mike Levin",
      party: "Democratic",
      photoUrl: "/representatives/Mike_Levin.jpg"
    }
  },
  "0650": {
    district: "CA-50",
    state: "California",
    stateAbbr: "CA",
    districtCode: "CA-50",
    representative: {
      name: "Scott Peters",
      party: "Democratic",
      photoUrl: "/representatives/Scott_Peters.jpg"
    }
  },
  "0651": {
    district: "CA-51",
    state: "California",
    stateAbbr: "CA",
    districtCode: "CA-51",
    representative: {
      name: "Sara Jacobs",
      party: "Democratic",
      photoUrl: "/representatives/Sara_Jacobs.jpg"
    }
  },
  "0652": {
    district: "CA-52",
    state: "California",
    stateAbbr: "CA",
    districtCode: "CA-52",
    representative: {
      name: "Juan Vargas",
      party: "Democratic",
      photoUrl: "/representatives/Juan_Vargas.jpg"
    }
  },
  "0801": {
    district: "CO-01",
    state: "Colorado",
    stateAbbr: "CO",
    districtCode: "CO-01",
    representative: {
      name: "Diana DeGette",
      party: "Democratic",
      photoUrl: "/representatives/Diana_DeGette.jpg"
    }
  },
  "0802": {
    district: "CO-02",
    state: "Colorado",
    stateAbbr: "CO",
    districtCode: "CO-02",
    representative: {
      name: "Joe Neguse",
      party: "Democratic",
      photoUrl: "/representatives/Joe_Neguse.jpg"
    }
  },
  "0803": {
    district: "CO-03",
    state: "Colorado",
    stateAbbr: "CO",
    districtCode: "CO-03",
    representative: {
      name: "Lauren Boebert",
      party: "Republican",
      photoUrl: "/representatives/Lauren_Boebert.jpg"
    }
  },
  "0804": {
    district: "CO-04",
    state: "Colorado",
    stateAbbr: "CO",
    districtCode: "CO-04",
    representative: {
      name: "Greg Lopez",
      party: "Republican",
      photoUrl: "/representatives/Greg_Lopez.jpg"
    }
  },
  "0805": {
    district: "CO-05",
    state: "Colorado",
    stateAbbr: "CO",
    districtCode: "CO-05",
    representative: {
      name: "Jeff Crank",
      party: "Republican",
      photoUrl: "/representatives/Jeff_Crank.jpg"
    }
  },
  "0806": {
    district: "CO-06",
    state: "Colorado",
    stateAbbr: "CO",
    districtCode: "CO-06",
    representative: {
      name: "Jason Crow",
      party: "Democratic",
      photoUrl: "/representatives/Jason_Crow.jpg"
    }
  },
  "0807": {
    district: "CO-07",
    state: "Colorado",
    stateAbbr: "CO",
    districtCode: "CO-07",
    representative: {
      name: "Brittany Pettersen",
      party: "Democratic",
      photoUrl: "/representatives/Brittany_Pettersen.jpg"
    }
  },
  "0808": {
    district: "CO-08",
    state: "Colorado",
    stateAbbr: "CO",
    districtCode: "CO-08",
    representative: {
      name: "Yadira Caraveo",
      party: "Democratic",
      photoUrl: "/representatives/Yadira_Caraveo.jpg"
    }
  },
  "0901": {
    district: "CT-01",
    state: "Connecticut",
    stateAbbr: "CT",
    districtCode: "CT-01",
    representative: {
      name: "John Larson",
      party: "Democratic",
      photoUrl: "/representatives/John_Larson.jpg"
    }
  },
  "0902": {
    district: "CT-02",
    state: "Connecticut",
    stateAbbr: "CT",
    districtCode: "CT-02",
    representative: {
      name: "Joe Courtney",
      party: "Democratic",
      photoUrl: "/representatives/Joe_Courtney.jpg"
    }
  },
  "0903": {
    district: "CT-03",
    state: "Connecticut",
    stateAbbr: "CT",
    districtCode: "CT-03",
    representative: {
      name: "Rosa DeLauro",
      party: "Democratic",
      photoUrl: "/representatives/Rosa_DeLauro.jpg"
    }
  },
  "0904": {
    district: "CT-04",
    state: "Connecticut",
    stateAbbr: "CT",
    districtCode: "CT-04",
    representative: {
      name: "Jim Himes",
      party: "Democratic",
      photoUrl: "/representatives/Jim_Himes.jpg"
    }
  },
  "0905": {
    district: "CT-05",
    state: "Connecticut",
    stateAbbr: "CT",
    districtCode: "CT-05",
    representative: {
      name: "Jahana Hayes",
      party: "Democratic",
      photoUrl: "/representatives/Jahana_Hayes.jpg"
    }
  },
  "1000": {
    district: "DE-AL",
    representative: {
      name: "Lisa Blunt Rochester",
      party: "Democratic",
      photoUrl: "/representatives/Lisa_Blunt_Rochester.jpg"
    }
  },
  "1201": {
    district: "FL-01",
    state: "Florida",
    stateAbbr: "FL",
    districtCode: "FL-01",
    representative: {
      name: "Matt Gaetz",
      party: "Republican",
      photoUrl: "/representatives/Matt_Gaetz.jpg"
    }
  },
  "1202": {
    district: "FL-02",
    state: "Florida",
    stateAbbr: "FL",
    districtCode: "FL-02",
    representative: {
      name: "Neal Dunn",
      party: "Republican",
      photoUrl: "/representatives/Neal_Dunn.jpg"
    }
  },
  "1203": {
    district: "FL-03",
    state: "Florida",
    stateAbbr: "FL",
    districtCode: "FL-03",
    representative: {
      name: "Kat Cammack",
      party: "Republican",
      photoUrl: "/representatives/Kat_Cammack.jpg"
    }
  },
  "1204": {
    district: "FL-04",
    state: "Florida",
    stateAbbr: "FL",
    districtCode: "FL-04",
    representative: {
      name: "Aaron Bean",
      party: "Republican",
      photoUrl: "/representatives/Aaron_Bean.jpg"
    }
  },
  "1205": {
    district: "FL-05",
    state: "Florida",
    stateAbbr: "FL",
    districtCode: "FL-05",
    representative: {
      name: "Mike Waltz",
      party: "Republican",
      photoUrl: "/representatives/Mike_Waltz.jpg"
    }
  },
  "1206": {
    district: "FL-06",
    state: "Florida",
    stateAbbr: "FL",
    districtCode: "FL-06",
    representative: {
      name: "Randy Fine",
      party: "Republican",
      photoUrl: "/representatives/Randy_Fine.jpg"
    }
  },
  "1207": {
    district: "FL-07",
    state: "Florida",
    stateAbbr: "FL",
    districtCode: "FL-07",
    representative: {
      name: "Cory Mills",
      party: "Republican",
      photoUrl: "/representatives/Cory_Mills.jpg"
    }
  },
  "1208": {
    district: "FL-08",
    state: "Florida",
    stateAbbr: "FL",
    districtCode: "FL-08",
    representative: {
      name: "Bill Posey",
      party: "Republican",
      photoUrl: "/representatives/Bill_Posey.jpg"
    }
  },
  "1209": {
    district: "FL-09",
    state: "Florida",
    stateAbbr: "FL",
    districtCode: "FL-09",
    representative: {
      name: "Darren Soto",
      party: "Democratic",
      photoUrl: "/representatives/Darren_Soto.jpg"
    }
  },
  "1210": {
    district: "FL-10",
    state: "Florida",
    stateAbbr: "FL",
    districtCode: "FL-10",
    representative: {
      name: "Maxwell Frost",
      party: "Democratic",
      photoUrl: "/representatives/Maxwell_Frost.jpg"
    }
  },
  "1211": {
    district: "FL-11",
    state: "Florida",
    stateAbbr: "FL",
    districtCode: "FL-11",
    representative: {
      name: "Daniel Webster",
      party: "Republican",
      photoUrl: "/representatives/Daniel_Webster.jpg"
    }
  },
  "1212": {
    district: "FL-12",
    state: "Florida",
    stateAbbr: "FL",
    districtCode: "FL-12",
    representative: {
      name: "Gus Bilirakis",
      party: "Republican",
      photoUrl: "/representatives/Gus_Bilirakis.jpg"
    }
  },
  "1213": {
    district: "FL-13",
    state: "Florida",
    stateAbbr: "FL",
    districtCode: "FL-13",
    representative: {
      name: "Anna Paulina Luna",
      party: "Republican",
      photoUrl: "/representatives/Anna_Paulina_Luna.jpg"
    }
  },
  "1214": {
    district: "FL-14",
    state: "Florida",
    stateAbbr: "FL",
    districtCode: "FL-14",
    representative: {
      name: "Kathy Castor",
      party: "Democratic",
      photoUrl: "/representatives/Kathy_Castor.jpg"
    }
  },
  "1215": {
    district: "FL-15",
    state: "Florida",
    stateAbbr: "FL",
    districtCode: "FL-15",
    representative: {
      name: "Laurel Lee",
      party: "Republican",
      photoUrl: "/representatives/Laurel_Lee.jpg"
    }
  },
  "1216": {
    district: "FL-16",
    state: "Florida",
    stateAbbr: "FL",
    districtCode: "FL-16",
    representative: {
      name: "Vern Buchanan",
      party: "Republican",
      photoUrl: "/representatives/Vern_Buchanan.jpg"
    }
  },
  "1217": {
    district: "FL-17",
    state: "Florida",
    stateAbbr: "FL",
    districtCode: "FL-17",
    representative: {
      name: "Greg Steube",
      party: "Republican",
      photoUrl: "/representatives/Greg_Steube.jpg"
    }
  },
  "1218": {
    district: "FL-18",
    state: "Florida",
    stateAbbr: "FL",
    districtCode: "FL-18",
    representative: {
      name: "Scott Franklin",
      party: "Republican",
      photoUrl: "/representatives/Scott_Franklin.jpg"
    }
  },
  "1219": {
    district: "FL-19",
    state: "Florida",
    stateAbbr: "FL",
    districtCode: "FL-19",
    representative: {
      name: "Byron Donalds",
      party: "Republican",
      photoUrl: "/representatives/Byron_Donalds.jpg"
    }
  },
  "1220": {
    district: "FL-20",
    state: "Florida",
    stateAbbr: "FL",
    districtCode: "FL-20",
    representative: {
      name: "Sheila Cherfilus-McCormick",
      party: "Democratic",
      photoUrl: "/representatives/Sheila_Cherfilus-McCormick.jpg"
    }
  },
  "1221": {
    district: "FL-21",
    state: "Florida",
    stateAbbr: "FL",
    districtCode: "FL-21",
    representative: {
      name: "Lois Frankel",
      party: "Democratic",
      photoUrl: "/representatives/Lois_Frankel.jpg"
    }
  },
  "1222": {
    district: "FL-22",
    state: "Florida",
    stateAbbr: "FL",
    districtCode: "FL-22",
    representative: {
      name: "Jared Moskowitz",
      party: "Democratic",
      photoUrl: "/representatives/Jared_Moskowitz.jpg"
    }
  },
  "1223": {
    district: "FL-23",
    state: "Florida",
    stateAbbr: "FL",
    districtCode: "FL-23",
    representative: {
      name: "Debbie Wasserman Schultz",
      party: "Democratic",
      photoUrl: "/representatives/Debbie_Wasserman_Schultz.jpg"
    }
  },
  "1224": {
    district: "FL-24",
    state: "Florida",
    stateAbbr: "FL",
    districtCode: "FL-24",
    representative: {
      name: "Frederica Wilson",
      party: "Democratic",
      photoUrl: "/representatives/Frederica_Wilson.jpg"
    }
  },
  "1225": {
    district: "FL-25",
    state: "Florida",
    stateAbbr: "FL",
    districtCode: "FL-25",
    representative: {
      name: "Mario Diaz-Balart",
      party: "Republican",
      photoUrl: "/representatives/Mario_Diaz-Balart.jpg"
    }
  },
  "1226": {
    district: "FL-26",
    state: "Florida",
    stateAbbr: "FL",
    districtCode: "FL-26",
    representative: {
      name: "Carlos Gimenez",
      party: "Republican",
      photoUrl: "/representatives/Carlos_Gimenez.jpg"
    }
  },
  "1227": {
    district: "FL-27",
    state: "Florida",
    stateAbbr: "FL",
    districtCode: "FL-27",
    representative: {
      name: "Maria Elvira Salazar",
      party: "Republican",
      photoUrl: "/representatives/María_Elvira_Salazar.jpg"
    }
  },
  "1228": {
    district: "FL-28",
    state: "Florida",
    stateAbbr: "FL",
    districtCode: "FL-28",
    representative: {
      name: "Darren Soto",
      party: "Democratic",
      photoUrl: "/representatives/Darren_Soto.jpg"
    }
  },
  "1301": {
    district: "GA-01",
    state: "Georgia",
    stateAbbr: "GA",
    districtCode: "GA-01",
    representative: {
      name: "Buddy Carter",
      party: "Republican",
      photoUrl: "/representatives/Buddy_Carter.jpg"
    }
  },
  "1302": {
    district: "GA-02",
    state: "Georgia",
    stateAbbr: "GA",
    districtCode: "GA-02",
    representative: {
      name: "Sanford Bishop",
      party: "Democratic",
      photoUrl: "/representatives/Sanford_Bishop.jpg"
    }
  },
  "1303": {
    district: "GA-03",
    state: "Georgia",
    stateAbbr: "GA",
    districtCode: "GA-03",
    representative: {
      name: "Drew Ferguson",
      party: "Republican",
      photoUrl: "/representatives/Drew_Ferguson.jpg"
    }
  },
  "1304": {
    district: "GA-04",
    state: "Georgia",
    stateAbbr: "GA",
    districtCode: "GA-04",
    representative: {
      name: "Hank Johnson",
      party: "Democratic",
      photoUrl: "/representatives/Hank_Johnson.jpg"
    }
  },
  "1305": {
    district: "GA-05",
    state: "Georgia",
    stateAbbr: "GA",
    districtCode: "GA-05",
    representative: {
      name: "Nikema Williams",
      party: "Democratic",
      photoUrl: "/representatives/Nikema_Williams.jpg"
    }
  },
  "1306": {
    district: "GA-06",
    state: "Georgia",
    stateAbbr: "GA",
    districtCode: "GA-06",
    representative: {
      name: "Rich McCormick",
      party: "Republican",
      photoUrl: "/representatives/Rich_McCormick.jpg"
    }
  },
  "1307": {
    district: "GA-07",
    state: "Georgia",
    stateAbbr: "GA",
    districtCode: "GA-07",
    representative: {
      name: "Lucy McBath",
      party: "Democratic",
      photoUrl: "/representatives/Lucy_McBath.jpg"
    }
  },
  "1308": {
    district: "GA-08",
    state: "Georgia",
    stateAbbr: "GA",
    districtCode: "GA-08",
    representative: {
      name: "Austin Scott",
      party: "Republican",
      photoUrl: "/representatives/Austin_Scott.jpg"
    }
  },
  "1309": {
    district: "GA-09",
    state: "Georgia",
    stateAbbr: "GA",
    districtCode: "GA-09",
    representative: {
      name: "Andrew Clyde",
      party: "Republican",
      photoUrl: "/representatives/Andrew_Clyde.jpg"
    }
  },
  "1310": {
    district: "GA-10",
    state: "Georgia",
    stateAbbr: "GA",
    districtCode: "GA-10",
    representative: {
      name: "Mike Collins",
      party: "Republican",
      photoUrl: "/representatives/Mike_Collins.jpg"
    }
  },
  "1311": {
    district: "GA-11",
    state: "Georgia",
    stateAbbr: "GA",
    districtCode: "GA-11",
    representative: {
      name: "Barry Loudermilk",
      party: "Republican",
      photoUrl: "/representatives/Barry_Loudermilk.jpg"
    }
  },
  "1312": {
    district: "GA-12",
    state: "Georgia",
    stateAbbr: "GA",
    districtCode: "GA-12",
    representative: {
      name: "Rick Allen",
      party: "Republican",
      photoUrl: "/representatives/Rick_Allen.jpg"
    }
  },
  "1313": {
    district: "GA-13",
    state: "Georgia",
    stateAbbr: "GA",
    districtCode: "GA-13",
    representative: {
      name: "David Scott",
      party: "Democratic",
      photoUrl: "/representatives/David_Scott.jpg"
    }
  },
  "1314": {
    district: "GA-14",
    state: "Georgia",
    stateAbbr: "GA",
    districtCode: "GA-14",
    representative: {
      name: "Marjorie Taylor Greene",
      party: "Republican",
      photoUrl: "/representatives/Marjorie_Taylor_Greene.jpg"
    }
  },
  "1501": {
    district: "HI-01",
    state: "Hawaii",
    stateAbbr: "HI",
    districtCode: "HI-01",
    representative: {
      name: "Ed Case",
      party: "Democratic",
      photoUrl: "/representatives/Ed_Case.jpg"
    }
  },
  "1502": {
    district: "HI-02",
    state: "Hawaii",
    stateAbbr: "HI",
    districtCode: "HI-02",
    representative: {
      name: "Jill Tokuda",
      party: "Democratic",
      photoUrl: "/representatives/Jill_Tokuda.jpg"
    }
  },
  "1601": {
    district: "ID-01",
    state: "Idaho",
    stateAbbr: "ID",
    districtCode: "ID-01",
    representative: {
      name: "Russ Fulcher",
      party: "Republican",
      photoUrl: "/representatives/Russ_Fulcher.jpg"
    }
  },
  "1602": {
    district: "ID-02",
    state: "Idaho",
    stateAbbr: "ID",
    districtCode: "ID-02",
    representative: {
      name: "Mike Simpson",
      party: "Republican",
      photoUrl: "/representatives/Mike_Simpson.jpg"
    }
  },
  "1701": {
    district: "IL-01",
    state: "Illinois",
    stateAbbr: "IL",
    districtCode: "IL-01",
    representative: {
      name: "Jonathan Jackson",
      party: "Democratic",
      photoUrl: "/representatives/Jonathan_Jackson.jpg"
    }
  },
  "1702": {
    district: "IL-02",
    state: "Illinois",
    stateAbbr: "IL",
    districtCode: "IL-02",
    representative: {
      name: "Robin Kelly",
      party: "Democratic",
      photoUrl: "/representatives/Robin_Kelly.jpg"
    }
  },
  "1703": {
    district: "IL-03",
    state: "Illinois",
    stateAbbr: "IL",
    districtCode: "IL-03",
    representative: {
      name: "Delia Ramirez",
      party: "Democratic",
      photoUrl: "/representatives/Delia_Ramirez.jpg"
    }
  },
  "1704": {
    district: "IL-04",
    state: "Illinois",
    stateAbbr: "IL",
    districtCode: "IL-04",
    representative: {
      name: "Jesús García",
      party: "Democratic",
      photoUrl: "/representatives/Jesus_Garcia.jpg"
    }
  },
  "1705": {
    district: "IL-05",
    state: "Illinois",
    stateAbbr: "IL",
    districtCode: "IL-05",
    representative: {
      name: "Mike Quigley",
      party: "Democratic",
      photoUrl: "/representatives/Mike_Quigley.jpg"
    }
  },
  "1706": {
    district: "IL-06",
    state: "Illinois",
    stateAbbr: "IL",
    districtCode: "IL-06",
    representative: {
      name: "Sean Casten",
      party: "Democratic",
      photoUrl: "/representatives/Sean_Casten.jpg"
    }
  },
  "1707": {
    district: "IL-07",
    state: "Illinois",
    stateAbbr: "IL",
    districtCode: "IL-07",
    representative: {
      name: "Danny Davis",
      party: "Democratic",
      photoUrl: "/representatives/Danny_Davis.jpg"
    }
  },
  "1708": {
    district: "IL-08",
    state: "Illinois",
    stateAbbr: "IL",
    districtCode: "IL-08",
    representative: {
      name: "Raja Krishnamoorthi",
      party: "Democratic",
      photoUrl: "/representatives/Raja_Krishnamoorthi.jpg"
    }
  },
  "1709": {
    district: "IL-09",
    state: "Illinois",
    stateAbbr: "IL",
    districtCode: "IL-09",
    representative: {
      name: "Jan Schakowsky",
      party: "Democratic",
      photoUrl: "/representatives/Jan_Schakowsky.jpg"
    }
  },
  "1710": {
    district: "IL-10",
    state: "Illinois",
    stateAbbr: "IL",
    districtCode: "IL-10",
    representative: {
      name: "Brad Schneider",
      party: "Democratic",
      photoUrl: "/representatives/Brad_Schneider.jpg"
    }
  },
  "1711": {
    district: "IL-11",
    state: "Illinois",
    stateAbbr: "IL",
    districtCode: "IL-11",
    representative: {
      name: "Bill Foster",
      party: "Democratic",
      photoUrl: "/representatives/Bill_Foster.jpg"
    }
  },
  "1712": {
    district: "IL-12",
    state: "Illinois",
    stateAbbr: "IL",
    districtCode: "IL-12",
    representative: {
      name: "Mike Bost",
      party: "Republican",
      photoUrl: "/representatives/Mike_Bost.jpg"
    }
  },
  "1713": {
    district: "IL-13",
    state: "Illinois",
    stateAbbr: "IL",
    districtCode: "IL-13",
    representative: {
      name: "Nikki Budzinski",
      party: "Democratic",
      photoUrl: "/representatives/Nikki_Budzinski.jpg"
    }
  },
  "1714": {
    district: "IL-14",
    state: "Illinois",
    stateAbbr: "IL",
    districtCode: "IL-14",
    representative: {
      name: "Lauren Underwood",
      party: "Democratic",
      photoUrl: "/representatives/Lauren_Underwood.jpg"
    }
  },
  "1715": {
    district: "IL-15",
    state: "Illinois",
    stateAbbr: "IL",
    districtCode: "IL-15",
    representative: {
      name: "Mary Miller",
      party: "Republican",
      photoUrl: "/representatives/Mary_Miller.jpg"
    }
  },
  "1716": {
    district: "IL-16",
    state: "Illinois",
    stateAbbr: "IL",
    districtCode: "IL-16",
    representative: {
      name: "Darin LaHood",
      party: "Republican",
      photoUrl: "/representatives/Darin_LaHood.jpg"
    }
  },
  "1717": {
    district: "IL-17",
    state: "Illinois",
    stateAbbr: "IL",
    districtCode: "IL-17",
    representative: {
      name: "Eric Sorensen",
      party: "Democratic",
      photoUrl: "/representatives/Eric_Sorensen.jpg"
    }
  },
  "1801": {
    district: "IN-01",
    state: "Indiana",
    stateAbbr: "IN",
    districtCode: "IN-01",
    representative: {
      name: "Frank Mrvan",
      party: "Democratic",
      photoUrl: "/representatives/Frank_Mrvan.jpg"
    }
  },
  "1802": {
    district: "IN-02",
    state: "Indiana",
    stateAbbr: "IN",
    districtCode: "IN-02",
    representative: {
      name: "Rudy Yakym",
      party: "Republican",
      photoUrl: "/representatives/Rudy_Yakym.jpg"
    }
  },
  "1803": {
    district: "IN-03",
    state: "Indiana",
    stateAbbr: "IN",
    districtCode: "IN-03",
    representative: {
      name: "Jim Banks",
      party: "Republican",
      photoUrl: "/representatives/Jim_Banks.jpg"
    }
  },
  "1804": {
    district: "IN-04",
    state: "Indiana",
    stateAbbr: "IN",
    districtCode: "IN-04",
    representative: {
      name: "Jim Baird",
      party: "Republican",
      photoUrl: "/representatives/Jim_Baird.jpg"
    }
  },
  "1805": {
    district: "IN-05",
    state: "Indiana",
    stateAbbr: "IN",
    districtCode: "IN-05",
    representative: {
      name: "Victoria Spartz",
      party: "Republican",
      photoUrl: "/representatives/Victoria_Spartz.jpg"
    }
  },
  "1806": {
    district: "IN-06",
    state: "Indiana",
    stateAbbr: "IN",
    districtCode: "IN-06",
    representative: {
      name: "Greg Pence",
      party: "Republican",
      photoUrl: "/representatives/Greg_Pence.jpg"
    }
  },
  "1807": {
    district: "IN-07",
    state: "Indiana",
    stateAbbr: "IN",
    districtCode: "IN-07",
    representative: {
      name: "André Carson",
      party: "Democratic",
      photoUrl: "/representatives/Andre_Carson.jpg"
    }
  },
  "1808": {
    district: "IN-08",
    state: "Indiana",
    stateAbbr: "IN",
    districtCode: "IN-08",
    representative: {
      name: "Larry Bucshon",
      party: "Republican",
      photoUrl: "/representatives/Larry_Bucshon.jpg"
    }
  },
  "1809": {
    district: "IN-09",
    state: "Indiana",
    stateAbbr: "IN",
    districtCode: "IN-09",
    representative: {
      name: "Erin Houchin",
      party: "Republican",
      photoUrl: "/representatives/Erin_Houchin.jpg"
    }
  },
  "1901": {
    district: "IA-01",
    state: "Iowa",
    stateAbbr: "IA",
    districtCode: "IA-01",
    representative: {
      name: "Mariannette Miller-Meeks",
      party: "Republican",
      photoUrl: "/representatives/Mariannette_Miller-Meeks.jpg"
    }
  },
  "1902": {
    district: "IA-02",
    state: "Iowa",
    stateAbbr: "IA",
    districtCode: "IA-02",
    representative: {
      name: "Ashley Hinson",
      party: "Republican",
      photoUrl: "/representatives/Ashley_Hinson.jpg"
    }
  },
  "1903": {
    district: "IA-03",
    state: "Iowa",
    stateAbbr: "IA",
    districtCode: "IA-03",
    representative: {
      name: "Zach Nunn",
      party: "Republican",
      photoUrl: "/representatives/Zach_Nunn.jpg"
    }
  },
  "1904": {
    district: "IA-04",
    state: "Iowa",
    stateAbbr: "IA",
    districtCode: "IA-04",
    representative: {
      name: "Randy Feenstra",
      party: "Republican",
      photoUrl: "/representatives/Randy_Feenstra.jpg"
    }
  },
  "2001": {
    district: "KS-01",
    state: "Kansas",
    stateAbbr: "KS",
    districtCode: "KS-01",
    representative: {
      name: "Tracey Mann",
      party: "Republican",
      photoUrl: "/representatives/Tracey_Mann.jpg"
    }
  },
  "2002": {
    district: "KS-02",
    state: "Kansas",
    stateAbbr: "KS",
    districtCode: "KS-02",
    representative: {
      name: "Jake LaTurner",
      party: "Republican",
      photoUrl: "/representatives/Jake_LaTurner.jpg"
    }
  },
  "2003": {
    district: "KS-03",
    state: "Kansas",
    stateAbbr: "KS",
    districtCode: "KS-03",
    representative: {
      name: "Sharice Davids",
      party: "Democratic",
      photoUrl: "/representatives/Sharice_Davids.jpg"
    }
  },
  "2004": {
    district: "KS-04",
    state: "Kansas",
    stateAbbr: "KS",
    districtCode: "KS-04",
    representative: {
      name: "Ron Estes",
      party: "Republican",
      photoUrl: "/representatives/Ron_Estes.jpg"
    }
  },
  "2101": {
    district: "KY-01",
    state: "Kentucky",
    stateAbbr: "KY",
    districtCode: "KY-01",
    representative: {
      name: "James Comer",
      party: "Republican",
      photoUrl: "/representatives/James_Comer.jpg"
    }
  },
  "2102": {
    district: "KY-02",
    state: "Kentucky",
    stateAbbr: "KY",
    districtCode: "KY-02",
    representative: {
      name: "Brett Guthrie",
      party: "Republican",
      photoUrl: "/representatives/Brett_Guthrie.jpg"
    }
  },
  "2103": {
    district: "KY-03",
    state: "Kentucky",
    stateAbbr: "KY",
    districtCode: "KY-03",
    representative: {
      name: "Morgan McGarvey",
      party: "Democratic",
      photoUrl: "/representatives/Morgan_McGarvey.jpg"
    }
  },
  "2104": {
    district: "KY-04",
    state: "Kentucky",
    stateAbbr: "KY",
    districtCode: "KY-04",
    representative: {
      name: "Thomas Massie",
      party: "Republican",
      photoUrl: "/representatives/Thomas_Massie.jpg"
    }
  },
  "2105": {
    district: "KY-05",
    state: "Kentucky",
    stateAbbr: "KY",
    districtCode: "KY-05",
    representative: {
      name: "Hal Rogers",
      party: "Republican",
      photoUrl: "/representatives/Hal_Rogers.jpg"
    }
  },
  "2106": {
    district: "KY-06",
    state: "Kentucky",
    stateAbbr: "KY",
    districtCode: "KY-06",
    representative: {
      name: "Andy Barr",
      party: "Republican",
      photoUrl: "/representatives/Andy_Barr.jpg"
    }
  },
  "2201": {
    district: "LA-01",
    state: "Louisiana",
    stateAbbr: "LA",
    districtCode: "LA-01",
    representative: {
      name: "Steve Scalise",
      party: "Republican",
      photoUrl: "/representatives/Steve_Scalise.jpg"
    }
  },
  "2202": {
    district: "LA-02",
    state: "Louisiana",
    stateAbbr: "LA",
    districtCode: "LA-02",
    representative: {
      name: "Troy Carter",
      party: "Democratic",
      photoUrl: "/representatives/Troy_Carter.jpg"
    }
  },
  "2203": {
    district: "LA-03",
    state: "Louisiana",
    stateAbbr: "LA",
    districtCode: "LA-03",
    representative: {
      name: "Clay Higgins",
      party: "Republican",
      photoUrl: "/representatives/Clay_Higgins.jpg"
    }
  },
  "2204": {
    district: "LA-04",
    state: "Louisiana",
    stateAbbr: "LA",
    districtCode: "LA-04",
    representative: {
      name: "Mike Johnson",
      party: "Republican",
      photoUrl: "/representatives/Mike_Johnson.jpg"
    }
  },
  "2205": {
    district: "LA-05",
    state: "Louisiana",
    stateAbbr: "LA",
    districtCode: "LA-05",
    representative: {
      name: "Julia Letlow",
      party: "Republican",
      photoUrl: "/representatives/Julia_Letlow.jpg"
    }
  },
  "2206": {
    district: "LA-06",
    state: "Louisiana",
    stateAbbr: "LA",
    districtCode: "LA-06",
    representative: {
      name: "Garret Graves",
      party: "Republican",
      photoUrl: "/representatives/Garret_Graves.jpg"
    }
  },
  "2301": {
    district: "ME-01",
    state: "Maine",
    stateAbbr: "ME",
    districtCode: "ME-01",
    representative: {
      name: "Chellie Pingree",
      party: "Democratic",
      photoUrl: "/representatives/Chellie_Pingree.jpg"
    }
  },
  "2302": {
    district: "ME-02",
    state: "Maine",
    stateAbbr: "ME",
    districtCode: "ME-02",
    representative: {
      name: "Jared Golden",
      party: "Democratic",
      photoUrl: "/representatives/Jared_Golden.jpg"
    }
  },
  "2401": {
    district: "MD-01",
    state: "Maryland",
    stateAbbr: "MD",
    districtCode: "MD-01",
    representative: {
      name: "Andy Harris",
      party: "Republican",
      photoUrl: "/representatives/Andy_Harris.jpg"
    }
  },
  "2402": {
    district: "MD-02",
    state: "Maryland",
    stateAbbr: "MD",
    districtCode: "MD-02",
    representative: {
      name: "Dutch Ruppersberger",
      party: "Democratic",
      photoUrl: "/representatives/Dutch_Ruppersberger.jpg"
    }
  },
  "2403": {
    district: "MD-03",
    state: "Maryland",
    stateAbbr: "MD",
    districtCode: "MD-03",
    representative: {
      name: "John Sarbanes",
      party: "Democratic",
      photoUrl: "/representatives/John_Sarbanes.jpg"
    }
  },
  "2404": {
    district: "MD-04",
    state: "Maryland",
    stateAbbr: "MD",
    districtCode: "MD-04",
    representative: {
      name: "Glenn Ivey",
      party: "Democratic",
      photoUrl: "/representatives/Glenn_Ivey.jpg"
    }
  },
  "2405": {
    district: "MD-05",
    state: "Maryland",
    stateAbbr: "MD",
    districtCode: "MD-05",
    representative: {
      name: "Steny Hoyer",
      party: "Democratic",
      photoUrl: "/representatives/Steny_Hoyer.jpg"
    }
  },
  "2406": {
    district: "MD-06",
    state: "Maryland",
    stateAbbr: "MD",
    districtCode: "MD-06",
    representative: {
      name: "David Trone",
      party: "Democratic",
      photoUrl: "/representatives/David_Trone.jpg"
    }
  },
  "2407": {
    district: "MD-07",
    state: "Maryland",
    stateAbbr: "MD",
    districtCode: "MD-07",
    representative: {
      name: "Kweisi Mfume",
      party: "Democratic",
      photoUrl: "/representatives/Kweisi_Mfume.jpg"
    }
  },
  "2408": {
    district: "MD-08",
    state: "Maryland",
    stateAbbr: "MD",
    districtCode: "MD-08",
    representative: {
      name: "Jamie Raskin",
      party: "Democratic",
      photoUrl: "/representatives/Jamie_Raskin.jpg"
    }
  },
  "2501": {
    district: "MA-01",
    state: "Massachusetts",
    stateAbbr: "MA",
    districtCode: "MA-01",
    representative: {
      name: "Richard Neal",
      party: "Democratic",
      photoUrl: "/representatives/Richard_Neal.jpg"
    }
  },
  "2502": {
    district: "MA-02",
    state: "Massachusetts",
    stateAbbr: "MA",
    districtCode: "MA-02",
    representative: {
      name: "Jim McGovern",
      party: "Democratic",
      photoUrl: "/representatives/Jim_McGovern.jpg"
    }
  },
  "2503": {
    district: "MA-03",
    state: "Massachusetts",
    stateAbbr: "MA",
    districtCode: "MA-03",
    representative: {
      name: "Lori Trahan",
      party: "Democratic",
      photoUrl: "/representatives/Lori_Trahan.jpg"
    }
  },
  "2504": {
    district: "MA-04",
    state: "Massachusetts",
    stateAbbr: "MA",
    districtCode: "MA-04",
    representative: {
      name: "Jake Auchincloss",
      party: "Democratic",
      photoUrl: "/representatives/Jake_Auchincloss.jpg"
    }
  },
  "2505": {
    district: "MA-05",
    state: "Massachusetts",
    stateAbbr: "MA",
    districtCode: "MA-05",
    representative: {
      name: "Katherine Clark",
      party: "Democratic",
      photoUrl: "/representatives/Katherine_Clark.jpg"
    }
  },
  "2506": {
    district: "MA-06",
    state: "Massachusetts",
    stateAbbr: "MA",
    districtCode: "MA-06",
    representative: {
      name: "Seth Moulton",
      party: "Democratic",
      photoUrl: "/representatives/Seth_Moulton.jpg"
    }
  },
  "2507": {
    district: "MA-07",
    state: "Massachusetts",
    stateAbbr: "MA",
    districtCode: "MA-07",
    representative: {
      name: "Ayanna Pressley",
      party: "Democratic",
      photoUrl: "/representatives/Ayanna_Pressley.jpg"
    }
  },
  "2508": {
    district: "MA-08",
    state: "Massachusetts",
    stateAbbr: "MA",
    districtCode: "MA-08",
    representative: {
      name: "Stephen Lynch",
      party: "Democratic",
      photoUrl: "/representatives/Stephen_Lynch.jpg"
    }
  },
  "2509": {
    district: "MA-09",
    state: "Massachusetts",
    stateAbbr: "MA",
    districtCode: "MA-09",
    representative: {
      name: "Bill Keating",
      party: "Democratic",
      photoUrl: "/representatives/Bill_Keating.jpg"
    }
  },
  "2601": {
    district: "MI-01",
    state: "Michigan",
    stateAbbr: "MI",
    districtCode: "MI-01",
    representative: {
      name: "Jack Bergman",
      party: "Republican",
      photoUrl: "/representatives/Jack_Bergman.jpg"
    }
  },
  "2602": {
    district: "MI-02",
    state: "Michigan",
    stateAbbr: "MI",
    districtCode: "MI-02",
    representative: {
      name: "John Moolenaar",
      party: "Republican",
      photoUrl: "/representatives/John_Moolenaar.jpg"
    }
  },
  "2603": {
    district: "MI-03",
    state: "Michigan",
    stateAbbr: "MI",
    districtCode: "MI-03",
    representative: {
      name: "Hillary Scholten",
      party: "Democratic",
      photoUrl: "/representatives/Hillary_Scholten.jpg"
    }
  },
  "2604": {
    district: "MI-04",
    state: "Michigan",
    stateAbbr: "MI",
    districtCode: "MI-04",
    representative: {
      name: "Bill Huizenga",
      party: "Republican",
      photoUrl: "/representatives/Bill_Huizenga.jpg"
    }
  },
  "2605": {
    district: "MI-05",
    state: "Michigan",
    stateAbbr: "MI",
    districtCode: "MI-05",
    representative: {
      name: "Tim Walberg",
      party: "Republican",
      photoUrl: "/representatives/Tim_Walberg.jpg"
    }
  },
  "2606": {
    district: "MI-06",
    state: "Michigan",
    stateAbbr: "MI",
    districtCode: "MI-06",
    representative: {
      name: "Debbie Dingell",
      party: "Democratic",
      photoUrl: "/representatives/Debbie_Dingell.jpg"
    }
  },
  "2607": {
    district: "MI-07",
    state: "Michigan",
    stateAbbr: "MI",
    districtCode: "MI-07",
    representative: {
      name: "Elissa Slotkin",
      party: "Democratic",
      photoUrl: "/representatives/Elissa_Slotkin.jpg"
    }
  },
  "2608": {
    district: "MI-08",
    state: "Michigan",
    stateAbbr: "MI",
    districtCode: "MI-08",
    representative: {
      name: "Dan Kildee",
      party: "Democratic",
      photoUrl: "/representatives/Dan_Kildee.jpg"
    }
  },
  "2609": {
    district: "MI-09",
    state: "Michigan",
    stateAbbr: "MI",
    districtCode: "MI-09",
    representative: {
      name: "Lisa McClain",
      party: "Republican",
      photoUrl: "/representatives/Lisa_McClain.jpg"
    }
  },
  "2610": {
    district: "MI-10",
    state: "Michigan",
    stateAbbr: "MI",
    districtCode: "MI-10",
    representative: {
      name: "John James",
      party: "Republican",
      photoUrl: "/representatives/John_James.jpg"
    }
  },
  "2611": {
    district: "MI-11",
    state: "Michigan",
    stateAbbr: "MI",
    districtCode: "MI-11",
    representative: {
      name: "Haley Stevens",
      party: "Democratic",
      photoUrl: "/representatives/Haley_Stevens.jpg"
    }
  },
  "2612": {
    district: "MI-12",
    state: "Michigan",
    stateAbbr: "MI",
    districtCode: "MI-12",
    representative: {
      name: "Rashida Tlaib",
      party: "Democratic",
      photoUrl: "/representatives/Rashida_Tlaib.jpg"
    }
  },
  "2613": {
    district: "MI-13",
    state: "Michigan",
    stateAbbr: "MI",
    districtCode: "MI-13",
    representative: {
      name: "Shri Thanedar",
      party: "Democratic",
      photoUrl: "/representatives/Shri_Thanedar.jpg"
    }
  },
  "2701": {
    district: "MN-01",
    state: "Minnesota",
    stateAbbr: "MN",
    districtCode: "MN-01",
    representative: {
      name: "Brad Finstad",
      party: "Republican",
      photoUrl: "/representatives/Brad_Finstad.jpg"
    }
  },
  "2702": {
    district: "MN-02",
    state: "Minnesota",
    stateAbbr: "MN",
    districtCode: "MN-02",
    representative: {
      name: "Angie Craig",
      party: "Democratic",
      photoUrl: "/representatives/Angie_Craig.jpg"
    }
  },
  "2703": {
    district: "MN-03",
    state: "Minnesota",
    stateAbbr: "MN",
    districtCode: "MN-03",
    representative: {
      name: "Dean Phillips",
      party: "Democratic",
      photoUrl: "/representatives/Dean_Phillips.jpg"
    }
  },
  "2704": {
    district: "MN-04",
    state: "Minnesota",
    stateAbbr: "MN",
    districtCode: "MN-04",
    representative: {
      name: "Betty McCollum",
      party: "Democratic",
      photoUrl: "/representatives/Betty_McCollum.jpg"
    }
  },
  "2705": {
    district: "MN-05",
    state: "Minnesota",
    stateAbbr: "MN",
    districtCode: "MN-05",
    representative: {
      name: "Ilhan Omar",
      party: "Democratic",
      photoUrl: "/representatives/Ilhan_Omar.jpg"
    }
  },
  "2706": {
    district: "MN-06",
    state: "Minnesota",
    stateAbbr: "MN",
    districtCode: "MN-06",
    representative: {
      name: "Tom Emmer",
      party: "Republican",
      photoUrl: "/representatives/Tom_Emmer.jpg"
    }
  },
  "2707": {
    district: "MN-07",
    state: "Minnesota",
    stateAbbr: "MN",
    districtCode: "MN-07",
    representative: {
      name: "Michelle Fischbach",
      party: "Republican",
      photoUrl: "/representatives/Michelle_Fischbach.jpg"
    }
  },
  "2708": {
    district: "MN-08",
    state: "Minnesota",
    stateAbbr: "MN",
    districtCode: "MN-08",
    representative: {
      name: "Pete Stauber",
      party: "Republican",
      photoUrl: "/representatives/Pete_Stauber.jpg"
    }
  },
  "2801": {
    district: "MS-01",
    state: "Mississippi",
    stateAbbr: "MS",
    districtCode: "MS-01",
    representative: {
      name: "Trent Kelly",
      party: "Republican",
      photoUrl: "/representatives/Trent_Kelly.jpg"
    }
  },
  "2802": {
    district: "MS-02",
    state: "Mississippi",
    stateAbbr: "MS",
    districtCode: "MS-02",
    representative: {
      name: "Bennie Thompson",
      party: "Democratic",
      photoUrl: "/representatives/Bennie_Thompson.jpg"
    }
  },
  "2803": {
    district: "MS-03",
    state: "Mississippi",
    stateAbbr: "MS",
    districtCode: "MS-03",
    representative: {
      name: "Michael Guest",
      party: "Republican",
      photoUrl: "/representatives/Michael_Guest.jpg"
    }
  },
  "2804": {
    district: "MS-04",
    state: "Mississippi",
    stateAbbr: "MS",
    districtCode: "MS-04",
    representative: {
      name: "Mike Ezell",
      party: "Republican",
      photoUrl: "/representatives/Mike_Ezell.jpg"
    }
  },
  "2901": {
    district: "MO-01",
    state: "Missouri",
    stateAbbr: "MO",
    districtCode: "MO-01",
    representative: {
      name: "Cori Bush",
      party: "Democratic",
      photoUrl: "/representatives/Cori_Bush.jpg"
    }
  },
  "2902": {
    district: "MO-02",
    state: "Missouri",
    stateAbbr: "MO",
    districtCode: "MO-02",
    representative: {
      name: "Ann Wagner",
      party: "Republican",
      photoUrl: "/representatives/Ann_Wagner.jpg"
    }
  },
  "2903": {
    district: "MO-03",
    state: "Missouri",
    stateAbbr: "MO",
    districtCode: "MO-03",
    representative: {
      name: "Blaine Luetkemeyer",
      party: "Republican",
      photoUrl: "/representatives/Blaine_Luetkemeyer.jpg"
    }
  },
  "2904": {
    district: "MO-04",
    state: "Missouri",
    stateAbbr: "MO",
    districtCode: "MO-04",
    representative: {
      name: "Mark Alford",
      party: "Republican",
      photoUrl: "/representatives/Mark_Alford.jpg"
    }
  },
  "2905": {
    district: "MO-05",
    state: "Missouri",
    stateAbbr: "MO",
    districtCode: "MO-05",
    representative: {
      name: "Emanuel Cleaver",
      party: "Democratic",
      photoUrl: "/representatives/Emanuel_Cleaver.jpg"
    }
  },
  "2906": {
    district: "MO-06",
    state: "Missouri",
    stateAbbr: "MO",
    districtCode: "MO-06",
    representative: {
      name: "Sam Graves",
      party: "Republican",
      photoUrl: "/representatives/Sam_Graves.jpg"
    }
  },
  "2907": {
    district: "MO-07",
    state: "Missouri",
    stateAbbr: "MO",
    districtCode: "MO-07",
    representative: {
      name: "Eric Burlison",
      party: "Republican",
      photoUrl: "/representatives/Eric_Burlison.jpg"
    }
  },
  "2908": {
    district: "MO-08",
    state: "Missouri",
    stateAbbr: "MO",
    districtCode: "MO-08",
    representative: {
      name: "Jason Smith",
      party: "Republican",
      photoUrl: "/representatives/Jason_Smith.jpg"
    }
  },
  "3001": {
    district: "MT-01",
    state: "Montana",
    stateAbbr: "MT",
    districtCode: "MT-01",
    representative: {
      name: "Ryan Zinke",
      party: "Republican",
      photoUrl: "/representatives/Ryan_Zinke.jpg"
    }
  },
  "3002": {
    district: "MT-02",
    state: "Montana",
    stateAbbr: "MT",
    districtCode: "MT-02",
    representative: {
      name: "Matt Rosendale",
      party: "Republican",
      photoUrl: "/representatives/Matt_Rosendale.jpg"
    }
  },
  "3101": {
    district: "NE-01",
    state: "Nebraska",
    stateAbbr: "NE",
    districtCode: "NE-01",
    representative: {
      name: "Mike Flood",
      party: "Republican",
      photoUrl: "/representatives/Mike_Flood.jpg"
    }
  },
  "3102": {
    district: "NE-02",
    state: "Nebraska",
    stateAbbr: "NE",
    districtCode: "NE-02",
    representative: {
      name: "Don Bacon",
      party: "Republican",
      photoUrl: "/representatives/Don_Bacon.jpg"
    }
  },
  "3103": {
    district: "NE-03",
    state: "Nebraska",
    stateAbbr: "NE",
    districtCode: "NE-03",
    representative: {
      name: "Adrian Smith",
      party: "Republican",
      photoUrl: "/representatives/Adrian_Smith.jpg"
    }
  },
  "3201": {
    district: "NV-01",
    state: "Nevada",
    stateAbbr: "NV",
    districtCode: "NV-01",
    representative: {
      name: "Dina Titus",
      party: "Democratic",
      photoUrl: "/representatives/Dina_Titus.jpg"
    }
  },
  "3202": {
    district: "NV-02",
    state: "Nevada",
    stateAbbr: "NV",
    districtCode: "NV-02",
    representative: {
      name: "Mark Amodei",
      party: "Republican",
      photoUrl: "/representatives/Mark_Amodei.jpg"
    }
  },
  "3203": {
    district: "NV-03",
    state: "Nevada",
    stateAbbr: "NV",
    districtCode: "NV-03",
    representative: {
      name: "Susie Lee",
      party: "Democratic",
      photoUrl: "/representatives/Susie_Lee.jpg"
    }
  },
  "3204": {
    district: "NV-04",
    state: "Nevada",
    stateAbbr: "NV",
    districtCode: "NV-04",
    representative: {
      name: "Steven Horsford",
      party: "Democratic",
      photoUrl: "/representatives/Steven_Horsford.jpg"
    }
  },
  "3301": {
    district: "NH-01",
    state: "New Hampshire",
    stateAbbr: "NH",
    districtCode: "NH-01",
    representative: {
      name: "Chris Pappas",
      party: "Democratic",
      photoUrl: "/representatives/Chris_Pappas.jpg"
    }
  },
  "3302": {
    district: "NH-02",
    state: "New Hampshire",
    stateAbbr: "NH",
    districtCode: "NH-02",
    representative: {
      name: "Ann McLane Kuster",
      party: "Democratic",
      photoUrl: "/representatives/Ann_McLane_Kuster.jpg"
    }
  },
  "3401": {
    district: "NJ-01",
    state: "New Jersey",
    stateAbbr: "NJ",
    districtCode: "NJ-01",
    representative: {
      name: "Donald Norcross",
      party: "Democratic",
      photoUrl: "/representatives/Donald_Norcross.jpg"
    }
  },
  "3402": {
    district: "NJ-02",
    state: "New Jersey",
    stateAbbr: "NJ",
    districtCode: "NJ-02",
    representative: {
      name: "Jeff Van Drew",
      party: "Republican",
      photoUrl: "/representatives/Jeff_Van_Drew.jpg"
    }
  },
  "3403": {
    district: "NJ-03",
    state: "New Jersey",
    stateAbbr: "NJ",
    districtCode: "NJ-03",
    representative: {
      name: "Andy Kim",
      party: "Democratic",
      photoUrl: "/representatives/Andy_Kim.jpg"
    }
  },
  "3404": {
    district: "NJ-04",
    state: "New Jersey",
    stateAbbr: "NJ",
    districtCode: "NJ-04",
    representative: {
      name: "Chris Smith",
      party: "Republican",
      photoUrl: "/representatives/Chris_Smith.jpg"
    }
  },
  "3405": {
    district: "NJ-05",
    state: "New Jersey",
    stateAbbr: "NJ",
    districtCode: "NJ-05",
    representative: {
      name: "Josh Gottheimer",
      party: "Democratic",
      photoUrl: "/representatives/Josh_Gottheimer.jpg"
    }
  },
  "3406": {
    district: "NJ-06",
    state: "New Jersey",
    stateAbbr: "NJ",
    districtCode: "NJ-06",
    representative: {
      name: "Frank Pallone",
      party: "Democratic",
      photoUrl: "/representatives/Frank_Pallone.jpg"
    }
  },
  "3407": {
    district: "NJ-07",
    state: "New Jersey",
    stateAbbr: "NJ",
    districtCode: "NJ-07",
    representative: {
      name: "Tom Kean Jr.",
      party: "Republican",
      photoUrl: "/representatives/Tom_Kean_Jr.jpg"
    }
  },
  "3408": {
    district: "NJ-08",
    state: "New Jersey",
    stateAbbr: "NJ",
    districtCode: "NJ-08",
    representative: {
      name: "Rob Menendez",
      party: "Democratic",
      photoUrl: "/representatives/Rob_Menendez.jpg"
    }
  },
  "3409": {
    district: "NJ-09",
    state: "New Jersey",
    stateAbbr: "NJ",
    districtCode: "NJ-09",
    representative: {
      name: "Bill Pascrell",
      party: "Democratic",
      photoUrl: "/representatives/Bill_Pascrell.jpg"
    }
  },
  "3410": {
    district: "NJ-10",
    state: "New Jersey",
    stateAbbr: "NJ",
    districtCode: "NJ-10",
    representative: {
      name: "LaMonica McIver",
      party: "Democratic",
      photoUrl: "/representatives/LaMonica_McIver.jpg"
    }
  },
  "3411": {
    district: "NJ-11",
    state: "New Jersey",
    stateAbbr: "NJ",
    districtCode: "NJ-11",
    representative: {
      name: "Mikie Sherrill",
      party: "Democratic",
      photoUrl: "/representatives/Mikie_Sherrill.jpg"
    }
  },
  "3412": {
    district: "NJ-12",
    state: "New Jersey",
    stateAbbr: "NJ",
    districtCode: "NJ-12",
    representative: {
      name: "Bonnie Watson Coleman",
      party: "Democratic",
      photoUrl: "/representatives/Bonnie_Watson_Coleman.jpg"
    }
  },
  "3501": {
    district: "NM-01",
    state: "New Mexico",
    stateAbbr: "NM",
    districtCode: "NM-01",
    representative: {
      name: "Melanie Stansbury",
      party: "Democratic",
      photoUrl: "/representatives/Melanie_Stansbury.jpg"
    }
  },
  "3502": {
    district: "NM-02",
    state: "New Mexico",
    stateAbbr: "NM",
    districtCode: "NM-02",
    representative: {
      name: "Gabe Vasquez",
      party: "Democratic",
      photoUrl: "/representatives/Gabe_Vasquez.jpg"
    }
  },
  "3503": {
    district: "NM-03",
    state: "New Mexico",
    stateAbbr: "NM",
    districtCode: "NM-03",
    representative: {
      name: "Teresa Leger Fernandez",
      party: "Democratic",
      photoUrl: "/representatives/Teresa_Leger_Fernandez.jpg"
    }
  },
  "3601": {
    district: "NY-01",
    state: "New York",
    stateAbbr: "NY",
    districtCode: "NY-01",
    representative: {
      name: "Nick LaLota",
      party: "Republican",
      photoUrl: "/representatives/Nick_LaLota.jpg"
    }
  },
  "3602": {
    district: "NY-02",
    state: "New York",
    stateAbbr: "NY",
    districtCode: "NY-02",
    representative: {
      name: "Andrew Garbarino",
      party: "Republican",
      photoUrl: "/representatives/Andrew_Garbarino.jpg"
    }
  },
  "3603": {
    district: "NY-03",
    state: "New York",
    stateAbbr: "NY",
    districtCode: "NY-03",
    representative: {
      name: "George Santos",
      party: "Republican",
      photoUrl: "/representatives/George_Santos.jpg"
    }
  },
  "3604": {
    district: "NY-04",
    state: "New York",
    stateAbbr: "NY",
    districtCode: "NY-04",
    representative: {
      name: "Anthony D'Esposito",
      party: "Republican",
      photoUrl: "/representatives/Anthony_D'Esposito.jpg"
    }
  },
  "3605": {
    district: "NY-05",
    state: "New York",
    stateAbbr: "NY",
    districtCode: "NY-05",
    representative: {
      name: "Gregory Meeks",
      party: "Democratic",
      photoUrl: "/representatives/Gregory_Meeks.jpg"
    }
  },
  "3606": {
    district: "NY-06",
    state: "New York",
    stateAbbr: "NY",
    districtCode: "NY-06",
    representative: {
      name: "Grace Meng",
      party: "Democratic",
      photoUrl: "/representatives/Grace_Meng.jpg"
    }
  },
  "3607": {
    district: "NY-07",
    state: "New York",
    stateAbbr: "NY",
    districtCode: "NY-07",
    representative: {
      name: "Nydia Velázquez",
      party: "Democratic",
      photoUrl: "/representatives/Nydia_Velazquez.jpg"
    }
  },
  "3608": {
    district: "NY-08",
    state: "New York",
    stateAbbr: "NY",
    districtCode: "NY-08",
    representative: {
      name: "Hakeem Jeffries",
      party: "Democratic",
      photoUrl: "/representatives/Hakeem_Jeffries.jpg"
    }
  },
  "3609": {
    district: "NY-09",
    state: "New York",
    stateAbbr: "NY",
    districtCode: "NY-09",
    representative: {
      name: "Yvette Clarke",
      party: "Democratic",
      photoUrl: "/representatives/Yvette_Clarke.jpg"
    }
  },
  "3610": {
    district: "NY-10",
    state: "New York",
    stateAbbr: "NY",
    districtCode: "NY-10",
    representative: {
      name: "Dan Goldman",
      party: "Democratic",
      photoUrl: "/representatives/Dan_Goldman.jpg"
    }
  },
  "3611": {
    district: "NY-11",
    state: "New York",
    stateAbbr: "NY",
    districtCode: "NY-11",
    representative: {
      name: "Nicole Malliotakis",
      party: "Republican",
      photoUrl: "/representatives/Nicole_Malliotakis.jpg"
    }
  },
  "3612": {
    district: "NY-12",
    state: "New York",
    stateAbbr: "NY",
    districtCode: "NY-12",
    representative: {
      name: "Jerrold Nadler",
      party: "Democratic",
      photoUrl: "/representatives/Jerrold_Nadler.jpg"
    }
  },
  "3613": {
    district: "NY-13",
    state: "New York",
    stateAbbr: "NY",
    districtCode: "NY-13",
    representative: {
      name: "Adriano Espaillat",
      party: "Democratic",
      photoUrl: "/representatives/Adriano_Espaillat.jpg"
    }
  },
  "3614": {
    district: "NY-14",
    state: "New York",
    stateAbbr: "NY",
    districtCode: "NY-14",
    representative: {
      name: "Alexandria Ocasio-Cortez",
      party: "Democratic",
      photoUrl: "/representatives/Alexandria_Ocasio-Cortez.jpg"
    }
  },
  "3615": {
    district: "NY-15",
    state: "New York",
    stateAbbr: "NY",
    districtCode: "NY-15",
    representative: {
      name: "Ritchie Torres",
      party: "Democratic",
      photoUrl: "/representatives/Ritchie_Torres.jpg"
    }
  },
  "3616": {
    district: "NY-16",
    state: "New York",
    stateAbbr: "NY",
    districtCode: "NY-16",
    representative: {
      name: "Jamaal Bowman",
      party: "Democratic",
      photoUrl: "/representatives/Jamaal_Bowman.jpg"
    }
  },
  "3617": {
    district: "NY-17",
    state: "New York",
    stateAbbr: "NY",
    districtCode: "NY-17",
    representative: {
      name: "Mike Lawler",
      party: "Republican",
      photoUrl: "/representatives/Mike_Lawler.jpg"
    }
  },
  "3618": {
    district: "NY-18",
    state: "New York",
    stateAbbr: "NY",
    districtCode: "NY-18",
    representative: {
      name: "Pat Ryan",
      party: "Democratic",
      photoUrl: "/representatives/Pat_Ryan.jpg"
    }
  },
  "3619": {
    district: "NY-19",
    state: "New York",
    stateAbbr: "NY",
    districtCode: "NY-19",
    representative: {
      name: "Marcus Molinaro",
      party: "Republican",
      photoUrl: "/representatives/Marc_Molinaro.jpg"
    }
  },
  "3620": {
    district: "NY-20",
    state: "New York",
    stateAbbr: "NY",
    districtCode: "NY-20",
    representative: {
      name: "Paul Tonko",
      party: "Democratic",
      photoUrl: "/representatives/Paul_Tonko.jpg"
    }
  },
  "3621": {
    district: "NY-21",
    state: "New York",
    stateAbbr: "NY",
    districtCode: "NY-21",
    representative: {
      name: "Elise Stefanik",
      party: "Republican",
      photoUrl: "/representatives/Elise_Stefanik.jpg"
    }
  },
  "3622": {
    district: "NY-22",
    state: "New York",
    stateAbbr: "NY",
    districtCode: "NY-22",
    representative: {
      name: "Brandon Williams",
      party: "Republican",
      photoUrl: "/representatives/Brandon_Williams.jpg"
    }
  },
  "3623": {
    district: "NY-23",
    state: "New York",
    stateAbbr: "NY",
    districtCode: "NY-23",
    representative: {
      name: "Nick Langworthy",
      party: "Republican",
      photoUrl: "/representatives/Nick_Langworthy.jpg"
    }
  },
  "3624": {
    district: "NY-24",
    state: "New York",
    stateAbbr: "NY",
    districtCode: "NY-24",
    representative: {
      name: "Claudia Tenney",
      party: "Republican",
      photoUrl: "/representatives/Claudia_Tenney.jpg"
    }
  },
  "3625": {
    district: "NY-25",
    state: "New York",
    stateAbbr: "NY",
    districtCode: "NY-25",
    representative: {
      name: "Joseph Morelle",
      party: "Democratic",
      photoUrl: "/representatives/Joseph_Morelle.jpg"
    }
  },
  "3626": {
    district: "NY-26",
    state: "New York",
    stateAbbr: "NY",
    districtCode: "NY-26",
    representative: {
      name: "Tim Kennedy",
      party: "Democratic",
      photoUrl: "/representatives/Timothy_Kennedy.jpg"
    }
  },
  "3701": {
    district: "NC-01",
    state: "North Carolina",
    stateAbbr: "NC",
    districtCode: "NC-01",
    representative: {
      name: "Don Davis",
      party: "Democratic",
      photoUrl: "/representatives/Don_Davis.jpg"
    }
  },
  "3702": {
    district: "NC-02",
    state: "North Carolina",
    stateAbbr: "NC",
    districtCode: "NC-02",
    representative: {
      name: "Deborah Ross",
      party: "Democratic",
      photoUrl: "/representatives/Deborah_Ross.jpg"
    }
  },
  "3703": {
    district: "NC-03",
    state: "North Carolina",
    stateAbbr: "NC",
    districtCode: "NC-03",
    representative: {
      name: "Greg Murphy",
      party: "Republican",
      photoUrl: "/representatives/Greg_Murphy.jpg"
    }
  },
  "3704": {
    district: "NC-04",
    state: "North Carolina",
    stateAbbr: "NC",
    districtCode: "NC-04",
    representative: {
      name: "Valerie Foushee",
      party: "Democratic",
      photoUrl: "/representatives/Valerie_Foushee.jpg"
    }
  },
  "3705": {
    district: "NC-05",
    state: "North Carolina",
    stateAbbr: "NC",
    districtCode: "NC-05",
    representative: {
      name: "Virginia Foxx",
      party: "Republican",
      photoUrl: "/representatives/Virginia_Foxx.jpg"
    }
  },
  "3706": {
    district: "NC-06",
    state: "North Carolina",
    stateAbbr: "NC",
    districtCode: "NC-06",
    representative: {
      name: "Kathy Manning",
      party: "Democratic",
      photoUrl: "/representatives/Kathy_Manning.jpg"
    }
  },
  "3707": {
    district: "NC-07",
    state: "North Carolina",
    stateAbbr: "NC",
    districtCode: "NC-07",
    representative: {
      name: "David Rouzer",
      party: "Republican",
      photoUrl: "/representatives/David_Rouzer.jpg"
    }
  },
  "3708": {
    district: "NC-08",
    state: "North Carolina",
    stateAbbr: "NC",
    districtCode: "NC-08",
    representative: {
      name: "Richard Hudson",
      party: "Republican",
      photoUrl: "/representatives/Richard_Hudson.jpg"
    }
  },
  "3709": {
    district: "NC-09",
    state: "North Carolina",
    stateAbbr: "NC",
    districtCode: "NC-09",
    representative: {
      name: "Dan Bishop",
      party: "Republican",
      photoUrl: "/representatives/Dan_Bishop.jpg"
    }
  },
  "3710": {
    district: "NC-10",
    state: "North Carolina",
    stateAbbr: "NC",
    districtCode: "NC-10",
    representative: {
      name: "Patrick McHenry",
      party: "Republican",
      photoUrl: "/representatives/Patrick_McHenry.jpg"
    }
  },
  "3711": {
    district: "NC-11",
    state: "North Carolina",
    stateAbbr: "NC",
    districtCode: "NC-11",
    representative: {
      name: "Chuck Edwards",
      party: "Republican",
      photoUrl: "/representatives/Chuck_Edwards.jpg"
    }
  },
  "3712": {
    district: "NC-12",
    state: "North Carolina",
    stateAbbr: "NC",
    districtCode: "NC-12",
    representative: {
      name: "Alma Adams",
      party: "Democratic",
      photoUrl: "/representatives/Alma_Adams.jpg"
    }
  },
  "3713": {
    district: "NC-13",
    state: "North Carolina",
    stateAbbr: "NC",
    districtCode: "NC-13",
    representative: {
      name: "Wiley Nickel",
      party: "Democratic",
      photoUrl: "/representatives/Wiley_Nickel.jpg"
    }
  },
  "3714": {
    district: "NC-14",
    state: "North Carolina",
    stateAbbr: "NC",
    districtCode: "NC-14",
    representative: {
      name: "Jeff Jackson",
      party: "Democratic",
      photoUrl: "/representatives/Jeff_Jackson.jpg"
    }
  },
  "3800": {
    district: "ND-AL",
    representative: {
      name: "Kelly Armstrong",
      party: "Republican",
      photoUrl: "/representatives/Kelly_Armstrong.jpg"
    }
  },
  "3901": {
    district: "OH-01",
    state: "Ohio",
    stateAbbr: "OH",
    districtCode: "OH-01",
    representative: {
      name: "Greg Landsman",
      party: "Democratic",
      photoUrl: "/representatives/Greg_Landsman.jpg"
    }
  },
  "3902": {
    district: "OH-02",
    state: "Ohio",
    stateAbbr: "OH",
    districtCode: "OH-02",
    representative: {
      name: "Brad Wenstrup",
      party: "Republican",
      photoUrl: "/representatives/Brad_Wenstrup.jpg"
    }
  },
  "3903": {
    district: "OH-03",
    state: "Ohio",
    stateAbbr: "OH",
    districtCode: "OH-03",
    representative: {
      name: "Joyce Beatty",
      party: "Democratic",
      photoUrl: "/representatives/Joyce_Beatty.jpg"
    }
  },
  "3904": {
    district: "OH-04",
    state: "Ohio",
    stateAbbr: "OH",
    districtCode: "OH-04",
    representative: {
      name: "Jim Jordan",
      party: "Republican",
      photoUrl: "/representatives/Jim_Jordan.jpg"
    }
  },
  "3905": {
    district: "OH-05",
    state: "Ohio",
    stateAbbr: "OH",
    districtCode: "OH-05",
    representative: {
      name: "Bob Latta",
      party: "Republican",
      photoUrl: "/representatives/Bob_Latta.jpg"
    }
  },
  "3906": {
    district: "OH-06",
    state: "Ohio",
    stateAbbr: "OH",
    districtCode: "OH-06",
    representative: {
      name: "Bill Johnson",
      party: "Republican",
      photoUrl: "/representatives/Bill_Johnson.jpg"
    }
  },
  "3907": {
    district: "OH-07",
    state: "Ohio",
    stateAbbr: "OH",
    districtCode: "OH-07",
    representative: {
      name: "Max Miller",
      party: "Republican",
      photoUrl: "/representatives/Max_Miller.jpg"
    }
  },
  "3908": {
    district: "OH-08",
    state: "Ohio",
    stateAbbr: "OH",
    districtCode: "OH-08",
    representative: {
      name: "Warren Davidson",
      party: "Republican",
      photoUrl: "/representatives/Warren_Davidson.jpg"
    }
  },
  "3909": {
    district: "OH-09",
    state: "Ohio",
    stateAbbr: "OH",
    districtCode: "OH-09",
    representative: {
      name: "Marcy Kaptur",
      party: "Democratic",
      photoUrl: "/representatives/Marcy_Kaptur.jpg"
    }
  },
  "3910": {
    district: "OH-10",
    state: "Ohio",
    stateAbbr: "OH",
    districtCode: "OH-10",
    representative: {
      name: "Mike Turner",
      party: "Republican",
      photoUrl: "/representatives/Mike_Turner.jpg"
    }
  },
  "3911": {
    district: "OH-11",
    state: "Ohio",
    stateAbbr: "OH",
    districtCode: "OH-11",
    representative: {
      name: "Shontel Brown",
      party: "Democratic",
      photoUrl: "/representatives/Shontel_Brown.jpg"
    }
  },
  "3912": {
    district: "OH-12",
    state: "Ohio",
    stateAbbr: "OH",
    districtCode: "OH-12",
    representative: {
      name: "Troy Balderson",
      party: "Republican",
      photoUrl: "/representatives/Troy_Balderson.jpg"
    }
  },
  "3913": {
    district: "OH-13",
    state: "Ohio",
    stateAbbr: "OH",
    districtCode: "OH-13",
    representative: {
      name: "Emilia Sykes",
      party: "Democratic",
      photoUrl: "/representatives/Emilia_Sykes.jpg"
    }
  },
  "3914": {
    district: "OH-14",
    state: "Ohio",
    stateAbbr: "OH",
    districtCode: "OH-14",
    representative: {
      name: "David Joyce",
      party: "Republican",
      photoUrl: "/representatives/David_Joyce.jpg"
    }
  },
  "3915": {
    district: "OH-15",
    state: "Ohio",
    stateAbbr: "OH",
    districtCode: "OH-15",
    representative: {
      name: "Mike Carey",
      party: "Republican",
      photoUrl: "/representatives/Mike_Carey.jpg"
    }
  },
  "4001": {
    district: "OK-01",
    state: "Oklahoma",
    stateAbbr: "OK",
    districtCode: "OK-01",
    representative: {
      name: "Kevin Hern",
      party: "Republican",
      photoUrl: "/representatives/Kevin_Hern.jpg"
    }
  },
  "4002": {
    district: "OK-02",
    state: "Oklahoma",
    stateAbbr: "OK",
    districtCode: "OK-02",
    representative: {
      name: "Josh Brecheen",
      party: "Republican",
      photoUrl: "/representatives/Josh_Brecheen.jpg"
    }
  },
  "4003": {
    district: "OK-03",
    state: "Oklahoma",
    stateAbbr: "OK",
    districtCode: "OK-03",
    representative: {
      name: "Frank Lucas",
      party: "Republican",
      photoUrl: "/representatives/Frank_Lucas.jpg"
    }
  },
  "4004": {
    district: "OK-04",
    state: "Oklahoma",
    stateAbbr: "OK",
    districtCode: "OK-04",
    representative: {
      name: "Tom Cole",
      party: "Republican",
      photoUrl: "/representatives/Tom_Cole.jpg"
    }
  },
  "4005": {
    district: "OK-05",
    state: "Oklahoma",
    stateAbbr: "OK",
    districtCode: "OK-05",
    representative: {
      name: "Stephanie Bice",
      party: "Republican",
      photoUrl: "/representatives/Stephanie_Bice.jpg"
    }
  },
  "4101": {
    district: "OR-01",
    state: "Oregon",
    stateAbbr: "OR",
    districtCode: "OR-01",
    representative: {
      name: "Suzanne Bonamici",
      party: "Democratic",
      photoUrl: "/representatives/Suzanne_Bonamici.jpg"
    }
  },
  "4102": {
    district: "OR-02",
    state: "Oregon",
    stateAbbr: "OR",
    districtCode: "OR-02",
    representative: {
      name: "Cliff Bentz",
      party: "Republican",
      photoUrl: "/representatives/Cliff_Bentz.jpg"
    }
  },
  "4103": {
    district: "OR-03",
    state: "Oregon",
    stateAbbr: "OR",
    districtCode: "OR-03",
    representative: {
      name: "Earl Blumenauer",
      party: "Democratic",
      photoUrl: "/representatives/Earl_Blumenauer.jpg"
    }
  },
  "4104": {
    district: "OR-04",
    state: "Oregon",
    stateAbbr: "OR",
    districtCode: "OR-04",
    representative: {
      name: "Val Hoyle",
      party: "Democratic",
      photoUrl: "/representatives/Val_Hoyle.jpg"
    }
  },
  "4105": {
    district: "OR-05",
    state: "Oregon",
    stateAbbr: "OR",
    districtCode: "OR-05",
    representative: {
      name: "Lori Chavez-DeRemer",
      party: "Republican",
      photoUrl: "/representatives/Lori_Chavez-DeRemer.jpg"
    }
  },
  "4106": {
    district: "OR-06",
    state: "Oregon",
    stateAbbr: "OR",
    districtCode: "OR-06",
    representative: {
      name: "Andrea Salinas",
      party: "Democratic",
      photoUrl: "/representatives/Andrea_Salinas.jpg"
    }
  },
  "4201": {
    district: "PA-01",
    state: "Pennsylvania",
    stateAbbr: "PA",
    districtCode: "PA-01",
    representative: {
      name: "Brian Fitzpatrick",
      party: "Republican",
      photoUrl: "/representatives/Brian_Fitzpatrick.jpg"
    }
  },
  "4202": {
    district: "PA-02",
    state: "Pennsylvania",
    stateAbbr: "PA",
    districtCode: "PA-02",
    representative: {
      name: "Brendan Boyle",
      party: "Democratic",
      photoUrl: "/representatives/Brendan_Boyle.jpg"
    }
  },
  "4203": {
    district: "PA-03",
    state: "Pennsylvania",
    stateAbbr: "PA",
    districtCode: "PA-03",
    representative: {
      name: "Dwight Evans",
      party: "Democratic",
      photoUrl: "/representatives/Dwight_Evans.jpg"
    }
  },
  "4204": {
    district: "PA-04",
    state: "Pennsylvania",
    stateAbbr: "PA",
    districtCode: "PA-04",
    representative: {
      name: "Madeleine Dean",
      party: "Democratic",
      photoUrl: "/representatives/Madeleine_Dean.jpg"
    }
  },
  "4205": {
    district: "PA-05",
    state: "Pennsylvania",
    stateAbbr: "PA",
    districtCode: "PA-05",
    representative: {
      name: "Mary Gay Scanlon",
      party: "Democratic",
      photoUrl: "/representatives/Mary_Gay_Scanlon.jpg"
    }
  },
  "4206": {
    district: "PA-06",
    state: "Pennsylvania",
    stateAbbr: "PA",
    districtCode: "PA-06",
    representative: {
      name: "Chrissy Houlahan",
      party: "Democratic",
      photoUrl: "/representatives/Chrissy_Houlahan.jpg"
    }
  },
  "4207": {
    district: "PA-07",
    state: "Pennsylvania",
    stateAbbr: "PA",
    districtCode: "PA-07",
    representative: {
      name: "Susan Wild",
      party: "Democratic",
      photoUrl: "/representatives/Susan_Wild.jpg"
    }
  },
  "4208": {
    district: "PA-08",
    state: "Pennsylvania",
    stateAbbr: "PA",
    districtCode: "PA-08",
    representative: {
      name: "Matt Cartwright",
      party: "Democratic",
      photoUrl: "/representatives/Matt_Cartwright.jpg"
    }
  },
  "4209": {
    district: "PA-09",
    state: "Pennsylvania",
    stateAbbr: "PA",
    districtCode: "PA-09",
    representative: {
      name: "Dan Meuser",
      party: "Republican",
      photoUrl: "/representatives/Dan_Meuser.jpg"
    }
  },
  "4210": {
    district: "PA-10",
    state: "Pennsylvania",
    stateAbbr: "PA",
    districtCode: "PA-10",
    representative: {
      name: "Scott Perry",
      party: "Republican",
      photoUrl: "/representatives/Scott_Perry.jpg"
    }
  },
  "4211": {
    district: "PA-11",
    state: "Pennsylvania",
    stateAbbr: "PA",
    districtCode: "PA-11",
    representative: {
      name: "Lloyd Smucker",
      party: "Republican",
      photoUrl: "/representatives/Lloyd_Smucker.jpg"
    }
  },
  "4212": {
    district: "PA-12",
    state: "Pennsylvania",
    stateAbbr: "PA",
    districtCode: "PA-12",
    representative: {
      name: "Summer Lee",
      party: "Democratic",
      photoUrl: "/representatives/Summer_Lee.jpg"
    }
  },
  "4213": {
    district: "PA-13",
    state: "Pennsylvania",
    stateAbbr: "PA",
    districtCode: "PA-13",
    representative: {
      name: "John Joyce",
      party: "Republican",
      photoUrl: "/representatives/John_Joyce.jpg"
    }
  },
  "4214": {
    district: "PA-14",
    state: "Pennsylvania",
    stateAbbr: "PA",
    districtCode: "PA-14",
    representative: {
      name: "Guy Reschenthaler",
      party: "Republican",
      photoUrl: "/representatives/Guy_Reschenthaler.jpg"
    }
  },
  "4215": {
    district: "PA-15",
    state: "Pennsylvania",
    stateAbbr: "PA",
    districtCode: "PA-15",
    representative: {
      name: "Glenn Thompson",
      party: "Republican",
      photoUrl: "/representatives/Glenn_Thompson.jpg"
    }
  },
  "4216": {
    district: "PA-16",
    state: "Pennsylvania",
    stateAbbr: "PA",
    districtCode: "PA-16",
    representative: {
      name: "Mike Kelly",
      party: "Republican",
      photoUrl: "/representatives/Mike_Kelly.jpg"
    }
  },
  "4217": {
    district: "PA-17",
    state: "Pennsylvania",
    stateAbbr: "PA",
    districtCode: "PA-17",
    representative: {
      name: "Chris Deluzio",
      party: "Democratic",
      photoUrl: "/representatives/Chris_Deluzio.jpg"
    }
  },
  "4401": {
    district: "RI-01",
    state: "Rhode Island",
    stateAbbr: "RI",
    districtCode: "RI-01",
    representative: {
      name: "David Cicilline",
      party: "Democratic",
      photoUrl: "/representatives/David_Cicilline.jpg"
    }
  },
  "4402": {
    district: "RI-02",
    state: "Rhode Island",
    stateAbbr: "RI",
    districtCode: "RI-02",
    representative: {
      name: "Seth Magaziner",
      party: "Democratic",
      photoUrl: "/representatives/Seth_Magaziner.jpg"
    }
  },
  "4501": {
    district: "SC-01",
    state: "South Carolina",
    stateAbbr: "SC",
    districtCode: "SC-01",
    representative: {
      name: "Nancy Mace",
      party: "Republican",
      photoUrl: "/representatives/Nancy_Mace.jpg"
    }
  },
  "4502": {
    district: "SC-02",
    state: "South Carolina",
    stateAbbr: "SC",
    districtCode: "SC-02",
    representative: {
      name: "Joe Wilson",
      party: "Republican",
      photoUrl: "/representatives/Joe_Wilson.jpg"
    }
  },
  "4503": {
    district: "SC-03",
    state: "South Carolina",
    stateAbbr: "SC",
    districtCode: "SC-03",
    representative: {
      name: "Jeff Duncan",
      party: "Republican",
      photoUrl: "/representatives/Jeff_Duncan.jpg"
    }
  },
  "4504": {
    district: "SC-04",
    state: "South Carolina",
    stateAbbr: "SC",
    districtCode: "SC-04",
    representative: {
      name: "William Timmons",
      party: "Republican",
      photoUrl: "/representatives/William_Timmons.jpg"
    }
  },
  "4505": {
    district: "SC-05",
    state: "South Carolina",
    stateAbbr: "SC",
    districtCode: "SC-05",
    representative: {
      name: "Ralph Norman",
      party: "Republican",
      photoUrl: "/representatives/Ralph_Norman.jpg"
    }
  },
  "4506": {
    district: "SC-06",
    state: "South Carolina",
    stateAbbr: "SC",
    districtCode: "SC-06",
    representative: {
      name: "Jim Clyburn",
      party: "Democratic",
      photoUrl: "/representatives/Jim_Clyburn.jpg"
    }
  },
  "4507": {
    district: "SC-07",
    state: "South Carolina",
    stateAbbr: "SC",
    districtCode: "SC-07",
    representative: {
      name: "Russell Fry",
      party: "Republican",
      photoUrl: "/representatives/Russell_Fry.jpg"
    }
  },
  "4600": {
    district: "SD-AL",
    representative: {
      name: "Dusty Johnson",
      party: "Republican",
      photoUrl: "/representatives/Dusty_Johnson.jpg"
    }
  },
  "4701": {
    district: "TN-01",
    state: "Tennessee",
    stateAbbr: "TN",
    districtCode: "TN-01",
    representative: {
      name: "Diana Harshbarger",
      party: "Republican",
      photoUrl: "/representatives/Diana_Harshbarger.jpg"
    }
  },
  "4702": {
    district: "TN-02",
    state: "Tennessee",
    stateAbbr: "TN",
    districtCode: "TN-02",
    representative: {
      name: "Tim Burchett",
      party: "Republican",
      photoUrl: "/representatives/Tim_Burchett.jpg"
    }
  },
  "4703": {
    district: "TN-03",
    state: "Tennessee",
    stateAbbr: "TN",
    districtCode: "TN-03",
    representative: {
      name: "Chuck Fleischmann",
      party: "Republican",
      photoUrl: "/representatives/Chuck_Fleischmann.jpg"
    }
  },
  "4704": {
    district: "TN-04",
    state: "Tennessee",
    stateAbbr: "TN",
    districtCode: "TN-04",
    representative: {
      name: "Scott DesJarlais",
      party: "Republican",
      photoUrl: "/representatives/Scott_DesJarlais.jpg"
    }
  },
  "4705": {
    district: "TN-05",
    state: "Tennessee",
    stateAbbr: "TN",
    districtCode: "TN-05",
    representative: {
      name: "Andy Ogles",
      party: "Republican",
      photoUrl: "/representatives/Andy_Ogles.jpg"
    }
  },
  "4706": {
    district: "TN-06",
    state: "Tennessee",
    stateAbbr: "TN",
    districtCode: "TN-06",
    representative: {
      name: "John Rose",
      party: "Republican",
      photoUrl: "/representatives/John_Rose.jpg"
    }
  },
  "4707": {
    district: "TN-07",
    state: "Tennessee",
    stateAbbr: "TN",
    districtCode: "TN-07",
    representative: {
      name: "Mark Green",
      party: "Republican",
      photoUrl: "/representatives/Mark_Green.jpg"
    }
  },
  "4708": {
    district: "TN-08",
    state: "Tennessee",
    stateAbbr: "TN",
    districtCode: "TN-08",
    representative: {
      name: "David Kustoff",
      party: "Republican",
      photoUrl: "/representatives/David_Kustoff.jpg"
    }
  },
  "4709": {
    district: "TN-09",
    state: "Tennessee",
    stateAbbr: "TN",
    districtCode: "TN-09",
    representative: {
      name: "Steve Cohen",
      party: "Democratic",
      photoUrl: "/representatives/Steve_Cohen.jpg"
    }
  },
  "4801": {
    district: "TX-01",
    state: "Texas",
    stateAbbr: "TX",
    districtCode: "TX-01",
    representative: {
      name: "Nathaniel Moran",
      party: "Republican",
      photoUrl: "/representatives/Nathaniel_Moran.jpg"
    }
  },
  "4802": {
    district: "TX-02",
    state: "Texas",
    stateAbbr: "TX",
    districtCode: "TX-02",
    representative: {
      name: "Dan Crenshaw",
      party: "Republican",
      photoUrl: "/representatives/Dan_Crenshaw.jpg"
    }
  },
  "4803": {
    district: "TX-03",
    state: "Texas",
    stateAbbr: "TX",
    districtCode: "TX-03",
    representative: {
      name: "Keith Self",
      party: "Republican",
      photoUrl: "/representatives/Keith_Self.jpg"
    }
  },
  "4804": {
    district: "TX-04",
    state: "Texas",
    stateAbbr: "TX",
    districtCode: "TX-04",
    representative: {
      name: "Pat Fallon",
      party: "Republican",
      photoUrl: "/representatives/Pat_Fallon.jpg"
    }
  },
  "4805": {
    district: "TX-05",
    state: "Texas",
    stateAbbr: "TX",
    districtCode: "TX-05",
    representative: {
      name: "Lance Gooden",
      party: "Republican",
      photoUrl: "/representatives/Lance_Gooden.jpg"
    }
  },
  "4806": {
    district: "TX-06",
    state: "Texas",
    stateAbbr: "TX",
    districtCode: "TX-06",
    representative: {
      name: "Jake Ellzey",
      party: "Republican",
      photoUrl: "/representatives/Jake_Ellzey.jpg"
    }
  },
  "4807": {
    district: "TX-07",
    state: "Texas",
    stateAbbr: "TX",
    districtCode: "TX-07",
    representative: {
      name: "Lizzie Fletcher",
      party: "Democratic",
      photoUrl: "/representatives/Lizzie_Fletcher.jpg"
    }
  },
  "4808": {
    district: "TX-08",
    state: "Texas",
    stateAbbr: "TX",
    districtCode: "TX-08",
    representative: {
      name: "Morgan Luttrell",
      party: "Republican",
      photoUrl: "/representatives/Morgan_Luttrell.jpg"
    }
  },
  "4809": {
    district: "TX-09",
    state: "Texas",
    stateAbbr: "TX",
    districtCode: "TX-09",
    representative: {
      name: "Al Green",
      party: "Democratic",
      photoUrl: "/representatives/Al_Green.jpg"
    }
  },
  "4810": {
    district: "TX-10",
    state: "Texas",
    stateAbbr: "TX",
    districtCode: "TX-10",
    representative: {
      name: "Michael McCaul",
      party: "Republican",
      photoUrl: "/representatives/Michael_McCaul.jpg"
    }
  },
  "4811": {
    district: "TX-11",
    state: "Texas",
    stateAbbr: "TX",
    districtCode: "TX-11",
    representative: {
      name: "August Pfluger",
      party: "Republican",
      photoUrl: "/representatives/August_Pfluger.jpg"
    }
  },
  "4812": {
    district: "TX-12",
    state: "Texas",
    stateAbbr: "TX",
    districtCode: "TX-12",
    representative: {
      name: "Kay Granger",
      party: "Republican",
      photoUrl: "/representatives/Kay_Granger.jpg"
    }
  },
  "4813": {
    district: "TX-13",
    state: "Texas",
    stateAbbr: "TX",
    districtCode: "TX-13",
    representative: {
      name: "Ronny Jackson",
      party: "Republican",
      photoUrl: "/representatives/Ronny_Jackson.jpg"
    }
  },
  "4814": {
    district: "TX-14",
    state: "Texas",
    stateAbbr: "TX",
    districtCode: "TX-14",
    representative: {
      name: "Randy Weber",
      party: "Republican",
      photoUrl: "/representatives/Randy_Weber.jpg"
    }
  },
  "4815": {
    district: "TX-15",
    state: "Texas",
    stateAbbr: "TX",
    districtCode: "TX-15",
    representative: {
      name: "Monica De La Cruz",
      party: "Republican",
      photoUrl: "/representatives/Monica_De_La_Cruz.jpg"
    }
  },
  "4816": {
    district: "TX-16",
    state: "Texas",
    stateAbbr: "TX",
    districtCode: "TX-16",
    representative: {
      name: "Veronica Escobar",
      party: "Democratic",
      photoUrl: "/representatives/Veronica_Escobar.jpg"
    }
  },
  "4817": {
    district: "TX-17",
    state: "Texas",
    stateAbbr: "TX",
    districtCode: "TX-17",
    representative: {
      name: "Pete Sessions",
      party: "Republican",
      photoUrl: "/representatives/Pete_Sessions.jpg"
    }
  },
  "4818": {
    district: "TX-18",
    state: "Texas",
    stateAbbr: "TX",
    districtCode: "TX-18",
    representative: {
      name: "Sylvester Turner",
      party: "Democratic",
      photoUrl: "/representatives/Sylvester_Turner.jpg"
    }
  },
  "4819": {
    district: "TX-19",
    state: "Texas",
    stateAbbr: "TX",
    districtCode: "TX-19",
    representative: {
      name: "Jodey Arrington",
      party: "Republican",
      photoUrl: "/representatives/Jodey_Arrington.jpg"
    }
  },
  "4820": {
    district: "TX-20",
    state: "Texas",
    stateAbbr: "TX",
    districtCode: "TX-20",
    representative: {
      name: "Joaquin Castro",
      party: "Democratic",
      photoUrl: "/representatives/Joaquin_Castro.jpg"
    }
  },
  "4821": {
    district: "TX-21",
    state: "Texas",
    stateAbbr: "TX",
    districtCode: "TX-21",
    representative: {
      name: "Chip Roy",
      party: "Republican",
      photoUrl: "/representatives/Chip_Roy.jpg"
    }
  },
  "4822": {
    district: "TX-22",
    state: "Texas",
    stateAbbr: "TX",
    districtCode: "TX-22",
    representative: {
      name: "Troy Nehls",
      party: "Republican",
      photoUrl: "/representatives/Troy_Nehls.jpg"
    }
  },
  "4823": {
    district: "TX-23",
    state: "Texas",
    stateAbbr: "TX",
    districtCode: "TX-23",
    representative: {
      name: "Tony Gonzales",
      party: "Republican",
      photoUrl: "/representatives/Tony_Gonzales.jpg"
    }
  },
  "4824": {
    district: "TX-24",
    state: "Texas",
    stateAbbr: "TX",
    districtCode: "TX-24",
    representative: {
      name: "Beth Van Duyne",
      party: "Republican",
      photoUrl: "/representatives/Beth_Van_Duyne.jpg"
    }
  },
  "4825": {
    district: "TX-25",
    state: "Texas",
    stateAbbr: "TX",
    districtCode: "TX-25",
    representative: {
      name: "Roger Williams",
      party: "Republican",
      photoUrl: "/representatives/Roger_Williams.jpg"
    }
  },
  "4826": {
    district: "TX-26",
    state: "Texas",
    stateAbbr: "TX",
    districtCode: "TX-26",
    representative: {
      name: "Michael Burgess",
      party: "Republican",
      photoUrl: "/representatives/Michael_Burgess.jpg"
    }
  },
  "4827": {
    district: "TX-27",
    state: "Texas",
    stateAbbr: "TX",
    districtCode: "TX-27",
    representative: {
      name: "Michael Cloud",
      party: "Republican",
      photoUrl: "/representatives/Michael_Cloud.jpg"
    }
  },
  "4828": {
    district: "TX-28",
    state: "Texas",
    stateAbbr: "TX",
    districtCode: "TX-28",
    representative: {
      name: "Henry Cuellar",
      party: "Democratic",
      photoUrl: "/representatives/Henry_Cuellar.jpg"
    }
  },
  "4829": {
    district: "TX-29",
    state: "Texas",
    stateAbbr: "TX",
    districtCode: "TX-29",
    representative: {
      name: "Sylvia Garcia",
      party: "Democratic",
      photoUrl: "/representatives/Sylvia_Garcia.jpg"
    }
  },
  "4830": {
    district: "TX-30",
    state: "Texas",
    stateAbbr: "TX",
    districtCode: "TX-30",
    representative: {
      name: "Jasmine Crockett",
      party: "Democratic",
      photoUrl: "/representatives/Jasmine_Crockett.jpg"
    }
  },
  "4831": {
    district: "TX-31",
    state: "Texas",
    stateAbbr: "TX",
    districtCode: "TX-31",
    representative: {
      name: "John Carter",
      party: "Republican",
      photoUrl: "/representatives/John_Carter.jpg"
    }
  },
  "4832": {
    district: "TX-32",
    state: "Texas",
    stateAbbr: "TX",
    districtCode: "TX-32",
    representative: {
      name: "Colin Allred",
      party: "Democratic",
      photoUrl: "/representatives/Colin_Allred.jpg"
    }
  },
  "4833": {
    district: "TX-33",
    state: "Texas",
    stateAbbr: "TX",
    districtCode: "TX-33",
    representative: {
      name: "Marc Veasey",
      party: "Democratic",
      photoUrl: "/representatives/Marc_Veasey.jpg"
    }
  },
  "4834": {
    district: "TX-34",
    state: "Texas",
    stateAbbr: "TX",
    districtCode: "TX-34",
    representative: {
      name: "Vicente Gonzalez",
      party: "Democratic",
      photoUrl: "/representatives/Vicente_Gonzalez.jpg"
    }
  },
  "4835": {
    district: "TX-35",
    state: "Texas",
    stateAbbr: "TX",
    districtCode: "TX-35",
    representative: {
      name: "Lloyd Doggett",
      party: "Democratic",
      photoUrl: "/representatives/Lloyd_Doggett.jpg"
    }
  },
  "4836": {
    district: "TX-36",
    state: "Texas",
    stateAbbr: "TX",
    districtCode: "TX-36",
    representative: {
      name: "Brian Babin",
      party: "Republican",
      photoUrl: "/representatives/Brian_Babin.jpg"
    }
  },
  "4837": {
    district: "TX-37",
    state: "Texas",
    stateAbbr: "TX",
    districtCode: "TX-37",
    representative: {
      name: "Wesley Hunt",
      party: "Republican",
      photoUrl: "/representatives/Wesley_Hunt.jpg"
    }
  },
  "4838": {
    district: "TX-38",
    state: "Texas",
    stateAbbr: "TX",
    districtCode: "TX-38",
    representative: {
      name: "Wesley Hunt",
      party: "Republican",
      photoUrl: "/representatives/Wesley_Hunt.jpg"
    }
  },
  "4901": {
    district: "UT-01",
    state: "Utah",
    stateAbbr: "UT",
    districtCode: "UT-01",
    representative: {
      name: "Blake Moore",
      party: "Republican",
      photoUrl: "/representatives/Blake_Moore.jpg"
    }
  },
  "4902": {
    district: "UT-02",
    state: "Utah",
    stateAbbr: "UT",
    districtCode: "UT-02",
    representative: {
      name: "Celeste Maloy",
      party: "Republican",
      photoUrl: "/representatives/Celeste_Maloy.jpg"
    }
  },
  "4903": {
    district: "UT-03",
    state: "Utah",
    stateAbbr: "UT",
    districtCode: "UT-03",
    representative: {
      name: "John Curtis",
      party: "Republican",
      photoUrl: "/representatives/John_Curtis.jpg"
    }
  },
  "4904": {
    district: "UT-04",
    state: "Utah",
    stateAbbr: "UT",
    districtCode: "UT-04",
    representative: {
      name: "Burgess Owens",
      party: "Republican",
      photoUrl: "/representatives/Burgess_Owens.jpg"
    }
  },
  "5000": {
    district: "VT-AL",
    representative: {
      name: "Becca Balint",
      party: "Democratic",
      photoUrl: "/representatives/Becca_Balint.jpg"
    }
  },
  "5101": {
    district: "VA-01",
    state: "Virginia",
    stateAbbr: "VA",
    districtCode: "VA-01",
    representative: {
      name: "Rob Wittman",
      party: "Republican",
      photoUrl: "/representatives/Rob_Wittman.jpg"
    }
  },
  "5102": {
    district: "VA-02",
    state: "Virginia",
    stateAbbr: "VA",
    districtCode: "VA-02",
    representative: {
      name: "Jen Kiggans",
      party: "Republican",
      photoUrl: "/representatives/Jen_Kiggans.jpg"
    }
  },
  "5103": {
    district: "VA-03",
    state: "Virginia",
    stateAbbr: "VA",
    districtCode: "VA-03",
    representative: {
      name: "Bobby Scott",
      party: "Democratic",
      photoUrl: "/representatives/Bobby_Scott.jpg"
    }
  },
  "5104": {
    district: "VA-04",
    state: "Virginia",
    stateAbbr: "VA",
    districtCode: "VA-04",
    representative: {
      name: "Jennifer McClellan",
      party: "Democratic",
      photoUrl: "/representatives/Jennifer_McClellan.jpg"
    }
  },
  "5105": {
    district: "VA-05",
    state: "Virginia",
    stateAbbr: "VA",
    districtCode: "VA-05",
    representative: {
      name: "Bob Good",
      party: "Republican",
      photoUrl: "/representatives/Bob_Good.jpg"
    }
  },
  "5106": {
    district: "VA-06",
    state: "Virginia",
    stateAbbr: "VA",
    districtCode: "VA-06",
    representative: {
      name: "Ben Cline",
      party: "Republican",
      photoUrl: "/representatives/Ben_Cline.jpg"
    }
  },
  "5107": {
    district: "VA-07",
    state: "Virginia",
    stateAbbr: "VA",
    districtCode: "VA-07",
    representative: {
      name: "Abigail Spanberger",
      party: "Democratic",
      photoUrl: "/representatives/Abigail_Spanberger.jpg"
    }
  },
  "5108": {
    district: "VA-08",
    state: "Virginia",
    stateAbbr: "VA",
    districtCode: "VA-08",
    representative: {
      name: "Don Beyer",
      party: "Democratic",
      photoUrl: "/representatives/Don_Beyer.jpg"
    }
  },
  "5109": {
    district: "VA-09",
    state: "Virginia",
    stateAbbr: "VA",
    districtCode: "VA-09",
    representative: {
      name: "Morgan Griffith",
      party: "Republican",
      photoUrl: "/representatives/Morgan_Griffith.jpg"
    }
  },
  "5110": {
    district: "VA-10",
    state: "Virginia",
    stateAbbr: "VA",
    districtCode: "VA-10",
    representative: {
      name: "Jennifer Wexton",
      party: "Democratic",
      photoUrl: "/representatives/Jennifer_Wexton.jpg"
    }
  },
  "5111": {
    district: "VA-11",
    state: "Virginia",
    stateAbbr: "VA",
    districtCode: "VA-11",
    representative: {
      name: "Gerry Connolly",
      party: "Democratic",
      photoUrl: "/representatives/Gerry_Connolly.jpg"
    }
  },
  "5301": {
    district: "WA-01",
    state: "Washington",
    stateAbbr: "WA",
    districtCode: "WA-01",
    representative: {
      name: "Suzan DelBene",
      party: "Democratic",
      photoUrl: "/representatives/Suzan_DelBene.jpg"
    }
  },
  "5302": {
    district: "WA-02",
    state: "Washington",
    stateAbbr: "WA",
    districtCode: "WA-02",
    representative: {
      name: "Rick Larsen",
      party: "Democratic",
      photoUrl: "/representatives/Rick_Larsen.jpg"
    }
  },
  "5303": {
    district: "WA-03",
    state: "Washington",
    stateAbbr: "WA",
    districtCode: "WA-03",
    representative: {
      name: "Marie Gluesenkamp Perez",
      party: "Democratic",
      photoUrl: "/representatives/Marie_Gluesenkamp_Perez.jpg"
    }
  },
  "5304": {
    district: "WA-04",
    state: "Washington",
    stateAbbr: "WA",
    districtCode: "WA-04",
    representative: {
      name: "Dan Newhouse",
      party: "Republican",
      photoUrl: "/representatives/Dan_Newhouse.jpg"
    }
  },
  "5305": {
    district: "WA-05",
    state: "Washington",
    stateAbbr: "WA",
    districtCode: "WA-05",
    representative: {
      name: "Cathy McMorris Rodgers",
      party: "Republican",
      photoUrl: "/representatives/Cathy_McMorris_Rodgers.jpg"
    }
  },
  "5306": {
    district: "WA-06",
    state: "Washington",
    stateAbbr: "WA",
    districtCode: "WA-06",
    representative: {
      name: "Derek Kilmer",
      party: "Democratic",
      photoUrl: "/representatives/Derek_Kilmer.jpg"
    }
  },
  "5307": {
    district: "WA-07",
    state: "Washington",
    stateAbbr: "WA",
    districtCode: "WA-07",
    representative: {
      name: "Pramila Jayapal",
      party: "Democratic",
      photoUrl: "/representatives/Pramila_Jayapal.jpg"
    }
  },
  "5308": {
    district: "WA-08",
    state: "Washington",
    stateAbbr: "WA",
    districtCode: "WA-08",
    representative: {
      name: "Kim Schrier",
      party: "Democratic",
      photoUrl: "/representatives/Kim_Schrier.jpg"
    }
  },
  "5309": {
    district: "WA-09",
    state: "Washington",
    stateAbbr: "WA",
    districtCode: "WA-09",
    representative: {
      name: "Adam Smith",
      party: "Democratic",
      photoUrl: "/representatives/Adam_Smith.jpg"
    }
  },
  "5310": {
    district: "WA-10",
    state: "Washington",
    stateAbbr: "WA",
    districtCode: "WA-10",
    representative: {
      name: "Marilyn Strickland",
      party: "Democratic",
      photoUrl: "/representatives/Marilyn_Strickland.jpg"
    }
  },
  "5401": {
    district: "WV-01",
    state: "West Virginia",
    stateAbbr: "WV",
    districtCode: "WV-01",
    representative: {
      name: "Carol Miller",
      party: "Republican",
      photoUrl: "/representatives/Carol_Miller.jpg"
    }
  },
  "5402": {
    district: "WV-02",
    state: "West Virginia",
    stateAbbr: "WV",
    districtCode: "WV-02",
    representative: {
      name: "Alex Mooney",
      party: "Republican",
      photoUrl: "/representatives/Alex_Mooney.jpg"
    }
  },
  "5501": {
    district: "WI-01",
    state: "Wisconsin",
    stateAbbr: "WI",
    districtCode: "WI-01",
    representative: {
      name: "Bryan Steil",
      party: "Republican",
      photoUrl: "/representatives/Bryan_Steil.jpg"
    }
  },
  "5502": {
    district: "WI-02",
    state: "Wisconsin",
    stateAbbr: "WI",
    districtCode: "WI-02",
    representative: {
      name: "Mark Pocan",
      party: "Democratic",
      photoUrl: "/representatives/Mark_Pocan.jpg"
    }
  },
  "5503": {
    district: "WI-03",
    state: "Wisconsin",
    stateAbbr: "WI",
    districtCode: "WI-03",
    representative: {
      name: "Derrick Van Orden",
      party: "Republican",
      photoUrl: "/representatives/Derrick_Van_Orden.jpg"
    }
  },
  "5504": {
    district: "WI-04",
    state: "Wisconsin",
    stateAbbr: "WI",
    districtCode: "WI-04",
    representative: {
      name: "Gwen Moore",
      party: "Democratic",
      photoUrl: "/representatives/Gwen_Moore.jpg"
    }
  },
  "5505": {
    district: "WI-05",
    state: "Wisconsin",
    stateAbbr: "WI",
    districtCode: "WI-05",
    representative: {
      name: "Scott Fitzgerald",
      party: "Republican",
      photoUrl: "/representatives/Scott_Fitzgerald.jpg"
    }
  },
  "5506": {
    district: "WI-06",
    state: "Wisconsin",
    stateAbbr: "WI",
    districtCode: "WI-06",
    representative: {
      name: "Glenn Grothman",
      party: "Republican",
      photoUrl: "/representatives/Glenn_Grothman.jpg"
    }
  },
  "5507": {
    district: "WI-07",
    state: "Wisconsin",
    stateAbbr: "WI",
    districtCode: "WI-07",
    representative: {
      name: "Tom Tiffany",
      party: "Republican",
      photoUrl: "/representatives/Tom_Tiffany.jpg"
    }
  },
  "5508": {
    district: "WI-08",
    state: "Wisconsin",
    stateAbbr: "WI",
    districtCode: "WI-08",
    representative: {
      name: "Mike Gallagher",
      party: "Republican",
      photoUrl: "/representatives/Mike_Gallagher.jpg"
    }
  },
  "5600": {
    district: "WY-AL",
    representative: {
      name: "Harriet Hageman",
      party: "Republican",
      photoUrl: "/representatives/Harriet_Hageman.jpg"
    }
  }
};

export default districtRepresentativeData;